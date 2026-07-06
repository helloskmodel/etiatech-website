import type { Metadata } from "next";
import { isThLocale, type ThLocale } from "../../dictionaries";
import LandingShell, { pick3, type Tri3 } from "../../LandingShell";
import { FamilyOverviewBody } from "../../LandingBody";

const meta = {
  title: {
    th: "ผลิตภัณฑ์ OmniCure ในประเทศไทย — ระบบบ่มยูวีแบบจุด | ETIA",
    en: "OmniCure Products in Thailand — UV Spot Curing & Radiometry | ETIA",
    zh: "OmniCure 泰国产品 — UV 点固化系统与辐照测量 | ETIA",
  } as Tri3,
  description: {
    th: "ผลิตภัณฑ์ OmniCure ที่จำหน่ายในประเทศไทยโดย Etiatec (Thailand) ตัวแทนจำหน่ายที่ได้รับอนุญาต — ระบบบ่มยูวีแบบจุด UV LED และหลอดยูวี พร้อมเรดิโอเมทรีและการสอบเทียบ",
    en: "The OmniCure products ETIA carries in Thailand as the authorized distributor — UV LED and UV lamp spot curing systems, plus radiometry and calibration.",
    zh: "Etiatec (Thailand) 作为授权分销商在泰国供应的 OmniCure 产品——UV LED 与 UV 灯式点固化系统，以及辐照测量与校准。",
  } as Tri3,
  eyebrow: { th: "OmniCure · ประเทศไทย", en: "OmniCure · Thailand", zh: "OmniCure · 泰国" } as Tri3,
  h1: {
    th: "ผลิตภัณฑ์ OmniCure ในประเทศไทย",
    en: "OmniCure Products in Thailand",
    zh: "OmniCure 泰国产品",
  } as Tri3,
  subtitle: {
    th: "ตระกูลระบบบ่มยูวีแบบจุด OmniCure ครบทุกรุ่นที่เราจำหน่ายในไทย — ทั้ง UV LED Spot, UV Lamp Spot และเรดิโอเมทรี",
    en: "The complete OmniCure UV spot curing line we carry in Thailand — UV LED Spot, UV Lamp Spot, and radiometry.",
    zh: "我们在泰国供应的完整 OmniCure UV 点固化产品线——UV LED 点固化、UV 灯式点固化与辐照测量。",
  } as Tri3,
  intro: {
    th: "ในประเทศไทย ETIA มุ่งเน้นตระกูลบ่มยูวีแบบจุดของ OmniCure ด้านล่างนี้คือรุ่นทั้งหมดที่เราจำหน่ายและสนับสนุนในพื้นที่ คลิกที่รุ่นใดก็ได้เพื่อดูข้อมูลจำเพาะฉบับเต็ม",
    en: "In Thailand, ETIA focuses on the OmniCure UV spot curing family. Below are all the models we sell and support locally — click any model for full specifications.",
    zh: "在泰国，ETIA 专注于 OmniCure UV 点固化产品线。以下是我们在本地销售并支持的全部型号——点击任意型号查看完整规格。",
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
      canonical: `${SITE}/th/${l}/product`,
      languages: {
        th: `${SITE}/th/th/product`,
        en: `${SITE}/th/en/product`,
        zh: `${SITE}/th/zh/product`,
        "x-default": `${SITE}/th/th/product`,
      },
    },
  };
}

export default async function ThailandProductsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  return (
    <LandingShell lang={l} eyebrow={pick3(meta.eyebrow, l)} title={pick3(meta.h1, l)} subtitle={pick3(meta.subtitle, l)}>
      <FamilyOverviewBody lang={l} intro={pick3(meta.intro, l)} />
    </LandingShell>
  );
}
