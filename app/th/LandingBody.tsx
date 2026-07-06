import Link from "next/link";
import { marketProducts, marketApps } from "@/components/markets";
import { localizeProduct, productTagline, type Product } from "@/components/productCatalog";
import { appSlug } from "@/components/applicationNotes";
import { getAuthDict, getDict, getAppDict, type ThLocale } from "./dictionaries";
import { productContentTh } from "./productContentTh";
import { thMailto } from "./thContact";

// ─────────────────────────────────────────────────────────────────────────
// Shared bodies for the Thailand SEM landing pages, modelled on the Excelitas
// OmniCure product-category layout (family overview → product cards → trust →
// applications → quote CTA). All copy is real: product specs/features come from
// the catalog (EN/ZH final), Thai from the team brochure content, and the
// authorized-distributor wording from the reviewed auth dictionary.
// ─────────────────────────────────────────────────────────────────────────

type Tri = { th: string; en: string; zh: string };
const t = (x: Tri, l: ThLocale) => x[l];

// Excelitas-style family grouping for the OmniCure line ETIA carries in Thailand.
const FAMILY_OF: Record<string, string> = {
  lx500: "led",
  ls200: "radiometry",
  r2000: "radiometry",
  "s2000-elite": "lamp",
  "s1500-pro": "lamp",
  "s2e-network-module": "accessory",
};
const FAMILY_ORDER = ["led", "lamp", "radiometry", "accessory"] as const;
const FAMILY_LABEL: Record<string, Tri> = {
  led: { th: "ระบบบ่มแบบจุด UV LED (UV LED Spot Curing)", en: "UV LED Spot Curing", zh: "UV LED 点固化" },
  lamp: { th: "ระบบบ่มแบบจุดหลอดยูวี (UV Lamp Spot Curing)", en: "UV Lamp Spot Curing", zh: "UV 灯式点固化" },
  radiometry: { th: "เรดิโอเมทรีและการสอบเทียบ", en: "Radiometry & Calibration", zh: "辐照测量与校准" },
  accessory: { th: "อุปกรณ์เสริมและการเชื่อมต่อ", en: "Accessories & Connectivity", zh: "配件与连接" },
};

// Short, real per-language descriptor for a product card.
function descriptor(p: Product, l: ThLocale): string {
  if (l === "th") return productContentTh[p.slug]?.subtitle ?? localizeProduct(p, l).intro;
  const tag = productTagline[p.slug];
  if (tag) return l === "zh" ? tag.zh : tag.en;
  const intro = localizeProduct(p, l).intro ?? "";
  return intro.length > 140 ? intro.slice(0, 137) + "…" : intro;
}

// Authorized-distributor value props — asserted verbatim by the reviewed auth
// statement, surfaced here as scannable bullets.
const TRUST: { icon: string; label: Tri }[] = [
  { icon: "✅", label: { th: "สินค้าของแท้ 100%", en: "100% Genuine Products", zh: "100% 正品" } },
  { icon: "🛡️", label: { th: "การรับประกันจากโรงงานเต็มรูปแบบ", en: "Full Factory Warranty", zh: "原厂完整保修" } },
  { icon: "🔧", label: { th: "ติดตั้งและสนับสนุนทางเทคนิคในพื้นที่", en: "Local Installation & Support", zh: "本地安装与技术支持" } },
  { icon: "📄", label: { th: "รองรับงานประมูลและ RFQ", en: "RFQ & Tender Ready", zh: "支持招标与 RFQ" } },
];
const TRUST_HEADING: Tri = {
  th: "ทำไมต้องซื้อจากตัวแทนจำหน่ายที่ได้รับอนุญาต",
  en: "Why buy from the authorized distributor",
  zh: "为什么向授权分销商采购",
};
const APPS_HEADING: Tri = {
  th: "การใช้งานตามอุตสาหกรรม",
  en: "Applications by Industry",
  zh: "按行业应用",
};
const VIEW_ALL_APPS: Tri = {
  th: "ดูการใช้งานทั้งหมด →",
  en: "View all applications →",
  zh: "查看全部应用 →",
};
const FULL_SPECS: Tri = {
  th: "ดูข้อมูลจำเพาะทั้งหมด →",
  en: "View full specifications →",
  zh: "查看完整规格 →",
};
const SPEC_HIGHLIGHTS: Tri = {
  th: "ข้อมูลจำเพาะที่สำคัญ",
  en: "Key Specifications",
  zh: "主要规格",
};

function TrustBlock({ lang }: { lang: ThLocale }) {
  const auth = getAuthDict(lang);
  return (
    <section className="mt-12 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-1">{t(TRUST_HEADING, lang)}</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-2xl">{auth.statement}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TRUST.map((b) => (
          <div key={b.label.en} className="flex items-center gap-3 rounded-lg bg-white border border-gray-100 px-4 py-3">
            <span className="text-lg" aria-hidden>{b.icon}</span>
            <span className="text-sm font-semibold text-gray-800">{t(b.label, lang)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, lang }: { p: Product; lang: ThLocale }) {
  const d = getDict(lang);
  return (
    <Link
      href={`/th/${lang}/product/${p.slug}`}
      className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1A56DB] transition-all flex flex-col"
    >
      <div className="p-5 text-white" style={{ background: p.accent }}>
        <p className="text-xs opacity-80 mb-1 tracking-wider font-medium">{p.sub}</p>
        <h3 className="text-lg font-bold leading-snug">{p.name}</h3>
      </div>
      <div className="p-5 bg-white flex flex-col flex-1">
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{descriptor(p, lang)}</p>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{d.products.specsLabel}</p>
        <dl className="text-sm text-gray-600 space-y-1 mb-5">
          {p.specs.slice(0, 3).map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <dt className="text-gray-400 min-w-[42%]">{k}</dt>
              <dd className="font-medium text-gray-700">{v}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-auto text-sm font-semibold group-hover:underline" style={{ color: "#1A56DB" }}>
          {d.products.details} →
        </span>
      </div>
    </Link>
  );
}

// ─── Family / category overview (Excelitas product-category style) ──────────
export function FamilyOverviewBody({ lang, intro }: { lang: ThLocale; intro?: string }) {
  const products = marketProducts("th");
  const app = getAppDict(lang);
  const grouped = FAMILY_ORDER.map((fam) => ({
    fam,
    items: products.filter((p) => FAMILY_OF[p.slug] === fam),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {intro && <p className="text-gray-600 leading-relaxed max-w-3xl mb-10">{intro}</p>}

      {grouped.map(({ fam, items }) => (
        <section key={fam} className="mb-12">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded mb-5 text-white" style={{ background: fam === "lamp" ? "#166534" : fam === "radiometry" ? "#0f2444" : fam === "accessory" ? "#64748b" : "#44B549" }}>
            {t(FAMILY_LABEL[fam], lang)}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((p) => (
              <ProductCard key={p.slug} p={p} lang={lang} />
            ))}
          </div>
        </section>
      ))}

      <TrustBlock lang={lang} />

      {/* Applications teaser */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{t(APPS_HEADING, lang)}</h2>
        <p className="text-sm text-gray-600 mb-4 max-w-2xl">{app.subheading}</p>
        <Link href={`/th/${lang}/application`} className="text-sm font-semibold hover:underline" style={{ color: "#1A56DB" }}>
          {t(VIEW_ALL_APPS, lang)}
        </Link>
      </section>
    </>
  );
}

// ─── Single-product landing (Excelitas product-page style, commercial angle) ─
export function ProductLandingBody({ lang, slug, matchToken }: { lang: ThLocale; slug: string; matchToken: string }) {
  const products = marketProducts("th");
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;

  const d = getDict(lang);
  const app = getAppDict(lang);
  const loc = localizeProduct(p, lang);
  const th = lang === "th" ? productContentTh[p.slug] : undefined;

  // Related applications: those that recommend this model.
  const related = marketApps("th")
    .filter((a) => a.recommended.toUpperCase().includes(matchToken.toUpperCase()))
    .slice(0, 4);

  return (
    <>
      {/* Overview */}
      {th ? (
        <div className="space-y-5 max-w-3xl">
          {th.sections.slice(0, 4).map((s, i) => (
            <section key={i}>
              {s.heading && <h2 className="text-base font-bold text-gray-800 mb-1">{s.heading}</h2>}
              <p className="text-gray-700 leading-relaxed">{s.text}</p>
            </section>
          ))}
        </div>
      ) : (
        <div className="max-w-3xl">
          {loc.intro && <p className="text-gray-700 leading-relaxed mb-6">{loc.intro}</p>}
          {loc.features?.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {loc.features.slice(0, 6).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Key specifications (highlights) */}
      {p.specs?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">{t(SPEC_HIGHLIGHTS, lang)}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse max-w-2xl">
              <tbody>
                {p.specs.slice(0, 6).map(([k, v]) => (
                  <tr key={k} className="border-b border-gray-100">
                    <th className="text-left font-medium text-gray-500 py-2 pr-4 align-top w-2/5">{k}</th>
                    <td className="py-2 text-gray-800">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href={`/th/${lang}/product/${p.slug}`} className="inline-block mt-4 text-sm font-semibold hover:underline" style={{ color: "#1A56DB" }}>
            {t(FULL_SPECS, lang)}
          </Link>
        </section>
      )}

      <TrustBlock lang={lang} />

      {/* Related applications */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t(APPS_HEADING, lang)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((a) => (
              <Link
                key={a.id}
                href={`/th/${lang}/application/${appSlug(a)}`}
                className="group rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1A56DB] transition-all p-4"
              >
                <p className="text-xs font-semibold text-gray-400 mb-1">{a.subCategory}</p>
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#1A56DB]">{a.title}</h3>
              </Link>
            ))}
          </div>
          <Link href={`/th/${lang}/application`} className="inline-block mt-5 text-sm font-semibold hover:underline" style={{ color: "#1A56DB" }}>
            {t(VIEW_ALL_APPS, lang)}
          </Link>
        </section>
      )}

      {/* Quote CTA */}
      <div className="mt-12">
        <a
          href={thMailto(lang, { subject: "Request a Quote — Thailand", context: p.name })}
          className="inline-block text-sm font-semibold text-white rounded px-6 py-3 hover:opacity-90"
          style={{ background: "#1A56DB" }}
        >
          {getAuthDict(lang).requestQuote} →
        </a>
        <span className="ml-4 text-xs text-gray-400">{d.products.heading}</span>
      </div>
    </>
  );
}
