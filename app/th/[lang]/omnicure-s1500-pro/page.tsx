import type { Metadata } from "next";
import { isThLocale, type ThLocale } from "../../dictionaries";
import LandingShell, { pick3, type Tri3 } from "../../LandingShell";
import { ProductLandingBody } from "../../LandingBody";

const SLUG = "omnicure-s1500-pro";
const meta = {
  title: {
    th: "OmniCure® S1500 Pro ระบบบ่มยูวีแบบจุด | ตัวแทนจำหน่ายที่ได้รับอนุญาต ไทย",
    en: "OmniCure® S1500 Pro UV Spot Curing System | Authorized Distributor Thailand",
    zh: "OmniCure® S1500 Pro UV 点固化系统 | 泰国授权分销商",
  } as Tri3,
  description: {
    th: "OmniCure® S1500 Pro — ระบบบ่มยูวีแบบจุดหลอดยูวีสำหรับงานปริมาณสูง พร้อม Intelli-Lamp® 2.0 จาก Etiatec (Thailand) ตัวแทนจำหน่ายที่ได้รับอนุญาต ขอใบเสนอราคา",
    en: "OmniCure® S1500 Pro high-throughput UV lamp spot curing with Intelli-Lamp® 2.0, from Etiatec (Thailand), the authorized distributor. Request a quote.",
    zh: "OmniCure® S1500 Pro 高产能 UV 灯式点固化，配备 Intelli-Lamp® 2.0，来自授权分销商 Etiatec (Thailand)，索取报价。",
  } as Tri3,
  eyebrow: { th: "OmniCure® · UV Lamp Spot", en: "OmniCure® · UV Lamp Spot", zh: "OmniCure® · UV 灯式点固化" } as Tri3,
  h1: { th: "OmniCure® S1500 Pro — ระบบบ่มยูวีแบบจุด", en: "OmniCure® S1500 Pro — UV Spot Curing System", zh: "OmniCure® S1500 Pro — UV 点固化系统" } as Tri3,
  subtitle: {
    th: "บ่มกาวยูวีปริมาณสูงสำหรับไมโครอิเล็กทรอนิกส์และออปโตอิเล็กทรอนิกส์ ด้วย Intelli-Lamp® 2.0, StepCure® 2.0 และฟิลเตอร์ที่สลับเปลี่ยนได้เอง",
    en: "High-throughput UV adhesive curing for microelectronics and optoelectronics, with Intelli-Lamp® 2.0, StepCure® 2.0, and user-interchangeable filters.",
    zh: "面向微电子与光电子的高产能 UV 粘接固化，配备 Intelli-Lamp® 2.0、StepCure® 2.0 与用户可换滤光片。",
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
      <ProductLandingBody lang={l} slug="s1500-pro" matchToken="S1500" />
    </LandingShell>
  );
}
