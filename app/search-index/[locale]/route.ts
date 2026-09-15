// The site-search index, built once per locale at `next build` and served as a
// static JSON file.
//
// WHY A ROUTE HANDLER AND NOT A MODULE
// The index has to cover the Insight articles, which live as Markdown on disk
// and are read with `fs` — a client component cannot do that. Building the
// index here lets it import the same typed data every page already uses, while
// `dynamic = "force-static"` makes Next prerender the response at build time,
// so it ships as a plain static file with no server work per request.
//
// WHY PER LOCALE
// One combined file would make a Thai visitor download the Chinese and
// Vietnamese titles too. A locale in the path keeps each download to what that
// visitor can actually read.
//
// The client fetches this lazily, on the first interaction with the search box,
// so the home page's initial payload is unaffected.

import { products, productHref, localizeProduct } from "@/components/productCatalog";
import { parts } from "@/components/omnicureParts";
import { consumableMachines } from "@/components/consumables";
import { consumablesHref } from "@/components/consumables";
import { publishedProductCategories, productCategoryHref } from "@/components/productCategories";
import { publishedIndustries, industryHref, isPublishedApplication } from "@/components/industrySolutions";
import { getArticleCards } from "@/components/insights";
import { applicationsData } from "@/data/applicationsData";
import { applicationsZh } from "@/data/applicationsData.zh";
import skuMaster from "@/data/skuMaster.json";
import type { Locale } from "@/components/LocaleContext";

export const dynamic = "force-static";

export function generateStaticParams() {
  return ["en", "zh", "vi", "th"].map((locale) => ({ locale }));
}

/** One searchable thing. Keys are short because this ships to the browser. */
type Doc = {
  /** kind — drives the group heading and the icon */
  k: "product" | "part" | "application" | "insight" | "technology" | "industry" | "consumable" | "page";
  /** title, already in this file's locale */
  t: string;
  /** supporting line: brand, family, part number… */
  s?: string;
  /** href, without a locale prefix — the client adds one */
  h: string;
  /** extra text that should match but is not displayed (part numbers, aliases) */
  x?: string;
};

type LangText = { en: string; zh?: string; vi?: string; th?: string };
const pick = (v: LangText, l: Locale) => v[l] ?? v.en;

function buildIndex(locale: Locale): Doc[] {
  const docs: Doc[] = [];

  // ── Products. The catalogue is the thing most searches are aiming at, and
  //    people type the model alone ("lx500", "ac9225-f"), so the model is
  //    carried in `x` as well as inside the full name.
  for (const p of products) {
    const lp = localizeProduct(p, locale);
    docs.push({
      k: "product",
      t: lp.name,
      s: [p.brand, lp.sub ?? lp.tech].filter(Boolean).join(" · "),
      h: productHref(p),
      x: `${p.slug} ${p.name}`,
    });
  }

  // ── Part numbers. Someone holding a lamp types the digits off the label and
  //    nothing else; the inquiry page is where a part number becomes an action.
  const seenPn = new Set<string>();
  for (const part of parts) {
    seenPn.add(part.pn);
    docs.push({ k: "part", t: part.pn, s: part.desc, h: "/inquiry", x: part.desc });
  }
  // The wider SKU master carries the brands `omnicureParts` does not cover
  // (Noblelight, Fusion UV). Descriptions there are Chinese, so the part number
  // leads and the description supports it.
  const skuItems = (skuMaster as { items?: { pn?: string; sku?: string; name?: string }[] }).items ?? [];
  for (const item of skuItems) {
    const pn = item.pn || item.sku;
    if (!pn || seenPn.has(pn)) continue;
    seenPn.add(pn);
    docs.push({ k: "part", t: pn, s: item.name, h: "/inquiry", x: item.name });
  }

  // ── Consumables, one page per machine: the "what do I reorder" route.
  for (const m of consumableMachines) {
    docs.push({
      k: "consumable",
      t: `${m.name} — ${pick(m.tech, locale)}`,
      s: m.brand,
      h: consumablesHref(m.slug),
      x: `${m.slug} consumables spare parts`,
    });
  }

  // ── Technology and industry hubs.
  for (const c of publishedProductCategories) {
    docs.push({ k: "technology", t: pick(c.name, locale), h: productCategoryHref(c.slug), x: c.slug });
  }
  for (const i of publishedIndustries) {
    docs.push({ k: "industry", t: pick(i.name, locale), h: industryHref(i.slug), x: i.slug });
  }

  // ── Application notes — only the published ones, the same rule the
  //    /applications page and the sitemap follow.
  for (const a of applicationsData as { slug: string; title: string; published?: boolean }[]) {
    if (a.published === false || !isPublishedApplication(a.slug)) continue;
    // Titles for zh/th/vi live in the parallel localized file; fall back to the
    // English title when a locale has not been translated yet.
    const localized = locale === "en" ? undefined : applicationsZh[a.slug]?.title?.[locale];
    docs.push({
      k: "application",
      t: localized || a.title,
      // The English title stays searchable in every locale — engineers type
      // "catheter bonding" whatever language the page is in.
      x: `${a.slug} ${a.title}`,
      h: `/applications/${a.slug}`,
    });
  }

  // ── Insight articles, in whichever locales each one exists.
  for (const card of getArticleCards()) {
    const c = card.locales[locale] ?? card.locales.en;
    if (!c) continue;
    docs.push({ k: "insight", t: c.title, s: card.tags?.join(" · '"), h: `/insights/${card.slug}`, x: card.slug });
  }

  // ── The handful of pages people look for by name.
  const PAGES: { t: LangText; h: string }[] = [
    { t: { en: "Products", zh: "产品中心", vi: "Sản phẩm", th: "ผลิตภัณฑ์" }, h: "/product" },
    { t: { en: "Applications", zh: "应用", vi: "Ứng dụng", th: "การใช้งาน" }, h: "/applications" },
    { t: { en: "Consumables & Spare Parts", zh: "耗材与备件", vi: "Vật tư tiêu hao & phụ tùng", th: "วัสดุสิ้นเปลืองและอะไหล่" }, h: "/consumables" },
    { t: { en: "Insights", zh: "技术洞察", vi: "Kiến thức", th: "ความรู้" }, h: "/insights" },
    { t: { en: "Request a Quote", zh: "询价", vi: "Yêu cầu báo giá", th: "ขอใบเสนอราคา" }, h: "/inquiry" },
    { t: { en: "Contact", zh: "联系我们", vi: "Liên hệ", th: "ติดต่อเรา" }, h: "/contact" },
    { t: { en: "About ETIA", zh: "关于 ETIA", vi: "Về ETIA", th: "เกี่ยวกับ ETIA" }, h: "/about" },
  ];
  for (const p of PAGES) docs.push({ k: "page", t: pick(p.t, locale), h: p.h });

  return docs;
}

export async function GET(_request: Request, ctx: { params: Promise<{ locale: string }> }) {
  const { locale } = await ctx.params;
  const loc = (["en", "zh", "vi", "th"] as const).includes(locale as Locale) ? (locale as Locale) : "en";
  return Response.json(buildIndex(loc), {
    headers: {
      // Data for the search box, not a page. Keep it out of the index.
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
