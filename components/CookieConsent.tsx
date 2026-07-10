"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, t } from "@/components/LocaleContext";
import { getConsent, setConsent, CONSENT_OPEN_EVENT } from "@/components/consent";

export default function CookieConsent() {
  const { locale } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show on first visit (no stored choice); also allow re-opening from the
    // footer "Cookie settings" link.
    if (getConsent() === null) setShow(true);
    const open = () => setShow(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    setConsent(value);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-4">
      <div className="max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white shadow-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1" style={{ color: "#1A56DB" }}>{t({ en: "We value your privacy", zh: "我们重视您的隐私", th: "เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ", vi: "Chúng tôi coi trọng quyền riêng tư của bạn" }, locale)}</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {t({ en: "We use necessary cookies to keep the site working, and — only with your consent — analytics cookies to understand how it's used.", zh: "我们使用必要 Cookie 以保障网站运行；仅在您同意后，才使用分析 Cookie 以了解网站使用情况。", th: "เราใช้คุกกี้ที่จำเป็นเพื่อให้เว็บไซต์ทำงานได้ และใช้คุกกี้เพื่อการวิเคราะห์เฉพาะเมื่อคุณยินยอมเท่านั้น เพื่อเข้าใจการใช้งานเว็บไซต์", vi: "Chúng tôi dùng cookie cần thiết để trang web hoạt động, và — chỉ khi bạn đồng ý — cookie phân tích để hiểu cách sử dụng." }, locale)}{" "}
            <Link href="/cookies" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Cookie Policy", zh: "Cookie政策", th: "นโยบายคุกกี้", vi: "Chính sách cookie" }, locale)}</Link>{" · "}
            <Link href="/privacy" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Privacy Policy", zh: "隐私政策", th: "นโยบายความเป็นส่วนตัว", vi: "Chính sách bảo mật" }, locale)}</Link>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => decide("rejected")}
            className="px-4 py-2 rounded text-sm font-semibold border border-gray-300 text-gray-600 hover:border-gray-400 transition-all"
          >
            {t({ en: "Necessary only", zh: "仅必要", th: "เฉพาะที่จำเป็น", vi: "Chỉ cần thiết" }, locale)}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="px-4 py-2 rounded text-sm font-semibold text-white hover:opacity-90 transition-all"
            style={{ background: "#1A56DB" }}
          >
            {t({ en: "Accept all", zh: "全部接受", th: "ยอมรับทั้งหมด", vi: "Chấp nhận tất cả" }, locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
