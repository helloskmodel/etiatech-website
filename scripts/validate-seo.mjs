// SEO validation: run against a built server (npm run build && npm start),
// then `npm run validate:seo` (SEO_BASE_URL overrides http://localhost:3000).
//
// Checks:
//   1. sitemap.xml returns 200 with an XML content type and valid structure
//   2. every sitemap URL returns HTTP 200 (no redirects), exactly once
//   3. every page has a self-referencing canonical (locale pages never
//      canonicalize to the English page)
//   4. no page is noindex
//   5. page-level hreflang groups are reciprocal and identical across members
//   6. no production page contains "LX500 V2" (case-insensitive)
//   7. no staging/preview/off-site URL appears in the sitemap

const BASE = process.env.SEO_BASE_URL || "http://localhost:3000";
const SITE = "https://www.etiatech.com";
const CONCURRENCY = 8;

const errors = [];
const err = (msg) => errors.push(msg);

function toLocal(url) {
  return url.replace(SITE, BASE);
}

const res = await fetch(`${BASE}/sitemap.xml`, { redirect: "manual" });
if (res.status !== 200) err(`sitemap.xml returned ${res.status}`);
const ctype = res.headers.get("content-type") || "";
if (!/xml/.test(ctype)) err(`sitemap.xml content-type is "${ctype}", expected XML`);
const xml = await res.text();
if (!xml.trimStart().startsWith("<?xml") || !xml.includes("<urlset")) err("sitemap.xml is not a valid XML urlset");

const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length === 0) err("sitemap contains no URLs");

// 7. only canonical-host production URLs
for (const u of locs) {
  if (!u.startsWith(`${SITE}/`) && u !== SITE) err(`non-production URL in sitemap: ${u}`);
}

// 2. duplicates
const dupes = locs.filter((u, i) => locs.indexOf(u) !== i);
for (const d of new Set(dupes)) err(`duplicate sitemap URL: ${d}`);

// Crawl every URL.
const pages = new Map(); // url -> { canonical, hreflang: Map(lang -> href), noindex, hasV2 }
async function crawl(url) {
  const r = await fetch(toLocal(url), { redirect: "manual" });
  if (r.status !== 200) {
    err(`${url} returned ${r.status}${r.headers.get("location") ? ` → ${r.headers.get("location")}` : ""}`);
    return;
  }
  const html = await r.text();
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const hreflang = new Map(
    [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map((m) => [m[1], m[2]])
  );
  const noindex = /<meta[^>]+name="robots"[^>]+noindex/i.test(html);
  const hasV2 = /lx500\s*v2/i.test(html);
  pages.set(url, { canonical, hreflang, noindex, hasV2 });
}

for (let i = 0; i < locs.length; i += CONCURRENCY) {
  await Promise.all(locs.slice(i, i + CONCURRENCY).map(crawl));
}

for (const [url, p] of pages) {
  // 3. self-canonical (locale pages must keep their prefix)
  if (!p.canonical) err(`${url}: missing canonical`);
  else if (p.canonical !== url) err(`${url}: canonical points to ${p.canonical}`);
  // 4. noindex
  if (p.noindex) err(`${url}: noindex page in sitemap`);
  // 6. legacy product name
  if (p.hasV2) err(`${url}: contains "LX500 V2"`);
  // 5. hreflang reciprocity — every alternate that is itself in the sitemap
  // must declare the exact same group.
  if (p.hreflang.size > 0) {
    if (![...p.hreflang.values()].includes(url)) err(`${url}: hreflang group does not include the page itself`);
    for (const href of p.hreflang.values()) {
      const other = pages.get(href);
      if (!other) {
        err(`${url}: hreflang target not in sitemap: ${href}`);
        continue;
      }
      const a = [...p.hreflang.entries()].sort().map(String).join("|");
      const b = [...other.hreflang.entries()].sort().map(String).join("|");
      if (a !== b) err(`${url}: hreflang group differs from ${href}`);
    }
  }
}

// Summary
const byLang = { en: 0, zh: 0, vi: 0, th: 0 };
for (const u of locs) {
  const m = u.replace(SITE, "").match(/^\/(zh|vi|th)(\/|$)/);
  byLang[m ? m[1] : "en"]++;
}
const type = (u) => {
  const p = u.replace(SITE, "");
  if (/\/applications\//.test(p)) return "application detail";
  if (/\/case-studies\//.test(p)) return "case study detail";
  if (/\/insights\//.test(p)) return "insight article";
  if (/\/product\/systems\//.test(p)) return "product detail";
  if (/\/product\//.test(p) || /omnicure|lx500|s2000/.test(p)) return "product/brand/landing";
  if (/privacy|cookies|terms/.test(p)) return "legal";
  if (p === "" || /^\/(zh|vi|th)$/.test(p)) return "home";
  return "index/other";
};
const byType = {};
for (const u of locs) byType[type(u)] = (byType[type(u)] || 0) + 1;

console.log(`sitemap URLs: ${locs.length}`);
console.log("by language:", JSON.stringify(byLang));
console.log("by type:", JSON.stringify(byType, null, 0));
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):`);
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log("\n✓ all SEO checks passed");
