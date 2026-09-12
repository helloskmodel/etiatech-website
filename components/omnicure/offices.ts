// Where ETIA answers the phone, by market.
//
// IMPORTANT — nothing in this file may be invented. A street address or a
// telephone number on a distributor's site is an instruction to a customer:
// someone will drive there, or dial it. Where ETIA has not given us the
// details, the entry carries `address: null` / `phone: null` and the UI shows
// the channels that do exist (email, WhatsApp/LINE/Zalo) instead of a blank or
// a plausible-looking placeholder.
//
// Confirmed today:
//   TH — office address + sales director's line (components/omnicure/copy.ts)
//   VN — Bac Ninh office, Zalo account's own number
// Pending from ETIA: SG, MY, ID — and Vietnam's street address.

import type { LampLang } from "./s2000Lamp";
import { CONTACT } from "./copy";

export type Office = {
  id: "sg" | "th" | "my" | "id" | "vn";
  /** Country name, in the four site languages. */
  country: Record<LampLang, string>;
  /** City or region, when there is an office. Null while unconfirmed. */
  city: Record<LampLang, string> | null;
  /** Street address, exactly as ETIA gave it. Null while unconfirmed. */
  address: string | null;
  /** Dialable number. Null while unconfirmed — never a placeholder. */
  phone: string | null;
  phoneHref: string | null;
  email: string;
  /** The messenger a B2B buyer in that market actually uses. */
  chat: { label: string; url: string } | null;
};

const SALES = "sales@etia-tech.com";

export const OFFICES: Office[] = [
  {
    id: "th",
    country: { en: "Thailand", zh: "泰国", th: "ประเทศไทย", vi: "Thái Lan" },
    city: { en: "Bangkok", zh: "曼谷", th: "กรุงเทพฯ", vi: "Bangkok" },
    address: CONTACT.address,
    phone: CONTACT.phone,
    phoneHref: CONTACT.phoneHref,
    email: SALES,
    chat: { label: `LINE ${CONTACT.lineId}`, url: CONTACT.lineUrl },
  },
  {
    id: "vn",
    country: { en: "Vietnam", zh: "越南", th: "เวียดนาม", vi: "Việt Nam" },
    city: { en: "Bac Ninh", zh: "北宁", th: "บั๊กนิญ", vi: "Bắc Ninh" },
    // Street address not yet supplied — the city is confirmed, the street is not.
    address: null,
    phone: "+84 961 530 153",
    phoneHref: "+84961530153",
    email: SALES,
    chat: { label: "Zalo", url: CONTACT.zaloUrl },
  },
  {
    id: "sg",
    country: { en: "Singapore", zh: "新加坡", th: "สิงคโปร์", vi: "Singapore" },
    city: null,
    address: null,
    phone: null,
    phoneHref: null,
    email: SALES,
    chat: { label: "WhatsApp", url: CONTACT.whatsappUrl },
  },
  {
    id: "my",
    country: { en: "Malaysia", zh: "马来西亚", th: "มาเลเซีย", vi: "Malaysia" },
    city: null,
    address: null,
    phone: null,
    phoneHref: null,
    email: SALES,
    chat: { label: "WhatsApp", url: CONTACT.whatsappUrl },
  },
  {
    id: "id",
    country: { en: "Indonesia", zh: "印度尼西亚", th: "อินโดนีเซีย", vi: "Indonesia" },
    city: null,
    address: null,
    phone: null,
    phoneHref: null,
    email: SALES,
    chat: { label: "WhatsApp", url: CONTACT.whatsappUrl },
  },
];

/** Which office a visitor most likely wants, from the page language. */
export const defaultOfficeId = (lang: LampLang): Office["id"] =>
  lang === "th" ? "th" : lang === "vi" ? "vn" : "sg";

export const officeById = (id: string): Office | undefined => OFFICES.find((o) => o.id === id);
