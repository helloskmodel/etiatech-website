"use client";
import { useMemo, useState } from "react";
import { Plus, Check, Clock, Search } from "lucide-react";
import { partFamilies, parts, partTypesForModel, seriesForModel, type Part, type PartFamilyId } from "@/components/omnicureParts";
import { useInquiry } from "./InquiryContext";
import { useLocale, t } from "@/components/LocaleContext";

// Type what you know, tap what you want.
//
// This used to be cascading dropdowns — category, then each of the family's
// dimensions in turn, until one part number fell out. It worked, but it made
// the customer walk a decision tree to reach a number that, half the time, was
// already written on the box in front of them. On a phone it was four taps
// before anything appeared.
//
// So: one search box and a list. A customer holding the old part types "64000"
// and the lamp is there; a customer who only knows the shape of the thing taps
// a category chip and reads down. Nothing is hidden behind a menu.
//
// `families` scopes the list to a product page (a lamp page only offers lamps
// and light guides); `model` narrows AC heads and bundles to that model's
// series, and light guides to the kind that page is actually about.

/** Fold a string for matching: case and separators must not decide a hit. */
const fold = (s: string) => s.toLowerCase().replace(/[\s\-_./]/g, "");

/** Above this many parts we wait for a search rather than dumping the catalogue. */
const BROWSE_LIMIT = 40;
/** Never render more rows than this — the rest is what the search box is for. */
const SHOW_LIMIT = 60;

export default function PartPicker({
  families,
  model,
  heading,
}: {
  families?: PartFamilyId[];
  model?: string;
  heading?: boolean;
}) {
  const { locale } = useLocale();
  const { has, add, remove } = useInquiry();

  const fams = useMemo(
    () => (families ? partFamilies.filter((f) => families.includes(f.id)) : partFamilies),
    [families]
  );
  // A picker scoped to a page (a lamp page, or the basket's own systems) opens
  // on its first category, so parts are on screen without a tap. The unscoped
  // one on /inquiry opens on "All", where a 300-part catalogue waits for a
  // search rather than unrolling itself.
  const [familyId, setFamilyId] = useState<PartFamilyId | "">(families ? fams[0]?.id ?? "" : "");
  const [query, setQuery] = useState("");

  const series = model ? seriesForModel[model] : undefined;
  const guideTypes = model ? partTypesForModel[model] : undefined;

  // Everything this picker is allowed to offer, before the chip or the query.
  const pool = useMemo(() => {
    const allowed = new Set(fams.map((f) => f.id));
    return parts.filter((p) => {
      if (!allowed.has(p.family)) return false;
      if (series && (p.family === "ac-heads" || p.family === "ac-bundles")) return p.attrs.series === series;
      if (guideTypes && p.family === "light-guides") return guideTypes.includes(String(p.attrs.type));
      return true;
    });
  }, [fams, series, guideTypes]);

  const q = fold(query.trim());

  const matches = useMemo(() => {
    let list = familyId ? pool.filter((p) => p.family === familyId) : pool;
    if (q) {
      // The part number first, then its description, then the attribute values
      // — so "surface cure" and "012-69000R" both land on the same row.
      list = list.filter((p) => {
        if (fold(p.pn).includes(q) || fold(p.desc).includes(q)) return true;
        return Object.values(p.attrs).some((v) => v && fold(String(v)).includes(q));
      });
    }
    return list;
  }, [pool, familyId, q]);

  // With no chip and no query, a 300-part catalogue is not a list, it is a wall.
  const browsing = !q && !familyId && pool.length > BROWSE_LIMIT;
  const shown = browsing ? [] : matches.slice(0, SHOW_LIMIT);
  const hidden = browsing ? 0 : matches.length - shown.length;

  const chipCls = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
      on ? "border-[#1A56DB] bg-[#1A56DB] text-white" : "border-[#D9E4EA] bg-white text-[#334E68] hover:border-[#1A56DB]"
    }`;

  return (
    <div className="rounded-2xl border border-[#D9E4EA] bg-white p-4 sm:p-5">
      {heading !== false && (
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">
          {t({ en: "Pick a part number", zh: "选择料号", th: "เลือกหมายเลขชิ้นส่วน", vi: "Chọn mã linh kiện" }, locale)}
        </p>
      )}

      {/* Search */}
      <label className="relative mt-3 block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputMode="search"
          placeholder={t(
            {
              en: "Part number or what it is — 64000, surface cure, 5 mm light guide",
              zh: "料号或名称——64000、表面固化、5mm 导光管",
              th: "หมายเลขชิ้นส่วนหรือชื่อ — 64000, surface cure, ท่อนำแสง 5 มม.",
              vi: "Mã hàng hoặc tên — 64000, surface cure, ống dẫn sáng 5 mm",
            },
            locale
          )}
          className="w-full rounded-xl border border-[#D9E4EA] bg-white py-3 pl-10 pr-3 text-sm text-[#102038] placeholder:text-[#98A2B3] focus:border-[#1A56DB] focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/20"
          aria-label={t({ en: "Search part numbers", zh: "搜索料号", th: "ค้นหาหมายเลขชิ้นส่วน", vi: "Tìm mã hàng" }, locale)}
        />
      </label>

      {/* Category chips — a way to browse, not a gate to pass */}
      {fams.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => setFamilyId("")} className={chipCls(familyId === "")}>
            {t({ en: "All", zh: "全部", th: "ทั้งหมด", vi: "Tất cả" }, locale)}
          </button>
          {fams.map((f) => (
            <button key={f.id} type="button" onClick={() => setFamilyId(f.id)} className={chipCls(familyId === f.id)}>
              {t(f.name, locale)}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {browsing ? (
        <p className="mt-4 text-xs leading-relaxed text-[#667085]">
          {t(
            {
              en: "Type a part number or pick a category above. If the old part is in front of you, its number is the fastest way in.",
              zh: "输入料号，或在上面选一个类别。手边有旧件的话，直接打它的料号最快。",
              th: "พิมพ์หมายเลขชิ้นส่วน หรือเลือกหมวดด้านบน ถ้ามีของเก่าอยู่ตรงหน้า พิมพ์หมายเลขของมันเร็วที่สุด",
              vi: "Nhập mã hàng, hoặc chọn một danh mục ở trên. Nếu chi tiết cũ đang ở trước mặt, gõ mã của nó là nhanh nhất.",
            },
            locale
          )}
        </p>
      ) : shown.length === 0 ? (
        <p className="mt-4 text-xs text-[#667085]">
          {t(
            {
              en: "Nothing matches that. Try part of the number, or send us a photo of the old part and we will identify it.",
              zh: "没有匹配的。可以只打料号的一部分，或者把旧件拍张照发给我们，我们帮你认。",
              th: "ไม่พบรายการที่ตรงกัน ลองพิมพ์บางส่วนของหมายเลข หรือส่งรูปของเก่ามาให้เรา แล้วเราจะช่วยระบุให้",
              vi: "Không có kết quả. Hãy thử một phần của mã, hoặc gửi ảnh chi tiết cũ để chúng tôi nhận diện giúp.",
            },
            locale
          )}
        </p>
      ) : (
        <>
          <ul className="mt-4 max-h-[26rem] divide-y divide-[#EEF2F6] overflow-y-auto rounded-xl border border-[#EEF2F6]">
            {shown.map((p) => (
              <PartRow key={p.pn} part={p} has={has} add={add} remove={remove} locale={locale} />
            ))}
          </ul>
          {hidden > 0 && (
            <p className="mt-2 text-xs text-[#98A2B3]">
              {t(
                {
                  en: `${hidden} more — keep typing to narrow it down.`,
                  zh: `还有 ${hidden} 条——继续输入可缩小范围。`,
                  th: `อีก ${hidden} รายการ — พิมพ์ต่อเพื่อจำกัดผลลัพธ์`,
                  vi: `Còn ${hidden} mục — gõ thêm để thu hẹp.`,
                },
                locale
              )}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

type Inq = ReturnType<typeof useInquiry>;

function PartRow({
  part,
  has,
  add,
  remove,
  locale,
}: {
  part: Part;
  has: Inq["has"];
  add: Inq["add"];
  remove: Inq["remove"];
  locale: Parameters<typeof t>[1];
}) {
  const ref = { kind: "part", pn: part.pn } as const;
  const inBasket = has(ref);
  return (
    <li className="flex items-start gap-3 p-3">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-sm font-bold text-[#143C96]">{part.pn}</p>
        <p className="mt-0.5 text-sm leading-snug text-[#102038]">{part.desc}</p>
        {(part.note || part.stocked === false) && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#b45309]">
            <Clock className="h-3 w-3" />
            {part.note ?? t({ en: "Made to order", zh: "按单生产", th: "ผลิตตามสั่ง", vi: "Sản xuất theo đơn" }, locale)}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => (inBasket ? remove(ref) : add(ref))}
        aria-pressed={inBasket}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-white transition ${
          inBasket ? "bg-[#41A62A]" : "bg-[#1A56DB] hover:bg-[#143C96]"
        }`}
      >
        {inBasket ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        {inBasket
          ? t({ en: "Added", zh: "已加入", th: "เพิ่มแล้ว", vi: "Đã thêm" }, locale)
          : t({ en: "Add", zh: "加入", th: "เพิ่ม", vi: "Thêm" }, locale)}
      </button>
    </li>
  );
}
