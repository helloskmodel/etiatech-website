import type { Metadata } from "next";
import ApplicationsIndexView from "@/components/ApplicationsIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { applicationsIndexMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = applicationsIndexMetadata("zh");

export default function ApplicationsZhPage() {
  return (
    <LocalizedChrome locale="zh">
      <ApplicationsIndexView />
    </LocalizedChrome>
  );
}
