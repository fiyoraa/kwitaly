const features = [
  {
    title: "Buat Invoice Profesional",
    description: "Template bersih dan terstruktur yang membuat bisnis Anda terlihat jauh lebih kredibel di mata klien.",
    icon: (
      <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Kirim via Email Langsung",
    description: "Kirim invoice langsung ke kotak masuk klien Anda dari dalam dashboard tanpa perlu berpindah aplikasi.",
    icon: (
      <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Lacak Status Pembayaran",
    description: "Visibilitas penuh. Ketahui seketika invoice mana yang berstatus lunas, belum dibayar, atau melewati jatuh tempo.",
    icon: (
      <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Export PDF Instan",
    description: "Arsipkan rekam jejak bisnis Anda. Unduh invoice dalam format dokumen fisik (PDF) kapan saja.",
    icon: (
      <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    title: "Kelola Multi Klien",
    description: "Simpan entitas bisnis klien dalam direktori khusus untuk mempercepat pengisian otomatis saat membuat invoice baru.",
    icon: (
      <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Dashboard Laporan",
    description: "Pantau arus kas dan kesehatan pendapatan bisnis Anda dari waktu ke waktu melalui ringkasan dasbor yang mutlak.",
    icon: (
      <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-24 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-medium text-text-primary mb-6 tracking-tight text-balance">
            Desain minimal untuk efisiensi maksimal.
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed text-balance">
            Semua elemen inti yang Anda perlukan untuk menagih klien, 
            tanpa belantara fitur komersial yang membingungkan.
          </p>
        </div>

        <div className="flex flex-col border-t border-border/60">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col md:flex-row py-12 md:py-16 border-b border-border/60 gap-6 md:gap-16 hover:bg-surface-raised/30 transition-colors duration-500"
            >
              {/* Left Side: Icon & Title */}
              <div className="md:w-1/3 flex flex-col gap-6 pl-4 md:pl-8 border-l-2 border-transparent group-hover:border-accent transition-colors duration-500">
                <div className="text-text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-text-primary">
                  {feature.title}
                </h3>
              </div>
              
              {/* Right Side: Description */}
              <div className="md:w-2/3 flex items-center pr-4 md:pr-8">
                <p className="text-xl md:text-[22px] text-text-secondary leading-normal max-w-2xl">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
