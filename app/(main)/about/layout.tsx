import type { ReactNode } from "react";
import type { Metadata } from "next";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/about";

export const metadata: Metadata = {
  title: "About ETIA Technology | Authorized UV Curing Systems Distributor",
  description:
    "ETIA Technology is an authorized distributor of OmniCure, Phoseon, Fusion UV and Noblelight UV curing systems, with 20 years of application expertise and offices in Shanghai, Hong Kong, Bangkok and Bac Ninh.",
  keywords: [
    "about ETIA Technology",
    "ETIA Thailand",
    "Etiatec Thailand",
    "authorized OmniCure distributor",
    "UV curing distributor",
    "UV curing systems Southeast Asia",
  ],
  alternates: {
    canonical: SITE + PAGE_PATH,
  },
  openGraph: {
    type: "website",
    url: SITE + PAGE_PATH,
    siteName: "ETIA Technology",
    title: "About ETIA Technology | Authorized UV Curing Systems Distributor",
    description:
      "20 years of UV curing application expertise — authorized distribution, process validation, installation, calibration, maintenance and repair across China and Southeast Asia.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
