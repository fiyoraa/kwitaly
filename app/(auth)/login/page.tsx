'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormValues) {
    setError(null)
    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setError(error.message)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-[400px] w-full space-y-6 bg-surface p-8 sm:p-10 rounded-2xl shadow-subtle border border-border">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-bold text-2xl shadow-subtle mb-5">
            K
          </div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            Login ke Kwitaly
          </h2>
          <p className="mt-2 text-sm text-text-secondary font-medium text-center">
            Selamat datang kembali! Silakan masukkan detail Anda.
          </p>
        </div>
        
        {error && (
          <div className="bg-danger-bg p-4 rounded-xl border border-red-100 text-sm font-medium text-danger text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="block w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                placeholder="nama@email.com"
              />
              {errors.email && <p className="mt-1.5 text-xs font-medium text-danger">{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-text-secondary uppercase tracking-widest">Password</label>
              </div>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="block w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1.5 text-xs font-medium text-danger">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent shadow-subtle text-sm font-semibold rounded-xl text-accent-foreground bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Loading...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-text-secondary border-t border-border pt-6">
          Belum punya akun?{' '}
          <Link href="/register" className="font-semibold text-info hover:text-blue-700 transition">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}
