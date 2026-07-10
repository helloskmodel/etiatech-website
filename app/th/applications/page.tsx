import type { Metadata } from "next";
import ApplicationsIndexView from "@/components/ApplicationsIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { applicationsIndexMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = applicationsIndexMetadata("th");

export default function ApplicationsThPage() {
  return (
    <LocalizedChrome locale="th">
      <ApplicationsIndexView />
    </LocalizedChrome>
  );
}
