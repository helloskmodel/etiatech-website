// Site-search checks: run against a built server (npm run build && npm start),
// then `npm run validate:search` (SEO_BASE_URL overrides http://localhost:3000).
//
// WHY THIS EXISTS
// The search box is only as good as the index behind it, and the index is
// assembled from eight different data modules. Nothing in the type system
// notices when one of them stops contributing — a renamed export, a data file
// that moves, a `published` flag — and the box keeps working, just quietly
// missing a whole category. The same is true of ranking: "lx500" must return
// the LX500, not a spec guide that merely mentions it.
//
// So this asserts on outcomes a visitor would notice:
//   1. every locale's index is served and covers every kind of content
//   2. the queries Search Console shows people actually typing return the
//      right page FIRST
//   3. a part number typed loosely (spaces, no dashes, digits only) still finds
//      its part
//   4. every href in the index resolves — a hit that 404s is worse than no hit

const BASE = process.env.SEO_BASE_URL || "http://localhost:3000";
const LOCALES = ["en", "zh", "vi", "th"];
const CONCURRENCY = 8;

const errors = [];
const err = (m) => errors.push(m);

// Reuse the app's own ranking so this tests what ships, not a copy of it.
// Node strips the types (the npm script passes --experimental-strip-types), so
// there is one implementation, not a test-only duplicate that can drift.
const { searchDocs } = await import("../components/siteSearch.ts");

/** Query → the href its top hit must have. Drawn from real Search Console queries. */
const MUST_RANK_FIRST = [
  ["lx500", "/product/systems/lx500"],
  ["LX500", "/product/systems/lx500"],
  ["ac9225-f", "/product/systems/ac9225-f"],
  ["ac9225 f", "/product/systems/ac9225-f"],
  ["s2000 elite", "/product/omnicure/s2000"],
  ["r2000", "/product/systems/r2000"],
  // Part numbers, typed the three ways a label gets read.
  ["012-68000R", "/inquiry"],
  ["012 68000 R", "/inquiry"],
  ["68000", "/inquiry"],
];

/** Query → a kind that must appear somewhere in the results. */
const MUST_FIND_KIND = [
  ["catheter", "application"],
  ["consumables", "consumable"],
  ["contact", "page"],
];

const indexes = {};
for (const locale of LOCALES) {
  const r = await fetch(`${BASE}/search-index/${locale}`);
  if (r.status !== 200) {
    err(`/search-index/${locale} returned ${r.status}`);
    continue;
  }
  if (!/json/.test(r.headers.get("content-type") || "")) err(`/search-index/${locale} is not JSON`);
  if (!/noindex/.test(r.headers.get("x-robots-tag") || "")) {
    err(`/search-index/${locale} is missing its noindex header`);
  }
  const docs = await r.json();
  indexes[locale] = docs;

  // 1. every kind present
  const kinds = new Set(docs.map((d) => d.k));
  for (const k of ["product", "part", "application", "insight", "technology", "industry", "consumable", "page"]) {
    if (!kinds.has(k)) err(`${locale}: index has no "${k}" entries — a data source stopped contributing`);
  }
  for (const d of docs) {
    if (!d.t || !d.h) err(`${locale}: entry with no title or href: ${JSON.stringify(d).slice(0, 80)}`);
  }
}

// 2 + 3. ranking, against the English index (models and part numbers are not
// translated, so the expectations hold in every locale).
const en = indexes.en || [];
for (const [query, href] of MUST_RANK_FIRST) {
  const hits = searchDocs(en, query, 5);
  if (hits.length === 0) err(`"${query}" returns nothing`);
  else if (hits[0].h !== href) {
    err(`"${query}" → top hit is ${hits[0].h} ("${hits[0].t}"), expected ${href}`);
  }
}
for (const [query, kind] of MUST_FIND_KIND) {
  const hits = searchDocs(en, query, 12);
  if (!hits.some((h) => h.k === kind)) err(`"${query}" returns no ${kind} result`);
}

// 4. every distinct href resolves.
const hrefs = [...new Set(en.map((d) => d.h))];
for (let i = 0; i < hrefs.length; i += CONCURRENCY) {
  await Promise.all(
    hrefs.slice(i, i + CONCURRENCY).map(async (h) => {
      const r = await fetch(`${BASE}${h}`, { method: "HEAD", redirect: "manual" });
      if (r.status !== 200) err(`search result href ${h} returned ${r.status}`);
    })
  );
}

console.log(`index entries per locale: ${en.length}`);
console.log(`distinct destinations: ${hrefs.length}`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):`);
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log("\n✓ search index complete, ranked correctly, every destination live");
