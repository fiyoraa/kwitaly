import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency, formatDate, statusConfig } from '@/lib/utils'
import { ArrowLeft, Pencil, Trash2, Send, CheckCircle, Download } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import InvoicePreview from '@/components/invoice/InvoicePreview'
import ExportPDFButton from '@/components/invoice/ExportPDFButton'
import SendEmailButton from '@/components/invoice/SendEmailButton'

export const dynamic = 'force-dynamic'

async function updateStatus(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const status = formData.get('status') as string
  const supabase = createClient()
  await supabase.from('invoices').update({ status }).eq('id', id)
  revalidatePath(`/invoices/${id}`)
  revalidatePath('/invoices')
}

async function deleteInvoice(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const supabase = createClient()
  await supabase.from('invoices').delete().eq('id', id)
  revalidatePath('/invoices')
  redirect('/invoices')
}

export default async function InvoiceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  
  const { data: invoice, error } = await supabase
    .from('invoices')
    .select(`
      *,
      client:clients(*),
      items:invoice_items(*)
    `)
    .eq('id', params.id)
    .single()

  if (error || !invoice) {
    notFound()
  }

  const statusData = statusConfig[invoice.status as keyof typeof statusConfig] || statusConfig.draft

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Link 
            href="/invoices" 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors shadow-subtle"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Invoice {invoice.invoice_number}</h1>
            <span className={`inline-flex items-center px-2.5 py-1 text-xs uppercase font-bold tracking-widest rounded-md border ${statusData.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusData.dot}`}></span>
              {statusData.label}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {(invoice.status === 'draft' || invoice.status === 'sent') && (
            <SendEmailButton invoiceId={invoice.id} clientName={invoice.client?.name} />
          )}

          {invoice.status === 'draft' && (
            <form action={updateStatus}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="sent" />
              <button type="submit" className="inline-flex items-center px-4 py-2 bg-info-bg text-info border border-blue-100 text-sm font-semibold rounded-[8px] hover:bg-blue-100 transition-colors">
                <Send className="w-4 h-4 mr-2" />
                Tandai Terkirim
              </button>
            </form>
          )}
          
          {(invoice.status === 'sent' || invoice.status === 'overdue') && (
            <form action={updateStatus}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="paid" />
              <button type="submit" className="inline-flex items-center px-4 py-2 bg-success-bg text-success border border-green-100 text-sm font-semibold rounded-[8px] hover:bg-green-100 transition-colors">
                <CheckCircle className="w-4 h-4 mr-2" />
                Tandai Lunas
              </button>
            </form>
          )}

          <ExportPDFButton invoiceNumber={invoice.invoice_number} />

          <Link  
            href={`/invoices/${invoice.id}/edit`}
            className="inline-flex items-center px-4 py-2 bg-surface text-text-primary border border-border text-sm font-semibold rounded-[8px] hover:bg-surface-raised transition-colors shadow-subtle"
          >
            <Pencil className="w-4 h-4 mr-2 text-text-secondary" />
            Edit
          </Link>

          <form action={deleteInvoice}>
            <input type="hidden" name="id" value={invoice.id} />
            <button type="submit" className="inline-flex items-center px-4 py-2 bg-surface text-danger border border-border text-sm font-semibold rounded-[8px] hover:bg-danger-bg hover:border-red-200 transition-colors shadow-subtle">
              <Trash2 className="w-4 h-4 mr-2 opacity-80" />
              Hapus
            </button>
          </form>
        </div>
      </div>

      {/* Invoice Document Preview (Web View) w/ physical document impression */}
      <div className="bg-surface rounded-none sm:rounded-2xl shadow-cardHover border border-border overflow-hidden p-10 sm:p-14 md:p-16 max-w-4xl mx-auto my-8 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>
        
        <div className="flex justify-between items-start border-b border-border pb-10 mb-10">
          <div>
            <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-bold text-2xl shadow-subtle mb-4">
              K
            </div>
            <h2 className="text-3xl font-semibold text-text-primary tracking-tight mb-1">INVOICE</h2>
            <p className="font-mono text-text-secondary font-medium">{invoice.invoice_number}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">Ditagihkan Kepada</h3>
            <p className="font-semibold text-text-primary text-lg">{invoice.client?.name}</p>
            <p className="text-text-secondary mt-1">{invoice.client?.email}</p>
            {invoice.client?.phone && <p className="text-text-secondary">{invoice.client?.phone}</p>}
            {invoice.client?.address && <p className="text-text-secondary whitespace-pre-line mt-2 max-w-xs ml-auto">{invoice.client?.address}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-b border-border pb-10 mb-10 text-sm">
          <div>
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Tanggal Terbit</h3>
            <p className="font-medium text-text-primary text-base">{formatDate(invoice.issue_date)}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Jatuh Tempo</h3>
            <p className="font-medium text-text-primary text-base">{formatDate(invoice.due_date)}</p>
          </div>
        </div>

        <table className="w-full mb-10">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="px-2 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest w-1/2">Deskripsi Barang / Jasa</th>
              <th className="px-2 py-4 text-right text-xs font-bold text-text-secondary uppercase tracking-widest">Qty</th>
              <th className="px-2 py-4 text-right text-xs font-bold text-text-secondary uppercase tracking-widest">Harga Satuan</th>
              <th className="px-2 py-4 text-right text-xs font-bold text-text-secondary uppercase tracking-widest">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoice.items?.map((item: any) => (
              <tr key={item.id}>
                <td className="px-2 py-5 text-sm font-medium text-text-primary">{item.description}</td>
                <td className="px-2 py-5 font-mono text-sm text-text-primary text-right">{item.quantity}</td>
                <td className="px-2 py-5 font-mono text-sm text-text-primary text-right">{formatCurrency(item.unit_price)}</td>
                <td className="px-2 py-5 font-mono text-sm font-semibold text-text-primary text-right">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-start">
          <div className="w-1/2 pr-12">
            {invoice.notes && (
              <>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Catatan Tambahan</h3>
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line bg-surface-raised p-4 rounded-xl border border-border">
                  {invoice.notes}
                </p>
              </>
            )}
          </div>
          <div className="w-1/2 ml-auto space-y-4">
            <div className="flex justify-between text-sm text-text-secondary px-2">
              <span className="font-medium">Subtotal</span>
              <span className="font-mono">{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-text-secondary border-b border-border pb-4 px-2">
              <span className="font-medium">Pajak ({invoice.tax_rate}%)</span>
              <span className="font-mono">{formatCurrency(invoice.total - invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between items-end pt-2 px-2">
              <span className="text-base font-bold text-text-primary">Total Keseluruhan</span>
              <span className="text-2xl font-mono font-bold text-text-primary tracking-tight">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <InvoicePreview invoice={invoice} />
    </div>
  )
}
