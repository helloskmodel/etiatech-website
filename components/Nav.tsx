"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale, t, type Locale, LOCALE_LABELS, ACTIVE_LOCALES } from "@/components/LocaleContext";

const languages: Locale[] = ["en", "zh", "vi", "th"];

const links = [
  { href: "/", label: { en: "Home", zh: "首页" } },
  { href: "/product/omnicure", label: { en: "OmniCure", zh: "OmniCure" } },
  { href: "/product/phoseon", label: { en: "Phoseon", zh: "Phoseon" } },
  { href: "/application", label: { en: "Applications", zh: "应用" } },
  { href: "/contact", label: { en: "Sales & Support", zh: "销售与支持" } },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();

  // Nav is mounted in the layout and persists across client-side navigations,
  // so the mobile menu / language dropdown would otherwise stay open after
  // following any link that isn't one of the menu's own (e.g. a product chip
  // on a case-study page). Close both whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 shadow-sm" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg"
            alt="ETIA Technology"
            width={130}
            height={44}
            className="object-contain"
            unoptimized
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-[#1A56DB] border-b-2 border-[#1A56DB] pb-0.5"
                  : "text-gray-600 hover:text-[#1A56DB]"
              }`}
            >
              {t(l.label, locale)}
            </Link>
          ))}
          <div className="relative ml-4">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all"
            >
              🌐 {LOCALE_LABELS[locale]}
              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[7rem]">
                {languages.map((l) => {
                  const active = ACTIVE_LOCALES.includes(l);
                  return (
                    <button
                      key={l}
                      disabled={!active}
                      onClick={() => { if (active) { setLocale(l); setLangOpen(false); } }}
                      className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                        !active
                          ? "text-gray-300 cursor-not-allowed"
                          : locale === l
                          ? "font-semibold text-[#1A56DB] hover:bg-gray-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {LOCALE_LABELS[l]}{!active && <span className="ml-1 text-[10px]">soon</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 flex flex-col gap-4 bg-white">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-600 hover:text-[#1A56DB] text-sm" onClick={() => setOpen(false)}>
              {t(l.label, locale)}
            </Link>
          ))}
          <div className="flex gap-2">
            {languages.map((l) => {
              const active = ACTIVE_LOCALES.includes(l);
              return (
                <button
                  key={l}
                  disabled={!active}
                  onClick={() => { if (active) { setLocale(l); setOpen(false); } }}
                  className={`px-3 py-1.5 rounded text-sm font-semibold transition-all ${
                    !active
                      ? "border border-gray-100 text-gray-300 cursor-not-allowed"
                      : locale === l
                      ? "text-white"
                      : "border border-gray-200 text-gray-600"
                  }`}
                  style={active && locale === l ? { background: "#1A56DB" } : {}}
                >
                  {LOCALE_LABELS[l]}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
