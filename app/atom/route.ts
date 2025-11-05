import { NextResponse } from "next/server";
import { getAllPostsMeta } from "@/lib/blog";
import { SITE_URL } from "@/lib/rss";

export const revalidate = 3600;

const esc = (s: string = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const updated = new Date().toISOString();
  const posts = getAllPostsMeta();
  const entries = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `
  <entry>
    <title>${esc(p.title)}</title>
    <link href="${url}" />
    <id>${url}</id>
    ${p.date ? `<updated>${new Date(p.date).toISOString()}</updated>` : ""}
    ${
      p.excerpt ? `<summary type="html"><![CDATA[${p.excerpt}]]></summary>` : ""
    }
    ${(p.tags || [])
      .map((t: string) => `<category term="${esc(t)}" />`)
      .join("")}
  </entry>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>PubThrive Blog</title>
  <link href="${SITE_URL}/atom.xml" rel="self"/>
  <link href="${SITE_URL}"/>
  <updated>${updated}</updated>
  <id>${SITE_URL}/</id>
  ${entries}
</feed>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
