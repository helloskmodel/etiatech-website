import type { ReactNode } from "react";
import "../globals.css";
import LandingRoot from "@/components/omnicure/LandingRoot";

export default function Layout({ children }: { children: ReactNode }) {
  return <LandingRoot lang="en">{children}</LandingRoot>;
}
