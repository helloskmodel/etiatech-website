"use client";
import { Check, Plus } from "lucide-react";
import { useInquiry, type InquiryRef } from "./InquiryContext";
import { useLocale, t } from "@/components/LocaleContext";

// One button, two states: not yet in the basket (add it) and already in the
// basket (a tick; pressing again removes it). Sized for a product card by
// default; `size="lg"` for a product page's hero.
export default function AddToInquiryButton({
  item,
  accent = "#1A56DB",
  size = "sm",
  className = "",
}: {
  item: InquiryRef;
  accent?: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  const { has, add, remove, ready } = useInquiry();
  const { locale } = useLocale();
  const inBasket = ready && has(item);
  const pad = size === "lg" ? "px-6 py-3 text-sm" : "px-3 py-1.5 text-xs";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inBasket) remove(item);
        else add(item);
      }}
      aria-pressed={inBasket}
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold transition ${pad} ${
        inBasket ? "border-transparent text-white" : "bg-white hover:text-white"
      } ${className}`}
      style={
        inBasket
          ? { background: "#41A62A" }
          : { borderColor: accent, color: accent, ["--hover" as string]: accent }
      }
      onMouseEnter={(e) => { if (!inBasket) e.currentTarget.style.background = accent; }}
      onMouseLeave={(e) => { if (!inBasket) e.currentTarget.style.background = "#fff"; }}
    >
      {inBasket ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {inBasket
        ? t({ en: "Added", zh: "已加入", th: "เพิ่มแล้ว", vi: "Đã thêm" }, locale)
        : t({ en: "Add to inquiry", zh: "加入询单", th: "เพิ่มในรายการสอบถาม", vi: "Thêm vào báo giá" }, locale)}
    </button>
  );
}
