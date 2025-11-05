// app/api/_utils/secure-handler.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

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

type AllowedOrigin = string | string[];

function normalize(o: string) {
  return o.replace(/\/$/, "");
}
function isOriginAllowed(origin: string, allowed?: AllowedOrigin) {
  if (!allowed) return true; // no CORS restriction
  if (!origin) return true; // treat empty as same-origin
  const o = normalize(origin);
  return Array.isArray(allowed)
    ? allowed.map(normalize).includes(o)
    : normalize(allowed) === o;
}

function requestOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const ref = req.headers.get("referer");
  try {
    if (ref) return new URL(ref).origin;
  } catch {}
  return ""; // same-origin or server-side call
}

// Always return only defined headers
function corsHeaders(
  origin: string,
  allowed?: AllowedOrigin
): Record<string, string> {
  const h: Record<string, string> = {};
  if (origin && isOriginAllowed(origin, allowed)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Vary"] = "Origin";
    h["Access-Control-Allow-Methods"] = "POST,OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type";
  }
  return h;
}

export function makeHandler<T extends z.ZodTypeAny>(opts: {
  schema: T;
  process: (data: z.infer<T>) => Promise<void>;
  allowedOrigin?: AllowedOrigin;
  requireCaptcha?: (req: NextRequest) => Promise<boolean>;
}) {
  return async function handler(req: NextRequest) {
    const origin = requestOrigin(req);

    // Preflight
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: corsHeaders(origin, opts.allowedOrigin),
      });
    }

    try {
      if (req.method !== "POST") {
        return new NextResponse(
          JSON.stringify({ ok: false, error: "method_not_allowed" }),
          {
            status: 405,
            headers: {
              "content-type": "application/json",
              ...corsHeaders(origin, opts.allowedOrigin),
            },
          }
        );
      }

      // Origin gate (now tolerant of empty origin + referer fallback)
      if (opts.allowedOrigin && !isOriginAllowed(origin, opts.allowedOrigin)) {
        return new NextResponse(
          JSON.stringify({ ok: false, error: "forbidden_origin" }),
          {
            status: 403,
            headers: {
              "content-type": "application/json",
              ...corsHeaders(origin, opts.allowedOrigin),
            },
          }
        );
      }

      // Rate limit
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
      if (!rateLimit(ip)) {
        return new NextResponse(
          JSON.stringify({ ok: false, error: "rate_limited" }),
          {
            status: 429,
            headers: {
              "content-type": "application/json",
              ...corsHeaders(origin, opts.allowedOrigin),
            },
          }
        );
      }

      if (opts.requireCaptcha && !(await opts.requireCaptcha(req))) {
        return new NextResponse(
          JSON.stringify({ ok: false, error: "captcha_failed" }),
          {
            status: 400,
            headers: {
              "content-type": "application/json",
              ...corsHeaders(origin, opts.allowedOrigin),
            },
          }
        );
      }

      // Read form fields (if you post JSON, switch to await req.json())
      const fd = await req.formData();
      const obj: Record<string, string | boolean> = {};
      for (const [key, val] of fd.entries()) {
        const s = (val ?? "").toString().trim();
        if (s === "true" || s === "on") obj[key] = true;
        else if (s === "false" || s === "off") obj[key] = false;
        else obj[key] = s;
      }

      const data = await opts.schema.parseAsync(obj);
      await opts.process(data);

      return new NextResponse(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          "content-type": "application/json",
          ...corsHeaders(origin, opts.allowedOrigin),
        },
      });
    } catch (e: any) {
      console.error("secure-handler error:", e);
      const status = e?.name === "ZodError" ? 400 : 500;
      return new NextResponse(JSON.stringify({ ok: false, error: "failed" }), {
        status,
        headers: {
          "content-type": "application/json",
          ...corsHeaders(origin, opts.allowedOrigin),
        },
      });
    }
  };
}
