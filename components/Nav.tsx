"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale, t, type LangText, type Locale, LOCALE_LABELS, ACTIVE_LOCALES } from "@/components/LocaleContext";
import { inquiryMailto } from "@/components/contact";
import { localizeHref, delocalizeHref } from "@/components/localeHref";
import { publishedProductCategories, productCategoryHref } from "@/components/productCategories";
import { publishedIndustries, industryHref } from "@/components/industrySolutions";
import { brandLanding, type BrandSlug } from "@/components/brandLanding";

const languages: Locale[] = ["en", "zh", "vi", "th"];

// Brands shown under PRODUCT → BY BRAND, in the customer's preferred order.
const BRAND_ORDER: BrandSlug[] = ["omnicure", "noblelight", "phoseon", "fusion-uv"];

type MenuLink = { href: string; label: LangText; note?: LangText };
type MenuGroup = { heading: LangText; links: MenuLink[] };

// PRODUCT opens two columns: the light-source technology customers search for,
// and the brands they already know. APPLICATION opens the five industries.
const productMenu: MenuGroup[] = [
  {
    heading: { en: "By Technology", zh: "按技术", th: "ตามเทคโนโลยี", vi: "Theo công nghệ" },
    links: publishedProductCategories.map((c) => ({ href: productCategoryHref(c.slug), label: c.name })),
  },
  {
    heading: { en: "By Brand", zh: "按品牌", th: "ตามแบรนด์", vi: "Theo thương hiệu" },
    links: BRAND_ORDER.map((slug) => ({
      href: `/product/${slug}`,
      label: { en: brandLanding[slug].name, zh: brandLanding[slug].name },
    })),
  },
];

const applicationMenu: MenuGroup[] = [
  {
    heading: { en: "By Industry", zh: "按行业", th: "ตามอุตสาหกรรม", vi: "Theo ngành" },
    links: publishedIndustries.map((i) => ({ href: industryHref(i.slug), label: i.name })),
  },
];

// Top-level nav. An item with `groups` opens a dropdown; `href` is still the
// destination when the item itself is clicked, so PRODUCT and APPLICATION stay
// reachable on touch devices and for keyboard users.
type NavItem = { href: string; label: LangText; groups?: MenuGroup[] };

const navItems: NavItem[] = [
  { href: "/", label: { en: "Home", zh: "首页", vi: "Trang chủ", th: "หน้าหลัก" } },
  {
    href: "/product",
    label: { en: "Product", zh: "产品中心", vi: "Sản phẩm", th: "ผลิตภัณฑ์" },
    groups: productMenu,
  },
  {
    href: "/applications",
    label: { en: "Application", zh: "行业应用", vi: "Ứng dụng", th: "การใช้งาน" },
    groups: applicationMenu,
  },
  { href: "/insights", label: { en: "Insight", zh: "洞察", vi: "Thông tin", th: "บทความ" } },
  { href: "/contact", label: { en: "Sales & Service", zh: "销售与服务", vi: "Bán hàng & dịch vụ", th: "ฝ่ายขายและบริการ" } },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  // Which desktop dropdown is open, by href. Null = none.
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  // Which mobile section is expanded, by href.
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();

  // Hover menus need a small close delay, otherwise the gap between the
  // trigger and the panel closes the menu as the pointer crosses it.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openMenu = (href: string) => {
    cancelClose();
    setMenuOpen(href);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMenuOpen(null), 120);
  };

  // Switch language keeping the current page. When the page has a
  // locale-locked URL in the target language (e.g. /applications ↔
  // /vi/applications) navigate there, so the address bar reflects the
  // language; otherwise stay on the shared route and reload — the
  // etia-lang cookie re-renders it in the new language.
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
  // any link. Close them whenever the route changes — done during render (the
  // "adjust state when a prop changes" pattern) rather than in an effect, so
  // nothing ever paints open on the new route.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setLangOpen(false);
    setMenuOpen(null);
    setMobileSection(null);
  }

  // A top-level item is active on its own page and anywhere beneath it, so
  // PRODUCT stays lit on a technology or brand page.
  const isActive = (item: NavItem) => {
    const path = delocalizeHref(pathname);
    if (item.href === "/") return path === "/";
    if (path === item.href || path.startsWith(`${item.href}/`)) return true;
    // The industry pages live under /solutions but belong to APPLICATION.
    return item.href === "/applications" && path.startsWith("/solutions");
  };

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
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const href = localizeHref(item.href, locale);
            const active = isActive(item);
            const linkClass = `text-sm font-medium transition-colors ${
              active ? "text-[#1A56DB] border-b-2 border-[#1A56DB] pb-0.5" : "text-gray-600 hover:text-[#1A56DB]"
            }`;

            if (!item.groups) {
              return (
                <Link key={item.href} href={href} className={linkClass}>
                  {t(item.label, locale)}
                </Link>
              );
            }

            const expanded = menuOpen === item.href;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => openMenu(item.href)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={href}
                  className={`${linkClass} inline-flex items-center gap-1`}
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onFocus={() => openMenu(item.href)}
                >
                  {t(item.label, locale)}
                  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {expanded && (
                  <div
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div
                      className={`grid gap-8 rounded-xl border border-gray-200 bg-white p-6 shadow-xl ${
                        item.groups.length > 1 ? "grid-cols-2 min-w-[34rem]" : "min-w-[18rem]"
                      }`}
                    >
                      {item.groups.map((group) => (
                        <div key={group.heading.en}>
                          <p className="mb-3 text-[11px] font-bold uppercase tracking-[.14em] text-[#41A62A]">
                            {t(group.heading, locale)}
                          </p>
                          <ul className="space-y-1">
                            {group.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={localizeHref(l.href, locale)}
                                  className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-[#EEF6FF] hover:text-[#1A56DB]"
                                  onClick={() => setMenuOpen(null)}
                                >
                                  {t(l.label, locale)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

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
        <div className="md:hidden border-t border-gray-200 px-4 py-4 flex flex-col gap-1 bg-white">
          {navItems.map((item) => {
            if (!item.groups) {
              return (
                <Link
                  key={item.href}
                  href={localizeHref(item.href, locale)}
                  className="py-2.5 text-sm text-gray-600 hover:text-[#1A56DB]"
                  onClick={() => setOpen(false)}
                >
                  {t(item.label, locale)}
                </Link>
              );
            }
            const expanded = mobileSection === item.href;
            return (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={localizeHref(item.href, locale)}
                    className="flex-1 py-2.5 text-sm text-gray-600 hover:text-[#1A56DB]"
                    onClick={() => setOpen(false)}
                  >
                    {t(item.label, locale)}
                  </Link>
                  <button
                    type="button"
                    aria-label={t({ en: "Toggle submenu", zh: "展开子菜单", th: "เปิดเมนูย่อย", vi: "Mở menu con" }, locale)}
                    aria-expanded={expanded}
                    onClick={() => setMobileSection(expanded ? null : item.href)}
                    className="p-2 text-gray-400"
                  >
                    <svg className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                {expanded && (
                  <div className="mb-2 ml-3 border-l border-gray-200 pl-4">
                    {item.groups.map((group) => (
                      <div key={group.heading.en} className="mb-3 last:mb-0">
                        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-[#41A62A]">
                          {t(group.heading, locale)}
                        </p>
                        {group.links.map((l) => (
                          <Link
                            key={l.href}
                            href={localizeHref(l.href, locale)}
                            className="block py-2 text-sm text-gray-600 hover:text-[#1A56DB]"
                            onClick={() => setOpen(false)}
                          >
                            {t(l.label, locale)}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="mt-3 flex gap-2">
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
          <a href={inquiryMailto(locale, { subject: "Engineering Inquiry" })} className="mt-3 rounded-lg bg-[#41A62A] px-4 py-3 text-center text-sm font-bold text-white">
            {t({ en: "Talk to an Engineer", zh: "咨询工程师", vi: "Trao đổi với kỹ sư", th: "ปรึกษาวิศวกร" }, locale)}
          </a>
        </div>
      )}
    </nav>
  );
}
