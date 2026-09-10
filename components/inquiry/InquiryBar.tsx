"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, ArrowRight } from "lucide-react";
import { useInquiry } from "./InquiryContext";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";

// The basket pill. Appears once something is in the basket, on every page but
// the inquiry page itself and the shop (which has its own review bar), and
// goes straight to the review-and-send form. Bottom-left, so it never fights
// the chat button in the other corner.
export default function InquiryBar() {
  const { count, ready } = useInquiry();
  const { locale } = useLocale();
  const pathname = usePathname();
  const bare = pathname?.replace(/^\/(zh|vi|th)(?=\/|$)/, "") ?? "";
  if (!ready || count === 0 || bare === "/inquiry" || bare === "/product") return null;

  return (
    <Link
      href={localizeHref("/inquiry", locale)}
      className="fixed bottom-5 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#143C96] px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#1A56DB] sm:left-6"
      aria-label={t({ en: `Review inquiry, ${count} items`, zh: `查看询单，${count} 项`, th: `ดูรายการสอบถาม ${count} รายการ`, vi: `Xem yêu cầu báo giá, ${count} mục` }, locale)}
    >
      <ClipboardList className="h-4 w-4" />
      {t({ en: "Inquiry", zh: "询单", th: "รายการสอบถาม", vi: "Báo giá" }, locale)}
      <span className="rounded-full bg-[#41A62A] px-2 py-0.5 text-xs">{count}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
