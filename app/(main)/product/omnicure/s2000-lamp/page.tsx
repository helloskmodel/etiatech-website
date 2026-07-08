import type { Metadata } from "next";
import S2000LampLanding from "@/components/omnicure/S2000LampLanding";
import { lampJsonLd, lampMetadata } from "@/components/omnicure/s2000Lamp";

export const metadata: Metadata = lampMetadata("en");

export default function S2000LampPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lampJsonLd("en")) }} />
      <S2000LampLanding lang="en" />
    </>
  );
}
