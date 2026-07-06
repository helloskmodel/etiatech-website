import type { ReactNode } from "react";
import "../../globals.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TH_LOCALES, isThLocale, HTML_LANG, getDict, getAuthDict, COMPANY } from "../dictionaries";
import { TH_CONTACTS } from "../thContact";
import Analytics from "@/components/Analytics";
import ThaiNav from "../ThaiNav";
import { buildThaiSearchIndex } from "../searchIndex";
import type { ThLocale } from "../dictionaries";
import type { SearchLabels } from "../ThaiSearch";

const LOGO =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg";

// Trilingual labels for the nav search.
const SEARCH_LABELS: Record<ThLocale, SearchLabels> = {
  th: { search: "ค้นหา", placeholder: "ค้นหาสินค้า, รหัสชิ้นส่วน, การใช้งาน…", noResults: "ไม่พบผลลัพธ์", hint: "พิมพ์ชื่อรุ่น รหัสชิ้นส่วน (เช่น 012-64000R) หรือการใช้งาน", product: "สินค้า", application: "การใช้งาน", case: "กรณีศึกษา" },
  en: { search: "Search", placeholder: "Search products, part numbers, applications…", noResults: "No results", hint: "Type a model, part number (e.g. 012-64000R), or application", product: "Product", application: "Application", case: "Case" },
  zh: { search: "搜索", placeholder: "搜索产品、零件号、应用…", noResults: "无结果", hint: "输入型号、零件号（如 012-64000R）或应用", product: "产品", application: "应用", case: "案例" },
};

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
        {/* Scoped Thailand nav (responsive; hamburger on mobile) */}
        <ThaiNav
          lang={lang}
          labels={{ home: d.nav.home, products: d.nav.products, applications: d.nav.applications, salesSupport: d.nav.contact }}
          contactHref={`/th/${lang}/contact`}
          searchIndex={buildThaiSearchIndex(lang)}
          searchLabels={SEARCH_LABELS[lang]}
        />

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
