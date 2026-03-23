'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Klien', href: '/clients', icon: Users },
//  { name: 'Settings', href: '/settings', icon: Settings }, // hide settings if not yet implemented
]

export default function Sidebar() {
  const pathname = usePathname()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-surface border-r border-border flex flex-col z-50">
      <div className="flex h-16 items-center px-6 mt-2">
        <Link href="/dashboard" className="flex items-center gap-3">
          {/* Logo "Kwitaly" dengan bentuk K tebal elegan */}
          <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg shadow-subtle">
            K
          </div>
          <span className="font-semibold text-lg tracking-tight text-text-primary">Kwitaly</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 content-start">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-150 ease-in-out ${
                isActive 
                  ? 'bg-surface-raised text-text-primary font-medium' 
                  : 'text-text-secondary hover:bg-background hover:text-text-primary'
              }`}
            >
              <item.icon className="w-4 h-4 opacity-80" />
              {item.name}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-border bg-surface">
        {user ? (
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-surface-raised border border-border flex flex-shrink-0 items-center justify-center text-sm font-medium text-text-secondary">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-text-primary truncate">
                {user.user_metadata?.name || 'Admin User'}
              </p>
              <p className="text-xs text-text-tertiary truncate">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="h-12 flex items-center mb-4 px-2">
            <div className="w-full h-8 bg-surface-raised animate-pulse rounded-md" />
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-sm text-sm text-text-secondary hover:bg-background hover:text-text-primary transition-all duration-150 ease-in-out"
        >
          <LogOut className="w-4 h-4 opacity-80" />
          Logout
        </button>
      </div>
    </aside>
  )
}
