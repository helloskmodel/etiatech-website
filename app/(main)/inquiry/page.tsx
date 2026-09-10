import type { Metadata } from "next";
import InquiryView from "@/components/inquiry/InquiryView";

// The review-and-send page for the inquiry basket. A form, not content —
// kept out of the index so a search never lands someone on an empty basket.
export const metadata: Metadata = {
  title: "Your Inquiry — Request a Quote | ETIA",
  description: "Review the systems and part numbers you picked and send them to ETIA as one inquiry. A sales engineer replies within 24 hours.",
  robots: { index: false, follow: true },
};

export default function InquiryPage() {
  return <InquiryView />;
}
