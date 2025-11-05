import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// simple in-memory rate limiter
const BUCKET = new Map<string, { c: number; t: number }>();
function rateLimit(ip: string, max = 20, windowMs = 60_000) {
  const now = Date.now();
  const v = BUCKET.get(ip) || { c: 0, t: now };
  if (now - v.t > windowMs) {
    v.c = 0;
    v.t = now;
  }
  v.c++;
  BUCKET.set(ip, v);
  return v.c <= max;
}

export function makeHandler<T extends z.ZodTypeAny>(opts: {
  schema: T; // zod schema for server-side validation
  process: (data: z.infer<T>) => Promise<void>;
  allowedOrigin?: string;
  requireCaptcha?: (req: NextRequest) => Promise<boolean>;
}) {
  return async function POST(req: NextRequest) {
    try {
      if (req.method !== "POST")
        return NextResponse.json({ ok: false }, { status: 405 });

      const len = Number(req.headers.get("content-length") || "0");
      if (len > 50_000)
        return NextResponse.json({ ok: false }, { status: 413 });

      const origin = req.headers.get("origin") || "";
      if (opts.allowedOrigin && origin !== opts.allowedOrigin)
        return NextResponse.json({ ok: false }, { status: 403 });

      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
      if (!rateLimit(ip))
        return NextResponse.json({ ok: false }, { status: 429 });

      if (opts.requireCaptcha && !(await opts.requireCaptcha(req)))
        return NextResponse.json(
          { ok: false, error: "captcha_failed" },
          { status: 400 }
        );

      // --- FIX: Safe extraction + boolean coercion ---
      const fd = await req.formData();
      const obj: Record<string, string | boolean> = {};
      for (const [key, val] of fd.entries()) {
        const s = (val ?? "").toString().trim();
        obj[key] = s === "on" ? true : s;
      }

      const data = await opts.schema.parseAsync(obj);
      await opts.process(data);
      return NextResponse.json({ ok: true });
    } catch (e: any) {
      console.error("secure-handler error:", e);
      return NextResponse.json({ ok: false, error: "failed" }, { status: 400 });
    }
  };
}
