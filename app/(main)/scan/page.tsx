import type { Metadata } from "next";
import ScanResultView from "@/components/labels/ScanResultView";
import { scanResultFor } from "@/components/labels/scanResult";

// The universal QR gateway: /scan?id=<CODE>.
//
// Every ETIA label's QR points here. One gateway rather than one route per
// product type, because the label is printed years before anyone decides to
// reorganise the site, and the page can work out from the code itself whether
// it is equipment, a lamp, a light guide or a part.
//
// Nothing about the customer goes in the URL — only the ID. What the ID means
// is looked up server-side.
//
// noindex: these pages are for whoever is holding the item. They are thin,
// numerous and would be a doorway-page pattern in a search index.
export const metadata: Metadata = {
  title: "ETIA asset code",
  robots: { index: false, follow: false, nocache: true },
};

export default async function ScanGatewayPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return <ScanResultView result={scanResultFor(id ?? "")} />;
}
