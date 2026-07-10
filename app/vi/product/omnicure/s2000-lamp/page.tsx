import type { Metadata } from "next";
import S2000LampLanding from "@/components/omnicure/S2000LampLanding";
import LocalizedChrome from "@/components/LocalizedChrome";
import { lampMetadata, lampJsonLd } from "@/components/omnicure/s2000Lamp";

export const metadata: Metadata = lampMetadata("vi");

export default function S2000LampViPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lampJsonLd("vi")) }} />
      <LocalizedChrome locale="vi">
        <S2000LampLanding lang="vi" />
      </LocalizedChrome>
    </>
  );
}
