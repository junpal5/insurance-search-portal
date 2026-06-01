import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/insurance-search-portal",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
