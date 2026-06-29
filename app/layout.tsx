import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "ETIA Technology — UV Curing Solutions",
  description: "Your UV Curing Partner — From Selection to Support. 20 years of expertise across 9 industries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ background: "#ffffff", color: "#111827" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
