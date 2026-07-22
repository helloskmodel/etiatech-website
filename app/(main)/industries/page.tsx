import type { Metadata } from "next";
import IndustriesIndexView from "@/components/IndustriesIndexView";

const SITE = "https://www.etiatech.com";

export const metadata: Metadata = {
  title: "UV Curing Solutions by Industry | ETIA Technology",
  description:
    "Industry-matched UV curing systems and process guidance: medical devices, electronics & semiconductor, optical communications, new energy & battery, digital printing, and advanced materials.",
  alternates: { canonical: `${SITE}/industries` },
  openGraph: {
    type: "website",
    url: `${SITE}/industries`,
    siteName: "ETIA Technology",
    title: "UV Curing Solutions by Industry | ETIA Technology",
    description:
      "Find the right UV curing system for your industry — recommended configurations, process best practices and proven application notes.",
  },
};

export default function IndustriesPage() {
  return <IndustriesIndexView />;
}
