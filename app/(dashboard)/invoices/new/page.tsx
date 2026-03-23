'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { invoiceSchema, type InvoiceFormValues } from '@/lib/validations/invoice'
import { generateInvoiceNumber, formatCurrency } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Trash2, Plus } from 'lucide-react'

export default function NewInvoicePage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [clients, setClients] = useState<any[]>([])
  const supabase = createClient()
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoice_number: '',
      status: 'draft',
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tax_rate: 0,
      items: [{ description: '', quantity: 1, unit_price: 0 }]
    }
  })

  useEffect(() => {
    setValue('invoice_number', generateInvoiceNumber())
  }, [setValue])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const watchItems = watch('items')
  const watchTaxRate = watch('tax_rate') || 0

  const subtotal = watchItems?.reduce((acc, item) => acc + ((item.quantity || 0) * (item.unit_price || 0)), 0) || 0
  const tax = subtotal * (watchTaxRate / 100)
  const total = subtotal + tax

  useEffect(() => {
    async function loadClients() {
      const { data } = await supabase.from('clients').select('id, name').order('name')
      if (data) setClients(data)
    }
    loadClients()
  }, [supabase])

  async function onSubmit(data: InvoiceFormValues) {
    setError(null)
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Gagal membuat invoice')
      }

      router.push(`/invoices/${result.id}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link 
          href="/invoices" 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors shadow-subtle"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Buat Invoice</h1>
          <p className="text-sm font-medium text-text-secondary mt-0.5">Isi detail tagihan untuk klien Anda.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-danger-bg p-4 rounded-xl border border-red-100 text-sm text-danger font-medium shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Kolom Kiri - Form Utama (60%) */}
        <div className="w-full lg:w-3/5 space-y-8">
          <div className="bg-surface rounded-2xl border border-border p-8 shadow-sm">
            <h2 className="text-base font-semibold text-text-primary mb-6">Informasi Dasar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Klien</label>
                <select
                  {...register('client_id')}
                  className="block w-full px-4 py-2.5 bg-background border border-border rounded-[10px] text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none"
                >
                  <option value="">Pilih Klien</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.client_id && <p className="mt-1.5 text-xs font-medium text-danger">{errors.client_id.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Nomor Invoice</label>
                <input
                  type="text"
                  {...register('invoice_number')}
                  className="block w-full px-4 py-2.5 bg-background border border-border rounded-[10px] text-sm font-mono text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
                {errors.invoice_number && <p className="mt-1.5 text-xs font-medium text-danger">{errors.invoice_number.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Status</label>
                <select
                  {...register('status')}
                  className="block w-full px-4 py-2.5 bg-background border border-border rounded-[10px] text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none"
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Terkirim</option>
                  <option value="paid">Lunas</option>
                  <option value="overdue">Jatuh Tempo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Tanggal Terbit</label>
                <input
                  type="date"
                  {...register('issue_date')}
                  className="block w-full px-4 py-2.5 bg-background border border-border rounded-[10px] text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
                {errors.issue_date && <p className="mt-1.5 text-xs font-medium text-danger">{errors.issue_date.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Jatuh Tempo</label>
                <input
                  type="date"
                  {...register('due_date')}
                  className="block w-full px-4 py-2.5 bg-background border border-border rounded-[10px] text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
                {errors.due_date && <p className="mt-1.5 text-xs font-medium text-danger">{errors.due_date.message}</p>}
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-8 pb-4 flex justify-between items-center">
              <h2 className="text-base font-semibold text-text-primary">Line Items</h2>
            </div>
            
            <div className="px-8 pb-8">
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 mb-4 text-xs font-bold text-text-secondary uppercase tracking-widest">
                <div className="sm:col-span-6">Deskripsi Barang / Jasa</div>
                <div className="sm:col-span-2 text-right">Qty</div>
                <div className="sm:col-span-3 text-right">Harga</div>
                <div className="sm:col-span-1"></div>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => {
                  return (
                    <div key={field.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center group">
                      <div className="sm:col-span-6">
                        <input
                          {...register(`items.${index}.description` as const)}
                          placeholder="Deskripsi..."
                          className="block w-full px-4 py-2 border border-border rounded-[8px] text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                        />
                        {errors?.items?.[index]?.description && (
                          <p className="mt-1 text-[10px] font-medium text-danger">{errors.items[index]?.description?.message}</p>
                        )}
                      </div>
                      
                      <div className="sm:col-span-2">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                          className="block w-full px-4 py-2 border border-border rounded-[8px] text-sm font-mono text-text-primary text-right focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                        />
                      </div>
                      
                      <div className="sm:col-span-3">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`items.${index}.unit_price` as const, { valueAsNumber: true })}
                          className="block w-full px-4 py-2 border border-border rounded-[8px] text-sm font-mono text-text-primary text-right focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                        />
                      </div>

                      <div className="sm:col-span-1 flex items-center justify-end sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-text-tertiary hover:text-danger hover:bg-danger-bg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {errors.items?.root && <p className="mt-3 text-sm font-medium text-danger">{errors.items.root.message}</p>}

              <button
                type="button"
                onClick={() => append({ description: '', quantity: 1, unit_price: 0 })}
                className="mt-6 inline-flex items-center text-sm font-semibold text-text-primary hover:text-text-secondary transition-colors"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Tambah Baris
              </button>
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-8 shadow-sm">
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">Catatan Tambahan</label>
            <textarea
              rows={3}
              {...register('notes')}
              className="block w-full px-4 py-3 bg-background border border-border rounded-[10px] text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
              placeholder="Terima kasih atas kerja samanya..."
            />
          </div>
        </div>

        {/* Kolom Kanan - Summary (40%) */}
        <div className="w-full lg:w-2/5 md:sticky top-8 space-y-6">
          <div className="bg-surface rounded-2xl border border-border p-8 shadow-sm">
            <h2 className="text-base font-semibold text-text-primary mb-6">Ringkasan</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-text-secondary">Subtotal</span>
                <span className="font-mono font-medium text-text-primary">{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm pb-4 border-b border-border">
                <div className="flex items-center">
                  <span className="font-medium text-text-secondary mr-3">Pajak (%)</span>
                  <input
                    type="number"
                    step="0.1"
                    className="w-16 px-2 py-1 bg-background border border-border rounded-md text-sm font-mono text-center focus:outline-none focus:border-accent transition-colors"
                    {...register('tax_rate', { valueAsNumber: true })}
                  />
                </div>
                <span className="font-mono font-medium text-text-primary">{formatCurrency(tax)}</span>
              </div>
              
              <div className="flex justify-between items-end pt-2">
                <span className="text-base font-semibold text-text-primary">Total Akhir</span>
                <span className="text-2xl font-mono font-bold text-text-primary tracking-tight">
                  {formatCurrency(total)}
                </span>
              </div>
              {errors.tax_rate && <p className="text-xs font-medium text-danger text-right">{errors.tax_rate.message}</p>}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center px-6 py-3.5 bg-accent text-accent-foreground rounded-[10px] text-sm font-semibold hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all disabled:opacity-50 shadow-subtle"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Invoice'}
              </button>
              <p className="text-center text-xs text-text-tertiary mt-4 font-medium">
                Pastikan seluruh data invoice sudah benar.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
