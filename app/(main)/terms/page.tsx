import type { Metadata } from "next";
import TermsView from "@/components/TermsView";

export const metadata: Metadata = {
  title: "Terms of Use — ETIA Technology",
  description: "The terms governing your access to and use of the ETIA-TECH (ASIA) Co., Limited website.",
};

export default function TermsPage() {
  return <TermsView />;
}
