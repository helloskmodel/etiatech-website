import type { Metadata } from "next";
import { isThLocale, type ThLocale } from "../../dictionaries";
import LandingShell, { pick3, type Tri3 } from "../../LandingShell";

const SLUG = "omnicure-thailand";
const meta = {
  title: {
    th: "OmniCure® ประเทศไทย — ตัวแทนจำหน่ายที่ได้รับอนุญาต | ETIA",
    en: "OmniCure® Thailand — Authorized Distributor (Excelitas) | ETIA",
    zh: "OmniCure® 泰国授权分销商（Excelitas）| ETIA",
  } as Tri3,
  description: {
    th: "Etiatec (Thailand) ตัวแทนจำหน่าย OmniCure® อย่างเป็นทางการในไทย — ระบบบ่มยูวี รับประกัน + ติดตั้งในพื้นที่ ขอใบเสนอราคา",
    en: "Etiatec (Thailand) — the authorized OmniCure® distributor in Thailand. UV curing systems with local warranty & installation. Request a quote.",
    zh: "Etiatec (Thailand)——OmniCure® 泰国官方授权分销商，UV 固化系统，本地保修与安装，索取报价。",
  } as Tri3,
  eyebrow: { th: "OmniCure® · Excelitas", en: "OmniCure® · Excelitas", zh: "OmniCure® · Excelitas" } as Tri3,
  h1: { th: "OmniCure® ในประเทศไทย", en: "OmniCure® in Thailand", zh: "OmniCure® 泰国" } as Tri3,
  subtitle: {
    th: "ตัวแทนจำหน่ายที่ได้รับอนุญาตอย่างเป็นทางการ พร้อมการรับประกันจากโรงงานและบริการติดตั้งในพื้นที่",
    en: "The officially authorized distributor, with full factory guarantee and local installation support.",
    zh: "官方授权分销商，提供原厂保修与本地安装支持。",
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
  return <LandingShell lang={l} eyebrow={pick3(meta.eyebrow, l)} title={pick3(meta.h1, l)} subtitle={pick3(meta.subtitle, l)} />;
}
