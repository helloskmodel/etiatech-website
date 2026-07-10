import type { Metadata } from "next";
import OmniCureLanding from "@/components/omnicure/OmniCureLanding";
import { getVnCopy, vnLandingMetadata, vnLandingJsonLd, VN_CONTACT } from "@/components/omnicure/vietnamCopy";

export const metadata: Metadata = vnLandingMetadata("vi");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vnLandingJsonLd("vi")) }} />
      <OmniCureLanding lang="vi" copy={getVnCopy("vi")} contact={VN_CONTACT} regionLabel="OmniCure · Việt Nam" footerLabel="Nhà phân phối OmniCure được ủy quyền tại Việt Nam" pageId="omnicure-vn-vi" />
    </>
  );
}
