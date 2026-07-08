import type { Metadata } from "next";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/contact";

export const metadata: Metadata = {
  title: "UV Curing Sales & Support — From Selection to Service | ETIA",
  description:
    "Application-driven UV curing support across China and Southeast Asia: system selection, application review, local supply, installation, training, maintenance, repair and radiometer calibration for OmniCure® and Phoseon systems.",
  keywords: [
    "UV curing support",
    "UV curing service",
    "UV curing system selection",
    "how to choose UV curing system",
    "OmniCure distributor",
    "authorized distributor",
    "Phoseon distributor",
    "UV curing maintenance and repair",
    "onsite troubleshooting",
    "radiometer calibration",
    "UV curing technical support",
    "UV curing support Southeast Asia",
    "UV curing support China",
    "UV LED curing system",
    "UV lamp curing system",
    "application-driven solutions",
  ],
  alternates: {
    canonical: SITE + PAGE_PATH,
    languages: { en: SITE + PAGE_PATH, "zh-CN": SITE + "/zh", vi: SITE + "/vi", th: SITE + "/th", "x-default": SITE + PAGE_PATH },
  },
  openGraph: {
    type: "website",
    url: SITE + PAGE_PATH,
    siteName: "ETIA",
    title: "UV Curing Sales & Support — From Selection to Service | ETIA",
    description:
      "Reliable, application-driven UV curing support across China and Southeast Asia — selection, implementation, and long-term service for OmniCure® and Phoseon systems.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
