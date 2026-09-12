import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ConsumableMachineView from "@/components/ConsumableMachineView";
import { consumableMachines, isConsumableMachine } from "@/components/consumables";
import { consumablesMetadata, consumableMachineJsonLd } from "@/components/consumablesSeo";

export function generateStaticParams() {
  return consumableMachines.map((m) => ({ model: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const { model } = await params;
  return consumablesMetadata(model);
}

export default async function ConsumableMachinePage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  if (!isConsumableMachine(model)) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consumableMachineJsonLd(model)) }}
      />
      <ConsumableMachineView slug={model} />
    </>
  );
}
