export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getAllPostsMeta } from "@/lib/blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 6);
  const offset = Number(searchParams.get("offset") ?? 0);

  const all = getAllPostsMeta();
  const paginated = all.slice(offset, offset + limit);
  const hasMore = offset + limit < all.length;

  return NextResponse.json({ posts: paginated, hasMore });
}
