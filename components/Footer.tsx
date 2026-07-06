"use client";
import Link from "next/link";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";

export default function Footer() {
  const { locale } = useLocale();
  const navLabels = [
    { en: "Home", zh: "首页" },
    { en: "Products", zh: "产品" },
    { en: "Applications", zh: "应用" },
    { en: "Sales & Support", zh: "销售与支持" },
  ];
  return (
    <footer className="border-t border-gray-200 mt-20" style={{ background: "#f8f9fb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">ETIA Technology</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {t({ en: "Authorized distributor of world-class UV curing systems. 20 years of application expertise across 10 industries.", zh: "世界级UV固化系统授权代理商。20年应用经验，覆盖10大行业。" }, locale)}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">{t({ en: "Navigation", zh: "导航" }, locale)}</p>
          <div className="flex flex-col gap-1">
            {["/", "/product", "/application", "/contact"].map((href, i) => (
              <Link key={href} href={href} className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">
                {t(navLabels[i], locale)}
              </Link>
            ))}
            {/* Regional site — internal link so crawlers discover /th and it
                gains relevance for "OmniCure Thailand". */}
            <a href="/th/th" className="text-xs font-medium text-gray-600 hover:text-[#1A56DB] transition-colors mt-1">
              OmniCure ประเทศไทย (Thailand) →
            </a>
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
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">{t({ en: "Contact", zh: "联系方式" }, locale)}</p>
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
