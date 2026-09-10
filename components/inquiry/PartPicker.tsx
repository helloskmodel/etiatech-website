"use client";
import { useMemo, useState } from "react";
import { Plus, Check, Clock } from "lucide-react";
import { partFamilies, parts, seriesForModel, type Part, type PartFamilyId } from "@/components/omnicureParts";
import { useInquiry } from "./InquiryContext";
import { useLocale, t } from "@/components/LocaleContext";

// Cascading dropdowns over the OmniCure part-number catalogue. A family is
// chosen first (replacement lamps, light guides, LED heads…); then each of the
// family's dimensions in turn, every menu offering only the values that still
// fit what has been picked so far; when one part number remains it is shown
// with its description and an add button. A customer never has to know the
// part number — they say what they want, the way they would to a sales
// engineer, and the number falls out.
//
// `families` scopes the picker to a product page (a lamp page only offers
// lamps and light guides); `model` narrows AC heads and bundles to that
// model's series.
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
  const [familyId, setFamilyId] = useState<PartFamilyId>(fams[0]?.id ?? "lamps");
  const [picks, setPicks] = useState<Record<string, string>>({});
  const family = fams.find((f) => f.id === familyId) ?? fams[0];

  const series = model ? seriesForModel[model] : undefined;
  const pool = useMemo(() => {
    let list = parts.filter((p) => p.family === family.id);
    if (series && (family.id === "ac-heads" || family.id === "ac-bundles")) {
      list = list.filter((p) => p.attrs.series === series);
    }
    return list;
  }, [family.id, series]);

  // The parts still matching every dimension picked so far, in order.
  const stages = useMemo(() => {
    let remaining = pool;
    const out: { key: string; options: string[]; value: string }[] = [];
    for (const dim of family.dims) {
      const options = Array.from(new Set(remaining.map((p) => p.attrs[dim.key]).filter(Boolean)));
      const value = picks[dim.key] && options.includes(picks[dim.key]) ? picks[dim.key] : "";
      out.push({ key: dim.key, options, value });
      if (!value) break;
      remaining = remaining.filter((p) => p.attrs[dim.key] === value);
    }
    return { stages: out, remaining };
  }, [pool, family.dims, picks]);

  const resolved: Part | null =
    stages.stages.length === family.dims.length && stages.stages.every((s) => s.value) && stages.remaining.length === 1
      ? stages.remaining[0]
      : null;

  const selectCls =
    "w-full rounded-lg border border-[#D9E4EA] bg-white px-3 py-2 text-sm text-[#102038] focus:border-[#1A56DB] focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/20";

  return (
    <div className="rounded-2xl border border-[#D9E4EA] bg-white p-4 sm:p-5">
      {heading !== false && (
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">
          {t({ en: "Pick a part number", zh: "选择料号", th: "เลือกหมายเลขชิ้นส่วน", vi: "Chọn mã linh kiện" }, locale)}
        </p>
      )}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fams.length > 1 && (
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-[#667085]">
              {t({ en: "Category", zh: "类别", th: "หมวด", vi: "Danh mục" }, locale)}
            </span>
            <select
              className={selectCls}
              value={family.id}
              onChange={(e) => {
                setFamilyId(e.target.value as PartFamilyId);
                setPicks({});
              }}
            >
              {fams.map((f) => (
                <option key={f.id} value={f.id}>{t(f.name, locale)}</option>
              ))}
            </select>
          </label>
        )}
        {stages.stages.map((s, i) => {
          const dim = family.dims[i];
          return (
            <label key={s.key} className="block">
              <span className="mb-1 block text-[11px] font-semibold text-[#667085]">{t(dim.label, locale)}</span>
              <select
                className={selectCls}
                value={s.value}
                onChange={(e) => {
                  // A change upstream invalidates everything downstream.
                  const next: Record<string, string> = {};
                  for (let j = 0; j < i; j++) next[family.dims[j].key] = picks[family.dims[j].key];
                  next[s.key] = e.target.value;
                  setPicks(next);
                }}
              >
                <option value="">{t({ en: "Select…", zh: "请选择…", th: "เลือก…", vi: "Chọn…" }, locale)}</option>
                {s.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
          );
        })}
      </div>

      {resolved ? (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#1A56DB]/20 bg-[#EEF6FF] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-sm font-bold text-[#143C96]">{resolved.pn}</p>
            <p className="mt-0.5 text-sm text-[#102038]">{resolved.desc}</p>
            {(resolved.note || resolved.stocked === false) && (
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#b45309]">
                <Clock className="h-3 w-3" />
                {resolved.note ?? t({ en: "Made to order", zh: "按单生产", th: "ผลิตตามสั่ง", vi: "Sản xuất theo đơn" }, locale)}
              </p>
            )}
            {resolved.stocked === true && (
              <p className="mt-1 text-xs text-[#15803d]">
                {t({ en: "Catalogue-stocked item", zh: "常备库存型号", th: "รายการมีสต็อกตามแคตตาล็อก", vi: "Hàng có sẵn theo catalogue" }, locale)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => (has({ kind: "part", pn: resolved.pn }) ? remove({ kind: "part", pn: resolved.pn }) : add({ kind: "part", pn: resolved.pn }))}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white transition ${
              has({ kind: "part", pn: resolved.pn }) ? "bg-[#41A62A]" : "bg-[#1A56DB] hover:bg-[#143C96]"
            }`}
          >
            {has({ kind: "part", pn: resolved.pn }) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {has({ kind: "part", pn: resolved.pn })
              ? t({ en: "Added", zh: "已加入", th: "เพิ่มแล้ว", vi: "Đã thêm" }, locale)
              : t({ en: "Add to inquiry", zh: "加入询单", th: "เพิ่มในรายการสอบถาม", vi: "Thêm vào báo giá" }, locale)}
          </button>
        </div>
      ) : (
        <p className="mt-3 text-xs text-[#667085]">
          {t(
            { en: "Choose each option to arrive at a part number.", zh: "逐项选择后即显示对应料号。", th: "เลือกทีละตัวเลือกเพื่อให้ได้หมายเลขชิ้นส่วน", vi: "Chọn từng mục để ra mã linh kiện." },
            locale
          )}
        </p>
      )}
    </div>
  );
}
