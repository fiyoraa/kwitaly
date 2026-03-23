'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsLoading(false);
    };
    checkSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Kwitaly Logo" className="h-7 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
            <Link href="/#fitur" className="hover:text-text-primary transition-colors">Fitur</Link>
            <Link href="/#cara-kerja" className="hover:text-text-primary transition-colors">Cara Kerja</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {!isLoading && (
            isLoggedIn ? (
              <Link href="/dashboard" className="text-sm font-medium px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent-hover transition-colors">
                Buka Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-text-primary hover:text-text-secondary transition-colors hidden sm:block">
                  Masuk
                </Link>
                <Link href="/register" className="text-sm font-medium px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent-hover transition-colors">
                  Mulai Gratis
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}
