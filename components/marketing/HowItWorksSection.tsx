export default function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Tambah Klien",
      desc: "Simpan data klien sekali, gunakan berulang kali tanpa perlu mengetik ulang informasi kontak."
    },
    {
      num: "2",
      title: "Buat Invoice",
      desc: "Isi item pekerjaan, atur nominal harga, dan invoice Anda siap dalam hitungan detik."
    },
    {
      num: "3",
      title: "Kirim & Pantau",
      desc: "Kirim via email langsung dari Kwitaly dan pantau status pembayarannya melalui dashboard."
    }
  ];

  return (
    <section id="cara-kerja" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
            Semudah 3 Langkah
          </h2>
          <p className="text-lg text-text-secondary text-balance">
            Tidak ada kurva belajar yang curam. Anda bisa langsung menggunakannya dari hari pertama.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-[1px] bg-border/60 -z-10"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              {/* Giant background number */}
              <span className="text-8xl md:text-[140px] leading-none font-mono font-bold text-border/30 absolute -top-12 md:-top-20 z-0 select-none group-hover:text-border/50 transition-colors">
                {step.num}
              </span>
              
              {/* Dot indicator */}
              <div className="w-12 h-12 rounded-full border-4 border-background bg-accent text-accent-foreground flex items-center justify-center font-bold mb-8 z-10 shadow-sm relative">
                <span className="absolute flex items-center justify-center pt-0.5">{step.num}</span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative z-10">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed relative z-10 max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
