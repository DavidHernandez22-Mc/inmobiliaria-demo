import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 800, 1200, 1800],
    imageSizes: [240],
    qualities: [72],
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
