import type { Metadata } from "next";
import BrandLandingView from "@/components/BrandLandingView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { brandZhMetadata } from "@/components/localePageSeo";
import { brandBreadcrumbJsonLd } from "@/components/brandLanding";

export const metadata: Metadata = brandZhMetadata("phoseon");

export default function PhoseonZhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandBreadcrumbJsonLd("phoseon")) }} />
      <LocalizedChrome locale="zh">
        <BrandLandingView slug="phoseon" />
      </LocalizedChrome>
    </>
  );
}
