import type { Metadata } from "next";
import { isThLocale, type ThLocale } from "../../dictionaries";
import LandingShell, { pick3, type Tri3 } from "../../LandingShell";
import { ProductLandingBody } from "../../LandingBody";

const SLUG = "omnicure-s2000";
const meta = {
  title: {
    th: "OmniCure S2000 ระบบบ่มยูวีแบบจุด | ตัวแทนจำหน่ายที่ได้รับอนุญาต ไทย",
    en: "OmniCure S2000 UV Spot Curing System | Authorized Distributor Thailand",
    zh: "OmniCure S2000 UV 点固化系统 | 泰国授权分销商",
  } as Tri3,
  description: {
    th: "OmniCure S2000 — ระบบบ่มยูวีแบบจุดกำลังสูง จาก Etiatec (Thailand) ตัวแทนจำหน่ายที่ได้รับอนุญาต รับประกัน + ติดตั้งในไทย ขอใบเสนอราคา",
    en: "OmniCure S2000 high-intensity UV spot curing from Etiatec (Thailand), the authorized distributor. Local warranty & installation. Request a quote.",
    zh: "OmniCure S2000 高强度 UV 点固化，来自授权分销商 Etiatec (Thailand)，本地保修与安装，索取报价。",
  } as Tri3,
  eyebrow: { th: "OmniCure · UV Spot Curing", en: "OmniCure · UV Spot Curing", zh: "OmniCure · UV 点固化" } as Tri3,
  h1: { th: "OmniCure S2000 — ระบบบ่มยูวีแบบจุด", en: "OmniCure S2000 — UV Spot Curing System", zh: "OmniCure S2000 — UV 点固化系统" } as Tri3,
  subtitle: {
    th: "กำลังส่งออกยูวีสูงและสม่ำเสมอ สำหรับงานบ่มกาวความแม่นยำในอิเล็กทรอนิกส์ อุปกรณ์การแพทย์ และงานประกอบอุตสาหกรรม",
    en: "High-intensity, uniform UV output for precision adhesive curing in electronics, medical device, and industrial assembly.",
    zh: "高强度、均匀的 UV 输出，适用于电子、医疗器械与工业装配中的精密粘接固化。",
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
      <ProductLandingBody lang={l} slug="s2000-elite" matchToken="S2000" />
    </LandingShell>
  );
}
