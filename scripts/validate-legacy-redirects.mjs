// Legacy-redirect validation: run against a built server (npm run build &&
// npm start), then `npm run validate:redirects`
// (SEO_BASE_URL overrides http://localhost:3000).
//
// The /application/[slug] → live-page map in
// components/legacyApplicationRedirects.ts is hand-written: every entry is a
// judgement about which live page covers the same subject as a retired note.
// Nothing in the type system stops a destination from being misspelled or from
// being retired later, and a redirect to a 404 is worse for search than no
// redirect at all. So this checks, for every entry:
//
//   1. the old URL still answers with a permanent redirect (308)
//   2. it points at exactly the destination the map declares
//   3. that destination answers 200 (following one hop, so a destination that
//      is itself redirected is reported rather than silently chained)
//
// It also checks that an unmapped legacy slug still lands on /applications,
// so the catch-all stays behind the specific rules.

import { readFileSync } from "node:fs";

const BASE = process.env.SEO_BASE_URL || "http://localhost:3000";
const CONCURRENCY = 8;

const errors = [];
const err = (msg) => errors.push(msg);

// Read the map straight out of the TS source — no build step, no import of a
// .ts module from plain node. Matches the `"slug": HELPER("target"),` lines.
const src = readFileSync(new URL("../components/legacyApplicationRedirects.ts", import.meta.url), "utf8");
const PREFIX = { APP: "/applications/", INDUSTRY: "/solutions/", TECH: "/product/technology/" };
const entries = [...src.matchAll(/^\s*"([a-z0-9-]+)":\s*(APP|INDUSTRY|TECH)\("([^"]+)"\),/gm)].map(
  ([, slug, helper, target]) => [slug, `${PREFIX[helper]}${target}`]
);

if (entries.length === 0) err("no redirect entries parsed from legacyApplicationRedirects.ts");

const slugs = entries.map(([s]) => s);
for (const s of new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))) {
  err(`duplicate legacy slug: ${s}`);
}

async function check([slug, destination]) {
  const from = `/application/${slug}`;
  const r = await fetch(`${BASE}${from}`, { redirect: "manual" });
  if (r.status !== 308) {
    err(`${from}: expected 308, got ${r.status}`);
    return;
  }
  const location = (r.headers.get("location") || "").replace(BASE, "");
  if (location !== destination) {
    err(`${from}: redirects to ${location || "(nothing)"}, map says ${destination}`);
    return;
  }
  const d = await fetch(`${BASE}${destination}`, { redirect: "manual" });
  if (d.status !== 200) {
    err(`${from} → ${destination}: destination returned ${d.status}${d.headers.get("location") ? ` → ${d.headers.get("location")}` : ""}`);
  }
}

for (let i = 0; i < entries.length; i += CONCURRENCY) {
  await Promise.all(entries.slice(i, i + CONCURRENCY).map(check));
}

// An unmapped slug must still be caught by the catch-all behind these rules.
const unmapped = await fetch(`${BASE}/application/structural-composite-bonding`, { redirect: "manual" });
if (unmapped.status !== 308) err(`unmapped legacy slug: expected 308, got ${unmapped.status}`);
else if ((unmapped.headers.get("location") || "").replace(BASE, "") !== "/applications") {
  err(`unmapped legacy slug should fall through to /applications, got ${unmapped.headers.get("location")}`);
}

const byDest = {};
for (const [, d] of entries) byDest[d.split("/")[1]] = (byDest[d.split("/")[1]] || 0) + 1;

console.log(`legacy /application redirects mapped: ${entries.length}`);
console.log("by destination section:", JSON.stringify(byDest));
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):`);
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log("\n✓ every legacy redirect lands on a live page");
