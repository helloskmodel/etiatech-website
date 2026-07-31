"use client";
import { Check, BadgeCheck } from "lucide-react";
import { useLocale, t, type LangText } from "@/components/LocaleContext";

// Dark-blue trust strip shown directly under the hero on Home, Applications,
// Phoseon, OmniCure and Service & Support. Wording mirrors the Service Commitment
// poster artwork. The lead "Authorized Distributor" item is emphasized — it is
// the one claim grey-market sellers cannot make.
const AUTHORIZED: LangText = { en: "Authorized Distributor", zh: "官方授权经销", vi: "Nhà phân phối được ủy quyền", th: "ตัวแทนจำหน่ายที่ได้รับอนุญาต" };
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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center text-xs font-bold sm:text-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 ring-1 ring-[#8BE172]/50">
          <BadgeCheck className="h-4 w-4 text-[#8BE172]" />
          {t(AUTHORIZED, locale)}
        </span>
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
