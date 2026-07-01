import type { Metadata } from "next";
import BrandLandingView from "@/components/BrandLandingView";
import { brandMetadata, brandBreadcrumbJsonLd } from "@/components/brandLanding";

export const metadata: Metadata = brandMetadata("omnicure");

export default function OmniCureBrandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandBreadcrumbJsonLd("omnicure")) }} />
      <BrandLandingView slug="omnicure" />
    </>
  );
}
