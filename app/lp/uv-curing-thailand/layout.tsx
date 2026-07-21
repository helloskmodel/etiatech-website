import type { ReactNode } from "react";
import "../../globals.css";
import LandingRoot from "@/components/omnicure/LandingRoot";

// Standalone root (own <html>, logo-only header, GA/GTM) for the Thailand
// Google Ads landing page. English-primary.
export default function Layout({ children }: { children: ReactNode }) {
  return <LandingRoot lang="en">{children}</LandingRoot>;
}
