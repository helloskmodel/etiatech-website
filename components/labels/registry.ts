// Server-side lookup: what a code was issued against.
//
// `serial.ts` knows how a code is built and whether it is well formed. This
// module knows what it *means* — which SKU, which part number, which batch,
// which day it was issued. That answer lives in `data/serialRegistry.json`,
// written only by `scripts/issue-serials.mjs` and never edited by hand.
//
// Import this from server components only. It reads the whole registry into
// memory, which is right while the registry is a file in the repo and wrong
// the day it moves into a database — at which point this module is the only
// thing that changes.

import registryData from "@/data/serialRegistry.json";
import skuData from "@/data/skuMaster.json";
import { parseSerial, type SerialType } from "./serial";

export type SerialRecord = {
  code: string;
  type: SerialType;
  year: number;
  seq: number;
  level: "unit" | "sku";
  /** ETIA's own item code (存货编码). */
  sku: string;
  /** The manufacturer's part number (存货名称 in the inventory export). */
  pn: string;
  /** The description (规格型号). */
  name: string;
  issued: string;
  batch?: string;
  note?: string;
};

export type SkuRecord = {
  sku: string;
  pn: string;
  name: string;
  category: string;
  origin: string;
  unit: string;
  type: string;
};

const records = registryData.records as SerialRecord[];
const byCode = new Map(records.map((r) => [r.code, r]));
const skus = new Map((skuData.items as SkuRecord[]).map((i) => [i.sku, i]));

/**
 * What a scanned code resolves to.
 *
 * `unknown` is a well-formed code that was never issued, and it is a real
 * answer, not an error page: a customer holding a label we did not print
 * needs to be told exactly that.
 */
export type Lookup =
  | { status: "ok"; record: SerialRecord; item?: SkuRecord }
  | { status: "unknown"; code: string }
  | { status: "invalid"; reason: "empty" | "format" | "type" | "check" };

export function lookupSerial(input: string): Lookup {
  const parsed = parseSerial(input ?? "");
  if (!parsed.ok) return { status: "invalid", reason: parsed.reason };
  const record = byCode.get(parsed.code);
  if (!record) return { status: "unknown", code: parsed.code };
  return { status: "ok", record, item: skus.get(record.sku) };
}

/** Every issued code, newest first. Used by the label tool's recent list. */
export function recentSerials(limit = 50): SerialRecord[] {
  return [...records].reverse().slice(0, limit);
}

export const registryCount = records.length;
