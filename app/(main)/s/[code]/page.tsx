import type { Metadata } from "next";
import ScanResultView from "@/components/labels/ScanResultView";
import { scanResultFor } from "@/components/labels/scanResult";

// The short alias for the gateway. `/scan?id=<CODE>` is what the QR codes
// carry; this exists because a code read off a barcode or spoken down a phone
// is easier to type after a slash than after a query string, and because any
// label printed before the gateway existed points here.
export const metadata: Metadata = {
  title: "ETIA asset code",
  robots: { index: false, follow: false, nocache: true },
};

export default async function ScanAliasPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <ScanResultView result={scanResultFor(decodeURIComponent(code))} />;
}
