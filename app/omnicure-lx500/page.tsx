import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductLanding from "@/components/omnicure/ProductLanding";
import { buildProductConfig } from "@/components/omnicure/productConfig";
import { productLandingMetadata, productLandingJsonLd } from "@/components/omnicure/productSeo";

const SLUG = "lx500";
export const metadata: Metadata = productLandingMetadata(SLUG, "en");

export default function Page() {
  const config = buildProductConfig(SLUG, "en");
  if (!config) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLandingJsonLd(SLUG, "en")) }} />
      <ProductLanding config={config} />
    </>
  );
}
