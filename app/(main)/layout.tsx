import type { Metadata } from "next";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { LocaleProvider } from "@/components/LocaleContext";

export const metadata: Metadata = {
  title: "ETIA Technology — UV Curing Solutions",
  description: "Your UV Curing Partner — From Selection to Support. 20 years of expertise across 9 industries.",
  // Google Search Console verification (HTML-tag method for a URL-prefix property).
  // Renders <meta name="google-site-verification" content="…"> site-wide.
  verification: {
    google: "QKJZDJBYBrGyCIbghtQaFr9jf64cdGFpMYoPE6qUnhE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ background: "#ffffff", color: "#111827" }}>
        <LocaleProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
