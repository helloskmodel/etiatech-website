"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale, t, type Locale, type LangText, LOCALE_LABELS, ACTIVE_LOCALES } from "@/components/LocaleContext";
import { inquiryMailto } from "@/components/contact";
import { localizeHref, delocalizeHref } from "@/components/localeHref";
// Menu labels come from the metadata-only modules, never from productCatalog
// or solutions — Nav renders on every page and those pull in the full product
// and application datasets.
import { PRODUCT_CATEGORIES } from "@/components/productCategories";
import { SOLUTIONS } from "@/components/solutionsMeta";

const languages: Locale[] = ["en", "zh", "vi", "th"];

type NavItem = { href: string; label: LangText };
type NavGroup = { heading: LangText; items: NavItem[] };
// A top-level entry is either a plain link, or a dropdown parent carrying
// groups. A dropdown parent has no href: "/product" 308-redirects to the
// OmniCure brand page, which is exactly the brand-first entry this menu is
// meant to move away from, so the parent only opens the menu.
type NavLink = NavItem | { label: LangText; groups: NavGroup[] };

const isDropdown = (l: NavLink): l is { label: LangText; groups: NavGroup[] } => "groups" in l;

// Buyers search by light source and by their own industry, not by brand, so
// those two axes lead the menu. The four brands stay one click away inside
// the products dropdown — they still carry the brand-name search traffic.
const productGroups: NavGroup[] = [
  {
    heading: { en: "By Product", zh: "按产品", vi: "Theo sản phẩm", th: "ตามผลิตภัณฑ์" },
    items: PRODUCT_CATEGORIES.map((c) => ({ href: `/product/${c.id}`, label: c.label })),
  },
  {
    heading: { en: "By Brand", zh: "按品牌", vi: "Theo thương hiệu", th: "ตามแบรนด์" },
    items: [
      { href: "/product/omnicure", label: { en: "OmniCure", zh: "OmniCure" } },
      { href: "/product/phoseon", label: { en: "Phoseon", zh: "Phoseon" } },
      { href: "/product/fusion-uv", label: { en: "Fusion UV", zh: "Fusion UV" } },
      { href: "/product/noblelight", label: { en: "Noblelight", zh: "Noblelight" } },
    ],
  },
];

const solutionGroups: NavGroup[] = [
  {
    heading: { en: "By Industry", zh: "按行业", vi: "Theo ngành", th: "ตามอุตสาหกรรม" },
    items: SOLUTIONS.map((s) => ({ href: `/solutions/${s.id}`, label: s.label })),
  },
];

const links: NavLink[] = [
  { href: "/", label: { en: "Home", zh: "首页", vi: "Trang chủ", th: "หน้าหลัก" } },
  { label: { en: "Products", zh: "产品中心", vi: "Sản phẩm", th: "ผลิตภัณฑ์" }, groups: productGroups },
  { label: { en: "Solutions", zh: "行业解决方案", vi: "Giải pháp", th: "โซลูชัน" }, groups: solutionGroups },
  { href: "/applications", label: { en: "Applications", zh: "应用", vi: "Ứng dụng", th: "การใช้งาน" } },
  { href: "/insights", label: { en: "Insights", zh: "洞察", vi: "Thông tin", th: "บทความ" } },
  { href: "/contact", label: { en: "Service & Support", zh: "销售与支持", vi: "Bán hàng & hỗ trợ", th: "ฝ่ายขายและบริการ" } },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  // Which top-level dropdown is open, keyed by its English label. Only one at
  // a time; null closes them all.
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();

  // Switch language keeping the current page. When the page has a
  // locale-locked URL in the target language (e.g. /applications ↔
  // /vi/applications) navigate there, so the address bar reflects the
  // language; otherwise stay on the shared route and reload — the
  // etia-locale cookie re-renders it in the new language.
  const switchLocale = (l: Locale) => {
    setLocale(l);
    const target = localizeHref(delocalizeHref(pathname), l);
    if (target !== pathname) {
      window.location.assign(target);
    } else {
      window.location.reload();
    }
  };

  // Nav is mounted in the layout and persists across client-side navigations,
  // so the mobile menu / dropdowns would otherwise stay open after following
  // any link that isn't one of the menu's own (e.g. a product chip on a
  // case-study page). Close them whenever the route changes — done during
  // render (the "adjust state when a prop changes" pattern) rather than in an
  // effect, so the menu never paints open on the new route.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setLangOpen(false);
    setMenuOpen(null);
  }

  // A dropdown parent is "current" when the visitor is anywhere inside it.
  const groupActive = (groups: NavGroup[]) =>
    groups.some((g) => g.items.some((i) => pathname === i.href || pathname.startsWith(`${i.href}/`)));

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 shadow-sm" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href={localizeHref("/", locale)} className="flex items-center gap-2">
          <Image
            src="/logo/etia-tech.png"
            alt="ETIA Technology"
            width={150}
            height={34}
            priority
            className="h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            if (!isDropdown(l)) {
              const href = localizeHref(l.href, locale);
              return (
                <Link
                  key={l.href}
                  href={href}
                  onClick={() => setMenuOpen(null)}
                  className={`text-sm font-medium transition-colors ${
                    pathname === href || pathname === l.href
                      ? "text-[#1A56DB] border-b-2 border-[#1A56DB] pb-0.5"
                      : "text-gray-600 hover:text-[#1A56DB]"
                  }`}
                >
                  {t(l.label, locale)}
                </Link>
              );
            }

            const key = l.label.en;
            const isOpen = menuOpen === key;
            const active = groupActive(l.groups);
            return (
              <div key={key} className="relative">
                <button
                  onClick={() => { setLangOpen(false); setMenuOpen(isOpen ? null : key); }}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    active ? "text-[#1A56DB] border-b-2 border-[#1A56DB] pb-0.5" : "text-gray-600 hover:text-[#1A56DB]"
                  }`}
                >
                  {t(l.label, locale)}
                  <svg className={`w-3 h-3 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <>
                    {/* Click-away closer — sits under the panel, over the page. */}
                    <button
                      aria-hidden
                      tabIndex={-1}
                      onClick={() => setMenuOpen(null)}
                      className="fixed inset-0 z-40 cursor-default"
                    />
                    <div
                      className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-5 flex gap-8"
                      style={{ minWidth: l.groups.length > 1 ? "30rem" : "16rem" }}
                    >
                      {l.groups.map((g) => (
                        <div key={g.heading.en} className="min-w-[13rem]">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t(g.heading, locale)}</p>
                          <div className="flex flex-col gap-1">
                            {g.items.map((i) => {
                              const current = pathname === i.href || pathname.startsWith(`${i.href}/`);
                              return (
                                <Link
                                  key={i.href}
                                  href={localizeHref(i.href, locale)}
                                  onClick={() => setMenuOpen(null)}
                                  className={`rounded px-2 py-1.5 text-sm transition-colors ${
                                    current ? "font-semibold text-[#1A56DB] bg-gray-50" : "text-gray-600 hover:text-[#1A56DB] hover:bg-gray-50"
                                  }`}
                                >
                                  {t(i.label, locale)}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          <div className="relative ml-2">
            <button
              onClick={() => { setMenuOpen(null); setLangOpen(!langOpen); }}
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
                      onClick={() => { if (active) { setLangOpen(false); switchLocale(l); } }}
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
          <a href={inquiryMailto(locale, { subject: "Engineering Inquiry" })} className="rounded-lg bg-[#41A62A] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#358B22]">
            {t({ en: "Talk to an Engineer", zh: "咨询工程师", vi: "Trao đổi với kỹ sư", th: "ปรึกษาวิศวกร" }, locale)}
          </a>
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
        <div className="md:hidden border-t border-gray-200 px-4 py-4 flex flex-col gap-4 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          {links.map((l) => {
            if (!isDropdown(l)) {
              return (
                <Link key={l.href} href={localizeHref(l.href, locale)} className="text-gray-600 hover:text-[#1A56DB] text-sm" onClick={() => setOpen(false)}>
                  {t(l.label, locale)}
                </Link>
              );
            }
            const key = l.label.en;
            const isOpen = menuOpen === key;
            return (
              <div key={key}>
                <button
                  onClick={() => setMenuOpen(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between text-sm text-gray-600 hover:text-[#1A56DB]"
                >
                  {t(l.label, locale)}
                  <svg className={`w-3.5 h-3.5 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="mt-3 ml-3 border-l border-gray-200 pl-4 flex flex-col gap-3">
                    {l.groups.map((g) => (
                      <div key={g.heading.en}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t(g.heading, locale)}</p>
                        <div className="flex flex-col gap-2">
                          {g.items.map((i) => (
                            <Link
                              key={i.href}
                              href={localizeHref(i.href, locale)}
                              onClick={() => setOpen(false)}
                              className="text-sm text-gray-600 hover:text-[#1A56DB]"
                            >
                              {t(i.label, locale)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-2 pt-2">
            {languages.map((l) => {
              const active = ACTIVE_LOCALES.includes(l);
              return (
                <button
                  key={l}
                  disabled={!active}
                  onClick={() => { if (active) { setOpen(false); switchLocale(l); } }}
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
          <a href={inquiryMailto(locale, { subject: "Engineering Inquiry" })} className="rounded-lg bg-[#41A62A] px-4 py-3 text-center text-sm font-bold text-white">
            {t({ en: "Talk to an Engineer", zh: "咨询工程师", vi: "Trao đổi với kỹ sư", th: "ปรึกษาวิศวกร" }, locale)}
          </a>
        </div>
      )}
    </nav>
  );
}
