import type { Metadata } from "next";
import PrivacyView from "@/components/PrivacyView";

export const metadata: Metadata = {
  title: "Privacy Policy — ETIA Technology",
  description: "How ETIA-TECH (ASIA) Co., Limited collects, uses, and protects your personal data.",
  alternates: { canonical: "https://www.etiatech.com/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
