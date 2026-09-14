import type { ReactNode } from "react";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/components/seoText";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/about";

export const metadata: Metadata = {
  title: "About ETIA Technology | Genuine UV Curing Systems, Authorized Channel",
  description:
    "Genuine OmniCure, Phoseon, Fusion UV and Noblelight UV curing systems supplied through authorized channels — 20 years of UV curing expertise across Asia.",
  keywords: [
    "about ETIA Technology",
    "ETIA Thailand",
    "Etiatec Thailand",
    "genuine OmniCure supply Thailand Vietnam",
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
    images: [DEFAULT_OG_IMAGE],
    title: "About ETIA Technology | Genuine UV Curing Systems, Authorized Channel",
    description:
      "20 years of UV curing application expertise — genuine products through authorized channels, process validation, installation, calibration, maintenance and repair across Southeast Asia.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
