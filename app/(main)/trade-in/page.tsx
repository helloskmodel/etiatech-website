import type { Metadata } from "next";
import TradeInView from "@/components/TradeInView";
import { TRADE_IN_VALUE_USD } from "@/components/tradeIn";

// The lamp trade-in. Indexed on purpose, unlike the scan pages: a factory
// searching "OmniCure S2000 lamp disposal" or "汞灯 回收" is exactly the
// visitor this page is for, and most of them have never heard of ETIA.
export const metadata: Metadata = {
  title: `OmniCure Lamp Trade-In — US$${TRADE_IN_VALUE_USD} Off | ETIA`,
  description: `Send back your used OmniCure S2000, S2000 Elite, S1500 Pro or S1500 lamp and take US$${TRADE_IN_VALUE_USD} off the next one. Open to every OmniCure user, whether or not the lamp came from ETIA. Register online, we send the return address for your country.`,
  alternates: { canonical: "https://www.etiatech.com/trade-in" },
};

export default function TradeInPage() {
  return <TradeInView />;
}
