import type { LangText } from "./LocaleContext";

const COS_IMAGE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE";

// The light sources ETIA leads with, in the order ETIA sells them: the lamp
// spot systems that are most of the business, then LED spot, the two area
// families, microwave, and infrared last. The home page row and the PRODUCT
// menu both read this list, so they can never disagree.
//
// `family` is the class the manufacturer's own selector guide puts the source
// in — broad spectrum (a lamp, the whole 200–400 nm band) against single
// wavelength (an LED at one peak), with infrared outside UV altogether.
//
// `photo` is an image ETIA supplied for the home page card. A photograph of
// the source at work fills the card edge to edge; one shot against white is
// letterboxed like every other product picture, which `fit: "contain"` asks
// for. Without a `photo` the card falls back to `model` — the catalogue shot
// of a representative machine.
export type LightSource = {
  family: LangText;
  name: LangText;
  href: string;
  model: string;
  photo?: string;
  fit?: "cover" | "contain";
  accent: string;
};

const BROAD: LangText = { en: "UV Curing · Broad Spectrum", zh: "紫外固化 · 宽光谱", th: "การบ่ม UV · สเปกตรัมกว้าง", vi: "Đóng rắn UV · Phổ rộng" };
const SINGLE: LangText = { en: "UV Curing · Single Wavelength", zh: "紫外固化 · 单波长", th: "การบ่ม UV · ความยาวคลื่นเดียว", vi: "Đóng rắn UV · Đơn bước sóng" };
const IR: LangText = { en: "Infrared Heating", zh: "红外加热", th: "การให้ความร้อนอินฟราเรด", vi: "Gia nhiệt hồng ngoại" };

export const LIGHT_SOURCES: LightSource[] = [
  { family: BROAD,
    name: { en: "UV Lamp Spot Curing Systems", zh: "汞灯点固化系统", th: "ระบบบ่มแบบจุดด้วยหลอด UV", vi: "Hệ thống đóng rắn điểm bằng đèn UV" },
    href: "/product/technology/mercury-uv-lamp", model: "s2000-elite", accent: "#1A56DB" },
  { family: SINGLE,
    name: { en: "UV LED Spot Curing Systems", zh: "UV LED 点固化系统", th: "ระบบบ่มแบบจุด UV LED", vi: "Hệ thống đóng rắn điểm UV LED" },
    // The LX505's own photograph is shot on a blue gradient, which sits oddly
    // in a row of white-background equipment shots. The LX500 stands in for
    // the shelf instead; the card names the category, not the model.
    href: "/product/technology/uv-led#uv-led-spot-curing-systems", model: "lx500", accent: "#41A62A" },
  { family: SINGLE,
    name: { en: "Water-Cooled UV LED Area Curing Systems", zh: "水冷 UV LED 面固化系统", th: "ระบบบ่มพื้นที่ UV LED ระบายความร้อนด้วยน้ำ", vi: "Hệ thống đóng rắn diện rộng UV LED làm mát bằng nước" },
    href: "/product/technology/uv-led#uv-led-water-cooled-systems", model: "fl400", accent: "#7c3aed" },
  { family: SINGLE,
    name: { en: "Air-Cooled UV LED Area Curing Systems", zh: "风冷 UV LED 面固化系统", th: "ระบบบ่มพื้นที่ UV LED ระบายความร้อนด้วยอากาศ", vi: "Hệ thống đóng rắn diện rộng UV LED làm mát bằng khí" },
    href: "/product/technology/uv-led#uv-led-air-cooled-systems", model: "ac8", accent: "#0ea5e9" },
  { family: BROAD,
    name: { en: "Microwave UV Curing Systems", zh: "微波无极灯固化系统", th: "ระบบบ่ม UV ไมโครเวฟ", vi: "Hệ thống đóng rắn UV vi sóng" },
    href: "/product/technology/microwave-uv-lamp", model: "f-series", accent: "#f59e0b",
    photo: `${COS_IMAGE}/LIGHT%20RESOURCE%20/FUSION%20UV`, fit: "contain" },
  { family: IR,
    name: { en: "Infrared Emitters", zh: "红外发射器", th: "ตัวเปล่งอินฟราเรด", vi: "Bộ phát hồng ngoại" },
    // Three Golden 8 twin tubes on white — boxed like the Fusion shot so the
    // tubes are not cropped. (The bucket key is spelt "EMMITTER".)
    href: "/product/technology/infrared-emitters", model: "ir-golden8", accent: "#dc2626",
    photo: `${COS_IMAGE}/LIGHT%20RESOURCE%20/IR%20EMMITTER`, fit: "contain" },
  { family: IR,
    name: { en: "Infrared Systems", zh: "红外加热系统", th: "ระบบอินฟราเรด", vi: "Hệ thống hồng ngoại" },
    href: "/product/technology/infrared-heating", model: "ir-m85", accent: "#dc2626",
    photo: `${COS_IMAGE}/LIGHT%20RESOURCE%20/IR%20SYSTEM` },
];
