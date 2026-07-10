import type { ReactNode } from "react";
import LandingRoot from "@/components/omnicure/LandingRoot";

export default function Layout({ children }: { children: ReactNode }) {
  return <LandingRoot lang="vi">{children}</LandingRoot>;
}
