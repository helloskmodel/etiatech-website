import type { LangText, Locale } from "@/components/LocaleContext";

// Homepage "What's New" ticker (NEW PRODUCT / NEW EVENT / NEW PROMOTION).
//
// TO PUBLISH A NEW MESSAGE: add an entry to NEWS_ITEMS below — newest `date`
// shows first. Give it a unique `id`, a `kind` (colors the badge), the text in
// all four languages, and a link. Set `until` to auto-expire time-limited
// items (promotions, events) — after that date the item simply stops showing.
// No other file needs to change; the ticker renders whatever is active here.

export type NewsKind = "product" | "event" | "promotion";

export type NewsItem = {
  id: string;
  kind: NewsKind;
  text: LangText;
  // A single path, or per-locale paths where a localized page exists
  // (falls back to `en` for locales without their own entry).
  href?: string | Partial<Record<Locale, string>>;
  /** Publish date (YYYY-MM-DD) — newest first in the ticker. */
  date: string;
  /** Optional expiry date (YYYY-MM-DD) — hidden after this day. */
  until?: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "s2000-lamp-2026",
    kind: "product",
    text: {
      en: "OmniCure S2000 Elite replacement lamps (012-64000R) — genuine stock, fast delivery",
      zh: "OmniCure S2000 Elite 替换灯管（012-64000R）——原厂正品现货，快速发货",
      th: "หลอดเปลี่ยน OmniCure S2000 Elite (012-64000R) — ของแท้ มีสต็อก จัดส่งรวดเร็ว",
      vi: "Đèn thay thế OmniCure S2000 Elite (012-64000R) — hàng chính hãng, giao nhanh",
    },
    href: {
      en: "/insights/omnicure-s2000-elite-genuine-lamp",
      zh: "/zh/insights/omnicure-s2000-elite-genuine-lamp",
      th: "/th/insights/omnicure-s2000-elite-genuine-lamp",
      vi: "/vi/insights/omnicure-s2000-elite-genuine-lamp",
    },
    date: "2026-07-15",
  },
  {
    id: "lx500-2026",
    kind: "product",
    text: {
      en: "OmniCure LX500 — ultra-compact UV LED spot curing with consistent, repeatable results",
      zh: "OmniCure LX500——超紧凑 UV LED 点固化，效果一致、可重复",
      th: "OmniCure LX500 — UV LED Spot Curing ขนาดกะทัดรัดพิเศษ ผลลัพธ์สม่ำเสมอ ทำซ้ำได้",
      vi: "OmniCure LX500 — UV LED Spot Curing siêu nhỏ gọn, kết quả nhất quán, lặp lại được",
    },
    href: {
      en: "/product/systems/lx500",
      zh: "/zh/product/systems/lx500",
      th: "/th/product/systems/lx500",
      vi: "/vi/product/systems/lx500",
    },
    date: "2026-07-09",
  },
  {
    id: "engineer-consult",
    kind: "promotion",
    text: {
      en: "Free UV curing process consultation — talk to an ETIA engineer about your application",
      zh: "免费 UV 固化工艺咨询——与 ETIA 工程师沟通您的应用",
      th: "ปรึกษากระบวนการบ่มยูวีฟรี — พูดคุยกับวิศวกร ETIA เกี่ยวกับงานของคุณ",
      vi: "Tư vấn miễn phí quy trình UV curing — trao đổi với kỹ sư ETIA về ứng dụng của bạn",
    },
    href: "/contact",
    date: "2026-07-01",
  },
];

export function resolveNewsHref(href: NewsItem["href"], locale: Locale): string | undefined {
  if (!href) return undefined;
  if (typeof href === "string") return href;
  return href[locale] ?? href.en;
}

// Items that haven't expired, newest first.
export function activeNews(now: Date = new Date()): NewsItem[] {
  return NEWS_ITEMS.filter((n) => !n.until || now <= new Date(`${n.until}T23:59:59`)).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}
