import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UV Curing Applications | Medical, EV, Photonics & More | ETIA",
  description:
    "See how UV curing solves real production challenges — from EV battery manufacturing to optical fiber, medical device bonding, and advanced packaging.",
};

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
