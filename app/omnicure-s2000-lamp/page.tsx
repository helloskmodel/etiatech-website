import type { Metadata } from "next";
import S2000LampLanding from "@/components/omnicure/S2000LampLanding";
import { lampMetadata, lampJsonLd } from "@/components/omnicure/s2000Lamp";

export const metadata: Metadata = lampMetadata("en");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lampJsonLd("en")) }} />
      <S2000LampLanding lang="en" />
    </>
  );
}
