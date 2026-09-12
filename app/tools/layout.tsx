import type { Metadata } from "next";
import "../globals.css";

// Internal tools get their own root layout: no navigation, no footer, no
// cookie banner, no chat bubble. Everything the site adds around a page would
// print, and these pages exist to be printed.
export const metadata: Metadata = {
  title: "ETIA internal tools",
  robots: { index: false, follow: false, nocache: true },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F9FC] text-[#102A43]">{children}</body>
    </html>
  );
}
