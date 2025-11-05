// app/api/affiliate/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// ---------- tiny CORS helpers (permissive to make it work locally) ----------
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

// ---------- parsing helpers ----------
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
    // coerce checkbox-like input
    obj.consent = toBool(obj.consent);
    return obj;
  }
  const json = (await req.json().catch(() => ({}))) as Record<string, any>;
  json.consent = toBool(json.consent);
  return json;
}

// ---------- validation ----------
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  country: z.string().min(1),
  websites: z.string().min(3).max(2000),
  phone: z.string().min(6).max(40),
  publishersCount: z.string().min(1).max(40),
  niches: z.string().min(1).max(200),
  regions: z.string().min(1).max(200),
  acquisitionNotes: z.string().min(5).max(3000),
  // accept anything -> toBool -> must be true
  consent: z
    .any()
    .transform(toBool)
    .refine((v) => v === true, { message: "Consent required" }),
  // honeypot: ok if empty/undefined
  hp: z
    .string()
    .optional()
    .refine((v) => !v, { message: "bot" }),
});

const TO = (process.env.AFFILIATE_RECEIVER || "contact@pubthrive.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const FROM = process.env.FROM_EMAIL || "noreply@pubthrive.com";

const esc = (s: string) => String(s).replace(/</g, "&lt;");

// ---------- route ----------
export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const raw = await parseBody(req);

    // smoke logging (comment out after testing)
    // console.log("affiliate POST", { origin, ct: req.headers.get("content-type"), raw });

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", issues: parsed.error.flatten() },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    const d = parsed.data;
    // if honeypot tripped, act like success
    if (raw.hp && String(raw.hp).trim()) {
      return NextResponse.json({ ok: true }, { headers: corsHeaders(origin) });
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "server_misconfigured: missing RESEND_API_KEY" },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    const resend = new Resend(key);

    const pairs: [string, string][] = [
      ["Name", d.name],
      ["Email", d.email],
      ["Company", d.company],
      ["Country", d.country],
      ["Website(s)", d.websites],
      ["Phone / WhatsApp", d.phone],
      ["Publishers (est.)", d.publishersCount],
      ["Niches", d.niches],
      ["Regions", d.regions],
      ["Acquisition plan", d.acquisitionNotes],
      ["Consent", d.consent ? "Yes" : "No"],
    ];

    const html = `
      <div style="background:#f8fafc;padding:40px 0;font-family:Inter,Arial,sans-serif;color:#0f172a;">
        <div style="max-width:640px;margin:auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.08);">
          <div style="background:#0f172a;color:#fff;padding:18px 28px;font-size:18px;font-weight:700;letter-spacing:-0.02em;">
            PubThrive Affiliate Application
          </div>
          <div style="padding:28px;">
            ${pairs
              .map(
                ([k, v]) => `
              <div style="margin-bottom:10px;">
                <div style="font-weight:600;color:#0f172a;font-size:15px;margin-bottom:2px;">${k}</div>
                <div style="font-size:15px;color:#1e293b;white-space:pre-wrap;">${esc(
                  v
                )}</div>
              </div>
            `
              )
              .join("")}
          </div>
          <div style="background:#f1f5f9;color:#475569;padding:14px 24px;text-align:center;font-size:13px;">
            Sent • ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    `;

    const r = await resend.emails.send({
      from: `PubThrive <${FROM}>`,
      to: TO,
      subject: `Affiliate Application — ${d.name}`,
      replyTo: d.email,
      html,
    });

    if ((r as any)?.error) {
      return NextResponse.json(
        { error: "email_failed", detail: (r as any).error },
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
