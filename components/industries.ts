import { APPLICATION_CATEGORIES, applicationsData } from "@/data/applicationsData";
import type { LangText } from "@/components/LocaleContext";

// Localized labels for the five canonical UV-curing application industries.
// Keys match `industryCategory` in applicationsData; "All Applications" is the
// extra option used by the /applications filter bar.
export const CATEGORY_LABEL: Record<string, LangText> = {
  "All Applications": { en: "All Applications", zh: "全部应用", th: "การใช้งานทั้งหมด", vi: "Tất cả ứng dụng" },
  "Medical Device Assembly": { en: "Medical Device Assembly", zh: "医疗器械装配", th: "การประกอบอุปกรณ์การแพทย์", vi: "Lắp ráp thiết bị y tế" },
  "Automotive & ADAS": { en: "Automotive & ADAS", zh: "汽车与 ADAS", th: "ยานยนต์และ ADAS", vi: "Ô tô & ADAS" },
  "Electronics & PCB Assembly": { en: "Electronics & PCB Assembly", zh: "电子与 PCB 组装", th: "อิเล็กทรอนิกส์และ PCB", vi: "Điện tử & PCB" },
  "Photonics & Advanced Packaging": { en: "Photonics & Advanced Packaging", zh: "光子与先进封装", th: "โฟโตนิกส์และแพ็กเกจขั้นสูง", vi: "Quang tử & đóng gói tiên tiến" },
  "Fiber Optic & Cable Manufacturing": { en: "Fiber Optic & Cable Manufacturing", zh: "光纤与线缆制造", th: "การผลิตไฟเบอร์ออปติกและสายเคเบิล", vi: "Sản xuất sợi quang & cáp" },
};

export type IndustryBlock = { category: string; label: LangText; image: string };

// The five industries as image tiles for the home page. Each tile's photo is the
// first listed application in that category, so it stays in sync with the data.
export const INDUSTRY_BLOCKS: IndustryBlock[] = (APPLICATION_CATEGORIES as string[]).map((category) => ({
  category,
  label: CATEGORY_LABEL[category],
  image: (applicationsData as Array<{ industryCategory: string; image: string }>).find((a) => a.industryCategory === category)?.image ?? "",
}));
