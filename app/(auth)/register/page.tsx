'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterFormValues) {
    setError(null)
    setSuccess(false)
    const supabase = createClient()
    
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        }
      }
    })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    setSuccess(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-[400px] w-full space-y-6 bg-surface p-8 sm:p-10 rounded-2xl shadow-subtle border border-border">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-bold text-2xl shadow-subtle mb-5">
            K
          </div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            Daftar Kwitaly
          </h2>
          <p className="mt-2 text-sm text-text-secondary font-medium text-center">
            Buat akun untuk mulai mengelola invoice Anda secara profesional.
          </p>
        </div>

        {success ? (
          <div className="rounded-xl bg-success-bg p-5 border border-green-100 text-center">
            <h3 className="text-sm font-bold text-success mb-1">
              Registrasi Berhasil!
            </h3>
            <p className="text-sm text-green-700 font-medium pb-2">
              Silakan periksa email Anda untuk verifikasi.
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Nama Lengkap</label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="block w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="Nama Lengkap"
                />
                {errors.name && <p className="mt-1.5 text-xs font-medium text-danger">{errors.name.message}</p>}
              </div>
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
                <label htmlFor="password" className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="block w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="Minimal 6 karakter"
                />
                {errors.password && <p className="mt-1.5 text-xs font-medium text-danger">{errors.password.message}</p>}
              </div>
            </div>

            {error && (
              <div className="bg-danger-bg p-4 rounded-xl border border-red-100 text-sm font-medium text-danger text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent shadow-subtle text-sm font-semibold rounded-xl text-accent-foreground bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all disabled:opacity-50 mt-2"
              >
                {isSubmitting ? 'Loading...' : 'Register'}
              </button>
            </div>
          </form>
        )}
        
        {!success && (
          <p className="mt-8 text-center text-sm font-medium text-text-secondary border-t border-border pt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold text-info hover:text-blue-700 transition">
              Login di sini
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
