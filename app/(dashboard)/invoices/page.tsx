import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatCurrency, formatDate, statusConfig } from '@/lib/utils'
import { Eye, Pencil, Trash2, Plus, FileQuestion } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

async function deleteInvoice(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const supabase = createClient()
  await supabase.from('invoices').delete().eq('id', id)
  revalidatePath('/invoices')
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = createClient()
  
  let query = supabase
    .from('invoices')
    .select(`
      *,
      client:clients(id, name)
    `)
    .order('created_at', { ascending: false })

  if (searchParams.status && searchParams.status !== 'all') {
    query = query.eq('status', searchParams.status)
  }

  const { data: invoices, error } = await query

  const filterTabs = [
    { label: 'Semua', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Terkirim', value: 'sent' },
    { label: 'Lunas', value: 'paid' },
    { label: 'Jatuh Tempo', value: 'overdue' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary tracking-tight">Invoices</h1>
          <p className="text-sm font-medium text-text-secondary mt-1">Kelola seluruh tagihan Anda kepada klien.</p>
        </div>
        <Link 
          href="/invoices/new" 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-accent-foreground text-sm font-medium rounded-full hover:bg-accent-hover transition-colors shadow-subtle"
        >
          <Plus className="w-4 h-4 mr-2" />
          Buat Invoice
        </Link>
      </header>

      {error && (
        <div className="bg-danger-bg text-danger p-4 rounded-xl border border-red-100 text-sm">
          Gagal mengambil data invoice: {error.message}
        </div>
      )}

      {/* Pill Tabs for Filtering */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {filterTabs.map(tab => {
          const isActive = searchParams.status === tab.value || (!searchParams.status && tab.value === 'all')
          return (
            <Link 
              key={tab.value}
              href={`/invoices?status=${tab.value}`}
              className={`px-4 py-1.5 text-sm font-medium rounded-full flex-shrink-0 transition-colors ${
                isActive 
                  ? 'bg-text-primary text-surface shadow-sm' 
                  : 'bg-surface-raised text-text-secondary hover:bg-border hover:text-text-primary'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      {(!invoices || invoices.length === 0) && !error ? (
        <div className="bg-surface border border-border flex flex-col items-center justify-center py-20 rounded-xl shadow-sm text-center">
          <div className="w-16 h-16 bg-surface-raised rounded-full flex items-center justify-center mb-4 text-text-tertiary">
            <FileQuestion className="w-8 h-8 opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-1">Tidak ada invoice</h3>
          <p className="text-sm text-text-secondary mb-6 max-w-sm">
            {searchParams.status && searchParams.status !== 'all' 
              ? `Anda tidak memiliki invoice dengan status "${searchParams.status}".` 
              : "Mulai kelola keuangan Anda dengan membuat invoice pertama kali."}
          </p>
          <Link 
            href="/invoices/new"
            className="text-sm font-medium text-info hover:text-blue-700 transition flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Buat Invoice Baru
          </Link>
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-raised/50">
                  <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">No. Invoice</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Klien</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices?.map((invoice: any) => {
                  const statusData = statusConfig[invoice.status as keyof typeof statusConfig] || statusConfig.draft
                  return (
                    <tr key={invoice.id} className="hover:bg-background transition-colors duration-150 group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                        {invoice.invoice_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                        {invoice.client?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        {formatDate(invoice.issue_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-text-primary text-right">
                        {formatCurrency(invoice.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2 py-1 text-[11px] uppercase font-bold tracking-widest rounded-md ${statusData.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusData.dot}`}></span>
                          {statusData.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-4 items-center sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/invoices/${invoice.id}`} className="text-text-tertiary hover:text-text-primary transition-colors" title="Lihat">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/invoices/${invoice.id}/edit`} className="text-text-tertiary hover:text-info transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <form action={deleteInvoice}>
                            <input type="hidden" name="id" value={invoice.id} />
                            <button type="submit" className="text-text-tertiary hover:text-danger transition-colors cursor-pointer" title="Hapus Invoice">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
