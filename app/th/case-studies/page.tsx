import type { Metadata } from "next";
import CaseStudiesIndexView from "@/components/CaseStudiesIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { caseStudiesIndexMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = caseStudiesIndexMetadata("th");

export default function CaseStudiesThPage() {
  return (
    <LocalizedChrome locale="th">
      <CaseStudiesIndexView />
    </LocalizedChrome>
  );
}
