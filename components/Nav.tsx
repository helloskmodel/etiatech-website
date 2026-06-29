"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Products" },
  { href: "/application", label: "Applications" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10" style={{ background: "#0a1628" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/imgae/logo/etialogo.png"
            alt="ETIA Technology"
            width={120}
            height={40}
            className="object-contain"
            unoptimized
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href ? "text-[#3b82f6] border-b-2 border-[#3b82f6] pb-0.5" : "text-gray-300 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-4 py-2 rounded text-sm font-semibold text-white"
            style={{ background: "#2563eb" }}
          >
            Talk to an Engineer
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-4" style={{ background: "#0a1628" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
