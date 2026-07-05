import type { Metadata } from "next";
import { isThLocale, type ThLocale } from "../../dictionaries";
import LandingShell, { pick3, type Tri3 } from "../../LandingShell";

const SLUG = "uv-curing-system-thailand";
const meta = {
  title: {
    th: "ระบบบ่มยูวี (UV Curing System) ประเทศไทย — Spot / LED / Lamp | ETIA",
    en: "UV Curing System Thailand — Spot, LED & Lamp | ETIA",
    zh: "UV 固化系统 泰国 — 点固化 / LED / 灯式 | ETIA",
  } as Tri3,
  description: {
    th: "ระบบบ่มยูวีสำหรับงานอุตสาหกรรมในไทย — บ่มแบบจุด UV LED และหลอดยูวี พร้อมวิศวกรช่วยเลือกรุ่นและขอใบเสนอราคา",
    en: "Industrial UV curing systems in Thailand — UV LED and lamp spot curing, with engineer-led selection support. Request a quote.",
    zh: "泰国工业 UV 固化系统——UV LED 与灯式点固化，工程师协助选型，索取报价。",
  } as Tri3,
  eyebrow: { th: "UV Curing · Thailand", en: "UV Curing · Thailand", zh: "UV 固化 · 泰国" } as Tri3,
  h1: {
    th: "ระบบบ่มยูวีสำหรับงานอุตสาหกรรม ในประเทศไทย",
    en: "Industrial UV Curing Systems in Thailand",
    zh: "泰国工业 UV 固化系统",
  } as Tri3,
  subtitle: {
    th: "จากตัวแทนจำหน่าย OmniCure® ที่ได้รับอนุญาต — เลือกระบบที่เหมาะกับงานของคุณ พร้อมการสนับสนุนจากวิศวกร",
    en: "From the authorized OmniCure® distributor — matched to your application with engineer support.",
    zh: "来自 OmniCure® 授权分销商——按您的应用匹配系统，并提供工程师支持。",
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
