import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — ETIA Technology",
  description: "How ETIA-TECH (ASIA) Co., Limited collects, uses, and protects your personal data.",
};

const LAST_UPDATED = "29 June 2026";

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-300">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <div>
            <p>
              This Privacy Policy explains how <strong>ETIA-TECH (ASIA) Co., Limited</strong> (&quot;ETIA&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and safeguards your information when you visit this
              website. ETIA-TECH (ASIA) Co., Limited is a company incorporated in Hong Kong under the Companies Ordinance
              (Cap. 622), Company Registration No. 2846824.
            </p>
          </div>

          <Section title="1. Information We Collect">
            <p>We collect information you provide directly to us and information collected automatically:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Information you provide</strong> — such as your name, company, email address, phone number, and the
                content of any enquiry when you contact us or request a quote.</li>
              <li><strong>Information collected automatically</strong> — such as your IP address, browser type, device
                information, pages visited, and referring URLs, collected through cookies and similar technologies.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to your enquiries and provide sales, technical, and after-sales support.</li>
              <li>To process and fulfil quote requests and orders.</li>
              <li>To operate, maintain, and improve our website and services.</li>
              <li>To send you information you have requested and, where permitted, relevant product updates.</li>
              <li>To comply with legal obligations and protect our rights.</li>
            </ul>
          </Section>

          <Section title="3. Cookies">
            <p>
              We use cookies and similar technologies to operate the site and understand how it is used. You can manage your
              preferences at any time. For details, see our{" "}
              <Link href="/cookies" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>Cookie Policy</Link>.
            </p>
          </Section>

          <Section title="4. How We Share Information">
            <p>
              We do not sell your personal data. We may share information with trusted service providers who help us operate
              the website and our business (for example, hosting and analytics providers), with our principal manufacturers
              where necessary to fulfil your request, and where required by law or to protect our legal rights.
            </p>
          </Section>

          <Section title="5. Data Retention">
            <p>
              We retain personal data only for as long as necessary to fulfil the purposes described in this policy, including
              to satisfy any legal, accounting, or reporting requirements.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>
              Subject to applicable law, you may request access to, correction of, or deletion of your personal data, and you
              may object to or restrict certain processing. To exercise these rights, contact us using the details below.
            </p>
          </Section>

          <Section title="7. Data Security">
            <p>
              We implement reasonable technical and organisational measures designed to protect your information against
              unauthorised access, loss, or misuse. No method of transmission over the internet is completely secure, however,
              and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="8. International Transfers">
            <p>
              ETIA operates across Asia. Your information may be processed in countries other than your own, where data
              protection laws may differ. We take steps to ensure your information receives an appropriate level of protection.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date above indicates when it was
              last revised. Material changes will be posted on this page.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              If you have questions about this Privacy Policy or how we handle your data, please contact:
            </p>
            <p className="mt-2">
              <strong>ETIA-TECH (ASIA) Co., Limited</strong><br />
              Hong Kong · Company Registration No. 2846824<br />
              Email:{" "}
              <a href="mailto:support@etiatech.com" className="font-medium hover:underline" style={{ color: "#44B549" }}>support@etiatech.com</a>
            </p>
          </Section>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>← Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
