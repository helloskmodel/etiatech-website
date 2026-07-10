import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, brandAccent, productJsonLd, productBreadcrumbJsonLd } from "@/components/productCatalog";
import ProductDetailView from "@/components/ProductDetailView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { localizedSystemMetadata } from "@/components/localizedSystemsSeo";

const SLUG = "lx500";
export const metadata: Metadata = localizedSystemMetadata(SLUG, "th");

export default function Lx500ThPage() {
  const p = getProduct(SLUG);
  if (!p) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(p)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productBreadcrumbJsonLd(p)) }} />
      <LocalizedChrome locale="th">
        <ProductDetailView product={p} accent={brandAccent[p.brandId]} />
      </LocalizedChrome>
    </>
  );
}
