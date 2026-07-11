"use client";
import { Check } from "lucide-react";
import { useLocale, t, type LangText } from "@/components/LocaleContext";

// Dark-blue trust strip shown directly under the hero on Home, Applications,
// Phoseon, OmniCure and Sales & Support. Wording mirrors the Service Commitment
// poster artwork.
const TRUST_ITEMS: LangText[] = [
  { en: "Genuine Products Through Official Channels", zh: "官方渠道正品", vi: "Sản phẩm chính hãng qua kênh chính thức", th: "สินค้าของแท้ผ่านช่องทางอย่างเป็นทางการ" },
  { en: "Application-Driven Solutions", zh: "应用驱动方案", vi: "Giải pháp theo ứng dụng", th: "โซลูชันที่ออกแบบตามการใช้งาน" },
  { en: "Local Supply Chain", zh: "本地供应", vi: "Chuỗi cung ứng địa phương", th: "ห่วงโซ่อุปทานในประเทศ" },
  { en: "Long-Term Service", zh: "长期服务", vi: "Dịch vụ dài hạn", th: "บริการระยะยาว" },
];

export default function TrustStrip() {
  const { locale } = useLocale();
  return (
    <section className="bg-gradient-to-r from-[#143C96] to-[#1A56DB] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 text-center text-xs font-bold sm:grid-cols-4 sm:text-sm">
        {TRUST_ITEMS.map((item) => (
          <span key={item.en} className="inline-flex items-center justify-center gap-2">
            <Check className="h-4 w-4 text-[#8BE172]" />
            {t(item, locale)}
          </span>
        ))}
      </div>
    </section>
  );
}
