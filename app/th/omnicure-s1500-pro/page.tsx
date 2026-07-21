import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductLanding from "@/components/omnicure/ProductLanding";
import { buildProductConfig } from "@/components/omnicure/productConfig";
import { productLandingMetadata, productLandingJsonLd } from "@/components/omnicure/productSeo";

const SLUG = "s1500-pro";
export const metadata: Metadata = productLandingMetadata(SLUG, "th");

export default function Page() {
  const config = buildProductConfig(SLUG, "th");
  if (!config) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLandingJsonLd(SLUG, "th")) }} />
      <ProductLanding config={config} />
    </>
  );
}
