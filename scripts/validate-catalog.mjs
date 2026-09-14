// Catalog coverage check: `npm run validate:catalog`. Pure static analysis —
// no build and no running server needed.
//
// WHY THIS EXISTS
// The OmniCure brand page groups its products with a hand-written
// `categoryBySlug` map (accessories are placed beside the machine they serve,
// which techRouteFor() can't express — it returns undefined for anything that
// doesn't cure). The grouping is a lookup:
//
//     allProducts.filter((p) => categoryBySlug[p.slug] === route.id)
//
// A product missing from the map yields `undefined`, which never equals a route
// id, so its card is silently DROPPED — the page renders fine and nobody
// notices. That is exactly how "OmniCure S2000 Elite Optical Bandpass Filters"
// disappeared from /product/omnicure while still showing on /product.
//
// Checks:
//   1. every OmniCure product has a categoryBySlug entry
//   2. no categoryBySlug entry points at a slug the catalog no longer has
//   3. every Phoseon product is referenced somewhere on its brand page
//   4. no duplicate product slugs in the catalog

import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const errors = [];
const err = (msg) => errors.push(msg);

// ── Catalog: slug → brandId. The product objects don't list their fields in a
// fixed order, so walk back from each brandId line to the nearest slug line.
const lines = read("components/productCatalog.ts").split("\n");
const products = [];
lines.forEach((line, i) => {
  const brand = line.match(/brandId:\s*"([a-z]+)"/);
  if (!brand) return;
  for (let j = i; j >= 0; j--) {
    const slug = lines[j].match(/^\s*slug:\s*"([^"]+)",/);
    if (slug) {
      products.push({ slug: slug[1], brandId: brand[1] });
      return;
    }
  }
});

if (products.length === 0) err("no products parsed from productCatalog.ts");

const seen = new Set();
for (const { slug } of products) {
  if (seen.has(slug)) err(`duplicate product slug in catalog: ${slug}`);
  seen.add(slug);
}

const byBrand = (id) => products.filter((p) => p.brandId === id).map((p) => p.slug);

// ── 1 + 2: the OmniCure brand page's grouping map.
const landing = read("components/OmniCureBrandLanding.tsx");
const mapBlock = landing.slice(landing.indexOf("const categoryBySlug"), landing.indexOf("const routes"));
const mapped = new Set([...mapBlock.matchAll(/^\s*"?([a-z0-9-]+)"?:\s*"/gm)].map((m) => m[1]));

const omnicure = byBrand("omnicure");
for (const slug of omnicure) {
  if (!mapped.has(slug)) {
    err(`OmniCure product "${slug}" is missing from categoryBySlug — its card will not render on /product/omnicure`);
  }
}
for (const slug of mapped) {
  if (!seen.has(slug)) err(`categoryBySlug maps "${slug}", which is not a product in the catalog`);
}

// ── 3: the Phoseon page picks its products by explicit slug.
const phoseonPage = read("components/PhoseonBrandLanding.tsx");
for (const slug of byBrand("phoseon")) {
  if (!phoseonPage.includes(`"${slug}"`)) {
    err(`Phoseon product "${slug}" is not referenced on PhoseonBrandLanding — it will not appear on /product/phoseon`);
  }
}

const counts = {};
for (const p of products) counts[p.brandId] = (counts[p.brandId] || 0) + 1;

console.log(`catalog products: ${products.length}`);
console.log("by brand:", JSON.stringify(counts));
console.log(`OmniCure products grouped on the brand page: ${omnicure.filter((s) => mapped.has(s)).length}/${omnicure.length}`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):`);
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log("\n✓ every product reaches its brand page");
