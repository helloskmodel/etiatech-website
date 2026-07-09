"use client";
import Image from "next/image";
import Link from "next/link";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";

export default function Footer() {
  const { locale } = useLocale();
  const navLinks = [
    { href: "/", label: { en: "Home", zh: "首页", vi: "Trang chủ", th: "หน้าหลัก" } },
    { href: "/product/omnicure", label: { en: "OmniCure", zh: "OmniCure" } },
    { href: "/product/phoseon", label: { en: "Phoseon", zh: "Phoseon" } },
    { href: "/applications", label: { en: "Applications", zh: "应用", vi: "Ứng dụng", th: "การใช้งาน" } },
    { href: "/contact", label: { en: "Sales & Support", zh: "销售与支持", vi: "Bán hàng & hỗ trợ", th: "ฝ่ายขายและบริการ" } },
  ];
  return (
    <footer className="border-t border-gray-200 mt-20" style={{ background: "#f8f9fb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Image
            src="https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg"
            alt="ETIA Technology"
            width={150}
            height={50}
            className="object-contain"
            unoptimized
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">{t({ en: "Navigation", zh: "导航", vi: "Điều hướng", th: "เมนู" }, locale)}</p>
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">
                {t(l.label, locale)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">{t({ en: "Legal", zh: "法律条款" }, locale)}</p>
          <div className="flex flex-col gap-1">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">{t({ en: "Privacy Policy", zh: "隐私政策" }, locale)}</Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">{t({ en: "Cookie Policy", zh: "Cookie政策" }, locale)}</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">{t({ en: "Contact", zh: "联系方式", vi: "Liên hệ", th: "ติดต่อ" }, locale)}</p>
          <a href={inquiryMailto(locale, {})} className="text-xs hover:underline" style={{ color: "#44B549" }}>
            mark_tang@etia-tech.com
          </a>
        </div>
      </div>
      <div className="border-t border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ETIA-TECH (ASIA) Co., Limited. {t({ en: "All rights reserved.", zh: "保留所有权利。" }, locale)}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-[#1A56DB] transition-colors">{t({ en: "Privacy", zh: "隐私" }, locale)}</Link>
            <Link href="/cookies" className="text-xs text-gray-400 hover:text-[#1A56DB] transition-colors">{t({ en: "Cookies", zh: "Cookie" }, locale)}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
