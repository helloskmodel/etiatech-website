import type { Metadata } from "next";
import ConsumablesIndexView from "@/components/ConsumablesIndexView";
import { consumablesMetadata, consumablesIndexJsonLd } from "@/components/consumablesSeo";

export const metadata: Metadata = consumablesMetadata();

export default function ConsumablesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consumablesIndexJsonLd()) }}
      />
      <ConsumablesIndexView />
    </>
  );
}
