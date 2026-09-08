import type { LangText } from "@/components/LocaleContext";

// ─────────────────────────────────────────────────────────────────────────
// Buyer-facing product categories — the five groups in the Products menu and
// behind the /product/{id} category pages.
//
// This is a COARSER grouping laid OVER the six TECH_ROUTES in productCatalog,
// not a replacement: buyers search by light source ("UV LED 固化", "汞灯光源",
// "微波无极灯"), while TECH_ROUTES splits the finer spot/area/cooling axis the
// catalog is built on. Both stay — the category is the entry point, the tech
// route is the detail.
//
// This lives in its own module, separate from the catalog, because Nav renders
// on every page: importing the 2,000-line catalog there would ship the whole
// product database in the client bundle site-wide. Keep this file data-free.
//
// `id` is the public URL slug. These URLs are linked from the WeChat official
// account menu, so treat them as PERMANENT — renaming one breaks a link we
// don't control.
// ─────────────────────────────────────────────────────────────────────────
export type ProductCategory = {
  id: string;
  label: LangText;
  blurb: LangText;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "uv-lamp",
    label: { en: "UV Lamp Light Sources", zh: "汞灯紫外光源", vi: "Nguồn sáng UV đèn thủy ngân", th: "แหล่งกำเนิดแสง UV แบบหลอดปรอท" },
    blurb: {
      en: "Broad-spectrum high-pressure mercury lamp spot curing with closed-loop feedback — the industry-proven standard for medical device and precision assembly bonding.",
      zh: "宽光谱高压汞灯点固化，配闭环反馈控制 —— 医疗器械与精密装配粘接领域久经验证的行业标准。",
    },
  },
  {
    id: "uv-led",
    label: { en: "UV LED Light Sources", zh: "LED紫外光源", vi: "Nguồn sáng UV LED", th: "แหล่งกำเนิดแสง UV LED" },
    blurb: {
      en: "Single-wavelength UV LED spot and area curing, air- and water-cooled — 0 ms warm-up, 50,000 h lifetime, no ozone, Industry 4.0 ready.",
      zh: "单一波长 UV LED 点固化与面固化，风冷与水冷可选 —— 0 毫秒预热、50,000 小时寿命、无臭氧，支持工业 4.0。",
    },
  },
  {
    id: "microwave",
    label: { en: "Microwave Electrodeless Lamps", zh: "微波无极灯", vi: "Đèn không điện cực vi sóng", th: "หลอดไร้ขั้วไมโครเวฟ" },
    blurb: {
      en: "Electrodeless microwave-driven UV for high-speed web, coating and optical fiber lines — no electrodes to erode, consistent output over the full bulb life.",
      zh: "微波驱动无极紫外光源，适用于高速卷材、涂装与光纤生产线 —— 无电极损耗，整个灯管寿命内输出稳定。",
    },
  },
  {
    id: "instruments",
    label: { en: "Precision Measurement Instruments", zh: "精密检测仪表", vi: "Thiết bị đo lường chính xác", th: "เครื่องมือวัดความแม่นยำสูง" },
    blurb: {
      en: "NIST-traceable UV radiometers and calibration systems — measure irradiance and dose at the cure site so the process stays validated and repeatable.",
      zh: "NIST 可溯源紫外辐射计与校准系统 —— 在固化点实测辐照度与剂量，让工艺始终可验证、可复现。",
    },
  },
  {
    id: "infrared",
    label: { en: "Infrared Heating", zh: "红外加热", vi: "Gia nhiệt hồng ngoại", th: "ระบบทำความร้อนอินฟราเรด" },
    blurb: {
      en: "Infrared heating and drying systems for industrial process lines. Product line-up in preparation — contact our engineers for current availability.",
      zh: "面向工业生产线的红外加热与干燥系统。产品线整理中 —— 具体型号与供货情况请联系我们的工程师。",
    },
  },
];

const CATEGORY_BY_ID: Record<string, ProductCategory> = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.id, c]),
);

export function productCategory(id: string): ProductCategory | undefined {
  return CATEGORY_BY_ID[id];
}
