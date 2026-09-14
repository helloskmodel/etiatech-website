// Distributor-claim compliance check: `npm run validate:claims`.
// Pure static analysis — no build, no server.
//
// WHY THIS EXISTS
// ETIA's authorization covers OmniCure only, in specific territories — but the
// site also sells Phoseon, Fusion UV, Noblelight and infrared lines that carry
// no such appointment. An "authorized distributor" line anywhere near that
// catalogue reads as a claim over all of it, which overstates the appointment.
//
// So the rule is a hard allowlist, not a wording rule:
//
//   the authorized-distributor claim may appear ONLY in the two Insight
//   articles listed in ALLOWED. Everywhere else — badges, meta titles, FAQs,
//   JSON-LD, the Thai and Vietnamese pages, every other article — the site
//   says it supplies genuine product through authorized channels instead.
//
// If the appointment later widens, change ALLOWED; don't sprinkle the claim
// back across the site.

import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";

// The only two places the identity is stated.
const ALLOWED = [
  "content/insights/etia-thailand-authorized-omnicure-distributor.",
  "content/insights/etia-vietnam-local-warehouse-team-service.",
];

// "authorized distributor" and its equivalents in the four site languages.
// Deliberately does NOT match "authorized channel(s)" / "ช่องทางที่ได้รับอนุญาต"
// / "kênh được ủy quyền" / "授权渠道", which are the approved replacements.
const CLAIM =
  /authorized\s+(?:\w+®?\s+){0,3}(?:distributor|distribution|dealer|reseller)|授权(?:经销商|代理商?|分销商|合作商)|ตัวแทนจำหน่าย[^\n]{0,24}ที่ได้รับอนุญาต|nhà phân phối[^.,;\n]{0,40}ủy quyền/gi;

const errors = [];

for await (const file of glob([
  "components/**/*.ts",
  "components/**/*.tsx",
  "app/**/*.ts",
  "app/**/*.tsx",
  "data/**/*.ts",
  "content/**/*.md",
])) {
  if (ALLOWED.some((a) => file.startsWith(a))) continue;
  const text = readFileSync(file, "utf8");
  const isCode = !file.endsWith(".md");
  text.split("\n").forEach((line, i) => {
    // Source comments explain the rule; they are not claims shown to anyone.
    // Only in code: in Markdown a leading "*" is italics, not a comment — the
    // article footers that carry the claim are written exactly that way.
    if (isCode && /^\s*(\/\/|\*|\/\*)/.test(line)) return;
    CLAIM.lastIndex = 0;
    const m = CLAIM.exec(line);
    if (m) errors.push(`${file}:${i + 1}  «${m[0].slice(0, 50)}»\n      ${line.trim().slice(0, 150)}`);
  });
}

console.log(`authorized-distributor claims outside the two allowed articles: ${errors.length}`);
if (errors.length) {
  console.error("\n✗ the authorized-distributor claim belongs only in:");
  for (const a of ALLOWED) console.error(`    ${a}*`);
  console.error("  everywhere else, say the site supplies genuine product through");
  console.error("  authorized channels:\n");
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log("\n✓ the claim appears only in the two allowed Insight articles");
