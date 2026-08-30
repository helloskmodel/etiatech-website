import type { ReactNode } from "react";
import "@/app/globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ms">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
