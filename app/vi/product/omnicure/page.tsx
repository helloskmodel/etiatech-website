import type { Metadata } from "next";
import BrandLandingView from "@/components/BrandLandingView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { brandLocaleMetadata } from "@/components/localePageSeo";
import { brandBreadcrumbJsonLd } from "@/components/brandLanding";

export const metadata: Metadata = brandLocaleMetadata("omnicure", "vi");

export default function OmniCureViPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandBreadcrumbJsonLd("omnicure")) }} />
      <LocalizedChrome locale="vi">
        <BrandLandingView slug="omnicure" />
      </LocalizedChrome>
    </>
  );
}
