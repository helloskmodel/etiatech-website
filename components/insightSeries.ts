// Article series shown on the Insights cards.
//
// A series gives a set of articles one shared eyebrow line — "UV Curing
// Fundamentals · 3" — and one shared colour, so a reader scanning the index
// sees at a glance that ten of the cards belong together and in what order.
//
// The colour belongs to the series, not to the card: the next series picks its
// own tint here and every article in it follows, with no change to the grid.
//
// The label has to be localized, and only the English frontmatter is read for
// an article's metadata, so the four-language label lives here while the
// article's frontmatter carries just `series` (the id) and `seriesNo` (its
// place in the run).

import { type LangText, type Locale, t } from "./LocaleContext";

export type SeriesId = "uv-basics";

type Series = {
  label: LangText;
  /** Card panel background. Keep it pale — the headline sits on top of it. */
  tint: string;
  /** Headline colour on that panel. */
  ink: string;
  /** Eyebrow colour on that panel. */
  accent: string;
};

const SERIES: Record<SeriesId, Series> = {
  "uv-basics": {
    label: {
      en: "UV Curing Fundamentals",
      zh: "UV 固化基础知识",
      th: "พื้นฐานการบ่มด้วยแสง UV",
      vi: "Kiến thức nền tảng về sấy UV",
    },
    tint: "#EAF2FE",
    ink: "#143C96",
    accent: "#1A56DB",
  },
};

// Chinese readers count a series in hanzi; everyone else gets the digit.
const HANZI = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

const FALLBACK: Omit<Series, "label"> = { tint: "#EEF1F5", ink: "#143C96", accent: "#1A56DB" };

/** Panel colours for an article's series. Falls back to a neutral tint. */
export function seriesStyle(id: string | undefined): Omit<Series, "label"> {
  const s = SERIES[id as SeriesId];
  return s ? { tint: s.tint, ink: s.ink, accent: s.accent } : FALLBACK;
}

/** "UV 固化基础知识 · 三" / "UV Curing Fundamentals · 3". Empty when unknown. */
export function seriesEyebrow(id: string | undefined, no: number | undefined, locale: Locale): string {
  const s = SERIES[id as SeriesId];
  if (!s) return "";
  const name = t(s.label, locale);
  if (!no) return name;
  const numeral = locale === "zh" && no >= 1 && no <= 10 ? HANZI[no] : String(no);
  return `${name} · ${numeral}`;
}
