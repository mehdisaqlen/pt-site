// app/api/env-ok/route.ts
export const runtime = "nodejs";
export async function GET() {
  return new Response(
    JSON.stringify({
      has_RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      FROM_EMAIL: process.env.FROM_EMAIL || null,
      CONTACT_RECEIVER: process.env.CONTACT_RECEIVER || null,
      AFFILIATE_RECEIVER: process.env.AFFILIATE_RECEIVER || null,
      node: process.version,
      env: process.env.NODE_ENV,
    }),
    { headers: { "content-type": "application/json" } }
  );
}
