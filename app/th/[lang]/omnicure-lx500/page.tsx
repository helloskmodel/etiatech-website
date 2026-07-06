import type { Metadata } from "next";
import { isThLocale, type ThLocale } from "../../dictionaries";
import LandingShell, { pick3, type Tri3 } from "../../LandingShell";
import { ProductLandingBody } from "../../LandingBody";

const SLUG = "omnicure-lx500";
const meta = {
  title: {
    th: "OmniCure LX500 UV LED บ่มแบบจุด | ตัวแทนจำหน่ายที่ได้รับอนุญาต ไทย",
    en: "OmniCure LX500 UV LED Spot Curing | Authorized Distributor Thailand",
    zh: "OmniCure LX500 UV LED 点固化 | 泰国授权分销商",
  } as Tri3,
  description: {
    th: "OmniCure LX500 — คอนโทรลเลอร์ UV LED บ่มแบบจุด 2/4 ช่อง จาก Etiatec (Thailand) ตัวแทนจำหน่ายที่ได้รับอนุญาต ขอใบเสนอราคา",
    en: "OmniCure LX500 — 2/4-channel UV LED spot curing controller from Etiatec (Thailand), the authorized distributor. Request a quote.",
    zh: "OmniCure LX500——2/4 通道 UV LED 点固化控制器，来自授权分销商 Etiatec (Thailand)，索取报价。",
  } as Tri3,
  eyebrow: { th: "OmniCure · UV LED Spot", en: "OmniCure · UV LED Spot", zh: "OmniCure · UV LED 点固化" } as Tri3,
  h1: { th: "OmniCure LX500 — UV LED บ่มแบบจุด", en: "OmniCure LX500 — UV LED Spot Curing", zh: "OmniCure LX500 — UV LED 点固化" } as Tri3,
  subtitle: {
    th: "เสถียรภาพเชิงแสง ±5% ด้วย Intelli-Lamp ควบคุมได้ถึง 4 หัวพร้อมกัน สำหรับการผลิตที่ทำซ้ำได้และคุ้มค่า",
    en: "±5% optical stability with Intelli-Lamp, controlling up to four heads for repeatable, cost-effective production.",
    zh: "Intelli-Lamp 提供 ±5% 光学稳定性，可同时控制多达 4 个头，实现可重复且高性价比的生产。",
  } as Tri3,
};

const SITE = "https://www.etiatech.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  return {
    title: pick3(meta.title, l),
    description: pick3(meta.description, l),
    // Deduped: canonicalize to the standalone LX500 SEM landing pages.
    alternates: {
      canonical:
        l === "en" ? `${SITE}/omnicure-lx500` : l === "th" ? `${SITE}/th/omnicure-lx500` : `${SITE}/th/zh/product`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  return (
    <LandingShell lang={l} eyebrow={pick3(meta.eyebrow, l)} title={pick3(meta.h1, l)} subtitle={pick3(meta.subtitle, l)}>
      <ProductLandingBody lang={l} slug="lx500" matchToken="LX500" />
    </LandingShell>
  );
}
