// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Optional background overlay
const BG =
  "radial-gradient(1200px 600px at 10% 20%, #0a0a0e 0%, #11131a 60%, #0a0a0e 100%)";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  // Fallback if post not found (prevents 500s)
  const title = post?.title ?? "PubThrive Blog";
  const author = post?.author
    ? Array.isArray(post.author)
      ? post.author
          .map((a: any) => (typeof a === "string" ? a : a.name))
          .join(", ")
      : typeof post.author === "string"
      ? post.author
      : post.author.name
    : "PubThrive Team";
  const tagLine =
    post?.tags && post.tags.length > 0
      ? post.tags.slice(0, 3).join(" · ")
      : "AdTech · Monetization · Engineering";

  // If you store a cover image URL on posts, you can layer it:
  const cover = post?.coverImage; // string | undefined

  const site = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://pubthrive.com";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: BG,
          color: "white",
        }}
      >
        {/* Top row: brand + tags */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <img src={`${site}/logo.png`} width="64" height="64" />
            <div style={{ fontSize: 28, opacity: 0.8 }}>PubThrive Blog</div>
          </div>
          <div style={{ fontSize: 24, opacity: 0.6 }}>{tagLine}</div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* Footer: author + optional cover */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 28, opacity: 0.8 }}>by {author}</div>
          {cover ? (
            <img
              src={cover}
              width="420"
              height="240"
              style={{
                objectFit: "cover",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
