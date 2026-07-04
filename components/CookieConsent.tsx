"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, t } from "@/components/LocaleContext";

const STORAGE_KEY = "etia-cookie-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — show banner */
      setShow(true);
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-4">
      <div className="max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white shadow-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1" style={{ color: "#1A56DB" }}>{t({ en: "We value your privacy", zh: "我们重视您的隐私", vi: "Chúng tôi tôn trọng quyền riêng tư của bạn" }, locale)}</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {t({ en: "We use cookies to keep the site working, remember your preferences, and understand how it's used. See our", zh: "我们使用Cookie来保障网站正常运行、记住您的偏好并了解网站的使用情况。详见我们的", vi: "Chúng tôi dùng cookie để duy trì hoạt động của trang, ghi nhớ tùy chọn của bạn và hiểu cách trang được sử dụng. Xem" }, locale)}{" "}
            <Link href="/cookies" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Cookie Policy", zh: "《Cookie政策》", vi: "Chính sách Cookie" }, locale)}</Link>{t({ en: " and", zh: "与", vi: " và" }, locale)}{" "}
            <Link href="/privacy" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Privacy Policy", zh: "《隐私政策》", vi: "Chính sách quyền riêng tư" }, locale)}</Link>{t({ en: ".", zh: "。", vi: "." }, locale)}
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => decide("rejected")}
            className="px-4 py-2 rounded text-sm font-semibold border border-gray-300 text-gray-600 hover:border-gray-400 transition-all"
          >
            {t({ en: "Necessary only", zh: "仅必要Cookie", vi: "Chỉ cookie cần thiết" }, locale)}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="px-4 py-2 rounded text-sm font-semibold text-white hover:opacity-90 transition-all"
            style={{ background: "#1A56DB" }}
          >
            {t({ en: "Accept all", zh: "全部接受", vi: "Chấp nhận tất cả" }, locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
