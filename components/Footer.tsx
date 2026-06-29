import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20" style={{ background: "#f8f9fb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">ETIA Technology</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Authorized distributor of world-class UV curing systems. 20 years of application expertise across 9 industries.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">Navigation</p>
          <div className="flex flex-col gap-1">
            {["/", "/product", "/application", "/contact"].map((href, i) => (
              <Link key={href} href={href} className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">
                {["Home", "Products", "Applications", "Sales & Support"][i]}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">Legal</p>
          <div className="flex flex-col gap-1">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-[#1A56DB] transition-colors">Cookie Policy</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A56DB] mb-2">Contact</p>
          <a href="mailto:support@etiatech.com" className="text-xs hover:underline" style={{ color: "#44B549" }}>
            support@etiatech.com
          </a>
        </div>
      </div>
      <div className="border-t border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ETIA-TECH (ASIA) Co., Limited. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-[#1A56DB] transition-colors">Privacy</Link>
            <Link href="/cookies" className="text-xs text-gray-400 hover:text-[#1A56DB] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
