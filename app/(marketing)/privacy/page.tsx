import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Kwitaly",
  description: "Bagaimana Kwitaly menangani dan melindungi data Anda.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-[680px] mx-auto">
          <header className="mb-10 pb-10 border-b border-border/50">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 tracking-tight">
              Kebijakan Privasi
            </h1>
            <p className="text-text-tertiary">Terakhir diperbarui: 23 Maret 2026</p>
          </header>
          
          <div className="space-y-10 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">1. Data yang Kami Kumpulkan</h2>
              <p className="mb-4">
                Sebagai aplikasi manajemen invoice, kami merancang Kwitaly untuk hanya mengumpulkan hal-hal yang benar-benar esensial untuk mendukung operasional Anda. Data yang kami kumpulkan meliputi:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                <li><strong>Data Akun:</strong> Alamat email dan nama lengkap yang Anda gunakan saat mendaftar.</li>
                <li><strong>Data Bisnis:</strong> Informasi klien, nama perusahaan, deskripsi pekerjaan, harga, dan nominal yang Anda ketikkan setiap membuat invoice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">2. Bagaimana Data Anda Digunakan</h2>
              <p className="mb-4">
                Data Anda sepenuhnya digunakan untuk satu tujuan utama: <strong>menjalankan fungsionalitas aplikasi Kwitaly</strong> (membuat, menyimpan, dan mengirim invoice). 
              </p>
              <p>
                Kwitaly sama sekali tidak memonetisasi data pengguna. Kami tidak akan pernah menjual, menyewakan, maupun membagikan data klien atau omzet Anda kepada pihak ketiga untuk kepentingan iklan atau pemasaran. Kwitaly tidak memiliki gerbang pembayaran (payment gateway) sendiri, sehingga kami tidak menyentuh maupun memproses transaksi riil Anda.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">3. Penyimpanan dan Keamanan Data</h2>
              <p>
                Data Anda disimpan secara aman menggunakan layanan pihak ketiga, <strong>Supabase</strong> (basis data PostgreSQL), yang memiliki standar keamanan industri yang tinggi. Meskipun kami berusaha semaksimal mungkin mengamankan akses ke database kami, Anda juga wajib menjaga kerahasiaan kata sandi Anda sendiri.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">4. Hak Pengguna</h2>
              <p className="mb-4">
                Anda memiliki kendali penuh atas data Anda. Anda dapat menambah, mengubah, atau menghapus data klien maupun invoice langsung dari dalam dashboard aplikasi kapan saja.
              </p>
              <p>
                Jika Anda ingin menghapus akun Anda secara permanen beserta seluruh isinya dari sistem kami, Anda dapat mengajukan permintaan penghapusan akun melalui kontak yang tersedia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">5. Cookie dan Pelacakan</h2>
              <p>
                Tidak ada pelacak yang agresif. Kami hanya menggunakan <em>cookie</em> dan sesi (session) dalam batas yang sangat minimal, murni untuk keperluan autentikasi (memastikan Anda tetap login) dan mencegah permintaan berbahaya berulang pada sistem (keamanan).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">6. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki keresahan, pertanyaan, atau ingin mengajukan penghapusan akun sepenuhnya, Anda bisa menghubungi kami melalui email di <strong>hello@kwitaly.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
