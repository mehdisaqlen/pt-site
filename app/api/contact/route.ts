// app/api/contact/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { z } from "zod";
import { Resend } from "resend";
import { makeHandler } from "../_utils/secure-handler";

const TO = (process.env.CONTACT_RECEIVER || "contact@pubthrive.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const schema = z
  .object({
    role: z.enum(["Individual", "Agency"]),
    name: z.string().min(2),
    email: z.string().email(),
    company: z.string().optional(),
    monthlyRevenue: z.string().optional(),
    country: z.string().min(1),
    website: z.string().url(),
    phone: z.string().min(6),
    message: z.string().min(5),
    consent: z.boolean().refine((v) => v === true),
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

const esc = (s: string) => s.replace(/</g, "&lt;");

export const POST = makeHandler({
  schema,
  allowedOrigin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
  async process(d) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error("Missing RESEND_API_KEY");
      throw new Error("server_misconfigured");
    }

    // Instantiate INSIDE handler
    const resend = new Resend(key);

    const subject = `New Inquiry — ${d.role}`;
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
    ];

    const infoItems = pairs
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
      .join("");

    const html = `
      <div style="background:#f8fafc;padding:40px 0;font-family:Inter,Arial,sans-serif;color:#0f172a;">
        <div style="max-width:640px;margin:auto;background:white;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          <div style="background:#0f172a;color:white;padding:18px 28px;font-size:18px;font-weight:700;letter-spacing:-0.02em;">
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
            Sent from pubthrive.com • ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    `;

    const r = await resend.emails.send({
      from: "PubThrive <contact@pubthrive.com>",
      to: TO,
      subject,
      replyTo: d.email,
      html,
    });

    if ((r as any)?.error) throw new Error("email_failed");
  },
});
