// The three messengers ETIA answers on, shown in full to every visitor.
//
// These used to be picked by page language — /th got LINE, /vi got Zalo, the
// English and Chinese pages got WhatsApp plus LINE. That reasoning was about
// countries, and the customers are not. A plant in Rayong is run by Thai,
// Vietnamese, Malaysian and Chinese staff, and each of them reaches for the app
// already on their phone, not the one their host country is supposed to use. A
// Vietnamese engineer on a Thai site was shown LINE and nothing else.
//
// So the list is the same everywhere and the visitor picks. Three buttons is
// not clutter when any one of them may be the only one a given reader has.
//
// No WeChat / WeCom: this is the overseas deployment, it carries no mainland
// China ICP filing, and it publishes no mainland contact point.
//
// Every URL here is a real ETIA account — see components/omnicure/copy.ts,
// which carries the rule that nothing in it may be invented.

import { CONTACT } from "./omnicure/copy";
import type { Locale } from "./LocaleContext";

export type ChatChannel = {
  /** Brand name. The same in all four site languages, so never translated. */
  label: string;
  href: string;
  /** The brand's own colour, used for the floating pills. */
  bg: string;
  aria: Record<Locale, string>;
};

export const CHAT_CHANNELS: ChatChannel[] = [
  {
    label: "WhatsApp",
    href: CONTACT.whatsappUrl,
    bg: "#25D366",
    aria: {
      en: "Chat with us on WhatsApp",
      zh: "通过 WhatsApp 咨询",
      th: "แชทกับเราทาง WhatsApp",
      vi: "Nhắn tin cho chúng tôi qua WhatsApp",
    },
  },
  {
    label: "LINE",
    href: CONTACT.lineUrl,
    bg: "#06C755",
    aria: {
      en: "Chat with us on LINE",
      zh: "通过 LINE 咨询",
      th: "แชทกับเราทาง LINE",
      vi: "Nhắn tin cho chúng tôi qua LINE",
    },
  },
  {
    label: "Zalo",
    href: CONTACT.zaloUrl,
    bg: "#0068FF",
    aria: {
      en: "Chat with us on Zalo",
      zh: "通过 Zalo 咨询",
      th: "แชทกับเราทาง Zalo",
      vi: "Nhắn tin cho chúng tôi qua Zalo",
    },
  },
];

/** Only the channels whose account is actually configured. */
export const liveChatChannels = () => CHAT_CHANNELS.filter((c) => Boolean(c.href));
