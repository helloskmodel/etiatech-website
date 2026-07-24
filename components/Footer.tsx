"use client";
import Image from "next/image";
import Link from "next/link";
import { inquiryMailto, localeSalesEmail } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";
import { openConsent } from "@/components/consent";

export default function Footer() {
  const { locale } = useLocale();
  const navLinks = [
    { href: "/", label: { en: "Home", zh: "首页", vi: "Trang chủ", th: "หน้าหลัก" } },
    { href: "/product/omnicure", label: { en: "OmniCure", zh: "OmniCure" } },
    { href: "/product/phoseon", label: { en: "Phoseon", zh: "Phoseon" } },
    { href: "/applications", label: { en: "Applications", zh: "应用", vi: "Ứng dụng", th: "การใช้งาน" } },
    { href: "/about", label: { en: "About ETIA", zh: "关于我们", vi: "Về ETIA", th: "เกี่ยวกับ ETIA" } },
    { href: "/contact", label: { en: "Service & Support", zh: "销售与支持", vi: "Bán hàng & hỗ trợ", th: "ฝ่ายขายและบริการ" } },
  ];
  return (
    <footer className="border-t border-gray-200 mt-20" style={{ background: "#f8f9fb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Image
            src="/logo/etia-tech.png"
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
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">{t({ en: "Legal", zh: "法律条款", th: "ข้อกฎหมาย", vi: "Pháp lý" }, locale)}</p>
          <div className="flex flex-col gap-1">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">{t({ en: "Privacy Policy", zh: "隐私政策", th: "นโยบายความเป็นส่วนตัว", vi: "Chính sách bảo mật" }, locale)}</Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">{t({ en: "Cookie Policy", zh: "Cookie政策", th: "นโยบายคุกกี้", vi: "Chính sách cookie" }, locale)}</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">{t({ en: "Terms of Use", zh: "使用条款", th: "ข้อกำหนดการใช้งาน", vi: "Điều khoản sử dụng" }, locale)}</Link>
            <button type="button" onClick={() => openConsent()} className="text-left text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">{t({ en: "Cookie Settings", zh: "Cookie 设置", th: "ตั้งค่าคุกกี้", vi: "Cài đặt cookie" }, locale)}</button>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">{t({ en: "Contact", zh: "联系方式", vi: "Liên hệ", th: "ติดต่อ" }, locale)}</p>
          <a href={inquiryMailto(locale, {})} className="text-xs hover:underline" style={{ color: "#41A62A" }}>
            {localeSalesEmail(locale)}
          </a>
        </div>
      </div>
      <div className="border-t border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ETIA-TECH (ASIA) Co., Limited. {t({ en: "All rights reserved.", zh: "保留所有权利。", th: "สงวนลิขสิทธิ์", vi: "Bảo lưu mọi quyền." }, locale)}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-[#1A56DB] transition-colors">{t({ en: "Privacy", zh: "隐私", th: "ความเป็นส่วนตัว", vi: "Bảo mật" }, locale)}</Link>
            <Link href="/cookies" className="text-xs text-gray-400 hover:text-[#1A56DB] transition-colors">{t({ en: "Cookies", zh: "Cookie", th: "คุกกี้", vi: "Cookie" }, locale)}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
