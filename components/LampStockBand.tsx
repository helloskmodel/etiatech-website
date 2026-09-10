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
// weeks — a line that stops for a lamp is the call ETIA gets most. So the
// band says stock first, and the button puts the lamp straight into an
// inquiry rather than on a page about it.
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
    <section className="px-4 pt-14 pb-4 sm:px-6 md:pt-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[32px] border border-[#DCE9EE] bg-gradient-to-br from-[#F3F7FF] to-[#F2FBF8] p-7 sm:p-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/30 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-[#15803d]">
            <PackageCheck className="h-4 w-4" />
            {t({ en: "In stock · Genuine OmniCure", zh: "现货 · OmniCure 原厂正品", th: "มีสต็อก · OmniCure ของแท้", vi: "Có sẵn · OmniCure chính hãng" }, locale)}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102A43] md:text-4xl">
            {t(
              { en: "Need a replacement lamp for your S2000? We have it on the shelf.", zh: "S2000 要换灯？我们有现货。", th: "ต้องการหลอดเปลี่ยนสำหรับ S2000? เรามีของพร้อมส่ง", vi: "Cần đèn thay cho S2000? Chúng tôi có sẵn hàng." },
              locale
            )}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#5F6C7B]">
            {t(
              {
                en: "Across much of Southeast Asia a genuine S2000 lamp is hard to find, and when one can be ordered it takes weeks. ETIA keeps genuine Excelitas lamps in regional stock and ships from the nearest warehouse — so a lamp never stops a line.",
                zh: "在东南亚不少地方，S2000 的原厂灯泡买不到，能订到的也要等好几周。ETIA 在区域内常备原厂 Excelitas 灯泡，就近发货——不让一支灯停一条线。",
                th: "ในหลายพื้นที่ของเอเชียตะวันออกเฉียงใต้ หลอด S2000 ของแท้หาซื้อยาก และถ้าสั่งได้ก็ต้องรอเป็นสัปดาห์ ETIA เก็บสต็อกหลอด Excelitas ของแท้ในภูมิภาคและส่งจากคลังที่ใกล้ที่สุด — สายการผลิตจะไม่หยุดเพราะหลอดเดียว",
                vi: "Ở nhiều nơi tại Đông Nam Á, đèn S2000 chính hãng rất khó mua, và nếu đặt được cũng phải chờ hàng tuần. ETIA giữ sẵn đèn Excelitas chính hãng trong khu vực và giao từ kho gần nhất — để một chiếc đèn không làm dừng cả dây chuyền.",
              },
              locale
            )}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {LAMP.stats.map(([v, k]) => (
              <div key={k} className="rounded-xl border border-white bg-white/70 px-3 py-2">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-[#7B8794]">{k}</dt>
                <dd className="mt-0.5 text-sm font-bold text-[#143C96]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={checkStock}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#087F6B] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              {t({ en: "Check the stock", zh: "查询库存", th: "เช็คสต็อก", vi: "Kiểm tra tồn kho" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={compat}
              className="inline-flex items-center justify-center rounded-xl border border-[#D9E4EA] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96]"
            >
              {t({ en: "Check compatibility", zh: "确认兼容性", th: "ตรวจสอบความเข้ากันได้", vi: "Kiểm tra tương thích" }, locale)}
            </a>
          </div>
          <p className="mt-3 text-xs text-[#7B8794]">
            {t(
              { en: "Send us your system model, serial number or a lamp photo and we confirm the part number.", zh: "发来机型、序列号或灯泡照片，我们帮你确认料号。", th: "ส่งรุ่นระบบ หมายเลขซีเรียล หรือรูปหลอดมาให้เรา แล้วเราจะยืนยันหมายเลขชิ้นส่วนให้", vi: "Gửi model hệ thống, số serial hoặc ảnh đèn, chúng tôi xác nhận mã linh kiện cho bạn." },
              locale
            )}
          </p>
        </div>
        <Link
          href={LAMP_PATHS[locale]}
          className="relative block aspect-video overflow-hidden rounded-3xl border border-white bg-white shadow-[0_20px_55px_rgba(15,36,68,.10)]"
        >
          <Image src={LAMP.promoImage} alt={LAMP.heroAlt} fill sizes="(max-width: 1024px) 100vw, 36vw" className="object-cover" />
        </Link>
      </div>
    </section>
  );
}
