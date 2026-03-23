'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema, type ClientFormValues } from '@/lib/validations/client'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const clientId = params.id

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createClient()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
  })

  useEffect(() => {
    async function fetchClient() {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single()
        
      if (error) {
        setError(error.message)
      } else if (data) {
        reset({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          address: data.address || '',
        })
      }
      setLoading(false)
    }
    fetchClient()
  }, [clientId, reset, supabase])

  async function onSubmit(data: ClientFormValues) {
    setError(null)
    const { error } = await supabase
      .from('clients')
      .update({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      })
      .eq('id', clientId)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/clients')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Apakah Anda yakin ingin menghapus klien ini? Semua data terkait mungkin akan hilang atau terlepas.')) return
    
    setIsDeleting(true)
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId)

    if (error) {
      setError(error.message)
      setIsDeleting(false)
      return
    }

    router.push('/clients')
    router.refresh()
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading data klien...</div>
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/clients" className="text-gray-500 hover:text-gray-900 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Detail & Edit Klien</h1>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isDeleting ? 'Menghapus...' : 'Hapus Klien'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm border">
        {error && (
          <div className="mb-4 bg-red-50 p-3 rounded-md text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Klien *</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telepon (Opsional)</label>
            <input
              id="phone"
              type="text"
              {...register('phone')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat (Opsional)</label>
            <textarea
              id="address"
              rows={3}
              {...register('address')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Link 
              href="/clients"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
