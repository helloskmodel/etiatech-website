"use client";
import { Check } from "lucide-react";
import { useLocale, t, type LangText } from "@/components/LocaleContext";

// Dark-blue trust strip ("Service Commitment") shown directly under the hero on
// Home, Applications, Phoseon and Sales & Support. OmniCure uses its own
// disclaimer variant inline on its page.
const HEADING: LangText = { en: "Service Commitment", zh: "服务承诺", vi: "Cam kết dịch vụ", th: "คำมั่นสัญญาด้านการบริการ" };
const TRUST_ITEMS: LangText[] = [
  { en: "Genuine Supply Channels", zh: "正品渠道", vi: "Kênh cung ứng sản phẩm chính hãng", th: "ช่องทางจัดจำหน่ายสินค้าของแท้" },
  { en: "Application-Driven Support", zh: "应用驱动支持", vi: "Định hướng theo ứng dụng", th: "ขับเคลื่อนด้วยการใช้งานจริง" },
  { en: "Local Support", zh: "本地支持", vi: "Hỗ trợ tại địa phương", th: "การสนับสนุนในพื้นที่" },
  { en: "Long-Term Service", zh: "长期服务", vi: "Dịch vụ dài hạn", th: "บริการระยะยาว" },
];

export default function TrustStrip() {
  const { locale } = useLocale();
  return (
    <section className="bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[.2em] text-[#8BE172]">{t(HEADING, locale)}</p>
        <div className="grid gap-3 text-center text-xs font-bold sm:grid-cols-4 sm:text-sm">
          {TRUST_ITEMS.map((item) => (
            <span key={item.en} className="inline-flex items-center justify-center gap-2">
              <Check className="h-4 w-4 text-[#8BE172]" />
              {t(item, locale)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
