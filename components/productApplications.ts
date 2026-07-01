// Data-driven links between the product catalog and the 62 application notes.
// Rather than hand-maintaining a product→application table, we detect which
// application notes recommend a given product by matching the product's model
// token against each note's `product` / `recommended` text. This keeps the
// "typical applications" tags on product pages and the "recommended system"
// links on the Application page in sync automatically as data changes.
import { products, type Product } from "./productCatalog";
import { apps, type App } from "./applicationNotes";

// [slug, matcher] ordered by priority: primary systems first, accessories last.
// productForAppNote() returns the FIRST match, so a note recommending a combo
// (e.g. "S2000 Elite + R2000") resolves to its main system, not the accessory.
const PRODUCT_MATCHERS: [string, RegExp][] = [
  ["s2000-elite", /S2000 Elite/i],
  ["s1500-pro", /S1500/i],
  ["lx500", /LX500/i],
  ["ac2", /AC2\b/i],
  ["ac4", /AC4\b/i],
  ["ac5", /AC5\b/i],
  ["ac7", /AC7\b/i],
  ["ac8-hd", /AC8-?HD/i],
  ["ac8", /AC8(?!-?HD)/i],
  ["ac9225-f", /AC922|Fiber Draw Tower/i],
  ["v3-led-heads", /\bV3\b/i],
  ["ls200", /LS200/i],
  ["r2000", /R2000/i],
];

function matchText(a: App): string {
  return `${a.product} ${a.recommended}`;
}

// Application notes that recommend the given product (may be empty).
export function appNotesForProduct(p: Product): App[] {
  const entry = PRODUCT_MATCHERS.find(([slug]) => slug === p.slug);
  if (!entry) return [];
  const re = entry[1];
  return apps.filter((a) => re.test(matchText(a)));
}

// Unique industries served by a product, derived from its application notes.
export function industriesForProduct(p: Product): string[] {
  return [...new Set(appNotesForProduct(p).map((a) => a.industry))];
}

// The primary product recommended by an application note (for the reverse link
// from the Application page back to a product detail page).
export function productForAppNote(a: App): Product | undefined {
  const text = matchText(a);
  for (const [slug, re] of PRODUCT_MATCHERS) {
    if (re.test(text)) return products.find((p) => p.slug === slug);
  }
  return undefined;
}
