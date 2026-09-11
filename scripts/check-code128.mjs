// Decode what components/labels/code128.ts encodes, and check it comes back.
//
//   node --experimental-strip-types scripts/check-code128.mjs
//
// A wrong barcode is worse than no barcode: it scans, it just scans as the
// wrong thing, and nobody finds out until a box is in the wrong place. So the
// encoder is checked by a decoder written against the standard rather than
// against the encoder — it reads the bar widths back into symbol values,
// verifies the modulo-103 checksum, follows the subset switches, and rebuilds
// the string.
//
// The encoder was also compared bar-for-bar against python-barcode 0.16.1 over
// 138 strings. All matched except two containing the digit pair "99", where
// that library drops the pair and ours does not; a symbol-level decode of both
// shows ours carries the input and its does not.

import { code128 } from "../components/labels/code128.ts";

const PATTERNS = [
  "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213",
  "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132",
  "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211",
  "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313",
  "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331",
  "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111",
  "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214",
  "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111",
  "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141",
  "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141",
  "114131", "311141", "411131", "211412", "211214", "211232", "2331112",
];
const BY_PATTERN = new Map(PATTERNS.map((p, v) => [p, v]));

function decode(widths) {
  const values = [];
  for (let i = 0; i < widths.length; ) {
    // Stop is seven elements; every other symbol is six.
    const six = widths.slice(i, i + 6).join("");
    const seven = widths.slice(i, i + 7).join("");
    if (BY_PATTERN.get(seven) === 106) { values.push(106); i += 7; continue; }
    const v = BY_PATTERN.get(six);
    if (v === undefined) throw new Error(`unknown symbol at ${i}: ${six}`);
    values.push(v);
    i += 6;
  }

  if (values.at(-1) !== 106) throw new Error("no stop symbol");
  const check = values.at(-2);
  const body = values.slice(0, -2);
  let sum = body[0];
  for (let i = 1; i < body.length; i++) sum += body[i] * i;
  if (sum % 103 !== check) throw new Error(`checksum ${check} but computed ${sum % 103}`);

  let mode = { 103: "A", 104: "B", 105: "C" }[body[0]];
  if (!mode) throw new Error(`bad start symbol ${body[0]}`);
  let out = "";
  for (const v of body.slice(1)) {
    if (mode === "C") {
      if (v === 100) { mode = "B"; continue; }
      if (v === 101) { mode = "A"; continue; }
      out += String(v).padStart(2, "0");
      continue;
    }
    if (v === 99) { mode = "C"; continue; }
    if (v === 100 || v === 101) { mode = mode === "B" ? "A" : "B"; continue; }
    out += String.fromCharCode(v + 32);
  }
  return out;
}

const cases = [
  "ETL260001429", "ETE260000015", "ETP260000023", "ETG260000049",
  "A", "1", "12", "123", "1234", "A1", "A12", "A123", "A1234", "12A", "123A", "1234A",
  "99999999999999", "99NFD02IS5D9I", "AB-12-345", "X1234567890Y", "ET000000000",
];
// Every code the scheme can produce, sampled across types and sequence shapes.
for (const type of "EPLG") {
  for (const seq of [1, 9, 99, 999, 9999, 99999, 123456, 999999]) {
    cases.push(`ET${type}26${String(seq).padStart(6, "0")}0`);
  }
}

let failed = 0;
for (const text of cases) {
  try {
    const got = decode(code128(text).widths);
    if (got !== text) { console.error(`FAIL ${text} → ${got}`); failed++; }
  } catch (e) {
    console.error(`FAIL ${text}: ${e.message}`);
    failed++;
  }
}
console.log(`${cases.length} case(s), ${failed} failure(s)`);
process.exit(failed ? 1 : 0);
