// Turn ETIA's inventory export into the SKU master the label system issues
// codes against.
//
//   node scripts/build-sku-master.mjs <inventory.xlsx>
//
// The export has three columns that matter and they are not named the way you
// would guess: 存货编码 is ETIA's own item code, 存货名称 holds the
// manufacturer's part number, and 规格型号 holds the description. The rest
// (category, origin, stock unit) comes through as-is.
//
// Re-run this whenever the inventory changes and commit the result. Codes
// already issued are keyed by 存货编码, so a description that gets tidied up
// in the ERP does not invalidate a label that is already on a box.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const OUT = path.join(process.cwd(), "data", "skuMaster.json");

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/build-sku-master.mjs <inventory.xlsx>");
  process.exit(1);
}

// openpyxl is the one dependency, and it stays out of package.json: this runs
// by hand a few times a year, not in the build.
const py = `
import json, sys, openpyxl
wb = openpyxl.load_workbook(sys.argv[1], data_only=True)
ws = wb[wb.sheetnames[0]]
rows = list(ws.iter_rows(values_only=True))
hdr = [str(c).strip() if c else '' for c in rows[0]]
out = []
for r in rows[1:]:
    if not any(r): continue
    d = dict(zip(hdr, ['' if c is None else str(c).strip() for c in r]))
    out.append(d)
json.dump(out, sys.stdout, ensure_ascii=False)
`;
const raw = JSON.parse(execFileSync("python3", ["-c", py, src], { maxBuffer: 32 << 20 }).toString());

const LAMP = /^(012-\d|300-00009|300-60651|80002022|558434)/;
const GUIDE_PN = /^(805-|806-|SR\d)/;
const GUIDE_TEXT = /导光管|光导管|[Ll]ight ?[Gg]uide|Liquid Fill|High Power Fiber|光纤/;

/** What kind of code this SKU should carry. The issuing script can override. */
function guessType(d) {
  const pn = d["存货名称"] || "";
  const text = `${pn} ${d["规格型号"] || ""}`;
  if (LAMP.test(pn) || /无极灯管|MH-Lamp|200W (UV )?Lamp|Spare .*Lamp/i.test(text)) return "L";
  if (GUIDE_PN.test(pn) && GUIDE_TEXT.test(text)) return "G";
  // 010- is the catalogue's prefix for systems and the heads sold as systems;
  // 台 catches what the warehouse itself counts as a machine. Both are worth a
  // code of their own. A batch can still be issued as another type on the
  // command line when the operator knows better.
  if (/^010-/.test(pn) || d["库存常用单位"] === "台") return "E";
  return "P";
}

const items = raw
  .map((d) => ({
    sku: d["存货编码"],
    pn: d["存货名称"],
    name: d["规格型号"],
    category: d["所属类别"],
    origin: d["产地"],
    unit: d["库存常用单位"],
    type: guessType(d),
  }))
  .filter((i) => i.sku)
  .sort((a, b) => a.sku.localeCompare(b.sku));

const seen = new Set();
for (const i of items) {
  if (seen.has(i.sku)) console.warn(`duplicate 存货编码, later row wins: ${i.sku}`);
  seen.add(i.sku);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), items }, null, 1) + "\n");

const byType = items.reduce((a, i) => ((a[i.type] = (a[i.type] || 0) + 1), a), {});
console.log(`${items.length} SKUs → ${path.relative(process.cwd(), OUT)}`);
console.log("by code type:", byType);
