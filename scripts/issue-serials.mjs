// The code issuer. Every ETIA label code comes from here and nowhere else —
// that is the whole point of one system: two people printing labels in two
// cities cannot produce the same code, and every code that was ever printed
// is in the registry with what it was issued against.
//
//   node scripts/issue-serials.mjs --sku L02C007 --qty 50 --batch EX26-07
//   node scripts/issue-serials.mjs --sku L02C085 --qty 1 --type P
//   node scripts/issue-serials.mjs --list L02C007
//
// Unit types (E, L, G) issue one code per piece. SKU types (P) issue one code
// for the part number, reprinted as often as needed; asking for more is a
// mistake the script refuses rather than silently honours.
//
// The registry is append-only. Nothing is ever renumbered: a code on a box in
// a customer's plant has to keep meaning what it meant the day it was stuck on.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MASTER = path.join(ROOT, "data", "skuMaster.json");
const REGISTRY = path.join(ROOT, "data", "serialRegistry.json");

// Same algorithm as components/labels/serial.ts. Kept in both places on
// purpose: this script must run with no build step, and the site must check
// codes with no script. If one changes, change the other.
const TYPE_DIGIT = { E: "1", P: "2", L: "3", G: "4" };
function checkDigit(digits) {
  let factor = 2;
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    const addend = factor * Number(digits[i]);
    factor = 3 - factor;
    sum += Math.floor(addend / 10) + (addend % 10);
  }
  return String((10 - (sum % 10)) % 10);
}
const build = (type, year, seq) => {
  const digits = `${TYPE_DIGIT[type]}${String(year % 100).padStart(2, "0")}${String(seq).padStart(6, "0")}`;
  return `ET${type}${digits.slice(1)}${checkDigit(digits)}`;
};

const UNIT_LEVEL = new Set(["E", "L", "G"]);

function args(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith("--")) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    out[key] = next && !next.startsWith("--") ? next : true;
  }
  return out;
}

const a = args(process.argv.slice(2));
const master = JSON.parse(fs.readFileSync(MASTER, "utf8"));
const registry = fs.existsSync(REGISTRY)
  ? JSON.parse(fs.readFileSync(REGISTRY, "utf8"))
  : { note: "Append-only. Issued by scripts/issue-serials.mjs; never edit by hand.", records: [] };

if (a.list) {
  const rows = registry.records.filter((r) => a.list === true || r.sku === a.list);
  for (const r of rows) console.log(`${r.code}  ${r.type}  ${r.sku.padEnd(14)} ${r.pn.padEnd(18)} ${r.issued}${r.batch ? "  " + r.batch : ""}`);
  console.log(`${rows.length} code(s)`);
  process.exit(0);
}

if (!a.sku) {
  console.error("usage: node scripts/issue-serials.mjs --sku <存货编码> [--qty N] [--type E|P|L|G] [--batch X] [--note X]");
  console.error("       node scripts/issue-serials.mjs --list [存货编码]");
  process.exit(1);
}

const item = master.items.find((i) => i.sku === a.sku);
if (!item) {
  console.error(`no such 存货编码 in data/skuMaster.json: ${a.sku}`);
  process.exit(1);
}

const type = (a.type || item.type).toUpperCase();
if (!"EPLG".includes(type) || type.length !== 1) {
  console.error(`type must be one of E P L G, got ${type}`);
  process.exit(1);
}

const qty = a.qty ? Number(a.qty) : 1;
if (!Number.isInteger(qty) || qty < 1 || qty > 5000) {
  console.error(`--qty must be 1..5000, got ${a.qty}`);
  process.exit(1);
}

if (!UNIT_LEVEL.has(type)) {
  const existing = registry.records.find((r) => r.sku === item.sku && r.type === type);
  if (existing) {
    console.log(`${item.sku} already carries a part-number code — reprint it, do not issue another:`);
    console.log(`  ${existing.code}   ${existing.pn}  ${item.name}`);
    process.exit(0);
  }
  if (qty !== 1) {
    console.error(`type ${type} is a part-number code: one code covers every piece. Re-run with --qty 1.`);
    process.exit(1);
  }
}

const year = new Date().getFullYear();
const used = registry.records.filter((r) => r.type === type && r.year === year);
let seq = used.reduce((max, r) => Math.max(max, r.seq), 0);
if (seq + qty > 999_999) {
  console.error(`sequence space for ${type}${year % 100} is full`);
  process.exit(1);
}

const issued = new Date().toISOString().slice(0, 10);
const fresh = [];
for (let i = 0; i < qty; i++) {
  seq += 1;
  fresh.push({
    code: build(type, year, seq),
    type,
    year,
    seq,
    level: UNIT_LEVEL.has(type) ? "unit" : "sku",
    sku: item.sku,
    pn: item.pn,
    name: item.name,
    issued,
    ...(typeof a.batch === "string" ? { batch: a.batch } : {}),
    ...(typeof a.note === "string" ? { note: a.note } : {}),
  });
}

registry.records.push(...fresh);
fs.writeFileSync(REGISTRY, JSON.stringify(registry, null, 1) + "\n");

console.log(`${fresh.length} code(s) for ${item.sku} — ${item.pn} — ${item.name}`);
for (const r of fresh) console.log(`  ${r.code}`);
console.log(`\nregistry: ${registry.records.length} code(s) total → data/serialRegistry.json`);
console.log(`print them: /tools/labels?codes=${fresh.map((r) => r.code).join(",")}`);
