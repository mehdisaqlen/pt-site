import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/pages/blog-page.module.scss";
import { getAllPostsMeta, getPostBySlug } from "@/lib/blog";
import MdxRenderer from "../../components/MdxRenderer";
import Container from "@/app/components/Container";
import { GeistMono } from "geist/font/mono";

export function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const post = getPostBySlug(slug);
//   if (!post) return { title: "Post not found | PubThrive Blog" };
//   return {
//     title: `${post.title} | PubThrive Blog`,
//     description: post.excerpt ?? "",
//     openGraph: {
//       title: post.title,
//       description: post.excerpt ?? "",
//       images: post.coverImage ? [post.coverImage] : [],
//     },
//   };
// }

const SITE = "https://pubthrive.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found | PubThrive Blog" };

  const url = `${SITE}/blog/${slug}`;
  const title = `${post.title} | PubThrive Blog`;
  const description = post.excerpt ?? "";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "PubThrive",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : [`${url}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : [`${url}/twitter-image`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <main className={styles.postPage}>
      <Container>
        <header className={styles.headerWrap}>
          <Link href="/blog" className={styles.backLink}>
            ← All posts
          </Link>

          <h1 className={styles.title}>{post.title}</h1>

          <div className={`${styles.meta} `}>
            {/* 👇 Date */}
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            {" 🕑 "}
            {/* 👇 Read time */}
            <span>{post.readTime} min read </span>
            {/* 👇 Author */}
            {post.author && (
              <>
                <span className={styles.dot}>•</span>
                <div className={styles.authorMeta}>
                  <span>{post.author.name}</span>
                </div>
              </>
            )}
          </div>
        </header>

        {/* 👇 Cover image */}
        {post.coverImage && (
          <div className={styles.coverImage}>
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={600}
              className={styles.image}
              priority
            />
          </div>
        )}

        <article className={styles.content}>
          <MdxRenderer source={post.content} />
        </article>
      </Container>
    </main>
  );
}
