import type { Metadata } from "next";
import OmniCureLanding from "@/components/omnicure/OmniCureLanding";
import { landingMetadata, landingJsonLd } from "@/components/omnicure/seo";

export const metadata: Metadata = landingMetadata("en");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd("en")) }} />
      <OmniCureLanding lang="en" />
    </>
  );
}
