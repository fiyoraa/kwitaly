import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/40 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <img src="/logo.svg" alt="Kwitaly Logo" className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity grayscale" />
          </Link>
          
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-text-secondary">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
            <a href="https://github.com/fiyoraa/kwitaly/issues" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Laporkan Bug</a>
          </div>
        </div>
        
        {/* Copyright & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-6 border-t border-border/20 text-sm text-text-tertiary">
          <div>
            &copy; 2025 Kwitaly
          </div>
          <div>
            Built by <a href="https://github.com/fiyoraa" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors font-medium">Fiyoraa</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
