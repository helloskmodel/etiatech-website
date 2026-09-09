import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCategoryView from "@/components/ProductCategoryView";
import {
  PRODUCT_CATEGORY_ORDER,
  isProductCategorySlug,
  productCategoryMetadata,
  productCategoryBreadcrumbJsonLd,
} from "@/components/productCategories";

export function generateStaticParams() {
  return PRODUCT_CATEGORY_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductCategorySlug(slug)) return { title: "Products — ETIA Technology" };
  return productCategoryMetadata(slug);
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isProductCategorySlug(slug)) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productCategoryBreadcrumbJsonLd(slug)) }}
      />
      <ProductCategoryView slug={slug} />
    </>
  );
}
