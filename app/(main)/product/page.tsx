import type { Metadata } from "next";
import ProductCenterView from "@/components/ProductCenterView";

export const metadata: Metadata = {
  title: "Product Centre — UV Curing & Infrared Heating Systems | ETIA",
  description:
    "Browse ETIA's UV curing and infrared heating systems by technology — UV spot lamp curing, UV LED, microwave electrodeless and infrared heating — or by brand: OmniCure, Phoseon, Fusion UV and Noblelight.",
  alternates: { canonical: "https://www.etiatech.com/product" },
};

export default function ProductCenterPage() {
  return <ProductCenterView />;
}
