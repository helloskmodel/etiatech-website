import type { Metadata } from "next";
import { isThLocale, type ThLocale } from "../../dictionaries";
import LandingShell, { pick3, type Tri3 } from "../../LandingShell";
import { TH_CONTACTS, thMailto } from "../../thContact";

const SLUG = "contact";
const meta = {
  title: {
    th: "ขอใบเสนอราคา / ติดต่อ — OmniCure ประเทศไทย | ETIA",
    en: "Request a Quote / Contact — OmniCure Thailand | ETIA",
    zh: "索取报价 / 联系 — OmniCure 泰国 | ETIA",
  } as Tri3,
  description: {
    th: "ขอใบเสนอราคาระบบบ่มยูวี OmniCure จาก Etiatec (Thailand) ตัวแทนจำหน่ายที่ได้รับอนุญาต — รองรับ RFQ และงานประมูล",
    en: "Request a quote for OmniCure UV curing from Etiatec (Thailand), the authorized distributor — RFQ & tender ready.",
    zh: "向授权分销商 Etiatec (Thailand) 索取 OmniCure UV 固化系统报价——支持 RFQ 与招标。",
  } as Tri3,
  eyebrow: { th: "ขอใบเสนอราคา", en: "Request a Quote", zh: "索取报价" } as Tri3,
  h1: {
    th: "ติดต่อ & ขอใบเสนอราคา",
    en: "Contact & Request a Quote",
    zh: "联系与索取报价",
  } as Tri3,
  subtitle: {
    th: "ทีมวิศวกรของเราพร้อมช่วยเลือกรุ่นและจัดทำใบเสนอราคา รองรับงานประมูลและ RFQ ในประเทศไทย",
    en: "Our engineers are ready to help with selection and quotations — RFQ and tender support in Thailand.",
    zh: "我们的工程师随时协助选型与报价——支持泰国的 RFQ 与招标。",
  } as Tri3,
};

const SITE = "https://www.etiatech.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  return {
    title: pick3(meta.title, l),
    description: pick3(meta.description, l),
    alternates: {
      canonical: `${SITE}/th/${l}/${SLUG}`,
      languages: {
        th: `${SITE}/th/th/${SLUG}`,
        en: `${SITE}/th/en/${SLUG}`,
        zh: `${SITE}/th/zh/${SLUG}`,
        "x-default": `${SITE}/th/th/${SLUG}`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  return (
    <LandingShell lang={l} eyebrow={pick3(meta.eyebrow, l)} title={pick3(meta.h1, l)} subtitle={pick3(meta.subtitle, l)}>
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 max-w-md">
        <p className="text-lg font-bold text-gray-900">{TH_CONTACTS.sales.name}</p>
        <p className="text-sm text-gray-500 mb-4">{TH_CONTACTS.sales.role[l]}</p>
        <div className="space-y-2 text-sm">
          <a href={`tel:${TH_CONTACTS.sales.phoneHref}`} className="block font-medium text-[#1A3DAD] hover:underline">📞 {TH_CONTACTS.sales.phone}</a>
          <a href={`mailto:${TH_CONTACTS.sales.email}`} className="block font-medium text-[#1A3DAD] hover:underline">✉️ {TH_CONTACTS.sales.email}</a>
        </div>
        <a
          href={thMailto(l, { subject: "Request a Quote — Thailand" })}
          className="mt-5 inline-block text-sm font-semibold text-white rounded px-5 py-2.5 hover:opacity-90"
          style={{ background: "#1A3DAD" }}
        >
          {pick3(meta.eyebrow, l)} →
        </a>
      </div>
    </LandingShell>
  );
}
