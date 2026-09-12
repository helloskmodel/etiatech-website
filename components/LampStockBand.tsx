"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, PackageCheck } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { inquiryMailto } from "@/components/contact";
import { LAMP, LAMP_PATHS } from "@/components/omnicure/s2000Lamp";
import { useInquiry } from "@/components/inquiry/InquiryContext";

// The S2000 lamp, on the home page, with the one fact that matters to a
// production manager in Southeast Asia: it is in stock. Genuine lamps are
// hard to find in much of the region and, when they can be ordered, take
// weeks — a line that stops for a lamp is the call ETIA gets most.
//
// A strip, not a billboard: one row at desktop width — picture, the claim,
// two buttons — so it registers on the way down the page without becoming
// the page. "Check the stock" puts the lamp straight into an inquiry.
export default function LampStockBand() {
  const { locale } = useLocale();
  const router = useRouter();
  const { add } = useInquiry();

  const checkStock = () => {
    add({ kind: "product", slug: "s2000-lamp" });
    router.push(localizeHref("/inquiry", locale));
  };
  const compat = inquiryMailto(locale, {
    subject: "S2000 lamp compatibility check",
    context: "System model / serial number / a photo of the lamp",
  });

  return (
    <section className="px-4 pt-10 pb-2 sm:px-6 md:pt-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-[#DCE9EE] bg-gradient-to-r from-[#F3F7FF] to-[#F2FBF8] p-4 sm:p-6 lg:flex-row lg:items-center lg:gap-8">
        {/* Picture and words share a row at every width; on a phone the
            picture is a thumbnail beside the claim, not a banner above it. */}
        <div className="flex min-w-0 flex-1 items-start gap-4 lg:gap-6">
        <Link
          href={LAMP_PATHS[locale]}
          className="relative block aspect-video w-24 shrink-0 overflow-hidden rounded-lg border border-white bg-white sm:w-40 lg:w-52 lg:rounded-xl"
        >
          <Image src={LAMP.promoImage} alt={LAMP.heroAlt} fill sizes="(max-width: 640px) 96px, 224px" className="object-cover" />
        </Link>

        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-[#41A62A]/30 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#15803d]">
            <PackageCheck className="h-3.5 w-3.5" />
            {t({ en: "In stock · Genuine OmniCure", zh: "现货 · OmniCure 原厂正品", th: "มีสต็อก · OmniCure ของแท้", vi: "Có sẵn · OmniCure chính hãng" }, locale)}
          </p>
          <h2 className="mt-2 text-lg font-bold leading-snug text-[#102A43] sm:text-xl">
            {t(
              { en: "Need a replacement lamp for your S2000? It's on the shelf.", zh: "S2000 要换灯？我们有现货。", th: "ต้องการหลอดเปลี่ยนสำหรับ S2000? เรามีของพร้อมส่ง", vi: "Cần đèn thay cho S2000? Chúng tôi có sẵn hàng." },
              locale
            )}
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-[#5F6C7B]">
            {t(
              {
                en: "Across much of Southeast Asia a genuine S2000 lamp is hard to find and takes weeks to order. ETIA holds them in regional stock and ships from the nearest warehouse.",
                zh: "东南亚不少地方原厂 S2000 灯泡买不到，能订的也要等几周。ETIA 区域备货，就近发货。",
                th: "ในหลายพื้นที่ของเอเชียตะวันออกเฉียงใต้ หลอด S2000 ของแท้หาซื้อยากและต้องรอสั่งเป็นสัปดาห์ ETIA เก็บสต็อกในภูมิภาคและส่งจากคลังที่ใกล้ที่สุด",
                vi: "Ở nhiều nơi tại Đông Nam Á, đèn S2000 chính hãng khó mua và phải chờ hàng tuần. ETIA giữ sẵn hàng trong khu vực và giao từ kho gần nhất.",
              },
              locale
            )}
          </p>
          <p className="mt-1.5 font-mono text-[11px] text-[#7B8794]">
            S2000 {LAMP.primaryCode} · S2000 Elite 012-68000R · {LAMP.spec} · {t({ en: "2,000 h guaranteed", zh: "保证寿命 2,000 h", th: "รับประกัน 2,000 ชม.", vi: "bảo đảm 2.000 h" }, locale)}
          </p>
        </div>
        </div>

        <div className="flex shrink-0 flex-row gap-2 lg:flex-col xl:flex-row">
          <button
            type="button"
            onClick={checkStock}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#087F6B] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 lg:flex-none"
          >
            {t({ en: "Check the stock", zh: "查询库存", th: "เช็คสต็อก", vi: "Kiểm tra tồn kho" }, locale)}
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={compat}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#D9E4EA] bg-white px-4 py-2.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96] lg:flex-none"
          >
            {t({ en: "Check compatibility", zh: "确认兼容性", th: "ตรวจสอบความเข้ากันได้", vi: "Kiểm tra tương thích" }, locale)}
          </a>
        </div>
      </div>
    </section>
  );
}
