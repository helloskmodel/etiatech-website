"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Loader2, CornerDownLeft, X } from "lucide-react";
import { useLocale, t, type LangText, type Locale } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { searchDocs, groupHits, type SearchDoc, type SearchKind } from "@/components/siteSearch";

// One box that finds anything on the site: a model, a part number off a label,
// an application, an article.
//
// The index is fetched on first interaction, not on page load. It is ~700 rows
// and nobody who never touches the box should pay for it — so the home page's
// initial payload is unchanged and the first keystroke costs one cached request.
//
// Results appear inline. There is deliberately no /search results page: a
// search-results URL is thin, duplicated content that Google asks you not to
// have indexed, and this catalogue is small enough that the answer fits in the
// panel anyway.

const KIND_LABEL: Record<SearchKind, LangText> = {
  product: { en: "Products", zh: "产品", th: "ผลิตภัณฑ์", vi: "Sản phẩm" },
  part: { en: "Part numbers", zh: "料号", th: "รหัสอะไหล่", vi: "Mã phụ tùng" },
  consumable: { en: "Consumables", zh: "耗材", th: "วัสดุสิ้นเปลือง", vi: "Vật tư tiêu hao" },
  technology: { en: "By technology", zh: "按技术", th: "ตามเทคโนโลยี", vi: "Theo công nghệ" },
  industry: { en: "By industry", zh: "按行业", th: "ตามอุตสาหกรรม", vi: "Theo ngành" },
  application: { en: "Applications", zh: "应用", th: "การใช้งาน", vi: "Ứng dụng" },
  insight: { en: "Insights", zh: "技术洞察", th: "ความรู้", vi: "Kiến thức" },
  page: { en: "Pages", zh: "页面", th: "หน้า", vi: "Trang" },
};

const PLACEHOLDER: LangText = {
  en: "Search a model, part number or application…",
  zh: "搜索型号、料号或应用…",
  th: "ค้นหารุ่น รหัสอะไหล่ หรือการใช้งาน…",
  vi: "Tìm model, mã phụ tùng hoặc ứng dụng…",
};

// Shown under the box before anything is typed: the three shapes of query the
// catalogue actually answers, as tappable examples.
const EXAMPLES = ["S2000 Elite", "012-68000R", "LX500"];

export default function SiteSearch({ autoFocus = false }: { autoFocus?: boolean }) {
  const { locale } = useLocale();
  const router = useRouter();

  const [query, setQuery] = useState("");
  // The fetched index, tagged with the locale it was fetched for. Keeping the
  // locale alongside the rows means a language switch invalidates the cache by
  // derivation — no effect, no extra render.
  const [cache, setCache] = useState<{ locale: Locale; docs: SearchDoc[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // Which row is highlighted, tagged with the query it belongs to. A new query
  // resets the highlight by derivation rather than by an effect.
  const [cursor, setCursor] = useState({ q: "", i: 0 });

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // An index in the wrong language is no index at all.
  const docs = cache && cache.locale === locale ? cache.docs : null;

  // Fetch once, on the first sign of intent (focus or typing) — and again after
  // a language switch, because `docs` goes null with it.
  const loadIndex = () => {
    if (docs || loading) return;
    const want = locale;
    setLoading(true);
    fetch(`/search-index/${want}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d: SearchDoc[]) => setCache({ locale: want, docs: Array.isArray(d) ? d : [] }))
      .catch(() => setCache({ locale: want, docs: [] })) // a failed index must not break the page
      .finally(() => setLoading(false));
  };

  const hits = useMemo(() => (docs ? searchDocs(docs, query) : []), [docs, query]);
  const groups = useMemo(() => groupHits(hits), [hits]);
  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);

  // Close on Escape or a click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(localizeHref(href, locale));
  };

  const active = cursor.q === query ? cursor.i : 0;
  const moveTo = (i: number) => setCursor({ q: query, i });

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (flat.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveTo((active + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveTo((active - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = flat[active];
      if (hit) go(hit.h);
    }
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#98A2B3]" />
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          autoComplete="off"
          autoFocus={autoFocus}
          value={query}
          placeholder={t(PLACEHOLDER, locale)}
          aria-label={t(PLACEHOLDER, locale)}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="site-search-results"
          onFocus={() => {
            loadIndex();
            setOpen(true);
          }}
          onChange={(e) => {
            loadIndex();
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          className="w-full rounded-2xl border border-[#D9E4EA] bg-white py-3.5 pl-12 pr-11 text-sm text-[#102A43] shadow-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#1A56DB] focus:ring-4 focus:ring-[#1A56DB]/10 sm:text-base [&::-webkit-search-cancel-button]:appearance-none"
        />
        {loading && <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#98A2B3]" />}
        {!loading && query && (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#98A2B3] transition hover:bg-[#F1F5F9] hover:text-[#475467]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Example queries, until the visitor types their own. */}
      {!query && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                loadIndex();
                setQuery(ex);
                setOpen(true);
                inputRef.current?.focus();
              }}
              className="rounded-full border border-[#D9E4EA] bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-[#475467] transition hover:border-[#1A56DB]/40 hover:text-[#1A56DB]"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {showPanel && (
        <div
          id="site-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-2 max-h-[60vh] overflow-y-auto overscroll-contain rounded-2xl border border-[#D9E4EA] bg-white p-2 shadow-[0_24px_70px_rgba(15,36,68,.16)]"
        >
          {loading && !docs && (
            <p className="px-3 py-4 text-sm text-[#667085]">
              {t({ en: "Loading…", zh: "加载中…", th: "กำลังโหลด…", vi: "Đang tải…" }, locale)}
            </p>
          )}

          {docs && flat.length === 0 && (
            <div className="px-3 py-4">
              <p className="text-sm font-semibold text-[#102A43]">
                {t({ en: "No match", zh: "没有找到", th: "ไม่พบผลลัพธ์", vi: "Không có kết quả" }, locale)}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#667085]">
                {t(
                  {
                    en: "Tell us what you are curing and we will find the right system — or send the part number straight to our team.",
                    zh: "告诉我们您要固化什么，我们帮您选型——也可以直接把料号发给我们。",
                    th: "บอกเราว่าคุณต้องการบ่มอะไร เราจะช่วยเลือกระบบที่เหมาะสม — หรือส่งรหัสอะไหล่มาที่ทีมงานได้เลย",
                    vi: "Cho chúng tôi biết bạn cần đóng rắn gì, chúng tôi sẽ tìm hệ thống phù hợp — hoặc gửi thẳng mã phụ tùng cho đội ngũ.",
                  },
                  locale
                )}
              </p>
              <Link
                href={localizeHref("/inquiry", locale)}
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#1A56DB] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#143C96]"
              >
                {t({ en: "Send an inquiry", zh: "发送询单", th: "ส่งคำขอ", vi: "Gửi yêu cầu" }, locale)}
                <CornerDownLeft className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {groups.map((group) => (
            <div key={group.kind} className="px-1 py-1">
              <p className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#98A2B3]">
                {t(KIND_LABEL[group.kind], locale)}
              </p>
              {group.hits.map((hit) => {
                const i = flat.indexOf(hit);
                return (
                  <Link
                    key={`${hit.k}-${hit.h}-${hit.t}`}
                    href={localizeHref(hit.h, locale)}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => moveTo(i)}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`block rounded-xl px-2.5 py-2 transition ${i === active ? "bg-[#F3F7FF]" : "hover:bg-[#F7FAFC]"}`}
                  >
                    <span className="block text-sm font-semibold leading-snug text-[#102A43]">{hit.t}</span>
                    {hit.s && <span className="mt-0.5 block truncate text-xs text-[#667085]">{hit.s}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
