"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PackageCheck } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { inquiryMailto } from "@/components/contact";
import { LAMP, LAMP_PATHS } from "@/components/omnicure/s2000Lamp";

// The S2000 lamp, on the home page. The one thing a production manager in
// Southeast Asia wants to know is whether the lamp can be had at all — genuine
// lamps are hard to find across much of the region and, when they can be
// ordered, take weeks. A line that stops for a lamp is the call ETIA gets most.
//
// It used to be a strip with one button that dropped a single catalogue entry
// — "S2000 / S2000 Elite Replacement Lamps" — into the inquiry basket. That is
// four part numbers wearing one name, so a customer asking for four lamps was
// not saying which four, and sales had to go back and ask. Now the four lamps
// are on the strip itself with a quantity box each: the basket carries real
// part numbers, and the inquiry that lands is one a salesperson can price.
//
// Still a strip, not a billboard — it should register on the way down the page
// without becoming the page.

/** The four lamps, in the order a customer meets them: newest platform first. */
const LAMPS: { pn: string; fits: string; spectrumKey: "standard" | "surface" }[] = [
  { pn: "012-68000R", fits: "S2000 Elite · S1500 Pro", spectrumKey: "standard" },
  { pn: "012-69000R", fits: "S2000 Elite · S1500 Pro", spectrumKey: "surface" },
  { pn: "012-64000R", fits: "S2000 · S2000-XLA · S1500", spectrumKey: "standard" },
  { pn: "012-65000R", fits: "S2000 · S2000-XLA · S1500", spectrumKey: "surface" },
];

const SPECTRUM = {
  standard: { en: "Standard", zh: "标准型", th: "มาตรฐาน", vi: "Tiêu chuẩn" },
  surface: { en: "Surface Cure", zh: "表面固化型", th: "Surface Cure", vi: "Surface Cure" },
};

export default function LampStockBand() {
  const { locale } = useLocale();
  const shop = `${LAMP_PATHS[locale]}#shop`;

  const compat = inquiryMailto(locale, {
    subject: "S2000 lamp compatibility check",
    context: "System model / serial number / a photo of the lamp",
  });

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
                    en: "Four part numbers in all. Tell us your machine, pick the quantity, and one send gets you a price and a delivery date.",
                    zh: "一共四个料号。告诉我们你的机型，选好数量，一次提交就能拿到价格和交期。",
                    th: "มีทั้งหมดสี่หมายเลขชิ้นส่วน บอกรุ่นเครื่องของคุณ เลือกจำนวน ส่งครั้งเดียวก็ได้ราคาและกำหนดส่ง",
                    vi: "Tổng cộng bốn mã hàng. Cho biết máy của bạn, chọn số lượng, gửi một lần là có giá và thời gian giao.",
                  },
                  locale
                )}
              </p>
            </div>
          </div>

          {/* Which one, and how many */}
          <div className="w-full shrink-0 lg:w-[26rem]">
            <ul className="divide-y divide-[#E3EDF2] overflow-hidden rounded-xl border border-[#E3EDF2] bg-white">
              {LAMPS.map((l) => {
                return (
                  <li key={l.pn} className="px-3 py-2">
                    <p className="font-mono text-[13px] font-bold leading-tight text-[#143C96]">{l.pn}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-[#7B8794]">
                      {t(SPECTRUM[l.spectrumKey], locale)} · {l.fits}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Link
                href={shop}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#087F6B] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                {t({ en: "Choose a lamp & ask price", zh: "选灯泡，问价格与交期", th: "เลือกหลอดและสอบถามราคา", vi: "Chọn đèn & hỏi giá" }, locale)}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={compat}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#D9E4EA] bg-white px-4 py-2.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96]"
              >
                {t({ en: "Not sure which?", zh: "不确定是哪一支？", th: "ไม่แน่ใจว่ารุ่นไหน?", vi: "Chưa chắc loại nào?" }, locale)}
              </a>
            </div>

            <p className="mt-2 font-mono text-[11px] text-[#7B8794]">
              {LAMP.spec} · {t({ en: "2,000 h guaranteed", zh: "保证寿命 2,000 h", th: "รับประกัน 2,000 ชม.", vi: "bảo đảm 2.000 h" }, locale)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
