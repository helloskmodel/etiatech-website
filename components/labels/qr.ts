// QR code as an SVG path, sized in millimetres.
//
// The QR on an ETIA label carries one thing: `https://www.etiatech.com/s/<CODE>`.
// A phone camera opens it, and the page on the other end knows what the thing
// is, what it was issued against, and what ETIA can do for it. Nothing about
// the item is encoded in the QR itself — that would freeze on the day it was
// printed, and a label outlives every fact except its own code.
//
// Error correction is M (about 15% recoverable). A label on a lamp module or
// a light guide jacket gets scuffed, and Q or H would push the module count up
// enough to matter at 12 mm square. M plus the printed text under it is the
// right trade: if the QR is too damaged to scan, a person reads the code out.
//
// Server-side only: `qrcode` is not worth shipping to a browser for a page
// that is rendered once and printed.

import QRCode from "qrcode";

export type QrSvg = {
  /** A single `<path>` `d` attribute covering every dark module. */
  path: string;
  /** Modules per side, quiet zone excluded. */
  size: number;
  /** viewBox side length in module units, quiet zone included. */
  extent: number;
};

/**
 * Build the QR for `text` as one SVG path in a viewBox of `extent` units, so
 * the caller scales it by setting width/height on the `<svg>`.
 *
 * The quiet zone is 4 modules, which the specification requires and which
 * printers are the most common place to lose — a QR butted against a border
 * fails to scan on perfectly good ink.
 */
export function qrSvgPath(text: string, quietZone = 4): QrSvg {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  const data = qr.modules.data;

  // One path of 1×1 squares rather than thousands of <rect>s: fewer bytes and
  // one fill for the renderer to resolve.
  const parts: string[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (data[y * size + x]) parts.push(`M${x + quietZone} ${y + quietZone}h1v1h-1z`);
    }
  }

  return { path: parts.join(""), size, extent: size + quietZone * 2 };
}
