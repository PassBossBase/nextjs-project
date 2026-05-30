import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /* config options here */
  // 隐藏左下角的浮动窗
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lovable-mastiff-475.convex.cloud",
        pathname: "/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "**", // 允许所有 https 域名
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;
