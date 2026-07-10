import type { Metadata } from "next";
import BrandLandingView from "@/components/BrandLandingView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { brandLocaleMetadata } from "@/components/localePageSeo";
import { brandBreadcrumbJsonLd } from "@/components/brandLanding";

export const metadata: Metadata = brandLocaleMetadata("phoseon", "th");

export default function PhoseonThPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandBreadcrumbJsonLd("phoseon")) }} />
      <LocalizedChrome locale="th">
        <BrandLandingView slug="phoseon" />
      </LocalizedChrome>
    </>
  );
}
