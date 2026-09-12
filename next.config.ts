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
  // Baseline browser hardening. Vercel already sends HSTS; these stop MIME
  // sniffing, framing by other sites, referrer leakage of full URLs, and
  // browser features the site never uses. A Content-Security-Policy is not
  // set here: GTM/GA and inline Next styles need a nonce-based policy, which
  // belongs in proxy.ts when it is introduced.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  // Pretty URL for the static self-contained troubleshooter tool in
  // public/tools/ (it fetches its data JSON from the same directory).
  async rewrites() {
    return [{ source: "/tools/troubleshooter", destination: "/tools/troubleshooter.html" }];
  },
  // Permanent redirects (308 — treated as a permanent redirect by Google,
  // like 301) for old indexed URLs from the previous site so they don't 404.
  // Order matters: the first matching rule wins, so the /en/:path* catch-all
  // must come last.
  async redirects() {
    return [
      // Thailand /th/{th,en,zh} language microsite retired — redirect its old
      // indexed URLs to the (English) main site so they don't 404.
      // The single "S Series Light Guides & Adapters" catalogue entry is now six
      // products, one per accessory. Its URL points at the shelf that holds
      // them all rather than at whichever one we picked.
      {
        source: "/product/systems/s-series-light-guides",
        destination: "/product/technology/mercury-uv-lamp#s-series-accessories-replacement-lamps",
        permanent: true,
      },
      // The analytical OEM lamp line (FiberLight, deuterium, PID, hollow
      // cathode) is discontinued; its indexed pages go to the brand shelf.
      ...["fiberlight-d2", "pid-lamps", "deuterium-lamps", "fiberlight-l3", "hollow-cathode-lamps"].map((slug) => ({
        source: `/product/systems/${slug}`,
        destination: "/product/noblelight",
        permanent: true,
      })),
      { source: "/product/technology/analytical-light-sources", destination: "/product", permanent: true },
      { source: "/th/th/:path*", destination: "/", permanent: true },
      { source: "/th/en/:path*", destination: "/", permanent: true },
      { source: "/th/zh/:path*", destination: "/", permanent: true },
      // OmniCure country SEM landing pages retired: their bare standalone
      // quote-form design is replaced by the proper OmniCure product page
      // (full catalogue + site chrome), which the client considers the better
      // face for "OmniCure Thailand/Vietnam" searches. Exact matches only, so
      // the /th/omnicure-s2000, /th/omnicure-lx500, /th/omnicure-s2000-lamp
      // product pages are untouched. Permanent (308) — the client has confirmed
      // the retirement is final, so pass the old URLs' ranking equity to the
      // product pages; English landing → English product page, localized
      // landing → same-language product page.
      { source: "/omnicure-thailand", destination: "/product/omnicure", permanent: true },
      { source: "/th/omnicure", destination: "/th/product/omnicure", permanent: true },
      { source: "/omnicure-vietnam", destination: "/product/omnicure", permanent: true },
      { source: "/vi/omnicure", destination: "/vi/product/omnicure", permanent: true },
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
      // The short-lived /industries section was retired (its images duplicated
      // the application notes and confused visitors) — send any indexed URLs
      // to the applications index, its closest equivalent.
      { source: "/industries", destination: "/applications", permanent: true },
      // Industry solution pages live at /solutions/[slug]; the bare index is
      // the applications page, which lists all five industries.
      { source: "/solutions", destination: "/applications", permanent: true },
      // Renamed case study. Google still serves the old URL — 533 impressions
      // in the last quarter, every one of them landing on a 404 — so send it
      // to the study that now carries the same subject.
      {
        source: "/case-studies/optical-fiber-draw-tower",
        destination: "/case-studies/omnicure-ac-large-optical-fiber-coating",
        permanent: true,
      },
      { source: "/industries/:path*", destination: "/applications", permanent: true },
      { source: "/omnicure-s2000-lamp", destination: "/product/omnicure/s2000-lamp", permanent: true },
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
