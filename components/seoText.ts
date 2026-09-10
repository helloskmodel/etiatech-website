// Meta-tag text helpers. Titles and descriptions come from many places —
// product intros, article frontmatter, hand-written meta strings in four
// languages — and Google shows roughly 60 characters of a title and 155 of a
// description before cutting mid-word. These trim to that budget at a
// sentence, clause or word boundary so the snippet still reads as a sentence.

export const SITE_URL = "https://www.etiatech.com";

// Site-wide fallback for link previews: the UV curing key visual, cropped by
// COS to the 1200×630 that Open Graph consumers expect (76 KB).
export const DEFAULT_OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/UVCURING.jpg?imageMogr2/thumbnail/1200x/crop/1200x630/gravity/center";

const SENTENCE_END = /[.!?。！？](?=\s|$)/g;
const CLAUSE_END = /[;:,，；、](?=\s|$)|\s[—–-]\s/g;

function lastMatchEnd(re: RegExp, s: string, floor: number): number {
  let end = -1;
  for (const m of s.matchAll(re)) {
    const e = m.index + m[0].length;
    if (e >= floor) end = e;
  }
  return end;
}

/** Trim a description to `max` characters without leaving a broken sentence. */
export function seoDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max);
  const floor = Math.floor(max * 0.55);
  const sentence = lastMatchEnd(SENTENCE_END, head, floor);
  if (sentence > 0) return head.slice(0, sentence).trim();
  const clause = lastMatchEnd(CLAUSE_END, head, floor);
  if (clause > 0) return head.slice(0, clause).replace(/[\s;:,，；、—–-]+$/, "") + "…";
  const word = head.lastIndexOf(" ");
  // Thai and Chinese run without spaces; cut on the character then.
  return (word >= floor ? head.slice(0, word) : head.slice(0, max - 1)) + "…";
}

/**
 * Build a `<title>` that fits: `main | ETIA`, and when the headline is long,
 * drop its trailing segments — the product list after a pipe, the subtitle
 * after a colon or dash — before touching the words that carry the meaning.
 * The page keeps its full H1; only the tab and the search result shorten.
 */
export function seoTitle(main: string, brand = "ETIA", max = 60): string {
  let m = main.trim().replace(/\s*[|—–-]\s*ETIA( Technology)?\s*$/, "");
  const fits = (s: string) => `${s} | ${brand}`.length <= max;
  if (!fits(m)) m = m.split(/\s*\|\s*/)[0];
  if (!fits(m)) {
    const cut = m.search(/[:：?？]\s|[:：？](?=\S)|\s[—–]\s|——/);
    if (cut >= 20) m = m.slice(0, cut + (/[?？]/.test(m[cut]) ? 1 : 0));
  }
  return `${m} | ${brand}`;
}
