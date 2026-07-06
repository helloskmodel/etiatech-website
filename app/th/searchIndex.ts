import "server-only";
import { marketProducts, marketApps, marketCases } from "@/components/markets";
import { appSlug, localizeApp } from "@/components/applicationNotes";
import { localizeCase } from "@/components/caseStudies";
import { productContentTh } from "./productContentTh";
import type { ThLocale } from "./dictionaries";

// Client-side search index for the Thailand microsite. Built on the server from
// the market-scoped products, applications and case studies, plus the official
// part numbers so a customer can search by code (e.g. 012-64000R). The result
// is a small flat array shipped to the nav's client search component.

export type SearchEntry = {
  type: "product" | "application" | "case";
  title: string;
  subtitle: string;
  href: string;
  key: string; // lowercased haystack: title + models + part numbers + keywords
};

// Authoritative part numbers per product (from the OmniCure brochures).
const PART_NUMBERS: Record<string, string> = {
  "s2000-elite": "012-68000R 012-69000R 012-64000R 012-54000R 019-00387R 019-00388R 019-00389R 019-00390R 019-00391R 019-00392R 019-00406R 019-00407R 019-00395R",
  lx500: "010-00520R 010-00521R",
  "s1500-pro": "010-00578R 010-00517R",
  r2000: "010-00208",
  ls200: "019-00427R 019-00409R",
};

export function buildThaiSearchIndex(lang: ThLocale): SearchEntry[] {
  const out: SearchEntry[] = [];

  for (const p of marketProducts(lang === "en" ? "th" : "th")) {
    const th = lang === "th" ? productContentTh[p.slug] : undefined;
    out.push({
      type: "product",
      title: p.name,
      subtitle: th?.subtitle ?? p.sub ?? "",
      href: `/th/${lang}/product/${p.slug}`,
      key: [p.name, p.sub, p.slug, PART_NUMBERS[p.slug] ?? ""].join(" ").toLowerCase(),
    });
  }

  for (const a of marketApps("th")) {
    const loc = localizeApp(a, lang);
    out.push({
      type: "application",
      title: loc.title,
      subtitle: `${a.industry} · ${a.subCategory}`,
      href: `/th/${lang}/application/${appSlug(a)}`,
      key: [a.title, loc.title, a.industry, a.subCategory, a.product, a.recommended, (a.highlights ?? []).join(" ")].join(" ").toLowerCase(),
    });
  }

  for (const c of marketCases("th")) {
    const loc = localizeCase(c, lang);
    out.push({
      type: "case",
      title: loc.title,
      subtitle: `${c.sector} · ${c.company}`,
      href: `/th/${lang}/case-studies/${c.id.toLowerCase()}`,
      key: [c.title, loc.title, c.sector, c.company, (c.keywords ?? []).join(" ")].join(" ").toLowerCase(),
    });
  }

  return out;
}
