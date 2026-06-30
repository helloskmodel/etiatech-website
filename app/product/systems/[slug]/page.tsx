import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, brandAccent } from "@/components/productCatalog";
import ProductDetailView from "@/components/ProductDetailView";

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
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const accent = brandAccent[p.brandId];

  return <ProductDetailView product={p} accent={accent} />;
}
