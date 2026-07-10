import type { Metadata } from "next";
import S2000LampLanding from "@/components/omnicure/S2000LampLanding";
import LocalizedChrome from "@/components/LocalizedChrome";
import { lampMetadata, lampJsonLd } from "@/components/omnicure/s2000Lamp";

export const metadata: Metadata = lampMetadata("zh");

export default function S2000LampZhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lampJsonLd("zh")) }} />
      <LocalizedChrome locale="zh">
        <S2000LampLanding lang="zh" />
      </LocalizedChrome>
    </>
  );
}
