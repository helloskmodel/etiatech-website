import type { Metadata } from "next";
import ContactView from "@/components/ContactView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { contactMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = contactMetadata("th");

export default function ContactThPage() {
  return (
    <LocalizedChrome locale="th">
      <ContactView />
    </LocalizedChrome>
  );
}
