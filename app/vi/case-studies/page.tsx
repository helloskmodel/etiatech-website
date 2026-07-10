import type { Metadata } from "next";
import CaseStudiesIndexView from "@/components/CaseStudiesIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { caseStudiesIndexMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = caseStudiesIndexMetadata("vi");

export default function CaseStudiesViPage() {
  return (
    <LocalizedChrome locale="vi">
      <CaseStudiesIndexView />
    </LocalizedChrome>
  );
}
