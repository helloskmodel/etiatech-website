import type { Metadata } from "next";
import ScanResultView, { type ScanResult } from "@/components/labels/ScanResultView";
import { lookupSerial } from "@/components/labels/registry";

// Where every ETIA QR lands: /s/<CODE>.
//
// The URL is printed on labels that will be on equipment for years, so the
// shape of it is frozen — `SCAN_BASE` in components/labels/serial.ts is the
// single place it is written, and this route has to keep answering it.
//
// noindex: these pages are for whoever is holding the item. They are thin,
// numerous and would be a doorway-page pattern in a search index.
export const metadata: Metadata = {
  title: "ETIA asset code",
  robots: { index: false, follow: false, nocache: true },
};

export default async function ScanPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const lookup = lookupSerial(decodeURIComponent(code));

  let result: ScanResult;
  if (lookup.status === "invalid") {
    result = { status: "invalid", reason: lookup.reason };
  } else if (lookup.status === "unknown") {
    result = { status: "unknown", code: lookup.code };
  } else {
    const r = lookup.record;
    result = {
      status: "ok",
      code: r.code,
      type: r.type,
      pn: r.pn,
      name: r.name,
      issued: r.issued,
      ...(r.batch ? { batch: r.batch } : {}),
      // Deliberately not `origin`: the inventory's 产地 column is where ETIA
      // buys from, not a declared country of origin, and the two disagree —
      // a 012-64000R box is stamped MADE IN USA where the inventory says
      // 加拿大. Country of origin belongs on a commercial invoice.
      ...(lookup.item?.category ? { category: lookup.item.category } : {}),
    };
  }

  return <ScanResultView result={result} />;
}
