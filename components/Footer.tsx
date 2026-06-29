import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20" style={{ background: "#060e1f" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-sm font-semibold text-white mb-2">ETIA Technology</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Authorized distributor of world-class UV curing systems. 20 years of application expertise across 9 industries.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-2">Navigation</p>
          <div className="flex flex-col gap-1">
            {["/", "/product", "/application", "/contact"].map((href, i) => (
              <Link key={href} href={href} className="text-xs text-gray-400 hover:text-white transition-colors">
                {["Home", "Products", "Applications", "Contact"][i]}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-2">Contact</p>
          <a href="mailto:support@etiatech.com" className="text-xs text-[#3b82f6] hover:underline">
            support@etiatech.com
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} ETIA Technology. All rights reserved.</p>
      </div>
    </footer>
  );
}
