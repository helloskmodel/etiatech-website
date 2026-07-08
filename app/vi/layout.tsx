import type { ReactNode } from "react";
import "../globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="vi"><body className="min-h-screen flex flex-col">{children}</body></html>;
}
