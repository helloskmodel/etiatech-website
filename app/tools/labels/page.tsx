import type { Metadata } from "next";
import Label, { labelTemplates, templateForType, type LabelTemplate, type LabelData } from "@/components/labels/Label";
import { lookupSerial, recentSerials } from "@/components/labels/registry";
import { formatSerial, normalizeSerial, serialTypes } from "@/components/labels/serial";

export const metadata: Metadata = {
  title: "Label printing — ETIA",
  robots: { index: false, follow: false, nocache: true },
};

// The label printer. Internal, unlisted, noindex.
//
//   /tools/labels?codes=ETL260000017,ETL260000025
//
// `scripts/issue-serials.mjs` prints this URL when it issues codes, so the
// operator's whole job is: issue, click, print. Codes are looked up in the
// registry, so a code that was never issued cannot be printed — which is the
// point of having one issuer.
//
// No client JavaScript: the controls are a GET form and the print button is
// the browser's own. A tool that has to work on a warehouse PC with whatever
// browser is on it should not depend on hydration.

const TEMPLATES = Object.keys(labelTemplates) as LabelTemplate[];

export default async function LabelToolPage({
  searchParams,
}: {
  searchParams: Promise<{ codes?: string; template?: string; copies?: string }>;
}) {
  const sp = await searchParams;

  const requested = (sp.codes ?? "")
    .split(/[\s,;]+/)
    .map(normalizeSerial)
    .filter(Boolean);

  const forced = TEMPLATES.includes(sp.template as LabelTemplate) ? (sp.template as LabelTemplate) : undefined;
  const copies = Math.min(Math.max(Number(sp.copies) || 1, 1), 20);

  const resolved = requested.map((code) => ({ code, lookup: lookupSerial(code) }));
  const printable: { data: LabelData; template: LabelTemplate }[] = [];
  const problems: { code: string; why: string }[] = [];

  for (const { code, lookup } of resolved) {
    if (lookup.status === "invalid") {
      problems.push({ code, why: `not a valid ETIA code (${lookup.reason})` });
      continue;
    }
    if (lookup.status === "unknown") {
      problems.push({ code: formatSerial(code), why: "well formed, but never issued — issue it first" });
      continue;
    }
    const r = lookup.record;
    const data: LabelData = {
      code: r.code,
      type: r.type,
      pn: r.pn,
      name: r.name,
      ...(r.batch ? { batch: r.batch } : {}),
      issued: r.issued,
    };
    const template = forced ?? templateForType(r.type);
    for (let i = 0; i < copies; i++) printable.push({ data, template });
  }

  const recent = recentSerials(24);

  return (
    <>
      {/* Printing rules live with the tool rather than in globals.css: nothing
          else on the site prints, and a sheet of labels has to come out at
          exactly 100% or it will not line up with the die-cut stock. */}
      <style>{`
        @page { size: A4; margin: 8mm; }
        @media print {
          .no-print { display: none !important; }
          .sheet { padding: 0 !important; }
          .label { break-inside: avoid; }
        }
      `}</style>

      <div className="no-print border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h1 className="text-xl font-bold">ETIA label printing</h1>
          <p className="mt-1 text-sm text-gray-600">
            Codes come from <code className="rounded bg-gray-100 px-1">scripts/issue-serials.mjs</code>. Paste them here,
            check the sheet, print at 100% — no scaling, no “fit to page”.
          </p>

          <form method="get" className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Codes</span>
              <input
                name="codes"
                defaultValue={sp.codes ?? ""}
                placeholder="ETL260000017, ETL260000025"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Template</span>
              <select
                name="template"
                defaultValue={forced ?? ""}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">By type</option>
                {TEMPLATES.map((k) => (
                  <option key={k} value={k}>
                    {labelTemplates[k].title} · {labelTemplates[k].w}×{labelTemplates[k].h} mm
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Copies</span>
              <input
                name="copies"
                type="number"
                min={1}
                max={20}
                defaultValue={copies}
                className="mt-1 w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </label>
            <button type="submit" className="rounded-lg bg-[#1A56DB] px-5 py-2 text-sm font-bold text-white">
              Build sheet
            </button>
          </form>

          {problems.length > 0 && (
            <ul className="mt-4 space-y-1 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
              {problems.map((p) => (
                <li key={p.code}>
                  <code className="font-mono font-bold">{p.code}</code> — {p.why}
                </li>
              ))}
            </ul>
          )}

          {printable.length > 0 && (
            <p className="mt-4 text-xs text-gray-500">
              {printable.length} label{printable.length === 1 ? "" : "s"} ready. Print with the browser (Ctrl/Cmd-P),
              scale 100%, background graphics on.
            </p>
          )}
        </div>
      </div>

      <div className="sheet mx-auto max-w-5xl p-6">
        {printable.length === 0 ? (
          <div className="no-print rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-sm text-gray-500">
            <p className="font-semibold text-gray-700">Nothing to print yet.</p>
            <p className="mt-2">
              Issue codes first, then paste them above. Recently issued codes ({recent.length} shown):
            </p>
            <ul className="mt-4 space-y-1 font-mono text-xs">
              {recent.map((r) => (
                <li key={r.code}>
                  <a className="text-[#1A56DB] underline" href={`/tools/labels?codes=${r.code}`}>
                    {formatSerial(r.code)}
                  </a>{" "}
                  <span className="text-gray-400">
                    {serialTypes[r.type].short.en} · {r.pn} · {r.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-wrap gap-[3mm]">
            {printable.map((l, i) => (
              <Label key={`${l.data.code}-${i}`} data={l.data} template={l.template} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
