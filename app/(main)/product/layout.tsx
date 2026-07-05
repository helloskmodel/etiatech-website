import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UV Curing Systems | LED & Lamp Spot, Area Curing | ETIA",
  description:
    "Browse UV LED spot, area, and lamp curing systems from OmniCure, Phoseon, Fusion & NobleLight. 200–600nm coverage, local stock, expert selection support.",
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
