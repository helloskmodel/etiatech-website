import type { Metadata } from "next";
import S2000View from "@/components/S2000View";

export const metadata: Metadata = {
  title: "S2000 Elite | OmniCure UV Curing System | ETIA",
  description:
    "OmniCure S2000 Elite — the industry's most advanced lamp-based UV spot curing system. Up to 30 W/cm², closed-loop feedback, 30 ms shutter, Industry 4.0 ready.",
};

export default function S2000ElitePage() {
  return <S2000View />;
}
