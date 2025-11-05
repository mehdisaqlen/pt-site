// app/api/affiliate-apply/route.ts
import { Resend } from "resend";
import { makeHandler } from "../_utils/secure-handler";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const TO = process.env.AFFILIATE_RECEIVER?.split(",")
  .map((s) => s.trim())
  .filter(Boolean) ?? ["contact@pubthrive.com"];

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
  consent: z.boolean().refine((v) => v === true),
  // optional hidden honeypot
  hp: z
    .string()
    .optional()
    .refine((v) => !v, { message: "bot" }),
});

function esc(s: string) {
  return s.replace(/</g, "&lt;");
}

export const POST = makeHandler({
  schema,
  allowedOrigin: "https://pubthrive.com", // set your prod domain
  // requireCaptcha: async (req) => { /* verify Turnstile/Recaptcha token */ return true; },
  process: async (d) => {
    const lines: [string, string][] = [
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
    ];

    const html = `
      <div style="background:#f8fafc;padding:40px 0;font-family:Inter,Arial,sans-serif;color:#0f172a;">
        <div style="max-width:640px;margin:auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.08);">
          <div style="background:#0f172a;color:#fff;padding:18px 28px;font-size:18px;font-weight:700;letter-spacing:-0.02em;">
            PubThrive Affiliate Application
          </div>
          <div style="padding:28px;">
            ${lines
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
            Sent from pubthrive.com • ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    `;

    const r = await resend.emails.send({
      from: "PubThrive <contact@pubthrive.com>",
      to: TO,
      subject: `Affiliate Application — ${d.name}`,
      replyTo: d.email,
      html,
    });
    if ((r as any)?.error) throw new Error("email_failed");
  },
});
