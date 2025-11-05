export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  country: z.string().min(1),
  websites: z.string().min(3).max(2000),
  phone: z.string().min(6).max(40),
  publishersCount: z.string().min(1).max(40),
  niches: z.string().min(1).max(200),
});

function have(v?: string) {
  return !!(v && v.trim().length);
}

async function parseBody(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const json = await req.json().catch(() => ({}));
    return json as Record<string, unknown>;
  }
  const fd = await req.formData();
  const obj: Record<string, string> = {};
  fd.forEach((v, k) => (obj[k] = (v ?? "").toString()));
  return obj;
}

export async function POST(req: Request) {
  try {
    // 1) Parse
    const raw = await parseBody(req);

    // 2) Validate
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, stage: "validate", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // 3) Env checks (runtime envs on Amplify)
    const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
    const AFFILIATE_RECEIVER = (
      process.env.AFFILIATE_RECEIVER || "contact@pubthrive.com"
    )
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@pubthrive.com";
    const DRY_RUN = (process.env.DRY_RUN_EMAIL || "").toLowerCase() === "true";

    const missing: string[] = [];
    if (!have(RESEND_API_KEY) && !DRY_RUN) missing.push("RESEND_API_KEY");
    if (!AFFILIATE_RECEIVER.length) missing.push("AFFILIATE_RECEIVER");
    if (!have(FROM_EMAIL)) missing.push("FROM_EMAIL");

    if (missing.length) {
      return NextResponse.json(
        { ok: false, stage: "env", missing },
        { status: 500 }
      );
    }

    // 4) Build email
    const subject = `Affiliate Request — ${data.name} (${data.company})`;
    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company}`,
      `Country: ${data.country}`,
      `Websites: ${data.websites}`,
      `Phone: ${data.phone}`,
      `Publishers Count: ${data.publishersCount}`,
      `Niches: ${data.niches}`,
      `Submitted at: ${new Date().toISOString()}`,
    ].join("\n");

    if (DRY_RUN) {
      // Skip Resend to confirm everything else works in prod
      return NextResponse.json({
        ok: true,
        stage: "dry-run",
        to: AFFILIATE_RECEIVER,
        from: FROM_EMAIL,
        preview: { subject, text },
      });
    }

    // 5) Send email
    const resend = new Resend(RESEND_API_KEY);
    const resp = await resend.emails.send({
      from: FROM_EMAIL,
      to: AFFILIATE_RECEIVER,
      replyTo: data.email,
      subject,
      text,
    });

    if ((resp as any)?.error) {
      return NextResponse.json(
        {
          ok: false,
          stage: "resend",
          error: (resp as any).error?.message ?? "Email send failed",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, stage: "done" });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, stage: "exception", message: err?.message || String(err) },
      { status: 500 }
    );
  }
}
