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
    domains: ["localhost", "pubthrive.com"], // add any image domains you need
  },
};

export default withMDX(nextConfig);
