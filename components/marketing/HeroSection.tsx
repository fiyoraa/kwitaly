import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary max-w-4xl mb-6 text-balance">
          Invoice Profesional,<br className="hidden md:block" /> Dibayar Lebih Cepat
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed text-balance">
          Buat, kirim, dan pantau invoice dalam hitungan menit. Fokus pada pekerjaan Anda, biarkan Kwitaly mengurus penagihannya.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link href="/register" className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent-hover transition-colors w-full sm:w-auto">
            Mulai Gratis
          </Link>
          <Link href="#demo" className="px-6 py-3 rounded-lg border border-border text-text-primary font-medium hover:bg-surface-raised transition-colors w-full sm:w-auto">
            Lihat Demo
          </Link>
        </div>
        <p className="text-sm font-medium text-text-tertiary mb-16 tracking-wide uppercase">
          Dipercaya freelancer & agensi Indonesia
        </p>

        {/* Abstract Dashboard Mockup */}
        <div className="w-full max-w-5xl mx-auto rounded-xl border border-border/50 bg-white overflow-hidden flex flex-col">
          {/* Mac Header */}
          <div className="h-10 bg-[#FAFAFA] border-b border-border/50 flex items-center px-4 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-border-strong/70"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-border-strong/70"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-border-strong/70"></div>
          </div>
          {/* App Body */}
          <div className="flex h-[400px]">
            {/* Sidebar */}
            <div className="w-48 border-r border-border/50 p-4 hidden md:flex flex-col gap-5 bg-[#FAFAF9] select-none">
              <div className="flex items-center gap-2 mb-2 px-2">
                <div className="w-6 h-6 rounded bg-accent text-accent-foreground flex items-center justify-center font-bold text-[11px] shadow-subtle">K</div>
                <span className="font-semibold text-sm text-text-primary">Kwitaly</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-surface-raised text-text-primary font-medium">
                  <div className="w-2 h-2 rounded-full bg-border-strong"></div>
                  <span className="text-xs">Invoices</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded text-text-secondary hover:text-text-primary transition-colors">
                  <div className="w-2 h-2 rounded-full border border-border-strong"></div>
                  <span className="text-xs font-medium">Dashboard</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded text-text-secondary hover:text-text-primary transition-colors">
                  <div className="w-2 h-2 rounded-full border border-border-strong"></div>
                  <span className="text-xs font-medium">Klien</span>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-5 md:p-6 flex flex-col gap-5 bg-white select-none">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-text-primary">Invoices</h2>
                <div className="h-7 bg-accent text-accent-foreground text-[11px] flex items-center px-3 rounded-md font-medium shadow-sm">
                  + Invoice Baru
                </div>
              </div>
              <div className="border border-border/50 rounded-lg bg-[#FAFAF9] flex-1 p-4 shadow-sm flex flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 border-b border-border/50 pb-2 mb-3 text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                  <div className="col-span-2">No.</div>
                  <div className="col-span-4">Klien</div>
                  <div className="col-span-2">Tanggal</div>
                  <div className="col-span-2">Nominal</div>
                  <div className="col-span-2 text-right pr-1">Status</div>
                </div>
                
                {/* Table Rows */}
                <div className="space-y-2">
                  {/* Row 1 - Sent / Info */}
                  <div className="grid grid-cols-12 gap-2 items-center bg-white border border-border/50 rounded p-2 text-[11px]">
                    <div className="col-span-2 font-mono text-text-tertiary">INV-012</div>
                    <div className="col-span-4 font-medium text-text-primary truncate">Aksara Digital</div>
                    <div className="col-span-2 text-text-secondary">23 Mar 2026</div>
                    <div className="col-span-2 font-medium text-text-primary">Rp 4.500.000</div>
                    <div className="col-span-2 text-right flex justify-end">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-info-bg text-info border border-info/20">Dikirim</span>
                    </div>
                  </div>
                  
                  {/* Row 2 - Paid / Success */}
                  <div className="grid grid-cols-12 gap-2 items-center bg-white border border-border/50 rounded p-2 text-[11px]">
                    <div className="col-span-2 font-mono text-text-tertiary">INV-011</div>
                    <div className="col-span-4 font-medium text-text-primary truncate">PT Maju Bersama</div>
                    <div className="col-span-2 text-text-secondary">18 Mar 2026</div>
                    <div className="col-span-2 font-medium text-text-primary">Rp 12.000.000</div>
                    <div className="col-span-2 text-right flex justify-end">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-success-bg text-success border border-success/20">Lunas</span>
                    </div>
                  </div>

                  {/* Row 3 - Overdue / Danger */}
                  <div className="grid grid-cols-12 gap-2 items-center bg-white border border-border/50 rounded p-2 text-[11px]">
                    <div className="col-span-2 font-mono text-text-tertiary">INV-010</div>
                    <div className="col-span-4 font-medium text-text-primary truncate">Studio Kreatif Bara</div>
                    <div className="col-span-2 text-text-secondary">05 Mar 2026</div>
                    <div className="col-span-2 font-medium text-text-primary">Rp 3.250.000</div>
                    <div className="col-span-2 text-right flex justify-end">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-danger-bg text-danger border border-danger/20">Terlambat</span>
                    </div>
                  </div>

                  {/* Row 4 - Draft / Warning */}
                  <div className="grid grid-cols-12 gap-2 items-center bg-white border border-border/50 rounded p-2 text-[11px]">
                    <div className="col-span-2 font-mono text-text-tertiary">INV-013</div>
                    <div className="col-span-4 font-medium text-text-primary truncate">Nusantara Coffee</div>
                    <div className="col-span-2 text-text-secondary">24 Mar 2026</div>
                    <div className="col-span-2 font-medium text-text-primary">Rp 850.000</div>
                    <div className="col-span-2 text-right flex justify-end">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-warning-bg text-warning border border-warning/20">Draft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
