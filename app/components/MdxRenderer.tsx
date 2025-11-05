import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import React from "react";

// Example component usable directly inside .mdx as <MyNote>...</MyNote>
function MyNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "12px",
        borderLeft: "3px solid #0040ff",
        background: "#f6f8ff",
      }}
    >
      {children}
    </div>
  );
}

export default function MdxRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ],
        },
      }}
      components={{ MyNote }}
    />
  );
}
