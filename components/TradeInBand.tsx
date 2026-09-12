"use client";
import Link from "next/link";
import { ArrowRight, Recycle } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { TRADE_IN_VALUE_USD } from "@/components/tradeIn";

// The trade-in, on the home page, directly under the lamp strip: one is what
// to buy, the other is what to do with the one that just died.
//
// The line that earns this its place on the home page is the second sentence —
// it is open to people who never bought from ETIA. A plant running someone
// else's lamp has a dead lamp in a bin; twenty dollars turns that bin into a
// conversation with a customer who owns the machine and needs the next lamp.
export default function TradeInBand() {
  const { locale } = useLocale();
  return (
    <section className="px-4 pb-2 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-[#CBE7C4] bg-[#F2FBF8] p-4 sm:p-6 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#41A62A] ring-1 ring-[#CBE7C4]">
            <Recycle className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="inline-flex items-center rounded-full border border-[#41A62A]/30 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#15803d]">
              {t({ en: "Lamp trade-in", zh: "灯泡以旧换新", th: "แลกหลอดเก่า", vi: "Đổi đèn cũ" }, locale)}
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#102A43] sm:text-xl">
              {t(
                {
                  en: `Send back your dead lamp, take US$${TRADE_IN_VALUE_USD} off the next one`,
                  zh: `把用完的旧灯寄回来，下一支立减 ${TRADE_IN_VALUE_USD} 美元`,
                  th: `ส่งหลอดที่หมดอายุคืน รับส่วนลด ${TRADE_IN_VALUE_USD} ดอลลาร์สหรัฐสำหรับหลอดถัดไป`,
                  vi: `Gửi lại đèn đã hết, giảm ${TRADE_IN_VALUE_USD} USD cho đèn tiếp theo`,
                },
                locale
              )}
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-[#4A5A68]">
              {t(
                {
                  en: "You do not have to have bought it from us. Register online, we send your country's return address, and the credit applies when the lamp arrives.",
                  zh: "不限是否从我们这里买的。线上登记，我们发给你所在国家的寄回地址，旧灯到货抵扣生效。",
                  th: "ไม่จำเป็นต้องซื้อจากเรา ลงทะเบียนออนไลน์ เราส่งที่อยู่สำหรับส่งคืนในประเทศของคุณ และหักส่วนลดเมื่อหลอดมาถึง",
                  vi: "Bạn không cần phải mua từ chúng tôi. Đăng ký trực tuyến, chúng tôi gửi địa chỉ trả hàng tại nước bạn, khoản trừ áp dụng khi đèn tới nơi.",
                },
                locale
              )}
            </p>
          </div>
        </div>

        <Link
          href={localizeHref("/trade-in", locale)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#358B22]"
        >
          {t({ en: "Register a lamp", zh: "登记旧灯", th: "ลงทะเบียนหลอด", vi: "Đăng ký đèn" }, locale)}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
