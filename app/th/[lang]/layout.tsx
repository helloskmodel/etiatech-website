import type { ReactNode } from "react";
import "../../globals.css";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TH_LOCALES, isThLocale, HTML_LANG, getDict, getAuthDict, COMPANY, type ThLocale } from "../dictionaries";
import { thMailto, TH_CONTACTS } from "../thContact";
import Analytics from "@/components/Analytics";

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
  const auth = getAuthDict(lang);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    url: `https://www.etiatech.com/th/${lang}`,
    logo: LOGO,
    description: auth.statement,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address,
      addressLocality: COMPANY.addressLocality,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.country,
    },
    areaServed: "TH",
    brand: { "@type": "Brand", name: "OmniCure" },
  };

  return (
    <html lang={HTML_LANG[lang]}>
      <body className="min-h-screen flex flex-col" style={{ background: "#ffffff", color: "#111827" }}>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {/* Authorized-distributor trust bar */}
        <div className="text-center text-xs font-semibold py-1.5 px-4 text-white" style={{ background: "#166534" }}>
          ✓ {auth.badge}
        </div>
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
              <Link href={`/th/${lang}/application`} className="text-sm font-medium text-gray-600 hover:text-[#1A56DB]">
                {d.nav.applications}
              </Link>
              <a href={thMailto(lang, { subject: "Thailand Inquiry" })} className="text-sm font-medium text-gray-600 hover:text-[#1A56DB]">
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
            <p className="text-sm font-semibold text-white mb-1">✓ {auth.badge}</p>
            <p className="text-sm max-w-2xl mb-4 text-gray-300">{auth.statement}</p>
            <div className="text-xs text-gray-400 space-y-0.5 mb-6">
              <p className="font-medium text-gray-300">{COMPANY.legalName}</p>
              <p>{COMPANY.address}</p>
            </div>
            {/* Contact */}
            <div className="text-xs mb-6">
              <p className="font-semibold text-white">{TH_CONTACTS.sales.name}</p>
              <p className="text-gray-400 mb-1">{TH_CONTACTS.sales.role[lang]}</p>
              <p><a href={`tel:${TH_CONTACTS.sales.phoneHref}`} className="text-gray-300 hover:text-white">📞 {TH_CONTACTS.sales.phone}</a></p>
              <p><a href={`mailto:${TH_CONTACTS.sales.email}`} className="text-gray-300 hover:text-white">✉️ {TH_CONTACTS.sales.email}</a></p>
            </div>
            <p className="text-xs text-gray-400">© 2026 {COMPANY.legalName}. {d.footer.rights}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
