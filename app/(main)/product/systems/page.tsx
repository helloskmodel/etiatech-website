import type { Metadata } from "next";
import SystemsIndexView from "@/components/SystemsIndexView";

export const metadata: Metadata = {
  title: "All UV Curing Systems — ETIA Technology",
  description: "Complete Excelitas UV curing systems portfolio — OmniCure, Phoseon, Fusion UV and Noblelight, organized by technology.",
};

export default function AllSystemsPage() {
  return <SystemsIndexView />;
}
