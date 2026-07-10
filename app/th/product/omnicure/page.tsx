import type { Metadata } from "next";
import BrandLandingView from "@/components/BrandLandingView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { brandLocaleMetadata } from "@/components/localePageSeo";
import { brandBreadcrumbJsonLd } from "@/components/brandLanding";

export const metadata: Metadata = brandLocaleMetadata("omnicure", "th");

export default function OmniCureThPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandBreadcrumbJsonLd("omnicure")) }} />
      <LocalizedChrome locale="th">
        <BrandLandingView slug="omnicure" />
      </LocalizedChrome>
    </>
  );
}
