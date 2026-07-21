import type { ReactNode } from "react";
import "../globals.css";
import LineFloatingButton from "@/components/LineFloatingButton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col">
        {children}
        <LineFloatingButton always />
      </body>
    </html>
  );
}
