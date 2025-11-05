import { getAllPostsMeta } from "@/lib/blog";

export function getUniqueCategories() {
  const posts = getAllPostsMeta();
  return [...new Set(posts.map((p) => p.category).filter(Boolean))];
}

export function getUniqueAuthors() {
  const posts = getAllPostsMeta();
  return [...new Set(posts.map((p) => p.author?.name).filter(Boolean))];
}

export function filterPostsBy(
  key: "category" | "author" | "tag",
  value: string
) {
  const posts = getAllPostsMeta();
  if (key === "tag") return posts.filter((p) => p.tags?.includes(value));
  if (key === "author") return posts.filter((p) => p.author?.name === value);
  return posts.filter((p) => p.category === value);
}
