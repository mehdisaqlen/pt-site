const SITE = "https://pubthrive.com";

const esc = (s: string = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Item = {
  title: string;
  url: string;
  description?: string;
  date?: string; // ISO
  guid?: string;
  categories?: string[];
};

export function buildRss(feed: {
  title: string;
  description: string;
  site: string;
  items: Item[];
}) {
  const itemsXml = feed.items
    .map((it) => {
      const pubDate = it.date ? new Date(it.date).toUTCString() : undefined;
      const categories = (it.categories || [])
        .map((c) => `<category>${esc(c)}</category>`)
        .join("");
      return `
        <item>
          <title>${esc(it.title)}</title>
          <link>${esc(it.url)}</link>
          <guid isPermaLink="true">${esc(it.guid || it.url)}</guid>
          ${
            it.description
              ? `<description><![CDATA[${it.description}]]></description>`
              : ""
          }
          ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
          ${categories}
        </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(feed.title)}</title>
    <link>${SITE}</link>
    <description>${esc(feed.description)}</description>
    <language>en</language>
    <ttl>60</ttl>
    ${itemsXml}
  </channel>
</rss>`;
}

export const SITE_URL = SITE;
