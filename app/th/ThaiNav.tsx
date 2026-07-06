"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ThLocale } from "./dictionaries";
import ThaiSearch, { type SearchLabels } from "./ThaiSearch";
import type { SearchEntry } from "./searchIndex";

const LOGO =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg";
const LANG_LABEL: Record<ThLocale, string> = { th: "ไทย", en: "EN", zh: "中文" };
const LOCALES: ThLocale[] = ["th", "en", "zh"];

export default function ThaiNav({
  lang,
  labels,
  contactHref,
  searchIndex,
  searchLabels,
}: {
  lang: ThLocale;
  labels: { home: string; products: string; applications: string; salesSupport: string };
  contactHref: string;
  searchIndex: SearchEntry[];
  searchLabels: SearchLabels;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/th/${lang}`;

  // Keep the current sub-path when switching language: /th/{lang}/x → /th/{l}/x
  const langHref = (l: ThLocale) => {
    const parts = pathname.split("/");
    if (parts[1] === "th" && parts[2]) {
      parts[2] = l;
      return parts.join("/");
    }
    return `/th/${l}`;
  };

  const links = [
    { href: `/th/${lang}`, label: labels.home },
    { href: `/th/${lang}/product`, label: labels.products },
    { href: `/th/${lang}/application`, label: labels.applications },
    { href: contactHref, label: labels.salesSupport },
  ];

  // Current-page highlight. Home matches exactly; sections match their subtree.
  const base = `/th/${lang}`;
  const isActive = (href: string) =>
    href === base ? pathname === base : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href={`/th/${lang}`} onClick={() => setOpen(false)} className="flex items-center gap-2 shrink-0">
          <Image src={LOGO} alt="ETIA Technology" width={120} height={40} className="object-contain" unoptimized />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`text-sm font-medium whitespace-nowrap border-b-2 pb-0.5 transition-colors ${
                isActive(l.href)
                  ? "text-[#1A56DB] border-[#1A56DB]"
                  : "text-gray-600 border-transparent hover:text-[#1A56DB] hover:border-[#1A56DB]/40"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <ThaiSearch index={searchIndex} labels={searchLabels} />
          <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={langHref(l)}
                className={`px-2 py-1 text-xs font-semibold rounded ${l === lang ? "text-[#1A56DB] bg-blue-50" : "text-gray-500 hover:text-[#1A56DB]"}`}
              >
                {LANG_LABEL[l]}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile: search + hamburger */}
        <div className="md:hidden flex items-center gap-1 -mr-2">
        <ThaiSearch index={searchIndex} labels={searchLabels} />
        <button className="text-gray-700 p-2" aria-label="Menu" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`py-3 text-base font-medium border-b border-gray-100 ${
                isActive(l.href) ? "text-[#1A56DB] font-semibold" : "text-gray-700 hover:text-[#1A56DB]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-4">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={langHref(l)}
                onClick={() => setOpen(false)}
                className={`px-4 py-2 text-sm font-semibold rounded border ${l === lang ? "text-[#1A56DB] border-[#1A56DB] bg-blue-50" : "text-gray-600 border-gray-200"}`}
              >
                {LANG_LABEL[l]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
