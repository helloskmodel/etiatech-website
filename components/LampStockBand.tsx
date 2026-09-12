"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PackageCheck } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { LAMP, LAMP_PATHS } from "@/components/omnicure/s2000Lamp";

// The S2000 lamp, on the home page. The one thing a production manager in
// Southeast Asia wants to know is whether the lamp can be had at all — genuine
// lamps are hard to find across much of the region and, when they can be
// ordered, take weeks. A line that stops for a lamp is the call ETIA gets most.
//
// The strip's whole job is to be noticed on the way past and to hand the
// visitor to the lamp page. The four part numbers are NOT listed here: a home
// page is not a shelf, and showing the goods before anyone asked made the
// strip the tallest thing on the page. Tap it and the four lamps, the
// quantities and the price-and-delivery form are all on one page.

export default function LampStockBand() {
  const { locale } = useLocale();
  const shop = `${LAMP_PATHS[locale]}#shop`;


  return (
    <section className="px-4 pt-10 pb-2 sm:px-6 md:pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-[#DCE9EE] bg-gradient-to-r from-[#F3F7FF] to-[#F2FBF8] p-4 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
          {/* What it is */}
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
                    en: "Across much of Southeast Asia a genuine S2000 lamp is hard to find and takes weeks to order. Pick the part number and the quantity, and one send gets you a price and a delivery date.",
                    zh: "东南亚不少地方原厂 S2000 灯泡买不到，能订的也要等几周。选好料号和数量，一次提交就能拿到价格和交期。",
                    th: "ในหลายพื้นที่ของเอเชียตะวันออกเฉียงใต้ หลอด S2000 ของแท้หาซื้อยากและต้องรอสั่งเป็นสัปดาห์ เลือกหมายเลขชิ้นส่วนและจำนวน ส่งครั้งเดียวก็ได้ราคาและกำหนดส่ง",
                    vi: "Ở nhiều nơi tại Đông Nam Á, đèn S2000 chính hãng khó mua và phải chờ hàng tuần. Chọn mã hàng và số lượng, gửi một lần là có giá và thời gian giao.",
                  },
                  locale
                )}
              </p>
            </div>
          </div>

          {/* Which one, and how many */}
          <div className="w-full shrink-0 lg:w-[26rem]">
            <Link
              href={shop}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#087F6B] px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              {t({ en: "Choose a lamp & ask price", zh: "选灯泡，问价格与交期", th: "เลือกหลอดและสอบถามราคา", vi: "Chọn đèn & hỏi giá" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-2 font-mono text-[11px] text-[#7B8794]">
              {LAMP.spec} · {t({ en: "2,000 h guaranteed", zh: "保证寿命 2,000 h", th: "รับประกัน 2,000 ชม.", vi: "bảo đảm 2.000 h" }, locale)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
