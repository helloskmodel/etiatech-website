import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCT_CATEGORIES, productCategory } from "@/components/productCategories";
import { productsInCategory } from "@/components/productCatalog";
import CategoryLandingView from "@/components/CategoryLandingView";

const SITE = "https://www.etiatech.com";

// Only the five category ids are pre-rendered here. The brand pages
// (/product/omnicure, /product/phoseon, /product/fusion-uv, /product/noblelight)
// and /product/systems are their own static segments and keep serving those
// URLs — this dynamic segment never claims them.
export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = productCategory(category);
  if (!c) return { title: "Products — ETIA Technology" };
  return {
    title: `${c.label.en} — ${c.label.zh} | ETIA Technology`,
    description: c.blurb.en.slice(0, 160),
    alternates: { canonical: `${SITE}/product/${c.id}` },
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = productCategory(category);
  if (!c) notFound();

  const items = productsInCategory(c.id);

  // Breadcrumb + an ItemList of the systems in this category, so the category
  // page can rank for the light-source query and surface its products.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Products", item: `${SITE}/product` },
          { "@type": "ListItem", position: 2, name: c.label.en, item: `${SITE}/product/${c.id}` },
        ],
      },
      ...(items.length
        ? [{
            "@type": "ItemList",
            name: `${c.label.en} systems supplied by ETIA Technology`,
            numberOfItems: items.length,
            itemListElement: items.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `${SITE}${p.href ?? `/product/systems/${p.slug}`}`,
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryLandingView category={c} />
    </>
  );
}
