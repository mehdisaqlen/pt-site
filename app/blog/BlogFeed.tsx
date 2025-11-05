"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "@/styles/pages/blog.module.scss";
import Image from "../opengraph-image";

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  readTime: number;
};

export default function BlogFeed({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore) {
          const res = await fetch(`/api/posts?limit=6&offset=${page * 6}`);
          const data = await res.json();
          setPosts((prev) => [...prev, ...data.posts]);
          setHasMore(data.hasMore);
          setPage((p) => p + 1);
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, page]);

  return (
    <>
      <div className={styles.blogGrid}>
        {posts.map((p) => (
          <article key={p.slug} className={styles.blogCard}>
            <div className={styles.cardImage}>
              {p.coverImage ? (
                <img src={p.coverImage} alt={p.title} />
              ) : (
                <div className={styles.placeholder}></div>
              )}
            </div>
            <div className={styles.cardContent}>
              <div className={styles.readBadge}>{p.readTime} min read</div>
              <h3>
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h3>
              {/* <p>{p.excerpt}</p> */}
              <Link href={`/blog/${p.slug}`} className={styles.readMore}>
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
      {hasMore && (
        <div ref={loaderRef} className={styles.loader}>
          Loading more...
        </div>
      )}
    </>
  );
}
