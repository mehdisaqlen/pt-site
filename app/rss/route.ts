import { NextResponse } from "next/server";
import { getAllPostsMeta } from "@/lib/blog";
import { buildRss, SITE_URL } from "@/lib/rss";

export const revalidate = 3600; // 1 hour

export async function GET() {
  const posts = getAllPostsMeta(); // expects: slug, title, excerpt, date, tags?
  const items = posts.map((p) => ({
    title: p.title,
    url: `${SITE_URL}/blog/${p.slug}`,
    description: p.excerpt,
    date: p.date,
    guid: `${SITE_URL}/blog/${p.slug}`,
    categories: p.tags || [],
  }));

  const xml = buildRss({
    title: "PubThrive Blog",
    description: "Insights on ad-tech, monetization, and engineering.",
    site: SITE_URL,
    items,
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
