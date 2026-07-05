import { products, type Product } from "@/components/productCatalog";
import type { Locale } from "@/components/LocaleContext";

// A "market" is a country/region-scoped instance of the site that lives under
// its own URL prefix (e.g. /th), is published in its own set of languages, and
// sells only a subset of the global catalog. This is the reusable mechanism
// behind the small-and-beautiful per-segment microsites: adding a market =
// adding one entry here, not a new codebase.
export type MarketId = "th";

export type Market = {
  id: MarketId;
  // URL prefix this market's pages live under, e.g. "/th".
  basePath: string;
  // Languages this market is published in; `defaultLocale` must be included.
  locales: Locale[];
  defaultLocale: Locale;
  // Selects which catalog products this market sells. Everything else in the
  // global catalog is hidden from this market's pages, sitemap and nav.
  sells: (p: Product) => boolean;
};

export const markets: Record<MarketId, Market> = {
  // Thailand: ETIA sells only the OmniCure UV Spot Curing family here
  // (UV Lamp Spot + UV LED Spot). Published in Thai (default), English, Chinese.
  th: {
    id: "th",
    basePath: "/th",
    locales: ["th", "en", "zh"],
    defaultLocale: "th",
    sells: (p) => p.brandId === "omnicure" && p.tech === "UV Spot Curing",
  },
};

// The catalog slice a market sells, in catalog order.
export function marketProducts(id: MarketId): Product[] {
  return products.filter(markets[id].sells);
}

// True when `lang` is one of the market's published locales.
export function marketHasLocale(id: MarketId, lang: string): lang is Locale {
  return (markets[id].locales as string[]).includes(lang);
}
