// Matching and ranking for the site search box.
//
// Kept apart from the component so the ranking can be exercised by
// `scripts/validate-search.mjs` without a browser: the thing most likely to
// break here is "does typing X still find Y", and that is a data question, not
// a rendering one.

export type SearchKind =
  | "product"
  | "part"
  | "application"
  | "insight"
  | "technology"
  | "industry"
  | "consumable"
  | "page";

export type SearchDoc = {
  k: SearchKind;
  t: string;
  s?: string;
  h: string;
  x?: string;
};

export type SearchHit = SearchDoc & { score: number };

/**
 * Fold a string for matching. Case and separators must not decide a hit: a
 * customer reading "012-64000R" off a label may type "012 64000 r", "01264000r"
 * or just "64000", and all three mean the same part.
 */
export const fold = (s: string) => s.toLowerCase().replace(/[\s\-_./·—–]/g, "");

/** The order groups appear in. Parts rank high: a part number is an unambiguous
 *  intent, where a word like "curing" is not. */
export const KIND_ORDER: SearchKind[] = [
  "product",
  "part",
  "consumable",
  "technology",
  "industry",
  "application",
  "insight",
  "page",
];

const KIND_BONUS: Record<SearchKind, number> = {
  product: 40,
  part: 30,
  consumable: 25,
  technology: 20,
  industry: 20,
  application: 10,
  insight: 10,
  page: 5,
};

/** Score one document against one already-folded token. 0 means no match. */
function scoreToken(doc: SearchDoc, token: string): number {
  const t = fold(doc.t);
  if (t === token) return 1000; // typed the exact part number or model
  if (t.startsWith(token)) return 600;
  if (t.includes(token)) return 400;
  // `x` carries part numbers, slugs and aliases that are not displayed.
  if (doc.x && fold(doc.x).includes(token)) return 200;
  if (doc.s && fold(doc.s).includes(token)) return 120;
  return 0;
}

/**
 * Rank `docs` against a raw query. Every token must match something, so
 * "omnicure lamp" narrows rather than widens. Returns at most `limit` hits,
 * best first.
 */
export function searchDocs(docs: SearchDoc[], query: string, limit = 12): SearchHit[] {
  const tokens = query.trim().split(/\s+/).map(fold).filter(Boolean);
  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];
  for (const doc of docs) {
    let total = 0;
    let matchedAll = true;
    for (const token of tokens) {
      const s = scoreToken(doc, token);
      if (s === 0) {
        matchedAll = false;
        break;
      }
      total += s;
    }
    if (!matchedAll) continue;
    // A shorter title matching the same query is the more specific answer:
    // "LX500" should outrank "LX500 V3 LED Head Assembly Specification Guide".
    total += KIND_BONUS[doc.k] - Math.min(fold(doc.t).length, 60) / 2;
    hits.push({ ...doc, score: total });
  }

  hits.sort((a, b) => b.score - a.score || a.t.length - b.t.length);
  return hits.slice(0, limit);
}

/** Group ranked hits for display, preserving KIND_ORDER. */
export function groupHits(hits: SearchHit[]): { kind: SearchKind; hits: SearchHit[] }[] {
  const by = new Map<SearchKind, SearchHit[]>();
  for (const h of hits) {
    const list = by.get(h.k);
    if (list) list.push(h);
    else by.set(h.k, [h]);
  }
  return KIND_ORDER.filter((k) => by.has(k)).map((kind) => ({ kind, hits: by.get(kind)! }));
}
