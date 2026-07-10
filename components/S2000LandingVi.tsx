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
import { s2000FaqsVi } from "@/components/s2000FaqVi";
import { ArrowRight, BadgeCheck, CheckCircle2, ChevronRight, Download } from "lucide-react";

const PROMO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION";
const HERO_IMG = `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp`;

const PDF = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF";
const PDF_BROCHURE = `${PDF}/Brochure%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf`;
const PDF_QUICKSTART = `${PDF}/Quick%20Start%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf`;
const PDF_USERGUIDE = `${PDF}/User%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf`;

const engineerMail = inquiryMailto("vi", { subject: "OmniCure S2000 Elite", context: "OmniCure S2000 Elite" });

const stats = [
  "Công suất quang học lên đến 30 W/cm² / 37 W/cm²",
  "Kiểm soát cường độ bằng Closed-Loop Feedback",
  "Màn trập tốc độ cao 30 ms",
  "Sẵn sàng tích hợp Web UI · PLC · NFC · StepCure",
];

const features: { title: string; body: string }[] = [
  { title: "OmniCure S2000 Elite Remote Control & Monitoring", body: "Web UI cho phép điều khiển, quản lý và giám sát từ xa, giúp người dùng truy cập chức năng hệ thống, curing profiles, nhật ký hệ thống và cập nhật phần mềm từ thiết bị được kết nối." },
  { title: "OmniCure S2000 Elite Touchscreen User Interface", body: "Màn hình cảm ứng LCD 4.3 inch cung cấp giao diện trực quan để điều khiển hệ thống, cài đặt, vận hành chiếu sáng và theo dõi trạng thái liên quan đến quá trình curing." },
  { title: "OmniCure S2000 Elite StepCure PLC Control", body: "StepCure hỗ trợ các chuỗi curing có thể lập trình cùng khả năng điều khiển PLC, giúp quản lý các quy trình sản xuất đã được xác nhận với khả năng kiểm soát chiếu sáng lặp lại." },
  { title: "OmniCure S2000 Elite Quick Configuration", body: "Loại đèn và bộ lọc quang học có thể thay đổi bởi người dùng, giúp cấu hình hệ thống nhanh hơn và giảm thời gian dừng máy khi thay đổi quy trình." },
  { title: "OmniCure S2000 Elite Closed-Loop Feedback (CLF)", body: "Closed-Loop Feedback giám sát đầu ra quang học và hỗ trợ duy trì cường độ chiếu ổn định trong quá trình curing." },
  { title: "OmniCure S2000 Elite Intelli-Lamp Technology", body: "Công nghệ Intelli-Lamp theo dõi các thông số của đèn và hỗ trợ quản lý tuổi thọ đèn, giúp giảm nguy cơ dừng máy ngoài kế hoạch." },
  { title: "OmniCure S2000 Elite Intelli-Tap NFC Access Control", body: "Intelli-Tap NFC cho phép kiểm soát quyền truy cập của quản trị viên và giám sát viên, hỗ trợ khóa, mở khóa và bảo vệ các thông số quy trình." },
  { title: "OmniCure S2000 Elite Optical Performance", body: "S2000 Elite duy trì khả năng tương thích ngược với nền tảng quy trình S2000 trước đây, bao gồm light guides, optical filters, phụ kiện radiometry và đầu ra quang phổ." },
];

const guides: { title: string; desc: string; btn: string; href: string }[] = [
  { title: "OmniCure S2000 Elite Brochure", desc: "Tổng quan sản phẩm, tính năng chính, khả năng tương thích hệ thống, chức năng điều khiển và lợi ích vận hành.", btn: "Tải Brochure", href: PDF_BROCHURE },
  { title: "OmniCure S2000 Elite Quick Start Guide", desc: "Các bước khởi động, lắp light guide, thiết lập exposure, lắp module đèn và lắp bộ lọc quang học.", btn: "Tải Quick Start Guide", href: PDF_QUICKSTART },
  { title: "OmniCure S2000 Elite User Guide", desc: "Tài liệu vận hành đầy đủ bao gồm an toàn, cài đặt, hiệu chuẩn, Web UI, tích hợp PLC, StepCure, bảo trì, cập nhật phần mềm, xử lý sự cố và thông số kỹ thuật.", btn: "Tải User Guide", href: PDF_USERGUIDE },
];

const setup: { title: string; body: string }[] = [
  { title: "Khởi động OmniCure S2000 Elite", body: "Lắp module đèn, lắp bộ lọc quang học, kết nối nguồn điện, bật hệ thống và cho phép đèn warm-up đúng cách trước khi vận hành." },
  { title: "Lắp đặt Light Guide cho OmniCure S2000 Elite", body: "Đưa light guide vào cổng light guide phía trước cho đến khi khớp chắc vào vị trí." },
  { title: "Trạng thái vòng đèn OmniCure S2000 Elite", body: "Sử dụng màu của vòng đèn để nhận biết trạng thái hệ thống, bao gồm phát hiện light guide, warm-up, trạng thái Closed-Loop Feedback và tình trạng hiệu chuẩn." },
  { title: "Cài đặt thời gian exposure cho OmniCure S2000 Elite", body: "Cài đặt thời gian exposure từ màn hình Run bằng màn hình cảm ứng hoặc các nút điều hướng." },
  { title: "Cài đặt cường độ cho OmniCure S2000 Elite", body: "Cài đặt cường độ bằng màn hình cảm ứng hoặc các nút điều hướng. Cần hiệu chuẩn để điều khiển theo W/cm² và W." },
  { title: "Khóa và mở khóa OmniCure S2000 Elite", body: "Sử dụng PIN hoặc NFC access control để bảo vệ các cài đặt curing đã được xác nhận." },
];

const troubleshooting: { q: string; a: string }[] = [
  { q: "OmniCure S2000 Elite không nhận Light Guide", a: "Kiểm tra xem light guide đã được lắp hoàn toàn và đúng vị trí trong cổng light guide hay chưa. Nếu sự cố vẫn tiếp diễn, hãy liên hệ bộ phận hỗ trợ kỹ thuật của ETIA." },
  { q: "Đèn OmniCure S2000 Elite không khởi động", a: "Kiểm tra lắp đặt đèn, lắp đặt bộ lọc, nắp khoang đèn, kết nối nguồn điện và trạng thái hệ thống. Nếu sự cố vẫn tiếp diễn, hãy liên hệ bộ phận hỗ trợ kỹ thuật của ETIA." },
  { q: "Closed-Loop Feedback của OmniCure S2000 Elite không hoạt động", a: "Kiểm tra trạng thái hiệu chuẩn, tình trạng đèn, kết nối light guide và cấu hình bộ lọc. Nếu sự cố vẫn tiếp diễn, hãy liên hệ bộ phận hỗ trợ kỹ thuật của ETIA." },
  { q: "Cường độ đầu ra OmniCure S2000 Elite không ổn định", a: "Cho phép hệ thống warm-up đủ thời gian, kiểm tra hiệu chuẩn, kiểm tra light guide và trạng thái tuổi thọ đèn. Nếu sự cố vẫn tiếp diễn, hãy liên hệ bộ phận hỗ trợ kỹ thuật của ETIA." },
  { q: "OmniCure S2000 Elite không nhận bộ lọc quang học", a: "Kiểm tra xem cartridge bộ lọc quang học đã được lắp và cố định đúng cách hay chưa. Nếu bộ lọc không được lắp đúng, hệ thống có thể không nhận diện được bộ lọc và đèn có thể không khởi động." },
  { q: "OmniCure S2000 Elite bị khóa hệ thống", a: "Sử dụng PIN đã cài đặt, thẻ supervisor hoặc thẻ administrator NFC tùy theo cấu hình access control. Nếu sự cố vẫn tiếp diễn, hãy liên hệ bộ phận hỗ trợ kỹ thuật của ETIA." },
];

const maintenanceCards = [
  "Hỗ trợ đèn thay thế OmniCure S2000 Elite",
  "Hỗ trợ bộ lọc quang học OmniCure S2000 Elite",
  "Hỗ trợ light guide OmniCure S2000 Elite",
  "Hỗ trợ hiệu chuẩn OmniCure S2000 Elite",
  "Hỗ trợ bảo trì và sửa chữa OmniCure S2000 Elite",
];

const whyCards = [
  "Sản phẩm OmniCure chính hãng",
  "Lựa chọn dựa trên ứng dụng thực tế",
  "Nguồn cung địa phương và phản hồi nhanh",
  "Hỗ trợ dịch vụ dài hạn",
];

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]";
const btnGhost = "inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]";
const eyebrow = "text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]";

function Content() {
  return (
    <div className="bg-white text-[#102038]">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-xs text-gray-400 sm:px-6 lg:px-8">
          <Link href="/vi" className="hover:text-[#1A56DB]">Sản phẩm</Link><span className="mx-2">›</span>
          <Link href="/product/omnicure" className="hover:text-[#1A56DB]">OmniCure</Link><span className="mx-2">›</span>
          <span className="text-gray-500">S2000 Elite</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> OmniCure S Series · Hệ thống UV spot curing dùng đèn</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-5xl">OmniCure S2000 Elite UV Spot Curing System<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-3xl">Công suất mạnh mẽ. Kiểm soát chính xác.</span></h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#667085]">Hệ thống UV spot curing dùng đèn cường độ cao, tích hợp Closed-Loop Feedback, điều khiển màn trập chính xác và giám sát quy trình nâng cao cho sản xuất yêu cầu độ ổn định cao.</p>
            <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {stats.map((s) => <div key={s} className="flex items-start gap-2 rounded-xl border border-[#DCE7F5] bg-white/70 p-3 text-xs font-semibold text-[#143C96] backdrop-blur"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#41A62A]" />{s}</div>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={engineerMail} className={btnPrimary}>Yêu cầu báo giá <ArrowRight className="h-4 w-4" /></a>
              <a href={PDF_BROCHURE} target="_blank" rel="noopener noreferrer" className={btnGhost}><Download className="h-4 w-4" /> Tải Brochure</a>
              <Link href="/contact" className={btnGhost}>Nhận hỗ trợ kỹ thuật</Link>
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
        <p className={eyebrow}>Tổng quan</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Tổng quan OmniCure S2000 Elite</h2>
        <p className="mt-5 leading-8 text-[#4A5568]">OmniCure S2000 Elite là hệ thống UV spot curing dùng đèn, được thiết kế cho các quy trình sản xuất yêu cầu đầu ra quang học ổn định, kiểm soát liều chiếu lặp lại, chu kỳ chiếu nhanh và khả năng giám sát quy trình đáng tin cậy. Thiết bị phù hợp với môi trường sản xuất nơi tính ổn định của quá trình curing, khả năng truy xuất và thời gian hoạt động liên tục là các yếu tố quan trọng.</p>
      </div></section>

      {/* Key Features */}
      <section className="bg-[#F6F9FF] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <p className={eyebrow}>Tính năng</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Các tính năng chính của OmniCure S2000 Elite</h2>
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
        <p className={eyebrow}>Tài nguyên</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Tài liệu hướng dẫn và tài nguyên kỹ thuật OmniCure S2000 Elite</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#667085]">Tìm tài liệu và hướng dẫn vận hành cần thiết cho lắp đặt, cài đặt, hiệu chuẩn, bảo trì và xử lý sự cố.</p>
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
        <p className={eyebrow}>Cài đặt</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Hướng dẫn cài đặt OmniCure S2000 Elite</h2>
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
        <p className={eyebrow}>Xử lý sự cố</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Xử lý sự cố OmniCure S2000 Elite</h2>
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
        <p className={eyebrow}>Bảo trì</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Hỗ trợ thay đèn và bảo trì OmniCure S2000 Elite</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#667085]">ETIA hỗ trợ người dùng OmniCure S2000 Elite về đèn thay thế, bộ lọc quang học, light guides, hướng dẫn hiệu chuẩn, bảo trì, sửa chữa và xử lý sự cố — xem <Link href="/product/omnicure/s2000-lamp" className="font-semibold text-[#1A56DB] underline">đèn thay thế OmniCure S2000</Link>, <Link href="/applications" className="font-semibold text-[#1A56DB] underline">ứng dụng UV curing</Link> hoặc <Link href="/contact" className="font-semibold text-[#1A56DB] underline">bộ phận Kinh doanh & Hỗ trợ</Link>.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {maintenanceCards.map((c) => <span key={c} className="rounded-full border border-[#1A56DB]/20 bg-white px-4 py-2 text-sm font-semibold text-[#143C96]">{c}</span>)}
        </div>
      </div></section>

      {/* Why Buy */}
      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <p className={eyebrow}>ETIA</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Vì sao nên mua OmniCure S2000 Elite từ ETIA?</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#667085]">ETIA hỗ trợ các nhà sản xuất tại Trung Quốc, Thái Lan, Việt Nam và Đông Nam Á với sản phẩm OmniCure chính hãng, tư vấn ứng dụng, nguồn cung địa phương, đào tạo lắp đặt, hướng dẫn thay đèn, bảo trì, sửa chữa và xử lý sự cố.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((c) => <div key={c} className="flex items-start gap-3 rounded-2xl border border-[#D9E4EA] bg-white p-5 text-sm font-bold text-[#143C96]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#41A62A]" />{c}</div>)}
        </div>
      </div></section>

      {/* FAQ */}
      <section className="bg-[#F1FAEF] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl">
        <p className={eyebrow}>FAQ</p>
        <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Câu hỏi thường gặp về OmniCure S2000 Elite</h2>
        <div className="mt-8 divide-y divide-gray-200 rounded-2xl border border-[#D9E4EA] bg-white">
          {s2000FaqsVi.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#143C96]">{f.q}<ChevronRight className="h-5 w-5 shrink-0 text-[#41A62A] transition-transform group-open:rotate-90" /></summary>
              <p className="mt-3 text-sm leading-7 text-[#667085]">{f.a}</p>
            </details>
          ))}
        </div>
      </div></section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-4 py-16 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Cần hỗ trợ lựa chọn, cài đặt hoặc xử lý sự cố OmniCure S2000 Elite?</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">Kỹ sư ETIA có thể hỗ trợ lựa chọn OmniCure S2000 Elite, cấu hình đèn và bộ lọc, cài đặt light guide, hướng dẫn hiệu chuẩn, bảo trì, sửa chữa và xử lý sự cố kỹ thuật.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={engineerMail} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">Liên hệ kỹ sư <ArrowRight className="h-4 w-4" /></a>
          <a href={engineerMail} className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20">Yêu cầu báo giá</a>
          <a href={PDF_USERGUIDE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"><Download className="h-4 w-4" /> Tải OmniCure S2000 Elite User Guide</a>
        </div>
      </div></section>
    </div>
  );
}

export default function S2000LandingVi() {
  return (
    <LocaleProvider initialLocale="vi">
      <Analytics />
      <Nav />
      <main className="flex-1"><Content /></main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
