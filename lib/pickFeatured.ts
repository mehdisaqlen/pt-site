import type { BlogMeta } from "@/lib/blog";

export function pickFeatured(posts: BlogMeta[]) {
  const visible = posts.filter((p) => !p.draft);

  const featuredCandidates = visible
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        (b.priority ?? 0) - (a.priority ?? 0) || (a.date < b.date ? 1 : -1)
    );

  const featured = featuredCandidates[0] ?? visible[0] ?? null;
  const list = featured
    ? visible.filter((p) => p.slug !== featured.slug)
    : visible;

  return { featured, list };
}
