const SITE = "https://pubthrive.com";
const BRAND = "PubThrive";
const LOGO = `${SITE}/logo.png`; // update path
const OGIMG = `${SITE}/og.jpg`; // update path

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE,
    name: BRAND,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/search?q={query}`,
      "query-input": "required name=query",
    },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: SITE,
    name: BRAND,
    logo: LOGO,
    sameAs: [
      "https://www.linkedin.com/company/pubthrive", // edit as needed
      "https://x.com/pubthrive", // optional
    ],
  };
}

export function breadcrumbsLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

type Post = {
  slug: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  author: { name: string; url?: string } | { name: string; url?: string }[];
  datePublished: string; // ISO
  dateModified?: string; // ISO
  readingTimeMinutes?: number;
};

export function blogPostingLd(p: Post) {
  const url = `${SITE}/blog/${p.slug}`;
  const authors = Array.isArray(p.author) ? p.author : [p.author];

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: p.title,
    description: p.description || "",
    image: p.coverImage ? [p.coverImage] : [OGIMG],
    author: authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      url: a.url,
    })),
    publisher: {
      "@type": "Organization",
      name: BRAND,
      logo: { "@type": "ImageObject", url: LOGO },
    },
    datePublished: p.datePublished,
    dateModified: p.dateModified || p.datePublished,
    keywords: (p.tags || []).join(", "),
    url,
    wordCount: undefined,
    timeRequired: p.readingTimeMinutes
      ? `PT${Math.max(1, Math.round(p.readingTimeMinutes))}M`
      : undefined,
  };
}
