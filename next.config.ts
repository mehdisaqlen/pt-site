import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/, // allow .mdx files
});

const nextConfig: NextConfig = {
  // you can add other config options here
  pageExtensions: ["ts", "tsx", "mdx"], // include mdx pages
  reactStrictMode: true,
  images: {
    domains: ["localhost", "pubthrive.com"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pubthrive.com" },
    ],
  },
};

export default withMDX(nextConfig);
