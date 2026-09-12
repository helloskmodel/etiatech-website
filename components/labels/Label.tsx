// The ETIA label set, drawn at real printed size.
//
// Layout follows the ETIA Label & QR Service System draft: the wordmark and a
// LIFECYCLE SUPPORT badge across the top, a coloured headline saying what the
// thing is, a line saying what scanning it is good for, the ID, and the machine
// -readable pair. What changed from that draft, and why, is in
// docs/label-system.md — the short version is that the barcodes as drawn were
// too dense to print, so the labels carrying one are 70 mm rather than 50 mm.
//
//   equipment       70 × 30 mm  QR only — near the nameplate, never over it
//   lamp            70 × 30 mm  QR + barcode, batch and date
//   part            70 × 30 mm  QR + barcode
//   guide           70 × 30 mm  QR + barcode — the identity half of the pair
//   guide-warning   35 × 30 mm  the red half: DO NOT BEND
//
// Sizes are in millimetres and the page prints at 100%. Do not switch these to
// px "to make them easier": a label that comes out 6% small does not fit the
// die-cut stock, and nobody notices until a roll has been run.
//
// Server component: the barcode and QR are computed once at render and the
// browser only has to print them.

import { code128, code128Svg } from "./code128";
import { qrSvgPath } from "./qr";
import { formatSerial, serialUrl, type SerialType } from "./serial";

export type LabelTemplate = "equipment" | "lamp" | "part" | "guide" | "guide-warning";

/**
 * `barcode` is the width in mm the Code 128 gets. A 203 dpi label printer lays
 * down 0.125 mm dots; a barcode whose narrow bar is thinner than two of them
 * prints with edges that jitter by a whole module, and it scans wrong or not at
 * all. Our 12-character code is 165 modules including quiet zones, so it needs
 * 41 mm to reach 0.25 mm per module. That single number is why the lamp and
 * light guide labels are 70 mm wide.
 */
export const labelTemplates: Record<
  LabelTemplate,
  { w: number; h: number; title: string; barcode: number; accent: string }
> = {
  // One die size for every identity label: 70 × 30 mm. The barcode needs 42 mm
  // of the width, and a single roll of stock beats four part numbers of label
  // paper and an operator choosing between them. The warning half is the same
  // height so the pair sits flush on one backing.
  equipment: { w: 70, h: 30, title: "Equipment support (QR only)", barcode: 0, accent: BLUE() },
  lamp: { w: 70, h: 30, title: "Lamp unit ID", barcode: 42, accent: GREEN() },
  part: { w: 70, h: 30, title: "Part / consumable", barcode: 42, accent: BLUE() },
  guide: { w: 70, h: 30, title: "Light guide ID (pairs with warning)", barcode: 42, accent: BLUE() },
  "guide-warning": { w: 35, h: 30, title: "Light guide warning (pairs with ID)", barcode: 0, accent: RED() },
};

function BLUE() { return "#1A56DB"; }
function GREEN() { return "#41A62A"; }
function RED() { return "#D92D20"; }

/** The template a code's type gets unless the operator overrides it. */
export const templateForType = (type: SerialType): LabelTemplate =>
  type === "L" ? "lamp" : type === "G" ? "guide" : type === "E" ? "equipment" : "part";

/** Light guides print two labels, side by side on the same backing. */
export const pairedWith = (t: LabelTemplate): LabelTemplate | null => (t === "guide" ? "guide-warning" : null);

export type LabelData = {
  code: string;
  type: SerialType;
  /** Manufacturer part number, printed largest — it is what gets looked up. */
  pn: string;
  /** Description. Trimmed to one line on the label; the page has the rest. */
  name: string;
  batch?: string;
  issued?: string;
};

const SERVICE_HOST = "etiatech.com";

/** What the label calls the thing, in the accent colour. */
const HEADLINE: Record<SerialType, string> = {
  E: "ETIA EQUIPMENT SUPPORT",
  L: "GENUINE OMNICURE LAMP",
  // ETIA's own line, not an Excelitas catalogue part, so the label says ETIA.
  G: "ETIA LIGHT GUIDE",
  P: "ETIA PARTS & CONSUMABLES",
};

/** What scanning it is good for. The reason a customer bothers. */
const ACTIONS: Record<SerialType, string> = {
  E: "Calibration / PM / repair / lamp",
  L: "Verify / re-order / warranty",
  G: "Verify / cleaning / re-order",
  P: "Verify / re-order / support",
};

export default function Label({ data, template }: { data: LabelData; template: LabelTemplate }) {
  const spec = labelTemplates[template];
  return (
    <div
      className="label relative box-border overflow-hidden rounded-[1.5mm] border bg-white text-black"
      style={{
        width: `${spec.w}mm`,
        height: `${spec.h}mm`,
        // Extra room at the bottom so the last line clears the accent bar.
        padding: "1.6mm 1.6mm 2.6mm",
        borderColor: template === "guide-warning" ? RED() : "#9AA5B1",
        background: template === "guide-warning" ? "#FEF3F2" : "#fff",
      }}
    >
      {template === "guide-warning" ? <GuideWarning /> : <IdentityLabel data={data} template={template} />}
    </div>
  );
}

// ---------------------------------------------------------------------------

function Qr({ code, size, accent }: { code: string; size: number; accent: string }) {
  const { path, extent } = qrSvgPath(serialUrl(code));
  return (
    <div
      className="box-border rounded-[1mm] border bg-white p-[0.6mm]"
      style={{ borderColor: accent, borderWidth: "0.3mm" }}
    >
      <svg
        viewBox={`0 0 ${extent} ${extent}`}
        width={`${size}mm`}
        height={`${size}mm`}
        shapeRendering="crispEdges"
        aria-label={serialUrl(code)}
      >
        <path d={path} fill="#000" />
      </svg>
    </div>
  );
}

function Barcode({ code, width, height }: { code: string; width: number; height: number }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={`${width}mm`}
      height={`${height}mm`}
      shapeRendering="crispEdges"
      aria-label={code}
    >
      <g fill="#000" dangerouslySetInnerHTML={{ __html: code128Svg(code, width, height) }} />
    </svg>
  );
}

/** The ETIA-TECH wordmark. Replace with the supplied vector before a real run. */
function Wordmark({ h = 2.8 }: { h?: number }) {
  return (
    <svg viewBox="0 0 120 20" height={`${h}mm`} aria-label="ETIA-TECH">
      <path d="M2 10 L18 1 L18 7 L30 7 L30 13 L18 13 L18 19 Z" fill={GREEN()} />
      <text x="30" y="16" fontSize="17" fontWeight="800" fill="#102A43" fontFamily="system-ui, sans-serif">
        TIA·TECH
      </text>
    </svg>
  );
}

function LifecycleBadge() {
  return (
    <div className="flex items-center gap-[0.8mm]">
      <svg viewBox="0 0 24 24" width="3.2mm" height="3.2mm" aria-hidden>
        <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" fill="none" stroke={GREEN()} strokeWidth="1.8" />
        <path d="M8 12 l3 3 l5 -6" fill="none" stroke={GREEN()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-bold leading-[1.1] tracking-tight" style={{ fontSize: "1.6mm" }}>
        LIFECYCLE
        <br />
        SUPPORT
      </span>
    </div>
  );
}

function IdentityLabel({ data, template }: { data: LabelData; template: LabelTemplate }) {
  const spec = labelTemplates[template];
  const showBarcode = spec.barcode > 0;
  const qrSize = 16;

  return (
    <div className="flex h-full flex-col">
      {/* Wordmark + lifecycle badge */}
      <div className="flex items-center gap-[2mm]">
        <Wordmark h={3} />
        <span className="h-[3.4mm] w-px bg-gray-300" />
        <LifecycleBadge />
      </div>

      <div className="mt-[1.2mm] flex flex-1 gap-[2mm]">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="font-bold leading-tight" style={{ fontSize: "2.2mm", color: spec.accent }}>
            {HEADLINE[data.type]}
          </div>
          <div className="mt-[0.6mm] font-bold leading-tight" style={{ fontSize: "2.6mm" }}>
            ID: {formatSerial(data.code)}
          </div>
          <div className="truncate text-gray-500" style={{ fontSize: "1.7mm", lineHeight: 1.4 }}>
            {data.pn} · {data.name}
          </div>
          <div className="mt-[0.4mm] text-gray-500" style={{ fontSize: "1.7mm", lineHeight: 1.4 }}>
            {ACTIONS[data.type]}
          </div>

          {data.type === "L" && (
            <div className="mt-[0.4mm] text-gray-500" style={{ fontSize: "1.6mm", lineHeight: 1.35 }}>
              {data.batch ? `Batch ${data.batch} · ` : ""}
              {data.issued ?? ""}
            </div>
          )}

          {/* The machine-readable half sits at the bottom of the text column so
              it gets the full label width rather than what the QR leaves. */}
          {showBarcode ? (
            <div className="mt-auto pt-[0.8mm]">
              <Barcode code={data.code} width={spec.barcode} height={5.5} />
              <div className="font-mono text-gray-500" style={{ fontSize: "1.5mm", lineHeight: 1.2 }}>
                {formatSerial(data.code)}
              </div>
            </div>
          ) : (
            <div className="mt-auto pt-[0.8mm] text-gray-400" style={{ fontSize: "1.5mm", lineHeight: 1.25 }}>
              Do not cover factory rating or certification labels
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center">
          <Qr code={data.code} size={qrSize} accent={spec.accent} />
          <div className="mt-[0.5mm] flex items-baseline gap-[0.8mm] leading-none">
            <span className="font-bold" style={{ fontSize: "1.5mm", color: spec.accent }}>
              SCAN
            </span>
            <span className="text-gray-500" style={{ fontSize: "1.4mm" }}>
              {SERVICE_HOST}
            </span>
          </div>
        </div>
      </div>

      {/* Accent bar: the one piece of colour that survives a bad print run. */}
      <div className="absolute inset-x-0 bottom-0 h-[0.8mm]" style={{ background: spec.accent }} />
    </div>
  );
}

/**
 * The red half of the light guide pair. A safety label, not an asset label:
 * no ID on it, because it is the identity label next to it that carries the ID
 * and this one has to be readable across a bench.
 *
 * No bend-radius figure is printed, and none ever will be: ETIA's rule, given
 * 2026-09-12, is that the guide is not bent at all. There is no minimum radius
 * to print because there is no radius that is allowed.
 */
function GuideWarning() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <svg viewBox="0 0 60 34" width="19mm" height="10.8mm" aria-hidden>
        <path d="M6 26 C 18 6, 42 6, 54 26" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 4 L50 32 M50 4 L10 32" stroke={RED()} strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div className="mt-[0.6mm] font-bold leading-none" style={{ fontSize: "3.4mm", color: RED() }}>
        DO NOT BEND
      </div>
      <div className="mt-[1mm] font-bold leading-tight" style={{ fontSize: "1.9mm", color: RED() }}>
        FRAGILE LIGHT GUIDE
        <br />
        DO NOT PULL / CRUSH
      </div>
      <div className="mt-[0.8mm] leading-tight" style={{ fontSize: "1.6mm", color: RED() }}>
        严禁弯折 · ห้ามดัด · KHÔNG UỐN
      </div>
      <div className="absolute inset-y-0 left-0 w-[1mm]" style={{ background: RED() }} />
    </div>
  );
}

/** Modules in this code's barcode — the label tool uses it to warn on density. */
export const barcodeModules = (code: string): number => {
  const { modules, quietZone } = code128(code);
  return modules + quietZone * 2;
};
