import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, brandAccent, productJsonLd, productBreadcrumbJsonLd } from "@/components/productCatalog";
import ProductDetailView from "@/components/ProductDetailView";
import { LOCALIZED_SYSTEM_SLUGS, systemLanguages } from "@/components/localizedSystemsSeo";

export function generateStaticParams() {
  // Skip products that have a dedicated rich page (href override).
  return products.filter((p) => !p.href).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product — ETIA Technology" };
  return {
    title: `${p.name} — ETIA Technology`,
    description: p.intro.slice(0, 160),
    alternates: {
      canonical: `https://www.etiatech.com/product/systems/${p.slug}`,
      // Products with locale-locked pages (/zh|/vi|/th/...) link the group here.
      ...(LOCALIZED_SYSTEM_SLUGS.includes(p.slug) ? { languages: systemLanguages(p.slug) } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const accent = brandAccent[p.brandId];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(p)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productBreadcrumbJsonLd(p)) }} />
      <ProductDetailView product={p} accent={accent} />
    </>
  );
}
