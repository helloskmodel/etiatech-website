import type { Metadata } from "next";
import { isThLocale, type ThLocale } from "../../dictionaries";
import LandingShell, { pick3, type Tri3 } from "../../LandingShell";
import { FamilyOverviewBody } from "../../LandingBody";

const SLUG = "omnicure-thailand";
const intro: Tri3 = {
  th: "Etiatec (Thailand) เป็นตัวแทนจำหน่าย OmniCure® ที่ได้รับอนุญาตในประเทศไทย จำหน่ายระบบบ่มยูวีแบบจุด OmniCure ครบตระกูล — ทั้งระบบ UV LED Spot และ UV Lamp Spot พร้อมเรดิโอเมทรีและการสอบเทียบ รับประกันจากโรงงานและบริการติดตั้งในพื้นที่",
  en: "Etiatec (Thailand) is the authorized OmniCure® distributor in Thailand, supplying the complete OmniCure UV spot curing line — UV LED Spot and UV Lamp Spot systems, plus radiometry and calibration — with full factory warranty and local installation.",
  zh: "Etiatec (Thailand) 是 OmniCure® 在泰国的授权分销商，供应完整的 OmniCure UV 点固化产品线——UV LED 点固化与 UV 灯式点固化系统，以及辐照测量与校准，提供原厂保修与本地安装。",
};
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
    // Deduped: this microsite grid overlaps the standalone SEM landing pages,
    // so it canonicalizes to them (zh has no SEM page → the zh products hub).
    alternates: {
      canonical:
        l === "en" ? `${SITE}/omnicure-thailand` : l === "th" ? `${SITE}/th/omnicure` : `${SITE}/th/zh/product`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  return (
    <LandingShell lang={l} eyebrow={pick3(meta.eyebrow, l)} title={pick3(meta.h1, l)} subtitle={pick3(meta.subtitle, l)}>
      <FamilyOverviewBody lang={l} intro={pick3(intro, l)} />
    </LandingShell>
  );
}
