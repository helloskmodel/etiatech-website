import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "../dictionaries";

export const metadata: Metadata = {
  title: "Terma Penggunaan | ETIA Technology",
  description: "Terma penggunaan ETIA Technology — syarat dan ketentuan menggunakan laman web kami.",
  robots: {
    index: process.env.SITE_MY_PUBLISHED === "true",
    follow: process.env.SITE_MY_PUBLISHED === "true",
  },
};

export default function TermsPage() {
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
            Terma Penggunaan
          </h1>
          <p className="text-sm text-gray-300">
            Dikemaskini: 10 Jul 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <div>
            <p>
              Terma penggunaan ini ("Terma") mengawal akses dan penggunaan laman web ini yang dikendalikan oleh ETIA-TECH (ASIA) Co., Limited ("ETIA", "kami", atau "milik kami"), sebuah syarikat yang didaftarkan di Hong Kong. Dengan mengakses atau menggunakan laman web ini, anda bersetuju untuk terikat dengan Terma ini. Jika anda tidak bersetuju, sila jangan gunakan laman web.
            </p>
          </div>

          <Section title="1. Penggunaan Laman Web">
            <p>Anda boleh menggunakan laman web ini hanya untuk tujuan perniagaan dan maklumat yang sah. Anda bersetuju tidak menyalahgunakan laman web, mengganggu operasinya, mencuba akses tanpa kebenaran, atau menggunakannya dalam apa-apa cara yang mungkin merosakkan laman web atau melanggar hak orang lain.</p>
          </Section>

          <Section title="2. Harta Intelek">
            <p>Semua kandungan di laman web ini — termasuk teks, grafik, logo, gambar dan susun atur — adalah harta milik ETIA atau pelesenya dan dilindungi oleh undang-undang harta intelek yang berkaitan. Nama produk dan jenama dagangan seperti OmniCure®, Phoseon® dan lain-lain adalah harta milik pemilik masing-masing dan digunakan hanya untuk pengenalan dan rujukan. Anda tidak boleh mengeluarkan semula, mengedarkan atau membuat kerja terbitan daripada sebarang kandungan tanpa kebenaran bertulis terlebih dahulu.</p>
          </Section>

          <Section title="3. Maklumat Produk & Ketersediaan">
            <p>Penerangan produk, spesifikasi, gambar dan data teknikal disediakan untuk maklumat umum dan mungkin dikemaskini atau diubah tanpa notis. Mereka tidak membentuk tawaran yang mengikat. Spesifikasi sebenar, ketersediaan dan harga harus disahkan dengan ETIA sebelum membeli.</p>
          </Section>

          <Section title="4. Pengedar Diberi Kuasa & Waranti">
            <p>ETIA mungkin bertindak sebagai pengedar yang diberi kuasa, penjual semula, penyedia perkhidmatan atau rakan sumber produk untuk produk dan wilayah terpilih yang ditunjukkan di laman web ini. Status kebenaran, saluran bekalan, skop waranti dan servis mungkin berbeza mengikut jenama, model produk dan negara. Sila sahkan syarat-syarat yang berkaitan dengan ETIA sebelum membeli. Waranti produk, jika ada, disediakan oleh pengilang masing-masing mengikut syarat-syarat mereka sendiri. Tiada apa-apa di laman web ini yang merupakan waranti oleh ETIA di luar apa yang telah disepakati secara nyata dalam kontrak penjualan bertulis.</p>
          </Section>

          <Section title='5. Maklumat Disediakan "Seadanya"'>
            <p>Maklumat di laman web ini disediakan "seadanya" untuk rujukan umum dan tidak membentuk nasihat kejuruteraan, undang-undang atau profesional. Anda bertanggungjawab untuk menilai kesesuaian sebarang produk untuk aplikasi spesifik anda. Dalam sejauh mana yang dibenarkan oleh undang-undang, ETIA menolak semua waranti tersirat, termasuk yang berkaitan dengan kebolehdagangan dan kesesuaian untuk tujuan tertentu.</p>
          </Section>

          <Section title="6. Pautan Pihak Ketiga">
            <p>Laman web ini mungkin mengandungi pautan ke laman web pihak ketiga. ETIA tidak mengawal dan tidak bertanggungjawab atas kandungan, dasar atau amalan laman web tersebut. Mengakses mereka adalah atas risiko anda sendiri.</p>
          </Section>

          <Section title="7. Had Liabiliti">
            <p>Dalam sejauh mana yang dibenarkan oleh undang-undang, ETIA tidak akan bertanggungjawab untuk sebarang kerosakan tidak langsung, sampingan, khas atau akibat yang timbul daripada akses, penggunaan atau ketidakupayaan anda untuk menggunakan laman web ini atau sebarang maklumat padanya.</p>
          </Section>

          <Section title="8. Undang-undang yang Mengawal">
            <p>Terma-terma ini ditadbir oleh undang-undang Rantau Pentadbiran Khas Hong Kong, tanpa mengambil kira peruntukan bercanggah undang-undangnya. Sebarang pertikaian yang timbul daripada atau berkaitan dengan Terma-terma ini atau laman web hendaklah tertakluk kepada bidang kuasa eksklusif mahkamah Hong Kong.</p>
          </Section>

          <Section title="9. Perubahan kepada Terma-terma Ini">
            <p>Kami mungkin menyemak Terma-terma ini dari semasa ke semasa. Tarikh "Dikemaskini" di atas menunjukkan semakan terbaru. Penggunaan lanjutan laman web anda selepas perubahan berkuat kuasa merupakan penerimaan Terma-terma yang disemak.</p>
          </Section>

          <Section title="10. Hubungi Kami">
            <p>Jika anda mempunyai sebarang pertanyaan tentang Terma-terma ini, sila hubungi:</p>
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
