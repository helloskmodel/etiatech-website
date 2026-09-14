// Distributor-claim compliance check: `npm run validate:claims`.
// Pure static analysis — no build, no server.
//
// WHY THIS EXISTS
// ETIA's OmniCure distributorship covers specific territories (Thailand and
// Vietnam), not the world. An "authorized distributor" claim with no territory
// attached overstates the appointment, so every such claim on the site must
// either name its territory or be written as the weaker, always-true statement:
// genuine products supplied through authorized channels.
//
// Rule enforced here:
//   an authorized-distributor claim is OK only if a territory is named nearby
//   ("Thailand", "Vietnam", "泰国", "越南", … or "designated/selected
//   territories" in any of the four site languages).
//
// Scope note: for Markdown articles the whole file is the window — an article
// that states the territory in its body qualifies the claim in its title and
// tags too. For .ts/.tsx the window is ±320 characters around the match,
// because those files hold many unrelated strings side by side.
//
// Thai and Vietnamese strings are exempt. `t()` selects by locale, so a `th:`
// or `vi:` field (and a .th.md / .vi.md article) is only ever shown to a
// visitor of that locale — Thailand and Vietnam, the two territories the
// appointment actually covers — which makes the claim true where it appears.
// The exemption is by locale, so adding a third locale does NOT inherit it.

import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";

const CLAIM =
  /authorized\s+(?:\w+®?\s+){0,3}(?:distributor|distribution|dealer|reseller)|授权(?:经销商|代理商?|分销商|合作商)|ตัวแทนจำหน่าย[^\n]{0,24}ที่ได้รับอนุญาต|nhà phân phối[^.,;\n]{0,40}ủy quyền/gi;

// A territory, in any of the four languages, or an explicit "only in the
// territories we are appointed for" hedge.
const TERRITORY =
  /Thailand|Vietnam|泰国|越南|ประเทศไทย|เวียดนาม|Thái Lan|Việt Nam|designated territories|selected products and territories|指定地区|ในพื้นที่ที่กำหนด|khu vực được chỉ định/i;

const LOCALE_EXEMPT = new Set(["th", "vi"]);

// Which locale a match belongs to. Two shapes occur:
//   inline   — `{ en: "…", th: "…" }`, several locales on one line
//   block    — `th: {` / `"vi": [` opening a locale-scoped section
// Try the inline keys on the line first, then walk back for the nearest block
// opener. Keys may be quoted (`"th":`), so the quote is optional.
const LOCALE_KEY = /(?:^|[{,[\s])"?(en|zh|th|vi)"?\s*:/g;
const LOCALE_BLOCK = /^\s*"?(en|zh|th|vi)"?\s*:\s*[[{]/;

function localeAt(lines, lineNo, line, index) {
  LOCALE_KEY.lastIndex = 0;
  let locale = null;
  for (const m of line.matchAll(LOCALE_KEY)) {
    if (m.index > index) break;
    locale = m[1];
  }
  if (locale) return locale;
  for (let i = lineNo - 1; i >= 0 && i > lineNo - 80; i--) {
    const b = LOCALE_BLOCK.exec(lines[i]);
    if (b) return b[1];
  }
  return null;
}

const errors = [];

for await (const file of glob(["components/**/*.ts", "components/**/*.tsx", "app/**/*.ts", "app/**/*.tsx", "data/**/*.ts", "content/**/*.md"])) {
  if (/\.(th|vi)\.md$/.test(file)) continue; // shown only in a held territory
  const text = readFileSync(file, "utf8");
  const wholeFileWindow = file.endsWith(".md");
  // An article that names its territory anywhere qualifies its own claims.
  if (wholeFileWindow && TERRITORY.test(text)) continue;

  const lines = text.split("\n");
  lines.forEach((line, i) => {
    // Source comments explain the rule; they are not claims shown to anyone.
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    CLAIM.lastIndex = 0;
    let m = null;
    for (let hit; (hit = CLAIM.exec(line)); ) {
      if (!LOCALE_EXEMPT.has(localeAt(lines, i, line, hit.index))) { m = hit; break; }
    }
    if (!m) return;
    const at = text.indexOf(line);
    const window = wholeFileWindow ? text : text.slice(Math.max(0, at - 320), at + line.length + 320);
    if (TERRITORY.test(window)) return;
    errors.push(`${file}:${i + 1}\n      ${line.trim().slice(0, 160)}`);
  });
}

console.log(`unqualified distributor claims: ${errors.length}`);
if (errors.length) {
  console.error("\n✗ every authorized-distributor claim must name its territory,");
  console.error("  or be rewritten as \"genuine products through authorized channels\":\n");
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log("\n✓ no unqualified authorized-distributor claim on the site");
