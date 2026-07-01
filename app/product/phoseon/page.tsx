import type { Metadata } from "next";
import BrandLandingView from "@/components/BrandLandingView";
import { brandMetadata, brandBreadcrumbJsonLd } from "@/components/brandLanding";

export const metadata: Metadata = brandMetadata("phoseon");

export default function PhoseonBrandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandBreadcrumbJsonLd("phoseon")) }} />
      <BrandLandingView slug="phoseon" />
    </>
  );
}
