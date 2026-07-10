import type { Metadata } from "next";
import ContactView from "@/components/ContactView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { contactMetadata } from "@/components/localePageSeo";

export const metadata: Metadata = contactMetadata("vi");

export default function ContactViPage() {
  return (
    <LocalizedChrome locale="vi">
      <ContactView />
    </LocalizedChrome>
  );
}
