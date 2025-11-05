import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/pages/blog.module.scss";
import { getPaginatedPosts, type BlogMeta } from "@/lib/blog";
import Container from "../components/Container";
import { GeistMono } from "geist/font/mono";
import { tomatoGrotesk } from "@/public/fonts/fonts";
import { pickFeatured } from "@/lib/pickFeatured";
import BlogFeed from "./BlogFeed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read insights, guides, and industry updates from PubThrive. Learn how to scale publisher revenue, optimize ad performance, and stay ahead in digital monetization.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "PubThrive Blog",
    description:
      "Insights and updates for publishers — explore monetization trends, ad tech strategies, and growth tips from the PubThrive team.",
    url: "https://pubthrive.com/blog",
    type: "website",
    siteName: "PubThrive",
    images: ["/og.jpg"], // update with your actual OG image
  },
  twitter: {
    card: "summary_large_image",
    title: "PubThrive Blog",
    description:
      "Discover PubThrive’s latest articles on ad optimization, publisher growth, and the evolving monetization ecosystem.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};
export const dynamic = "force-static";

export default function BlogIndexPage() {
  // ⚙️ Load only first 6 posts for initial render
  const initialPosts: BlogMeta[] = getPaginatedPosts(6, 0);
  const { featured, list } = pickFeatured(initialPosts);

  // 👈 Sidebar: first 3 non-featured posts
  const sidebarPosts = list.slice(0, 3);

  return (
    <main className={styles.blogPage}>
      {/* === HERO SECTION === */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.grid}>
            {/* --- Featured Post --- */}
            {featured && (
              <div className={styles.featured}>
                <div className={styles.imageWrap}>
                  {featured.coverImage ? (
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      width={900}
                      height={500}
                      className={styles.image}
                      priority
                    />
                  ) : (
                    <div className={styles.placeholder}></div>
                  )}
                </div>

                <div className={styles.featuredContent}>
                  <div className={`${styles.category} ${GeistMono.className}`}>
                    Featured
                  </div>
                  <h2
                    className={`${styles.featuredTitle} ${tomatoGrotesk.className}`}
                  >
                    <Link href={`/blog/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h2>

                  <div className={styles.readBadge}>
                    {featured.readTime} min read
                  </div>
                  <p className={styles.excerpt}>{featured.excerpt}</p>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className={styles.readMore}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            )}

            {/* --- Sidebar Posts --- */}
            <div className={styles.leftColumn}>
              {sidebarPosts.map((p) => (
                <article key={p.slug} className={styles.sideCard}>
                  <div className={`${styles.meta} ${GeistMono.className}`}>
                    <div className={styles.readBadge}>
                      {p.readTime} min read
                    </div>
                  </div>

                  <h3 className={`${styles.title} ${tomatoGrotesk.className}`}>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>

                  <p className={styles.excerpt}>{p.excerpt}</p>

                  <Link
                    href={`/blog/${p.slug}`}
                    className={`${styles.readMore} ${GeistMono.className}`}
                  >
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* === ALL BLOGS SECTION === */}
      <section className={styles.allBlogs}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.sectionHeader}>
              <h2>All Blogs</h2>
            </div>

            {/* 🔥 Lazy-loading feed (infinite scroll ready) */}
            <BlogFeed initialPosts={initialPosts} />
          </div>
        </Container>
      </section>
    </main>
  );
}
