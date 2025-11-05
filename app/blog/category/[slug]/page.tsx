import { filterPostsBy } from "@/lib/filter";
import BlogFeed from "../../BlogFeed";
import styles from "@/styles/pages/blog.module.scss";

export function generateStaticParams() {
  const { getUniqueCategories } = require("@/lib/filter");
  return getUniqueCategories().map((c: string) => ({ slug: c }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = filterPostsBy("category", decodeURIComponent(params.slug));
  return (
    <main className={styles.blogPage}>
      <h1 style={{ textTransform: "capitalize" }}>{params.slug}</h1>
      <BlogFeed initialPosts={posts} />
    </main>
  );
}
