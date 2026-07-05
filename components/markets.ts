import { products, type Product } from "@/components/productCatalog";
import { apps, type App } from "@/components/applicationNotes";
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
  // Selects which application notes this market features. Returns false when a
  // market shows no applications at all.
  sellsApp: (a: App) => boolean;
};

// Products ETIA sells in Thailand (OmniCure UV Spot family) referenced in an
// application note's `recommended` string.
const TH_SPOT = /LX500|S2000|S1500|V3 UV LED|V3 Head|LS200|R2000/i;
// Area/microwave/other systems NOT sold in Thailand — an app requiring one of
// these is out of scope even if it also mentions a spot product.
const TH_NEEDS_OTHER =
  /AC ?\d|AC Small|AC Large|FireJet|FireEdge|Semray|NobleLight|Mercury Arc|922|Belt Conveyor|Draw Tower|360°|Multi-Angle|Two-Stage|Large-Area/i;

export const markets: Record<MarketId, Market> = {
  // Thailand: ETIA sells only the OmniCure UV Spot Curing family here
  // (UV Lamp Spot + UV LED Spot). Published in Thai (default), English, Chinese.
  th: {
    id: "th",
    basePath: "/th",
    locales: ["th", "en", "zh"],
    defaultLocale: "th",
    sells: (p) => p.brandId === "omnicure" && p.tech === "UV Spot Curing",
    // Thailand features applications in three focus areas only — Electronics,
    // Medical, and automotive connectors/interfaces — and only those that run
    // on the UV Spot products sold here.
    sellsApp: (a) => {
      const usesSpotOnly = TH_SPOT.test(a.recommended) && !TH_NEEDS_OTHER.test(a.recommended);
      if (!usesSpotOnly) return false;
      if (a.industry === "Medical Device Assembly") return true;
      if (a.industry === "Electronics & PCB Assembly") return true;
      if (a.industry === "Automotive & ADAS")
        return a.subCategory === "Connectors & Sealing" || a.subCategory === "ADAS & Sensors";
      return false;
    },
  },
};

// The application notes a market features, in catalog order.
export function marketApps(id: MarketId): App[] {
  return apps.filter(markets[id].sellsApp);
}

// The catalog slice a market sells, in catalog order.
export function marketProducts(id: MarketId): Product[] {
  return products.filter(markets[id].sells);
}

// True when `lang` is one of the market's published locales.
export function marketHasLocale(id: MarketId, lang: string): lang is Locale {
  return (markets[id].locales as string[]).includes(lang);
}
