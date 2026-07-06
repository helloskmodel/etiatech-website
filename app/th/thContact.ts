import { inquiryMailto } from "@/components/contact";
import type { ThLocale } from "./dictionaries";

type Tri = Record<ThLocale, string>;

// Thailand market contacts. Inquiries from the /th site route to the Thailand
// Sales Director. (The Vietnam technical contact is NOT shown on the Thailand
// site.)
export const TH_CONTACTS = {
  sales: {
    name: "Sompoch Ratchakom (Job)",
    role: { th: "ผู้อำนวยการฝ่ายขาย", en: "Sales Director", zh: "销售总监" } as Tri,
    phone: "+66 811 746 947",
    phoneHref: "+66811746947",
    email: "sompoch@etia-tech.com",
  },
};

// Inquiry mailto pre-addressed to the Thailand Sales Director.
export function thMailto(l: ThLocale, opts: { subject?: string; context?: string } = {}) {
  return inquiryMailto(l, { ...opts, email: TH_CONTACTS.sales.email });
}
