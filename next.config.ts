import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      // {
      //   protocol: "https",
      //   hostname: "**", // 允许所有 https 域名
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;
