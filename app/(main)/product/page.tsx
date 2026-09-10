import type { Metadata } from "next";
import ProductShopView from "@/components/ProductShopView";

export const metadata: Metadata = {
  title: "Products — UV Curing & Infrared Heating Systems, Inquiry Shop | ETIA",
  description:
    "Every UV curing and infrared heating system ETIA supplies, on one page: OmniCure, Phoseon, Fusion UV and Noblelight, filtered by brand and light source. Add systems, lamps and part numbers to one inquiry — a sales engineer replies within 24 hours.",
  alternates: { canonical: "https://www.etiatech.com/product" },
};

export default function ProductCenterPage() {
  return <ProductShopView />;
}
