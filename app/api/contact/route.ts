// app/api/contact/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

function toBool(v: unknown) {
  if (typeof v === "boolean") return v;
  const s = String(v ?? "")
    .toLowerCase()
    .trim();
  return s === "on" || s === "true" || s === "1" || s === "yes";
}

async function parseBody(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("form")) {
    const fd = await req.formData();
    const obj = Object.fromEntries(fd) as Record<string, any>;
    obj.consent = toBool(obj.consent);
    return obj;
  }
  const json = (await req.json().catch(() => ({}))) as Record<string, any>;
  json.consent = toBool(json.consent);
  return json;
}

const schema = z
  .object({
    role: z.enum(["Individual", "Agency"]),
    name: z.string().min(2),
    email: z.email(),
    company: z.string().optional(),
    monthlyRevenue: z.string().optional(),
    country: z.string().min(1),
    website: z.string().url(),
    phone: z.string().min(6),
    message: z.string().min(5),
    consent: z
      .any()
      .transform(toBool)
      .refine((v) => v === true, { message: "Consent required" }),
    hp: z
      .string()
      .optional()
      .refine((v) => !v, { message: "bot" }),
  })
  .superRefine((v, ctx) => {
    if (v.role === "Individual") {
      if (!v.company)
        ctx.addIssue({
          code: "custom",
          path: ["company"],
          message: "Required",
        });
      if (!v.monthlyRevenue)
        ctx.addIssue({
          code: "custom",
          path: ["monthlyRevenue"],
          message: "Required",
        });
    }
  });

const TO = (process.env.CONTACT_RECEIVER || "contact@pubthrive.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Use verified sender if you have one; fallback to Resend onboarding for testing
const FROM = process.env.FROM_EMAIL;

const esc = (s: string) => String(s).replace(/</g, "&lt;");

export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const raw = await parseBody(req);

    if (raw.hp && String(raw.hp).trim()) {
      return NextResponse.json({ ok: true }, { headers: corsHeaders(origin) });
    }

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", issues: parsed.error.flatten() },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // One-time visibility log (remove later if you want)
    console.log("CONTACT ENV CHECK", {
      hasKey: !!process.env.RESEND_API_KEY,
      from: FROM,
      toCount: TO.length,
      node: process.version,
      env: process.env.NODE_ENV,
    });

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "server_misconfigured: missing RESEND_API_KEY" },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    const resend = new Resend(key);
    const d = parsed.data;

    const pairs: [string, string][] = [
      ["Role", d.role],
      ["Name", d.name],
      ["Email", d.email],
      ["Phone / WhatsApp", d.phone],
      ["Website", d.website],
      ["Country", d.country],
      ...(d.company ? [["Company", d.company] as [string, string]] : []),
      ...(d.monthlyRevenue
        ? [["Monthly ad revenue", d.monthlyRevenue] as [string, string]]
        : []),
      ["Consent", "Yes"],
    ];

    const infoItems = pairs
      .map(
        ([k, v]) => `
          <div style="margin-bottom:10px;">
            <div style="font-weight:600;color:#0f172a;font-size:15px;margin-bottom:2px;">${k}</div>
            <div style="font-size:15px;color:#1e293b;white-space:pre-wrap;">${esc(
              v
            )}</div>
          </div>`
      )
      .join("");

    const html = `
      <div style="background:#f8fafc;padding:40px 0;font-family:Inter,Arial,sans-serif;color:#0f172a;">
        <div style="max-width:640px;margin:auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.08);">
          <div style="background:#0f172a;color:#fff;padding:18px 28px;font-size:18px;font-weight:700;letter-spacing:-0.02em;">
            PubThrive Contact Form
          </div>
          <div style="padding:28px;">
            ${infoItems}
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 18px;margin-top:18px;">
              <p style="margin:0 0 6px;font-weight:600;">Message</p>
              <p style="margin:0;white-space:pre-wrap;line-height:1.55;color:#1e293b;">${esc(
                d.message
              ).replace(/\n/g, "<br/>")}</p>
            </div>
          </div>
          <div style="background:#f1f5f9;color:#475569;padding:14px 24px;text-align:center;font-size:13px;">
            Sent • ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    `;

    try {
      const r = await resend.emails.send({
        from: `PubThrive <${FROM}>`,
        to: TO,
        subject: `New Inquiry — ${d.role}`,
        replyTo: d.email,
        html,
      });
      if ((r as any)?.error) {
        console.error("Resend API error:", (r as any).error);
        return NextResponse.json(
          { error: "email_failed", detail: (r as any).error },
          { status: 502, headers: corsHeaders(origin) }
        );
      }
    } catch (e: any) {
      console.error("Resend send() threw:", e?.message || e);
      return NextResponse.json(
        { error: "email_failed_throw", detail: e?.message || String(e) },
        { status: 502, headers: corsHeaders(origin) }
      );
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders(origin) });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", detail: e?.message || String(e) },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
