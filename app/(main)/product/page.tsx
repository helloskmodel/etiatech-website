import type { Metadata } from "next";
import ProductCenterView from "@/components/ProductCenterView";

export const metadata: Metadata = {
  title: "Product Centre — UV Curing & Industrial Light Sources | ETIA",
  description:
    "Browse ETIA's UV curing and industrial light sources by technology — mercury UV lamp, UV LED, microwave electrodeless, precision UV measurement and infrared heating — or by brand: OmniCure, Phoseon, Fusion UV and Noblelight.",
  alternates: { canonical: "https://www.etiatech.com/product" },
};

export default function ProductCenterPage() {
  return <ProductCenterView />;
}
