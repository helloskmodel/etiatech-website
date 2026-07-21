import type { Metadata } from "next";
import BrandLandingView from "@/components/BrandLandingView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { brandLocaleMetadata } from "@/components/localePageSeo";
import { brandBreadcrumbJsonLd } from "@/components/brandLanding";

export const metadata: Metadata = brandLocaleMetadata("omnicure", "zh");

export default function OmniCureZhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandBreadcrumbJsonLd("omnicure")) }} />
      <LocalizedChrome locale="zh">
        <BrandLandingView slug="omnicure" />
      </LocalizedChrome>
    </>
  );
}
