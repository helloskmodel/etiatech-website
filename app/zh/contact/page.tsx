import type { Metadata } from "next";
import ContactView from "@/components/ContactView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { contactMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = contactMetadata("zh");

export default function ContactZhPage() {
  return (
    <LocalizedChrome locale="zh">
      <ContactView />
    </LocalizedChrome>
  );
}
