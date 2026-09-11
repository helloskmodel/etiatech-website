// The three ETIA labels, drawn at their real printed size.
//
// Every label carries the same three renderings of the same code — text a
// person can read out, a Code 128 barcode a warehouse gun reads, and a QR a
// phone opens — because each of the three is the only one that works in some
// situation the other two do not. Nothing here is decorative.
//
// Sizes are in millimetres and the page prints at 100%. Do not switch these to
// px "to make them easier": a label that comes out 6% small does not fit the
// die-cut stock, and nobody notices until a roll has been run.
//
//   asset      50 × 25 mm  parts and consumables — the ETIA service label
//   equipment  50 × 30 mm  machines — the lamp-reorder entry point
//   lamp       50 × 30 mm  one per lamp, with the trade-in line
//   guide      70 × 25 mm  light guides — the do-not-bend warning, four languages
//
// Server component: the barcode and QR are computed once at render and the
// browser only has to print them.

import { code128Svg } from "./code128";
import { qrSvgPath } from "./qr";
import { formatSerial, serialTypes, serialUrl, type SerialType } from "./serial";

export type LabelTemplate = "asset" | "equipment" | "lamp" | "guide";

export const labelTemplates: Record<LabelTemplate, { w: number; h: number; title: string }> = {
  asset: { w: 50, h: 25, title: "Part / service label" },
  equipment: { w: 50, h: 30, title: "Equipment label (reorder)" },
  lamp: { w: 50, h: 30, title: "Lamp label (trade-in)" },
  guide: { w: 70, h: 25, title: "Light guide warning label" },
};

/** The template a code's type gets unless the operator overrides it. */
export const templateForType = (type: SerialType): LabelTemplate =>
  type === "L" ? "lamp" : type === "G" ? "guide" : type === "E" ? "equipment" : "asset";

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

const SERVICE_HOST = "etiatech.com/s";

export default function Label({ data, template }: { data: LabelData; template: LabelTemplate }) {
  const { w, h } = labelTemplates[template];
  return (
    <div
      className="label relative box-border overflow-hidden border border-black bg-white text-black"
      style={{ width: `${w}mm`, height: `${h}mm`, padding: "1.6mm" }}
    >
      {template === "guide" ? <GuideLabel data={data} /> : <AssetLabel data={data} template={template} />}
    </div>
  );
}

// ---------------------------------------------------------------------------

function Qr({ code, size }: { code: string; size: number }) {
  const { path, extent } = qrSvgPath(serialUrl(code));
  return (
    <svg
      viewBox={`0 0 ${extent} ${extent}`}
      width={`${size}mm`}
      height={`${size}mm`}
      shapeRendering="crispEdges"
      aria-label={serialUrl(code)}
    >
      <rect width={extent} height={extent} fill="#fff" />
      <path d={path} fill="#000" />
    </svg>
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

function AssetLabel({ data, template }: { data: LabelData; template: LabelTemplate }) {
  const lamp = template === "lamp";
  const equipment = template === "equipment";
  return (
    <div className="flex h-full gap-[1.5mm]">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline justify-between leading-none">
          <span className="font-bold tracking-tight" style={{ fontSize: "2.6mm" }}>
            ETIA<span className="font-normal"> · SERVICE</span>
          </span>
          <span style={{ fontSize: "1.8mm" }}>{serialTypes[data.type].short.en}</span>
        </div>

        <div className="mt-[0.8mm] font-bold leading-tight" style={{ fontSize: "3.4mm" }}>
          {data.pn}
        </div>
        <div className="truncate text-black/80" style={{ fontSize: "1.9mm", lineHeight: 1.4 }}>
          {data.name}
        </div>

        {lamp ? (
          <div className="mt-[0.6mm] leading-tight" style={{ fontSize: "1.8mm" }}>
            {data.batch ? `Batch ${data.batch} · ` : ""}
            {data.issued ?? ""}
          </div>
        ) : equipment ? (
          // The label on a machine is the one that has to earn its place. The
          // system and its lamp both count hours, so the customer finds out the
          // lamp is due from the machine itself — and at that moment the nearest
          // thing to hand is this label. It has to send them to us rather than
          // to a search engine, so it says what to do, not who we are.
          <div className="mt-[1mm] font-bold" style={{ fontSize: "1.9mm", lineHeight: 1.35 }}>
            灯泡到期？扫码订购
            <br />
            <span className="font-normal">Lamp due? Scan to reorder</span>
          </div>
        ) : (
          <div className="mt-[0.6mm] leading-tight text-black/80" style={{ fontSize: "1.7mm" }}>
            Service &amp; spares · 服务与备件
            <br />
            sales@etia-tech.com
          </div>
        )}

        <div className="mt-auto">
          <Barcode code={data.code} width={30} height={lamp || equipment ? 5 : 4.5} />
          <div className="flex items-baseline justify-between leading-none" style={{ fontSize: "2.1mm" }}>
            <span className="font-mono font-bold tracking-tight">{formatSerial(data.code)}</span>
            <span style={{ fontSize: "1.7mm" }}>{SERVICE_HOST}</span>
          </div>
          {lamp && (
            <div className="mt-[0.7mm] leading-tight" style={{ fontSize: "1.8mm" }}>
              扫码登记 · 以旧换新 · Trade-in
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center justify-center">
        <Qr code={data.code} size={lamp || equipment ? 15 : 14} />
      </div>
    </div>
  );
}

/**
 * The light guide label. This one is a safety label first and an asset label
 * second, so the warning takes the space and the code is small but present.
 *
 * Four languages because a guide crosses borders inside a machine and the
 * person who kinks it is whoever unpacks it. No bend-radius figure is printed:
 * ETIA has not stated one, and a number invented for a label is worse than the
 * plain rule, which is that it must not be bent at all.
 */
function GuideLabel({ data }: { data: LabelData }) {
  return (
    <div className="flex h-full gap-[1.5mm]">
      <div className="flex shrink-0 items-center">
        <svg viewBox="0 0 24 22" width="9mm" height="9mm" aria-hidden>
          <path d="M12 1 L23 21 L1 21 Z" fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 8 v6" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="17.6" r="1.2" fill="#000" />
        </svg>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center leading-tight">
        <div className="font-bold" style={{ fontSize: "2.9mm" }}>
          DO NOT BEND OR KINK
        </div>
        <div style={{ fontSize: "2.3mm" }}>严禁弯折・打死弯</div>
        <div style={{ fontSize: "2.1mm" }}>ห้ามดัดหรือหักพับ · KHÔNG UỐN GẬP</div>
        <div className="mt-[0.5mm] text-black/80" style={{ fontSize: "1.7mm" }}>
          Damage is permanent and often invisible
          <br />
          损伤不可逆，且往往看不出来 · ETIA light guide
        </div>
        <div className="mt-[0.8mm]">
          <Barcode code={data.code} width={26} height={3.6} />
          <div className="flex items-baseline gap-[1.5mm] leading-none" style={{ fontSize: "1.9mm" }}>
            <span className="font-mono font-bold">{formatSerial(data.code)}</span>
            <span style={{ fontSize: "1.6mm" }}>{SERVICE_HOST}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        <Qr code={data.code} size={13} />
      </div>
    </div>
  );
}
