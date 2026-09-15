// Legal-entity check: `npm run validate:entities`. Pure static analysis —
// no build, no server.
//
// WHY THIS EXISTS
// The three ETIA companies are named on the site as legal counterparties: a
// customer reads the name off a card and writes it on a purchase order. Two
// ways of getting that wrong have already shipped:
//
//   1. A misspelling. The Thai company is ETIATECH; the site carried "Etiatec"
//      and "ETIATEC" — a dropped H — in two different casings at once. A pass
//      that fixed the .ts/.tsx files left twenty-one occurrences standing in
//      content/*.md, because the sweep was over code and the name also lives
//      in prose.
//   2. A wrong relationship. The Thailand and Vietnam companies are separately
//      incorporated, not subsidiaries. "Subsidiary" asserts ownership, which
//      is a different legal claim from "company in the same group".
//
// Neither is the kind of thing a type checker or a render test can see, and
// both read as plausible English. So they get a check of their own, over code
// and prose alike.

import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";

// Spellings that must never appear. The asset path /images/etiatec-thailand-
// office.jpg is lowercase and is a filename, not a name shown to anyone, so
// these patterns are deliberately case-sensitive.
const FORBIDDEN = [
  { re: /\bETIATEC\b(?!H)/g, why: 'missing H — the registered name is ETIATECH' },
  { re: /\bEtiatec\b(?!h)/g, why: 'missing H — the registered name is ETIATECH' },
  { re: /\bEtiatech\b/g, why: "wrong casing — house style is ETIATECH (see the Hong Kong and Vietnam names)" },
];

// Ownership claims. Thailand and Vietnam are separately incorporated companies
// in the ETIA group; nothing on the site may call them subsidiaries.
const OWNERSHIP = [
  { re: /subsidiar(?:y|ies)/gi, why: "asserts ownership — they are separately incorporated" },
  { re: /子公司/g, why: "asserts ownership — they are separately incorporated" },
  { re: /công ty con/gi, why: "asserts ownership — they are separately incorporated" },
  { re: /บริษัทลูก/g, why: "asserts ownership — they are separately incorporated" },
];

const errors = [];

for await (const file of glob([
  "components/**/*.ts",
  "components/**/*.tsx",
  "app/**/*.ts",
  "app/**/*.tsx",
  "data/**/*.ts",
  "content/**/*.md",
  "public/tools/*.json",
])) {
  const text = readFileSync(file, "utf8");
  // Source comments describe things — among them the Zalo account whose own
  // display name really is "Etiatech Việt Nam". They are not names shown to a
  // customer, so they are exempt. Only in code: in Markdown a leading "*" is
  // italics, and article footers are written exactly that way.
  const isCode = !file.endsWith(".md");
  text.split("\n").forEach((line, i) => {
    if (isCode && /^\s*(\/\/|\*|\/\*)/.test(line)) return;
    for (const { re, why } of [...FORBIDDEN, ...OWNERSHIP]) {
      re.lastIndex = 0;
      const m = re.exec(line);
      if (m) errors.push(`${file}:${i + 1}  «${m[0]}» — ${why}\n      ${line.trim().slice(0, 140)}`);
    }
  });
}

console.log(`entity-name problems: ${errors.length}`);
if (errors.length) {
  console.error("\n✗ the registered names are:");
  console.error("    ETIA-TECH (ASIA) Co., Limited   — Hong Kong, operates this website");
  console.error("    ETIATECH (THAILAND) Co., Ltd.   — บริษัท อีเทียเทค (ไทยแลนด์) จำกัด");
  console.error("    ETIA-TECH VIET NAM Co., Ltd.    — CÔNG TY TNHH ETIA-TECH VIỆT NAM");
  console.error("  and the three are separately incorporated, not parent and subsidiaries.\n");
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log("\n✓ entity names spelled as registered; no ownership claimed between them");
