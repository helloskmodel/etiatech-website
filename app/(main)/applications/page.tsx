import type { Metadata } from "next";
import ApplicationsIndexView from "@/components/ApplicationsIndexView";

export const metadata: Metadata = {
  title: "UV Curing Application Case Studies | ETIA Technology",
  description: "Explore practical UV curing application case studies with customer challenges, recommended products, benefits, and ETIA technical support.",
  alternates: { canonical: "https://www.etiatech.com/applications" },
  openGraph: {
    type: "website",
    url: "https://www.etiatech.com/applications",
    siteName: "ETIA Technology",
    title: "UV Curing Application Case Studies | ETIA Technology",
    description: "Explore practical UV curing application case studies with customer challenges, recommended products, benefits, and ETIA technical support.",
  },
};

export default function ApplicationsPage() {
  return <ApplicationsIndexView />;
}
