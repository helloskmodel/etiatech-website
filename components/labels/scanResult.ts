// Turn a scanned or typed code into what the scan page renders.
//
// Both the gateway (`/scan?id=`) and the path alias (`/s/<code>`) go through
// here, so the two can never drift apart — a customer who types the code into
// the wrong one still gets the same answer.

import { lookupSerial } from "./registry";
import type { ScanResult } from "./ScanResultView";

export function scanResultFor(input: string): ScanResult {
  const lookup = lookupSerial(input);
  if (lookup.status === "invalid") return { status: "invalid", reason: lookup.reason };
  if (lookup.status === "unknown") return { status: "unknown", code: lookup.code };

  const r = lookup.record;
  return {
    status: "ok",
    code: r.code,
    type: r.type,
    pn: r.pn,
    name: r.name,
    issued: r.issued,
    ...(r.batch ? { batch: r.batch } : {}),
    // Deliberately not `origin`: the inventory's 产地 column is where ETIA
    // buys from, not a declared country of origin, and the two disagree — a
    // 012-64000R box is stamped MADE IN USA where the inventory says 加拿大.
    // Country of origin belongs on a commercial invoice.
    ...(lookup.item?.category ? { category: lookup.item.category } : {}),
  };
}
