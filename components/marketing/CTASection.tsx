import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 bg-accent relative overflow-hidden">
      {/* Subtle background abstract elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-background mb-6 tracking-tight text-balance">
            Siap mengubah cara Anda menagih?
          </h2>
          <p className="text-lg md:text-xl text-border/80 mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
            Mulai gunakan Kwitaly hari ini dan nikmati pengalaman invoicing yang lebih terorganisir. Didesain khusus untuk menghemat waktu Anda.
          </p>
          <Link href="/register" className="inline-block px-8 py-4 rounded-lg bg-background text-text-primary font-bold text-lg hover:bg-surface-raised hover:scale-[1.02] transform transition-all active:scale-95 shadow-lg">
            Mulai Gratis Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}
