// ETIA asset codes — the one code system behind every label ETIA prints.
//
// A code is printed three ways on the same label and they all carry the same
// twelve characters: as text a person can read out on the phone, as a Code 128
// barcode a warehouse scanner reads, and inside a QR code that opens the
// item's page on this site. Nothing on the label is decorative.
//
//   E T L 2 6 0 0 0 1 4 2 9
//   │ │ │ └┬┘ └──┬──┘ └─ check digit
//   │ │ │  │     └────── sequence within type and year
//   │ │ │  └──────────── year of issue
//   │ │ └─────────────── what it is: E P L G
//   └─┴───────────────── ETIA, so a scanner operator knows whose code it is
//
// Twelve characters is short enough for a 20 mm label and long enough that
// the space will not run out: a million codes per type per year.
//
// Everything after the type letter is a digit, and E P L G cannot be mistaken
// for a digit. A code read off a scuffed label or down a phone line has no
// O/0 or I/1 to get wrong — which is why the check character is a digit and
// not, as it would be for an alphanumeric scheme, whatever mod 36 produced.
//
// This module is pure and client-safe. The registry that says which physical
// item a code was issued to lives in `registry.ts`, server-side.

import type { LangText } from "@/components/LocaleContext";

export const SERIAL_PREFIX = "ET";
export const SERIAL_LENGTH = 12;

/**
 * Where a scanned code goes. Printed on every QR, so it must never change.
 *
 * One gateway for every label, as the Label & QR Service System draft asks:
 * the page works out from the code itself whether it is equipment, a lamp, a
 * light guide or a part, and shows the right thing. `/s/<code>` still resolves,
 * so a code typed by hand or read off a barcode gets to the same place.
 */
export const SCAN_BASE = "https://www.etiatech.com/scan";

export type SerialType = "E" | "P" | "L" | "G";

/**
 * How a type is coded. `level` is the difference between a code that names
 * one physical object and a code that names a part number:
 *
 * - `unit` — systems, lamps and light guides get their own code each. This is
 *   what makes a lamp traceable from the shipment it arrived in to the
 *   customer who returns it for trade-in.
 * - `sku`  — a lens, a cable, a filter: one code for the part number, printed
 *   as many times as there are pieces. Serialising a washer buys nothing.
 */
export const serialTypes: Record<
  SerialType,
  { digit: string; level: "unit" | "sku"; name: LangText; short: LangText }
> = {
  E: {
    digit: "1",
    level: "unit",
    name: { en: "Equipment", zh: "设备", th: "อุปกรณ์", vi: "Thiết bị" },
    short: { en: "Equipment", zh: "设备", th: "อุปกรณ์", vi: "Thiết bị" },
  },
  P: {
    digit: "2",
    level: "sku",
    name: { en: "Part & consumable", zh: "配件与耗材", th: "อะไหล่และวัสดุสิ้นเปลือง", vi: "Phụ tùng & vật tư" },
    short: { en: "Part", zh: "配件", th: "อะไหล่", vi: "Phụ tùng" },
  },
  L: {
    digit: "3",
    level: "unit",
    name: { en: "UV lamp", zh: "紫外灯泡", th: "หลอด UV", vi: "Đèn UV" },
    short: { en: "Lamp", zh: "灯泡", th: "หลอด", vi: "Đèn" },
  },
  G: {
    digit: "4",
    level: "unit",
    name: { en: "Light guide", zh: "导光管", th: "ไลต์ไกด์", vi: "Dây dẫn sáng" },
    short: { en: "Light guide", zh: "导光管", th: "ไลต์ไกด์", vi: "Dây dẫn sáng" },
  },
};

export const isSerialType = (v: string): v is SerialType => v in serialTypes;

// ---------------------------------------------------------------------------
// Check digit — Luhn mod 10 over the nine digits the code carries: the type
// as a digit, the year, the sequence.
//
// It catches every single-digit mistake and every transposition of adjacent
// digits, which is what a code read aloud down a phone line or typed off a
// scuffed label needs. The type letter is folded in as its digit, so reading
// an L as a G is caught too. The same nine lines live in
// `scripts/issue-serials.mjs`; if one changes, both change.

export function checkDigit(digits: string): string {
  if (!/^\d+$/.test(digits)) throw new Error(`check digit takes digits only: ${digits}`);
  let factor = 2;
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    const addend = factor * Number(digits[i]);
    factor = 3 - factor;
    sum += Math.floor(addend / 10) + (addend % 10);
  }
  return String((10 - (sum % 10)) % 10);
}

// ---------------------------------------------------------------------------
// Building and reading codes

export type SerialParts = { type: SerialType; year: number; seq: number };

/** `{ type: "L", year: 2026, seq: 142 }` → `ETL260001429`. */
export function buildSerial({ type, year, seq }: SerialParts): string {
  if (!isSerialType(type)) throw new Error(`unknown type: ${type}`);
  if (year < 2000 || year > 2099) throw new Error(`year out of range: ${year}`);
  if (!Number.isInteger(seq) || seq < 1 || seq > 999_999) throw new Error(`sequence out of range: ${seq}`);
  const digits = `${serialTypes[type].digit}${String(year % 100).padStart(2, "0")}${String(seq).padStart(6, "0")}`;
  return `${SERIAL_PREFIX}${type}${digits.slice(1)}${checkDigit(digits)}`;
}

/**
 * Accept what a person or a scanner actually hands over: the bare code, the
 * hyphenated form off a label, a scanned URL in either shape, lower case,
 * stray spaces.
 */
export function normalizeSerial(input: string): string {
  const trimmed = (input ?? "").trim();
  const fromQuery = /[?&]id=([^&#\s]+)/i.exec(trimmed);
  const fromPath = /\/s\/([^/?#\s]+)/i.exec(trimmed);
  const raw = fromQuery ? decodeURIComponent(fromQuery[1]) : fromPath ? fromPath[1] : trimmed;
  return raw.replace(/[\s\-_.]/g, "").toUpperCase();
}

export type ParsedSerial =
  | ({ ok: true; code: string } & SerialParts)
  | { ok: false; reason: "empty" | "format" | "type" | "check" };

export function parseSerial(input: string): ParsedSerial {
  const code = normalizeSerial(input ?? "");
  if (!code) return { ok: false, reason: "empty" };
  if (!new RegExp(`^${SERIAL_PREFIX}[A-Z]\\d{9}$`).test(code)) return { ok: false, reason: "format" };
  const type = code[2];
  if (!isSerialType(type)) return { ok: false, reason: "type" };
  const digits = serialTypes[type].digit + code.slice(3, 11);
  if (checkDigit(digits) !== code[11]) return { ok: false, reason: "check" };
  return {
    ok: true,
    code,
    type,
    year: 2000 + Number(code.slice(3, 5)),
    seq: Number(code.slice(5, 11)),
  };
}

/** `ETL260001429` → `ETL26-000142-9`, the form printed under the barcode. */
export function formatSerial(code: string): string {
  const c = normalizeSerial(code);
  if (c.length !== SERIAL_LENGTH) return c;
  return `${c.slice(0, 5)}-${c.slice(5, 11)}-${c.slice(11)}`;
}

/** The URL inside the QR. Printed permanently, so it is built in one place. */
export const serialUrl = (code: string): string => `${SCAN_BASE}?id=${normalizeSerial(code)}`;
