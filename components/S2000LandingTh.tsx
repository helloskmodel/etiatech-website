"use client";

import Link from "next/link";
import Image from "next/image";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import TrustStrip from "@/components/TrustStrip";
import { LocaleProvider } from "@/components/LocaleContext";
import { inquiryMailto } from "@/components/contact";
import { s2000FaqsTh } from "@/components/s2000FaqTh";
import { ArrowRight, BadgeCheck, CheckCircle2, ChevronRight, Download } from "lucide-react";

const PROMO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION";
const HERO_IMG = `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp`;

const PDF = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF";
const PDF_BROCHURE = `${PDF}/Brochure%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf`;
const PDF_QUICKSTART = `${PDF}/Quick%20Start%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf`;
const PDF_USERGUIDE = `${PDF}/User%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf`;

const engineerMail = inquiryMailto("th", { subject: "OmniCure S2000 Elite", context: "OmniCure S2000 Elite" });

const stats = [
  "Optical output สูงสุด 30 W/cm² / 37 W/cm²",
  "ควบคุมความเข้มด้วย Closed-Loop Feedback",
  "High-speed shutter 30 ms",
  "รองรับ Web UI · PLC · NFC · StepCure",
];

const features: { title: string; body: string }[] = [
  { title: "OmniCure S2000 Elite Remote Control & Monitoring", body: "Web UI ช่วยให้สามารถควบคุม จัดการ และมอนิเตอร์ระบบจากระยะไกล ผู้ใช้สามารถเข้าถึงฟังก์ชันของระบบ curing profiles, system logs และ software updates ผ่านอุปกรณ์ที่เชื่อมต่อได้" },
  { title: "OmniCure S2000 Elite Touchscreen User Interface", body: "หน้าจอสัมผัส LCD ขนาด 4.3 นิ้ว ช่วยให้ควบคุมระบบ ตั้งค่า ใช้งาน exposure และตรวจสอบสถานะที่เกี่ยวข้องกับกระบวนการ curing ได้อย่างสะดวก" },
  { title: "OmniCure S2000 Elite StepCure PLC Control", body: "StepCure รองรับลำดับ curing ที่สามารถตั้งโปรแกรมได้ พร้อมความสามารถในการควบคุมผ่าน PLC ช่วยให้ควบคุมกระบวนการผลิตที่ผ่านการตรวจสอบแล้วได้อย่างทำซ้ำและแม่นยำ" },
  { title: "OmniCure S2000 Elite Quick Configuration", body: "ชนิดของหลอดและ optical filters สามารถเปลี่ยนได้โดยผู้ใช้ ช่วยให้ตั้งค่าระบบได้รวดเร็วขึ้น และลด downtime เมื่อมีการเปลี่ยนกระบวนการผลิต" },
  { title: "OmniCure S2000 Elite Closed-Loop Feedback (CLF)", body: "Closed-Loop Feedback ตรวจสอบ optical output และช่วยรักษาความเข้มของแสงให้สม่ำเสมอในระหว่างกระบวนการ curing" },
  { title: "OmniCure S2000 Elite Intelli-Lamp Technology", body: "Intelli-Lamp technology ติดตามพารามิเตอร์ของหลอดและช่วยจัดการอายุการใช้งานของหลอด เพื่อลดความเสี่ยงของ downtime ที่ไม่คาดคิด" },
  { title: "OmniCure S2000 Elite Intelli-Tap NFC Access Control", body: "Intelli-Tap NFC ช่วยควบคุมสิทธิ์ของ supervisor และ administrator สำหรับการล็อก ปลดล็อก และปกป้องค่ากระบวนการที่สำคัญ" },
  { title: "OmniCure S2000 Elite Optical Performance", body: "S2000 Elite ยังคงรองรับความเข้ากันได้กับแพลตฟอร์ม S2000 เดิม รวมถึง light guides, optical filters, radiometry accessories และ spectral output" },
];

const guides: { title: string; desc: string; btn: string; href: string }[] = [
  { title: "OmniCure S2000 Elite Brochure", desc: "ภาพรวมผลิตภัณฑ์ คุณสมบัติหลัก ความเข้ากันได้ของระบบ ฟังก์ชันการควบคุม และประโยชน์ด้านการใช้งาน", btn: "ดาวน์โหลด Brochure", href: PDF_BROCHURE },
  { title: "OmniCure S2000 Elite Quick Start Guide", desc: "ขั้นตอนเริ่มต้น การติดตั้ง light guide การตั้งค่า exposure การติดตั้ง lamp module และการติดตั้ง optical filter", btn: "ดาวน์โหลด Quick Start Guide", href: PDF_QUICKSTART },
  { title: "OmniCure S2000 Elite User Guide", desc: "คู่มือการใช้งานฉบับเต็ม ครอบคลุมความปลอดภัย การตั้งค่า calibration, Web UI, การเชื่อมต่อ PLC, StepCure, การบำรุงรักษา, software updates, troubleshooting และข้อมูลทางเทคนิค", btn: "ดาวน์โหลด User Guide", href: PDF_USERGUIDE },
];

const setup: { title: string; body: string }[] = [
  { title: "การเริ่มต้นใช้งาน OmniCure S2000 Elite", body: "ติดตั้ง lamp module ติดตั้ง optical filter เชื่อมต่อไฟ เปิดระบบ และให้หลอด warm-up อย่างเหมาะสมก่อนใช้งาน" },
  { title: "การติดตั้ง Light Guide สำหรับ OmniCure S2000 Elite", body: "ใส่ light guide เข้าไปในพอร์ต light guide ด้านหน้าจนเข้าที่อย่างแน่นหนา" },
  { title: "สถานะ Light Ring ของ OmniCure S2000 Elite", body: "ใช้สีของ light ring เพื่อตรวจสอบสถานะของระบบ เช่น การตรวจพบ light guide การ warm-up สถานะ Closed-Loop Feedback และสถานะ calibration" },
  { title: "การตั้งค่า Exposure Time ของ OmniCure S2000 Elite", body: "ตั้งค่า exposure time จากหน้าจอ Run โดยใช้ touchscreen หรือปุ่มนำทาง" },
  { title: "การตั้งค่าความเข้มของ OmniCure S2000 Elite", body: "ตั้งค่าความเข้มด้วย touchscreen หรือปุ่มนำทาง จำเป็นต้อง calibration เพื่อควบคุมค่าเป็น W/cm² และ W" },
  { title: "การล็อกและปลดล็อก OmniCure S2000 Elite", body: "ใช้ PIN หรือ NFC access control เพื่อปกป้องค่าการ curing ที่ผ่านการตรวจสอบแล้ว" },
];

const troubleshooting: { q: string; a: string }[] = [
  { q: "OmniCure S2000 Elite ไม่ตรวจพบ Light Guide", a: "ตรวจสอบว่า light guide ถูกใส่เข้าไปอย่างสมบูรณ์และอยู่ในตำแหน่งที่ถูกต้องในพอร์ต light guide หรือไม่ หากปัญหายังคงอยู่ โปรดติดต่อฝ่ายสนับสนุนทางเทคนิคของ ETIA" },
  { q: "หลอด OmniCure S2000 Elite ไม่ติด", a: "ตรวจสอบการติดตั้งหลอด การติดตั้ง filter ฝาครอบช่องหลอด การเชื่อมต่อไฟ และสถานะของระบบ หากปัญหายังคงอยู่ โปรดติดต่อฝ่ายสนับสนุนทางเทคนิคของ ETIA" },
  { q: "Closed-Loop Feedback ของ OmniCure S2000 Elite ไม่ทำงาน", a: "ตรวจสอบสถานะ calibration สภาพหลอด การเชื่อมต่อ light guide และการตั้งค่า filter หากปัญหายังคงอยู่ โปรดติดต่อฝ่ายสนับสนุนทางเทคนิคของ ETIA" },
  { q: "ความเข้มของ OmniCure S2000 Elite ไม่เสถียร", a: "ให้ระบบ warm-up อย่างเพียงพอ ตรวจสอบ calibration ตรวจสอบ light guide และตรวจสอบสถานะอายุการใช้งานของหลอด หากปัญหายังคงอยู่ โปรดติดต่อฝ่ายสนับสนุนทางเทคนิคของ ETIA" },
  { q: "OmniCure S2000 Elite ไม่รู้จัก Optical Filter", a: "ตรวจสอบว่า optical filter cartridge ถูกติดตั้งและยึดอย่างถูกต้องหรือไม่ หาก filter ติดตั้งไม่ถูกต้อง ระบบอาจไม่สามารถตรวจพบ filter และหลอดอาจไม่ติด" },
  { q: "ระบบ OmniCure S2000 Elite ถูกล็อก", a: "ใช้ PIN ที่ตั้งค่าไว้ supervisor card หรือ administrator NFC card ตามการตั้งค่า access control หากปัญหายังคงอยู่ โปรดติดต่อฝ่ายสนับสนุนทางเทคนิคของ ETIA" },
];

const maintenanceCards = [
  "การสนับสนุน Replacement Lamp สำหรับ OmniCure S2000 Elite",
  "การสนับสนุน Optical Filter สำหรับ OmniCure S2000 Elite",
  "การสนับสนุน Light Guide สำหรับ OmniCure S2000 Elite",
  "การสนับสนุน Calibration สำหรับ OmniCure S2000 Elite",
  "การสนับสนุน Maintenance & Repair สำหรับ OmniCure S2000 Elite",
];

const whyCards = [
  "ผลิตภัณฑ์ OmniCure ของแท้",
  "การเลือกผลิตภัณฑ์ตามการใช้งานจริง",
  "การจัดหาภายในพื้นที่และการตอบสนองรวดเร็ว",
  "การสนับสนุนบริการระยะยาว",
];

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1A56DB]";
const eyebrow = "text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]";

function Content() {
  return (
    <div className="bg-white text-[#102038]">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-xs text-gray-400 sm:px-6 lg:px-8">
          <Link href="/th" className="hover:text-[#1A56DB]">ผลิตภัณฑ์</Link><span className="mx-2">›</span>
          <Link href="/product/omnicure" className="hover:text-[#1A56DB]">OmniCure</Link><span className="mx-2">›</span>
          <span className="text-gray-500">S2000 Elite</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1A56DB]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> OmniCure S Series · ระบบ UV Spot Curing แบบใช้หลอด</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-5xl">OmniCure S2000 Elite UV Spot Curing System<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-3xl">กำลังสูง ควบคุมได้อย่างแม่นยำ</span></h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#667085]">ระบบ UV spot curing แบบใช้หลอดกำลังสูง พร้อม Closed-Loop Feedback การควบคุม shutter ที่แม่นยำ และการมอนิเตอร์กระบวนการขั้นสูง สำหรับงานผลิตที่ต้องการความเสถียรและการควบคุมที่เชื่อถือได้</p>
            <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {stats.map((s) => <div key={s} className="flex items-start gap-2 rounded-xl border border-[#DCE7F5] bg-white/70 p-3 text-xs font-semibold text-[#143C96] backdrop-blur"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#41A62A]" />{s}</div>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={engineerMail} className={btnPrimary}>ขอใบเสนอราคา <ArrowRight className="h-4 w-4" /></a>
              <a href={PDF_BROCHURE} target="_blank" rel="noopener noreferrer" className={btnGhost}><Download className="h-4 w-4" /> ดาวน์โหลด Brochure</a>
              <Link href="/contact" className={btnGhost}>ขอรับคำปรึกษาทางเทคนิค</Link>
            </div>
          </div>
          <div className="relative min-h-[380px] rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur sm:p-8">
            <Image src={HERO_IMG} alt="OmniCure S2000 Elite UV Spot Curing System" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-8" priority />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Overview */}
      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl">
        <p className={eyebrow}>ภาพรวม</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">ภาพรวม OmniCure S2000 Elite</h2>
        <p className="mt-5 leading-8 text-[#4A5568]">OmniCure S2000 Elite คือระบบ UV spot curing แบบใช้หลอด ออกแบบมาสำหรับกระบวนการผลิตที่ต้องการ optical output ที่เสถียร การควบคุม dose ที่ทำซ้ำได้ รอบการ exposure ที่รวดเร็ว และการมอนิเตอร์กระบวนการที่เชื่อถือได้ เหมาะสำหรับสภาพแวดล้อมการผลิตที่ให้ความสำคัญกับความสม่ำเสมอของกระบวนการ curing การตรวจสอบย้อนกลับ และ uptime ของสายการผลิต</p>
      </div></section>

      {/* Key Features */}
      <section className="bg-[#F6F9FF] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <p className={eyebrow}>คุณสมบัติ</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">คุณสมบัติหลักของ OmniCure S2000 Elite</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <article key={f.title} className="rounded-2xl border border-[#D9E4EA] bg-white p-6 shadow-[0_10px_35px_rgba(20,60,150,.05)]">
              <h3 className="font-bold text-[#143C96]">{f.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#667085]">{f.body}</p>
            </article>
          ))}
        </div>
      </div></section>

      {/* User Guides */}
      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <p className={eyebrow}>ทรัพยากร</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">คู่มือการใช้งานและเอกสารทางเทคนิคของ OmniCure S2000 Elite</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#667085]">ค้นหาเอกสารและคำแนะนำที่จำเป็นสำหรับการติดตั้ง การตั้งค่า calibration การบำรุงรักษา และ troubleshooting</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {guides.map((g) => (
            <article key={g.title} className="flex flex-col rounded-2xl border border-[#D9E4EA] bg-white p-6">
              <h3 className="font-bold text-[#143C96]">{g.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#667085]">{g.desc}</p>
              <a href={g.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#41A62A]"><Download className="h-4 w-4" /> {g.btn}</a>
            </article>
          ))}
        </div>
      </div></section>

      {/* Setup Guide */}
      <section className="bg-[#F1FAEF] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <p className={eyebrow}>การตั้งค่า</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">คู่มือการตั้งค่า OmniCure S2000 Elite</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {setup.map((s, i) => (
            <article key={s.title} className="rounded-2xl border border-[#D9E4EA] bg-white p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF6FF] text-sm font-bold text-[#143C96]">{i + 1}</span>
              <h3 className="mt-4 font-bold text-[#143C96]">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#667085]">{s.body}</p>
            </article>
          ))}
        </div>
      </div></section>

      {/* Troubleshooting */}
      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl">
        <p className={eyebrow}>Troubleshooting</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">การแก้ไขปัญหา OmniCure S2000 Elite</h2>
        <div className="mt-8 divide-y divide-gray-200 rounded-2xl border border-[#D9E4EA] bg-white">
          {troubleshooting.map((tItem) => (
            <details key={tItem.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#143C96]">{tItem.q}<ChevronRight className="h-5 w-5 shrink-0 text-[#41A62A] transition-transform group-open:rotate-90" /></summary>
              <p className="mt-3 text-sm leading-7 text-[#667085]">{tItem.a}</p>
            </details>
          ))}
        </div>
      </div></section>

      {/* Lamp Replacement & Maintenance */}
      <section className="bg-[#F6F9FF] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <p className={eyebrow}>การบำรุงรักษา</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">บริการเปลี่ยนหลอดและบำรุงรักษา OmniCure S2000 Elite</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#667085]">ETIA สนับสนุนผู้ใช้งาน OmniCure S2000 Elite ในด้าน replacement lamps, optical filters, light guides, calibration guidance, maintenance, repair support และ troubleshooting — ดู <Link href="/product/omnicure/s2000-lamp" className="font-semibold text-[#1A56DB] underline">หลอดเปลี่ยน OmniCure S2000</Link> หรือ <Link href="/contact" className="font-semibold text-[#1A56DB] underline">ติดต่อฝ่ายขายและสนับสนุน</Link></p>
        <div className="mt-8 flex flex-wrap gap-3">
          {maintenanceCards.map((c) => <span key={c} className="rounded-full border border-[#1A56DB]/20 bg-white px-4 py-2 text-sm font-semibold text-[#143C96]">{c}</span>)}
        </div>
      </div></section>

      {/* Why Buy */}
      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <p className={eyebrow}>ETIA</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">ทำไมควรซื้อ OmniCure S2000 Elite จาก ETIA</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#667085]">ETIA สนับสนุนผู้ผลิตในจีน ไทย เวียดนาม และเอเชียตะวันออกเฉียงใต้ ด้วยผลิตภัณฑ์ OmniCure ของแท้ การให้คำปรึกษาด้าน application การจัดหาภายในพื้นที่ การฝึกอบรมการติดตั้ง คำแนะนำการเปลี่ยนหลอด การบำรุงรักษา การซ่อม และการแก้ไขปัญหา</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((c) => <div key={c} className="flex items-start gap-3 rounded-2xl border border-[#D9E4EA] bg-white p-5 text-sm font-bold text-[#143C96]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#41A62A]" />{c}</div>)}
        </div>
      </div></section>

      {/* FAQ */}
      <section className="bg-[#F1FAEF] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl">
        <p className={eyebrow}>FAQ</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">คำถามที่พบบ่อยเกี่ยวกับ OmniCure S2000 Elite</h2>
        <div className="mt-8 divide-y divide-gray-200 rounded-2xl border border-[#D9E4EA] bg-white">
          {s2000FaqsTh.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#143C96]">{f.q}<ChevronRight className="h-5 w-5 shrink-0 text-[#41A62A] transition-transform group-open:rotate-90" /></summary>
              <p className="mt-3 text-sm leading-7 text-[#667085]">{f.a}</p>
            </details>
          ))}
        </div>
      </div></section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#143C96] to-[#1A56DB] px-4 py-16 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">ต้องการความช่วยเหลือในการเลือก ตั้งค่า หรือแก้ไขปัญหา OmniCure S2000 Elite หรือไม่?</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">วิศวกรของ ETIA สามารถช่วยเลือก OmniCure S2000 Elite กำหนดค่า lamp และ filter ตั้งค่า light guide ให้คำแนะนำด้าน calibration บำรุงรักษา ซ่อม และแก้ไขปัญหาทางเทคนิค</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={engineerMail} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">ติดต่อวิศวกร <ArrowRight className="h-4 w-4" /></a>
          <a href={engineerMail} className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20">ขอใบเสนอราคา</a>
          <a href={PDF_USERGUIDE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"><Download className="h-4 w-4" /> ดาวน์โหลด User Guide</a>
        </div>
      </div></section>
    </div>
  );
}

export default function S2000LandingTh() {
  return (
    <LocaleProvider initialLocale="th">
      <Analytics />
      <Nav />
      <main className="flex-1"><Content /></main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
