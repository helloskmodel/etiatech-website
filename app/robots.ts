import type { MetadataRoute } from "next";

const SITE = "https://www.etiatech.com";

// This is the OVERSEAS deployment (Vercel). China search engines are served
// by the separate domestic site, so their crawlers are blocked here: crawling
// this site earns nothing on Baidu (no ICP, overseas host), burns Vercel
// bandwidth/function quota, and its zh pages would compete with the domestic
// site's Baidu rankings. Google/Bing and everything else stay fully allowed.
// Note: robots.txt only stops compliant bots — scrapers faking these UAs need
// WAF rules in the Vercel dashboard instead.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Baiduspider", disallow: "/" },
      { userAgent: "Sogou web spider", disallow: "/" },
      { userAgent: "360Spider", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
