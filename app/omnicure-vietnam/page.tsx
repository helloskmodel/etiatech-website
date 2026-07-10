import type { Metadata } from "next";
import OmniCureLanding from "@/components/omnicure/OmniCureLanding";
import { getVnCopy, vnLandingMetadata, vnLandingJsonLd, VN_CONTACT } from "@/components/omnicure/vietnamCopy";

export const metadata: Metadata = vnLandingMetadata("en");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vnLandingJsonLd("en")) }} />
      <OmniCureLanding lang="en" copy={getVnCopy("en")} contact={VN_CONTACT} regionLabel="OmniCure · Vietnam" footerLabel="Authorized OmniCure Distributor in Vietnam" pageId="omnicure-vn-en" />
    </>
  );
}
