"use client";
import { FlaskConical, Package, Wrench, ClipboardCheck } from "lucide-react";
import { useLocale, t, type LangText } from "@/components/LocaleContext";

// The four "Why ETIA" value props — shared by the home page and every brand
// landing page.
export const whyEtia: { Icon: typeof FlaskConical; title: LangText; desc: LangText }[] = [
  {
    Icon: FlaskConical,
    title: { en: "Deep Application Expertise", zh: "深厚的应用专业能力" },
    desc: {
      en: "20 years of validated industry cases across 10 industries. From medical device bonding to AI-data-center photonics packaging — we've proven the process so you don't have to.",
      zh: "20年、覆盖10大行业的验证案例。从医疗器械粘接到AI数据中心光子封装——工艺我们已替你验证。",
    },
  },
  {
    Icon: Package,
    title: { en: "Local Supply & Fast Delivery", zh: "本地备货 · 快速交付" },
    desc: {
      en: "Selected equipment and consumables are available from local stock to help reduce lead-time uncertainty and simplify procurement.",
      zh: "部分设备与耗材可本地备货，有助于降低交期不确定性、简化采购。",
    },
  },
  {
    Icon: Wrench,
    title: { en: "In-House Repair Factory", zh: "自有维修工厂" },
    desc: {
      en: "Our own repair facility with a trained technical team handles maintenance, extended warranty, and urgent repairs — minimizing downtime on your production line.",
      zh: "自有维修工厂与专业技术团队，承接保养、延保与紧急维修——最大限度降低产线停机。",
    },
  },
  {
    Icon: ClipboardCheck,
    title: { en: "Full-Process Consulting Service", zh: "全流程咨询服务" },
    desc: {
      en: "From initial selection and application validation to troubleshooting and lifecycle management — our engineers are your partners at every stage of the process.",
      zh: "从选型、应用验证到故障排查与全生命周期管理——我们的工程师是你每个环节的伙伴。",
    },
  },
];

export default function WhyEtiaCards() {
  const { locale } = useLocale();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {whyEtia.map((item) => (
        <div key={item.title.en} className="rounded-xl p-6 border border-gray-100 hover:border-[#1A56DB]/30 hover:shadow-md transition-all bg-gray-50">
          <item.Icon className="mb-4" size={32} strokeWidth={1.75} style={{ color: "#1A56DB" }} />
          <h3 className="font-semibold text-base mb-2" style={{ color: "#1A56DB" }}>{t(item.title, locale)}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{t(item.desc, locale)}</p>
        </div>
      ))}
    </div>
  );
}
