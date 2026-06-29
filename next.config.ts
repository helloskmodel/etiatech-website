import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "etiatech-1303055923.cos.ap-singapore.myqcloud.com",
      },
    ],
  },
};

export default nextConfig;
