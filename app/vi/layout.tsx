import type { ReactNode } from "react";
import "../globals.css";
import ChatFloatingButton from "@/components/ChatFloatingButton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        {children}
        <ChatFloatingButton force="vi" />
      </body>
    </html>
  );
}
