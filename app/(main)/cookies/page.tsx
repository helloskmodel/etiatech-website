import type { Metadata } from "next";
import CookiesView from "@/components/CookiesView";

export const metadata: Metadata = {
  title: "Cookie Policy — ETIA Technology",
  description: "How ETIA-TECH (ASIA) Co., Limited uses cookies and similar technologies on this website.",
  alternates: { canonical: "https://www.etiatech.com/cookies" },
};

export default function CookiePolicyPage() {
  return <CookiesView />;
}
