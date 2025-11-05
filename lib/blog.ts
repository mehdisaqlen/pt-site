import fs from "fs";
import path from "path";
import matter from "gray-matter";

function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
  featured?: boolean;
  priority?: number;
  draft?: boolean;
  author?: { name: string; avatar?: string }; // optional but never null
  category?: string;
  tags?: string[];
};

export type BlogMeta = BlogFrontmatter & {
  slug: string;
  readTime: number;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  readTime: number;
};

const contentDir = path.join(process.cwd(), "content");

// ✅ Helper: safely normalize author data
function parseAuthor(data: any): { name: string; avatar?: string } | undefined {
  if (!data.author) return undefined;
  if (typeof data.author === "string") {
    return { name: data.author };
  }
  if (typeof data.author === "object") {
    return {
      name: data.author.name ?? "",
      avatar: data.author.avatar ?? "",
    };
  }
  return undefined;
}

export function getAllPostsMeta(): BlogMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf8");
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.mdx$/, "");

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      coverImage: data.coverImage ?? "",
      featured: data.featured ?? false,
      priority: data.priority ?? 0,
      draft: data.draft ?? false,
      author: parseAuthor(data), // ✅ now always undefined or object
      category: data.category ?? undefined,
      tags: data.tags ?? [],
      readTime: calculateReadTime(content),
    } satisfies BlogMeta; // ✅ ensures type-safety
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    coverImage: data.coverImage ?? "",
    featured: data.featured ?? false,
    priority: data.priority ?? 0,
    draft: data.draft ?? false,
    author: parseAuthor(data),
    category: data.category ?? undefined,
    tags: data.tags ?? [],
    content,
    readTime: calculateReadTime(content),
  };
}

export function getPaginatedPosts(limit = 6, offset = 0) {
  const all = getAllPostsMeta();
  return all.slice(offset, offset + limit);
}
