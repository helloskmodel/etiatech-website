#!/usr/bin/env node
// Validate locale JSON files against the master (en).
// Detects: missing keys, extra keys, empty values, and inconsistent array lengths.
// Usage: node scripts/validate-locales.mjs   (exits 1 if any issue is found)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "i18n");
const MASTER = "en";
const LOCALES = ["en", "zh", "th", "vi"];

function load(locale) {
  return JSON.parse(readFileSync(join(DIR, `${locale}.json`), "utf8"));
}

// Flatten to dot-paths. Arrays become `key[i]` entries plus a `key.__len__` marker.
function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      out[`${path}.__len__`] = v.length;
      v.forEach((item, i) => {
        if (item && typeof item === "object") flatten(item, `${path}[${i}]`, out);
        else out[`${path}[${i}]`] = item;
      });
    } else if (v && typeof v === "object") {
      flatten(v, path, out);
    } else {
      out[path] = v;
    }
  }
  return out;
}

const master = flatten(load(MASTER));
const masterKeys = new Set(Object.keys(master));
let problems = 0;

for (const locale of LOCALES) {
  const flat = flatten(load(locale));
  const keys = new Set(Object.keys(flat));
  const issues = [];

  // Missing keys (present in master, absent here) — skip for master itself
  if (locale !== MASTER) {
    for (const k of masterKeys) if (!keys.has(k)) issues.push(`MISSING   ${k}`);
    // Extra keys (present here, absent in master)
    for (const k of keys) if (!masterKeys.has(k)) issues.push(`EXTRA     ${k}`);
    // Array length mismatches
    for (const k of masterKeys) {
      if (k.endsWith(".__len__") && keys.has(k) && flat[k] !== master[k]) {
        issues.push(`ARRAYLEN  ${k.replace(".__len__", "")} — en=${master[k]} ${locale}=${flat[k]}`);
      }
    }
  }
  // Empty values (empty string / null) — checked for every locale
  for (const [k, v] of Object.entries(flat)) {
    if (k.endsWith(".__len__")) continue;
    if (v === "" || v === null) issues.push(`EMPTY     ${k}`);
  }

  if (issues.length) {
    problems += issues.length;
    console.log(`\n✗ ${locale}.json — ${issues.length} issue(s):`);
    for (const i of issues) console.log(`   ${i}`);
  } else {
    console.log(`✓ ${locale}.json — OK (${keys.size} keys)`);
  }
}

if (problems) {
  console.log(`\n${problems} issue(s) found across locale files.`);
  process.exit(1);
}
console.log("\nAll locale files are consistent. ✅");
