import type { Metadata } from "next";
import ApplicationsIndexView from "@/components/ApplicationsIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { applicationsIndexMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = applicationsIndexMetadata("vi");

export default function ApplicationsViPage() {
  return (
    <LocalizedChrome locale="vi">
      <ApplicationsIndexView />
    </LocalizedChrome>
  );
}
