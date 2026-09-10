import type { Metadata } from "next";
import ProductShopView from "@/components/ProductShopView";

export const metadata: Metadata = {
  title: "UV Curing & Infrared Systems — Inquiry Shop | ETIA",
  description:
    "Every UV curing and infrared heating system ETIA supplies, by brand and light source. Put systems, lamps and part numbers in one inquiry — a reply within 24 hours.",
  alternates: { canonical: "https://www.etiatech.com/product" },
};

export default function ProductCenterPage() {
  return <ProductShopView />;
}
