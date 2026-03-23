import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan — Kwitaly",
  description: "Syarat dan ketentuan penggunaan layanan Kwitaly.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-[680px] mx-auto">
          <header className="mb-10 pb-10 border-b border-border/50">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 tracking-tight">
              Syarat dan Ketentuan
            </h1>
            <p className="text-text-tertiary">Terakhir diperbarui: 23 Maret 2026</p>
          </header>
          
          <div className="space-y-10 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">1. Penggunaan Layanan</h2>
              <p className="mb-4">
                Kwitaly adalah aplikasi manajemen invoice yang dibangun sebagai proyek portofolio pengembangan perangkat lunak. Layanan ini disediakan secara gratis dan murni sebagai alat bantu administrasi bagi freelancer dan bisnis kecil.
              </p>
              <p>
                Dengan mendaftar dan menggunakan Kwitaly, Anda setuju untuk menggunakan aplikasi ini secara wajar, rasional, dan tidak menggunakannya untuk aktivitas penipuan, pencucian uang, atau hal-hal lain yang melanggar hukum negara Republik Indonesia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">2. Akun dan Keamanan</h2>
              <p className="mb-4">
                Sebagai pengguna, Anda bertanggung jawab penuh atas keamanan kredensial akun Anda. Segala aktivitas yang terjadi di bawah akun Anda sepenuhnya menjadi tanggung jawab Anda.
              </p>
              <p>
                Kami berhak menangguhkan atau menghapus akun yang terindikasi melakukan penyalahgunaan sistem atau mencoba merusak integritas aplikasi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">3. Data dan Privasi</h2>
              <p>
                Kami menghargai privasi Anda dan hanya memproses data yang relevan untuk operasional invoice Anda. Detail lebih lanjut mengenai bagaimana kami menangani, memproses, dan melindungi data pribadi Anda dapat dibaca secara terpisah pada halaman Kebijakan Privasi kami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">4. Batasan Tanggung Jawab</h2>
              <p className="mb-4">
                Karena sifatnya sebagai proyek portofolio gratis, Kwitaly disediakan "apa adanya" (as is) tanpa jaminan Service Level Agreement (SLA) khusus. 
              </p>
              <p>
                Kami tidak bertanggung jawab atas kerugian finansial, kehilangan data invoice, gagalnya transaksi bisnis, atau kerugian tidak langsung lainnya yang mungkin timbul akibat penggunaan atau ketidakmampuan menggunakan layanan kami. Anda sangat disarankan untuk selalu menyimpan cadangan mandiri (PDF) dari invoice penting Anda.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">5. Perubahan dan Penghentian Layanan</h2>
              <p>
                Kami berhak untuk memodifikasi fitur, memperbarui syarat dan ketentuan, atau bahkan menghentikan layanan ini di masa mendatang. Kami akan berusaha sebaik mungkin memberikan pemberitahuan sebelumnya apabila layanan akan dihentikan, agar Anda dapat mengamankan data Anda.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">6. Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini atau ingin menyampaikan saran terkait Kwitaly, silakan hubungi kami melalui surel di <strong>hello@kwitaly.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
