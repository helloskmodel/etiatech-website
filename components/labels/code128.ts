// Code 128 barcode, rendered as SVG bar widths.
//
// Why Code 128 and not QR alone: a warehouse scanner gun reads a linear
// barcode across a conveyor at an angle a phone camera would refuse, and every
// scanner made in the last thirty years reads Code 128 without configuration.
// The QR on the same label is for a phone; the barcode is for the gun.
//
// Our codes are `ETL260001429` — two uppercase letters and nine digits. That
// is subset B throughout, except that the nine digits pair up neatly in subset
// C (two digits per symbol), which makes the barcode noticeably shorter on a
// 20 mm label. So: start in B for the letters, switch to C for the digits when
// there is an even run of them, and fall back to B for an odd tail.
//
// Widths are in modules. The caller decides how wide a module is in
// millimetres; that is what sets the physical length of the barcode.

/**
 * The 107 Code 128 symbols as bar/space width strings, index 0..106.
 * Index 103/104/105 are Start A/B/C, 106 is Stop (which carries an extra
 * 2-module bar at the end, hence its 13 digits).
 */
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

const START_B = 104;
const START_C = 105;
const CODE_B = 100;
const CODE_C = 99;
const STOP = 106;

/** Subset B value of an ASCII character: space is 0, so value = code - 32. */
const valueB = (ch: string): number => ch.charCodeAt(0) - 32;

/**
 * Encode to symbol values, switching between subset B and C wherever C pays
 * for itself. Switching costs one symbol and C saves one symbol per pair, so
 * a run of four or more digits is worth switching for (two at the start of the
 * string, where the switch replaces the start symbol rather than adding one).
 */
function encodeValues(text: string): number[] {
  const digitsAt = (i: number): number => {
    let n = 0;
    while (i + n < text.length && text[i + n] >= "0" && text[i + n] <= "9") n++;
    return n;
  };

  const out: number[] = [];
  let mode: "B" | "C" | null = null;
  let i = 0;

  while (i < text.length) {
    const run = digitsAt(i);
    // An even run: in C it costs run/2 symbols against run in B.
    const evenRun = run - (run % 2);
    const worthC = mode === "C" ? evenRun >= 2 : evenRun >= (i === 0 ? 2 : 4);

    if (worthC) {
      if (mode === null) out.push(START_C);
      else if (mode !== "C") out.push(CODE_C);
      mode = "C";
      for (let k = 0; k < evenRun; k += 2) out.push(Number(text.slice(i + k, i + k + 2)));
      i += evenRun;
      continue;
    }

    if (mode === null) out.push(START_B);
    else if (mode !== "B") out.push(CODE_B);
    mode = "B";
    // Emit one character and re-test: the next position may start a C run.
    out.push(valueB(text[i]));
    i += 1;
  }

  if (out.length === 0) out.push(START_B);
  return out;
}

/** Modulo-103 weighted checksum over the symbol values, start symbol included. */
function checksum(values: number[]): number {
  let sum = values[0];
  for (let i = 1; i < values.length; i++) sum += values[i] * i;
  return sum % 103;
}

export type Barcode = {
  /** Alternating bar/space widths in modules, starting with a bar. */
  widths: number[];
  /** Total width in modules, quiet zones excluded. */
  modules: number;
  /** The 10-module quiet zone the standard requires on each side. */
  quietZone: number;
};

/** Encode `text` to bar widths. Printable ASCII only — our codes are A–Z0–9. */
export function code128(text: string): Barcode {
  if (!/^[\x20-\x7E]+$/.test(text)) throw new Error(`Code 128 subset B/C takes printable ASCII: ${text}`);
  const values = encodeValues(text);
  values.push(checksum(values), STOP);
  const widths = values.flatMap((v) => PATTERNS[v].split("").map(Number));
  return { widths, modules: widths.reduce((a, b) => a + b, 0), quietZone: 10 };
}

/**
 * The barcode as SVG `<rect>` elements, scaled to fill `width` mm and `height`
 * mm including the quiet zones. Returned as a string so a server component can
 * drop it into an `<svg>` without a client bundle.
 */
export function code128Svg(text: string, width: number, height: number): string {
  const { widths, modules, quietZone } = code128(text);
  const total = modules + quietZone * 2;
  const unit = width / total;
  let x = quietZone * unit;
  const rects: string[] = [];
  widths.forEach((w, i) => {
    const w1 = w * unit;
    // Even indices are bars, odd are spaces.
    if (i % 2 === 0) rects.push(`<rect x="${x.toFixed(4)}" y="0" width="${w1.toFixed(4)}" height="${height}" />`);
    x += w1;
  });
  return rects.join("");
}
