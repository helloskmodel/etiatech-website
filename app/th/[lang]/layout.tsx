import type { ReactNode } from "react";
import "../../globals.css";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TH_LOCALES, isThLocale, HTML_LANG, getDict, type ThLocale } from "../dictionaries";
import { inquiryMailto } from "@/components/contact";

const LOGO =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg";
const LANG_LABEL: Record<ThLocale, string> = { th: "ไทย", en: "EN", zh: "中文" };

// Only th/en/zh are generated; any other /th/<x> is a 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return TH_LOCALES.map((lang) => ({ lang }));
}

export default async function ThailandLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isThLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <html lang={HTML_LANG[lang]}>
      <body className="min-h-screen flex flex-col" style={{ background: "#ffffff", color: "#111827" }}>
        {/* Scoped Thailand nav — only the products ETIA sells in Thailand */}
        <nav className="sticky top-0 z-50 border-b border-gray-200 shadow-sm bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <Link href={`/th/${lang}`} className="flex items-center gap-2">
              <Image src={LOGO} alt="ETIA Technology" width={130} height={44} className="object-contain" unoptimized />
            </Link>
            <div className="flex items-center gap-6">
              <Link href={`/th/${lang}`} className="hidden sm:block text-sm font-medium text-gray-600 hover:text-[#1A56DB]">
                {d.nav.home}
              </Link>
              <Link href={`/th/${lang}#products`} className="text-sm font-medium text-gray-600 hover:text-[#1A56DB]">
                {d.nav.products}
              </Link>
              <a href={inquiryMailto(lang, { subject: "Thailand Inquiry" })} className="text-sm font-medium text-gray-600 hover:text-[#1A56DB]">
                {d.nav.contact}
              </a>
              {/* Language switch — one URL per language for hreflang/SEO */}
              <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
                {TH_LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={`/th/${l}`}
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      l === lang ? "text-[#1A56DB] bg-blue-50" : "text-gray-500 hover:text-[#1A56DB]"
                    }`}
                  >
                    {LANG_LABEL[l]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        {/* Scoped Thailand footer */}
        <footer className="border-t border-gray-200 bg-[#0f2444] text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Image src={LOGO} alt="ETIA Technology" width={140} height={48} className="object-contain bg-white rounded px-2 py-1 mb-4" unoptimized />
            <p className="text-sm max-w-xl mb-4">{d.footer.tagline}</p>
            <p className="text-xs text-gray-400">© 2026 ETIA Technology. {d.footer.rights}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
