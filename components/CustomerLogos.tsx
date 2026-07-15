"use client";
import { useLocale, t } from "@/components/LocaleContext";

// Logos of manufacturers that run OmniCure / Phoseon UV curing systems supplied
// & supported by ETIA. Grayscale wall — a quiet, credible trust signal.
// Files live in the COS bucket; names contain spaces + parentheses, so encode.
const BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";
const logoUrl = (file: string) =>
  `${BASE}/${file.replace(/ /g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29")}`;

const CUSTOMERS: [string, string][] = [
  ["Baxter", "UV_logo (Baxter).png"],
  ["Boston Scientific", "UV_logo (Boston Scientific).png"],
  ["Medtronic", "UV_logo (Medtronic).png"],
  ["GE HealthCare", "UV_logo (GE HealthCare).png"],
  ["MicroPort", "UV_logo (MicroPort).png"],
  ["Hengrui Pharmaceuticals", "UV_logo (Hengrui Pharmaceuticals).png"],
  ["Thermo Fisher Scientific", "UV_logo (Thermo Fisher Scientific).png"],
  ["Coherent", "UV_logo (Coherent).png"],
  ["IPG Photonics", "UV_logo (IPG Photonics).png"],
  ["Lumentum", "UV_logo (Lumentum).png"],
  ["nLIGHT", "UV_logo (nLIGHT).png"],
  ["Seagate", "UV_logo (Seagate).png"],
  ["Han's Laser", "UV_logo (HAN'S LASER).png"],
  ["INXUNTECH", "UV_logo (INXUNTECH).png"],
];

export default function CustomerLogos() {
  const { locale } = useLocale();
  return (
    <section className="border-y border-[#EAF0F5] bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
          {t({ en: "Trusted By", zh: "合作客户", th: "ลูกค้าที่ไว้วางใจเรา", vi: "Khách hàng tin dùng" }, locale)}
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-bold text-[#143C96] md:text-3xl">
          {t({
            en: "Trusted by leading medical, photonics & electronics manufacturers",
            zh: "服务医疗、光电子与电子领域的头部制造企业",
            th: "ได้รับความไว้วางใจจากผู้ผลิตชั้นนำด้านการแพทย์ โฟโตนิกส์ และอิเล็กทรอนิกส์",
            vi: "Được các nhà sản xuất hàng đầu ngành y tế, quang tử & điện tử tin dùng",
          }, locale)}
        </h2>
        <div className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {CUSTOMERS.map(([name, file]) => (
            <div key={name} className="flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl(file)}
                alt={name}
                title={name}
                loading="lazy"
                className="h-9 w-auto max-w-[130px] object-contain transition duration-200 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
