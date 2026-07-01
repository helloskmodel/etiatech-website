import type { Metadata } from "next";
import BrandLandingView from "@/components/BrandLandingView";
import { brandMetadata, brandBreadcrumbJsonLd } from "@/components/brandLanding";

export const metadata: Metadata = brandMetadata("noblelight");

export default function NobleLightBrandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandBreadcrumbJsonLd("noblelight")) }} />
      <BrandLandingView slug="noblelight" />
    </>
  );
}
