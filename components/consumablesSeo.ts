// Metadata and structured data for the consumables section.
//
// These pages answer a search that is typed in a hurry and in a specific
// shape — "S2000 Elite lamp part number", "OmniCure filter replacement",
// "AC8 air filter" — so the title leads with the model and the word the
// searcher used, not with a category name.

import type { Metadata } from "next";
import { SITE_URL, seoDescription, seoTitle } from "@/components/seoText";
import {
  consumableMachines,
  consumablesFor,
  consumablesHref,
  machineBySlug,
  partsFor,
} from "@/components/consumables";

export function consumablesMetadata(slug?: string): Metadata {
  const m = slug ? machineBySlug.get(slug) : undefined;

  if (!m) {
    return {
      title: seoTitle("UV Curing Consumables & Spare Parts"),
      description: seoDescription(
        "Lamps, filter cartridges, light guides, lenses, protective windows and air filters for OmniCure UV curing systems — part numbers, published service life and replacement signs, supplied and serviced by ETIA in Asia-Pacific."
      ),
      alternates: { canonical: `${SITE_URL}${consumablesHref()}` },
    };
  }

  const kinds = consumablesFor(m.slug)
    .map((c) => c.name.en.toLowerCase())
    .join(", ");

  return {
    title: seoTitle(`${m.name} Consumables & Part Numbers`),
    description: seoDescription(
      `${m.name} consumables: ${kinds}. Part numbers, published service life and the signs that say a part is due, supplied and serviced by ETIA in Asia-Pacific.`
    ),
    alternates: { canonical: `${SITE_URL}${consumablesHref(m.slug)}` },
  };
}

// Home > Consumables
export function consumablesIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Consumables", item: `${SITE_URL}${consumablesHref()}` },
    ],
  };
}

/**
 * Breadcrumb plus the part list as an ItemList. Deliberately not Product
 * markup: we publish no price and no live availability for these part
 * numbers, and Product markup without them is the kind of half-filled schema
 * that earns a manual action.
 */
export function consumableMachineJsonLd(slug: string) {
  const m = machineBySlug.get(slug);
  if (!m) return {};
  const items = consumablesFor(slug);
  const url = `${SITE_URL}${consumablesHref(slug)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Consumables", item: `${SITE_URL}${consumablesHref()}` },
          { "@type": "ListItem", position: 3, name: m.name, item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: `${m.name} consumables and spare parts`,
        itemListElement: items.flatMap((c, ci) =>
          partsFor(c).map((p, pi) => ({
            "@type": "ListItem",
            position: ci * 100 + pi + 1,
            name: `${p.pn} — ${p.desc}`,
            url: `${url}#${c.id}`,
          }))
        ),
      },
    ],
  };
}

/** Every consumables URL, for the sitemap. */
export const consumablesUrls = (): string[] => [
  consumablesHref(),
  ...consumableMachines.map((m) => consumablesHref(m.slug)),
];
