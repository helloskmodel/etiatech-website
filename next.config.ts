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
  // Permanent redirects (308 — treated as a permanent redirect by Google,
  // like 301) for old indexed URLs from the previous site so they don't 404.
  // Order matters: the first matching rule wins, so the /en/:path* catch-all
  // must come last.
  async redirects() {
    return [
      { source: "/en/contact", destination: "/contact", permanent: true },
      { source: "/en/applications", destination: "/application", permanent: true },
      // Any old product URL (incl. /en/products/uv-lamps, /en/products/microwave)
      { source: "/en/products/:path*", destination: "/product", permanent: true },
      { source: "/en/products", destination: "/product", permanent: true },
      // Everything else under /en → home
      { source: "/en/:path*", destination: "/", permanent: true },
      { source: "/en", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
