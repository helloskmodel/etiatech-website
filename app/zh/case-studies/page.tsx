import type { Metadata } from "next";
import CaseStudiesIndexView from "@/components/CaseStudiesIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { caseStudiesIndexMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = caseStudiesIndexMetadata("zh");

export default function CaseStudiesZhPage() {
  return (
    <LocalizedChrome locale="zh">
      <CaseStudiesIndexView />
    </LocalizedChrome>
  );
}
