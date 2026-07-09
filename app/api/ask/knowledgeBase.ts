import "server-only";
import { products, type Product } from "@/components/productCatalog";
import { apps, type App } from "@/components/applicationNotes";
import { caseStudiesCn, type CaseCn } from "@/data/caseStudiesCn";
import { marketProducts } from "@/components/markets";

// ─────────────────────────────────────────────────────────────────────────
// Digital Mark Tang knowledge base.
//
// Assembles the real, authoritative ETIA data — the full Excelitas product
// catalog, all 62 application notes, and the customer case studies — into a
// single grounded text block. This is the ONLY source of product facts the AI
// engineer is allowed to state: it must never invent specs, model numbers, or
// performance figures beyond what appears here.
//
// The block is built once at module load and reused across requests. In the
// API route it is sent as a cache-controlled system block so repeat requests
// hit the prompt cache instead of re-billing the full knowledge base.
// ─────────────────────────────────────────────────────────────────────────

const SITE = "https://www.etiatech.com";

// Slugs ETIA Thailand is the authorized, in-stock distributor for. Everything
// else in the catalog is real and can be discussed, but must be routed to the
// Thailand sales director to source rather than presented as stocked.
const TH_STOCK = new Set(marketProducts("th").map((p) => p.slug));

function productBlock(p: Product): string {
  const stock = TH_STOCK.has(p.slug)
    ? "Thailand availability: IN STOCK — ETIA Thailand is the authorized OmniCure distributor for this product."
    : "Thailand availability: NOT stocked locally — available on request via ETIA Thailand sourcing.";
  const specs = p.specs.map(([k, v]) => `    - ${k}: ${v}`).join("\n");
  const features = p.features.map((f) => `    - ${f}`).join("\n");
  return [
    `### ${p.name}`,
    `Brand: ${p.brand} | Technology: ${p.tech}${p.sub ? ` (${p.sub})` : ""}`,
    stock,
    `Overview: ${p.intro}`,
    "Key features:",
    features,
    "Specifications:",
    specs,
    `Product page: ${SITE}/product/${p.slug}`,
  ].join("\n");
}

function appBlock(a: App): string {
  const highlights = a.highlights.map((h) => `    - ${h}`).join("\n");
  return [
    `### [${a.id}] ${a.title}`,
    `Industry: ${a.industry} | Sub-category: ${a.subCategory}`,
    `Challenge: ${a.challenge}`,
    `Solution: ${a.solution}`,
    `Benefit: ${a.benefit}`,
    "Highlights:",
    highlights,
    `Recommended system: ${a.recommended}`,
  ].join("\n");
}

function caseBlock(c: CaseCn): string {
  const list = (l?: { en: string[] }) => (l?.en?.length ? l.en.map((x) => `    - ${x}`).join("\n") : "");
  return [
    `### [${c.id}] ${c.title.en}`,
    `Industry: ${c.industry.en} | Product: ${c.product} | Tech: ${c.techRoute.en}`,
    c.scene?.en ? `Scene: ${c.scene.en}` : "",
    c.overview?.en?.length ? `Overview:\n${list(c.overview)}` : "",
    c.challenge?.en?.length ? `Challenge:\n${list(c.challenge)}` : "",
    c.solution?.en?.length ? `Solution:\n${list(c.solution)}` : "",
    c.benefits?.en?.length ? `Benefits:\n${list(c.benefits)}` : "",
    c.engineerTip?.en ? `Engineer tip: ${c.engineerTip.en}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function build(): string {
  const productSection = products.map(productBlock).join("\n\n");
  const appSection = apps.map(appBlock).join("\n\n");
  const caseSection = caseStudiesCn.map(caseBlock).join("\n\n");

  return [
    "# ETIA / OmniCure UV Curing Knowledge Base",
    "",
    "All product facts, specifications and figures you state MUST come from this",
    "knowledge base. Do not invent or estimate specifications, model numbers, or",
    "performance figures. If something is not covered here, say so and offer to",
    "connect the customer with an ETIA engineer.",
    "",
    "## Products (Excelitas / OmniCure catalog)",
    "",
    productSection,
    "",
    "## Application Notes (62 validated industry applications)",
    "",
    appSection,
    "",
    "## Customer Case Studies",
    "",
    caseSection,
  ].join("\n");
}

// Built once, reused for every request.
export const KNOWLEDGE_BASE = build();
