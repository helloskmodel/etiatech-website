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
      // Thailand /th/{th,en,zh} language microsite retired — redirect its old
      // indexed URLs to the (English) main site so they don't 404. The
      // /th/omnicure* SEM landing pages are NOT matched by these rules and stay.
      { source: "/th/th/:path*", destination: "/", permanent: true },
      { source: "/th/en/:path*", destination: "/", permanent: true },
      { source: "/th/zh/:path*", destination: "/", permanent: true },
      // NOTE: no `/th → /` rule — /th is the live Thai SEO home; redirecting it
      // would shadow that page (and put a redirect in the sitemap).
      // Country-code aliases people type or link by hand: the real locale
      // routes use ISO 639-1 language codes (/zh, /vi), so alias the common
      // country-code spellings to them instead of 404ing.
      { source: "/cn", destination: "/zh", permanent: true },
      { source: "/cn/:path*", destination: "/zh/:path*", permanent: true },
      { source: "/ch", destination: "/zh", permanent: true },
      { source: "/ch/:path*", destination: "/zh/:path*", permanent: true },
      { source: "/vn", destination: "/vi", permanent: true },
      { source: "/vn/:path*", destination: "/vi/:path*", permanent: true },
      { source: "/en/contact", destination: "/contact", permanent: true },
      { source: "/en/applications", destination: "/applications", permanent: true },
      { source: "/application", destination: "/applications", permanent: true },
      { source: "/application/:path*", destination: "/applications", permanent: true },
      { source: "/omnicure-s2000-lamp", destination: "/product/omnicure/s2000-lamp", permanent: true },
      { source: "/product", destination: "/product/omnicure", permanent: true },
      { source: "/product/systems", destination: "/product/omnicure", permanent: true },
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
