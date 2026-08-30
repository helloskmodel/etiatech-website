import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "../dictionaries";

export const metadata: Metadata = {
  title: "Dasar Privasi | ETIA Technology",
  description: "Dasar privasi ETIA Technology — cara kami mengumpul, menggunakan dan melindungi data peribadi anda.",
};

export default function PrivacyPage() {
  const dict = getDict("my");

  return (
    <div className="min-h-screen bg-white text-[#102038]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A3DAD] to-[#142f86] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#4CAF3E" }}>
            Perundangan
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Dasar Privasi
          </h1>
          <p className="text-sm text-gray-300">
            Dikemaskini: 29 Jun 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <div>
            <p>
              Dasar privasi ini menerangkan bagaimana ETIA-TECH (ASIA) Co., Limited ("ETIA", "kami", atau "milik kami") mengumpul, menggunakan, mendedahkan dan melindungi maklumat anda apabila anda melawati laman web ini. ETIA-TECH (ASIA) Co., Limited adalah syarikat yang didaftarkan di Hong Kong di bawah Ordinan Syarikat (Bab 622).
            </p>
          </div>

          <Section title="1. Maklumat yang Kami Kumpul">
            <p>Kami mengumpul maklumat yang anda berikan terus kepada kami dan maklumat yang dikumpulkan secara automatik:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Maklumat yang anda berikan — seperti nama, syarikat, alamat e-mel, nombor telefon dan kandungan sebarang pertanyaan apabila anda menghubungi kami atau meminta sebut harga.</li>
              <li>Maklumat yang dikumpulkan secara automatik — seperti alamat IP, jenis penyemak imbas, maklumat peranti, halaman yang dilawati dan URL rujukan, dikumpulkan melalui kuki dan teknologi yang serupa.</li>
            </ul>
          </Section>

          <Section title="2. Cara Kami Menggunakan Maklumat Anda">
            <ul className="list-disc pl-5 space-y-1">
              <li>Untuk membalas pertanyaan anda dan menyediakan sokongan jualan, teknikal dan pasca jualan.</li>
              <li>Untuk memproses dan melaksanakan permintaan sebut harga dan pesanan.</li>
              <li>Untuk mengendalikan, menyelenggara dan meningkatkan laman web dan perkhidmatan kami.</li>
              <li>Untuk menghantar maklumat yang telah anda minta dan, jika dibenarkan, kemas kini produk yang berkaitan.</li>
              <li>Untuk mematuhi kewajipan undang-undang dan melindungi hak kami.</li>
            </ul>
          </Section>

          <Section title="3. Kuki">
            <p>
              Kami menggunakan kuki dan teknologi yang serupa untuk mengendalikan laman web dan memahami cara ia digunakan. Anda boleh menguruskan pilihan anda pada setiap masa. Untuk butiran, lihat{" "}
              <Link href="/my/cookies" className="font-medium hover:underline" style={{ color: "#1A3DAD" }}>
                Dasar Kuki
              </Link>
              .
            </p>
          </Section>

          <Section title="4. Cara Kami Berkongsi Maklumat">
            <p>Kami tidak menjual data peribadi anda. Kami mungkin berkongsi maklumat dengan pembekal perkhidmatan yang dipercayai yang membantu kami mengendalikan laman web dan perniagaan kami (contohnya, pembekal pengehosan dan analitik), dengan pengilang utama kami jika perlu untuk memenuhi permintaan anda, dan jika dikehendaki oleh undang-undang atau untuk melindungi hak undang-undang kami.</p>
          </Section>

          <Section title="5. Pengekalan Data">
            <p>Kami mengekalkan data peribadi hanya untuk selama yang diperlukan untuk mencapai tujuan yang dijelaskan dalam dasar ini, termasuk untuk memenuhi sebarang keperluan undang-undang, perakaunan atau pelaporan.</p>
          </Section>

          <Section title="6. Hak Anda">
            <p>Tertakluk kepada undang-undang yang terpakai, anda boleh meminta akses ke, pembetulan bagi atau penghapusan data peribadi anda, dan anda boleh menentang atau menyekat pemprosesan tertentu. Untuk menggunakan hak-hak ini, sila hubungi kami menggunakan butiran di bawah.</p>
          </Section>

          <Section title="7. Keselamatan Data">
            <p>Kami melaksanakan langkah-langkah teknikal dan organisasi yang munasabah yang dirancang untuk melindungi maklumat anda daripada akses tanpa kebenaran, kehilangan atau penyalahgunaan. Walau bagaimanapun, tiada kaedah penghantaran melalui internet yang sepenuhnya selamat, dan kami tidak dapat menjamin keselamatan mutlak.</p>
          </Section>

          <Section title="8. Pemindahan Antarabangsa">
            <p>ETIA beroperasi di seluruh Asia. Maklumat anda mungkin diproses di negara selain daripada negara anda sendiri, di mana undang-undang perlindungan data mungkin berbeza. Kami mengambil langkah-langkah untuk memastikan maklumat anda menerima tahap perlindungan yang sesuai.</p>
          </Section>

          <Section title="9. Perubahan kepada Dasar Ini">
            <p>Kami mungkin mengemas kini Dasar Privasi ini dari semasa ke semasa. Tarikh "Dikemaskini" di atas menunjukkan bila ia terakhir disemak. Perubahan yang ketara akan disiarkan di halaman ini.</p>
          </Section>

          <Section title="10. Hubungi Kami">
            <p>Jika anda mempunyai pertanyaan tentang Dasar Privasi ini atau cara kami mengendalikan data anda, sila hubungi:</p>
            <p className="mt-2">
              <strong>ETIA-TECH (ASIA) Co., Limited</strong><br />
              Hong Kong<br />
              E-mel:{" "}
              <a href="mailto:sales@etia-tech.com" className="font-medium hover:underline" style={{ color: "#4CAF3E" }}>
                sales@etia-tech.com
              </a>
            </p>
          </Section>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/my" className="text-sm font-medium hover:underline" style={{ color: "#1A3DAD" }}>
              ← Kembali ke Laman Utama
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2" style={{ color: "#1A3DAD" }}>
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
