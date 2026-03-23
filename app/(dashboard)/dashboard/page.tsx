import { createClient } from '@/lib/supabase/server'
import { formatCurrency, statusConfig } from '@/lib/utils'
import { Wallet, Clock, CheckCircle, FileText, ArrowRight } from 'lucide-react'
import StatsCard from '@/components/dashboard/StatsCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import Link from 'next/link'
import { format, subMonths, parseISO, isAfter, startOfMonth } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

function getGreeting() {
  const currentHour = new Date().getHours()
  if (currentHour < 12) return 'Good morning'
  if (currentHour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: userData } = await supabase.auth.getUser()
  const userName = userData?.user?.user_metadata?.name || 'User'
  const firstName = userName.split(' ')[0]

  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('id, status, total, issue_date, due_date, invoice_number, client:clients(id, name)')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-danger text-sm">Gagal memuat dashboard: {error.message}</div>
  }

  const allInvoices = invoices || []

  // Hitung metrik
  let totalRevenue = 0
  let paidCount = 0
  let unpaidCount = 0
  let overdueCount = 0

  allInvoices.forEach(inv => {
    if (inv.status === 'paid') {
      totalRevenue += Number(inv.total)
      paidCount++
    } else if (inv.status === 'draft' || inv.status === 'sent') {
      unpaidCount++
    } else if (inv.status === 'overdue') {
      overdueCount++
    }
  })

  // Hitung monthly revenue (6 bulan terakhir)
  const sixMonthsAgo = subMonths(new Date(), 6)
  
  const monthlyDataMap: Record<string, number> = {}
  for (let i = 5; i >= 0; i--) {
    const d = subMonths(new Date(), i)
    const key = format(d, 'yyyy-MM')
    monthlyDataMap[key] = 0
  }

  allInvoices.forEach(inv => {
    if (inv.status === 'paid' && inv.issue_date) {
      const invDate = parseISO(inv.issue_date)
      if (isAfter(invDate, startOfMonth(subMonths(new Date(), 5)))) {
        const key = format(invDate, 'yyyy-MM')
        if (monthlyDataMap[key] !== undefined) {
          monthlyDataMap[key] += Number(inv.total)
        }
      }
    }
  })

  const monthlyRevenue = Object.entries(monthlyDataMap).map(([key, amount]) => {
    const [year, month] = key.split('-')
    const monthName = format(new Date(Number(year), Number(month) - 1, 1), 'MMM', { locale: localeId })
    return {
      month: monthName,
      amount
    }
  })

  const recentInvoices = allInvoices.slice(0, 5)

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary tracking-tight">
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-text-secondary mt-1 text-sm font-medium">
            Berikut ringkasan performa invoice Anda hari ini.
          </p>
        </div>
        <Link 
          href="/invoices/new" 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-accent-foreground text-sm font-medium rounded-full hover:bg-accent-hover transition-colors shadow-subtle"
        >
          Buat Invoice
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Pendapatan" 
          value={formatCurrency(totalRevenue)} 
          icon={<Wallet className="w-5 h-5" />}
        />
        <StatsCard 
          title="Invoice Lunas" 
          value={paidCount.toString()} 
          subtitle="Telah dibayar"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatsCard 
          title="Belum Dibayar" 
          value={unpaidCount.toString()} 
          subtitle="Draft & Terkirim"
          icon={<FileText className="w-5 h-5" />}
        />
        <StatsCard 
          title="Jatuh Tempo" 
          value={overdueCount.toString()} 
          subtitle="Melewati batas waktu"
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border p-7 shadow-sm">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-xs font-bold text-text-secondary uppercase tracking-widest">Pendapatan 6 Bulan Terakhir</h2>
          </div>
          <RevenueChart data={monthlyRevenue} />
        </div>

        <div className="bg-surface rounded-xl border border-border flex flex-col shadow-sm">
          <div className="p-6 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h2 className="text-xs font-bold text-text-secondary uppercase tracking-widest">Invoice Terbaru</h2>
            <Link href="/invoices" className="text-xs font-semibold text-text-primary hover:text-text-secondary flex items-center transition-colors">
              Lihat Semua <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {recentInvoices.length === 0 ? (
              <div className="text-center py-12 text-text-secondary text-sm">
                Belum ada invoice yang dibuat.
              </div>
            ) : (
              <div className="space-y-1">
                {recentInvoices.map((inv: any) => {
                  const statusData = statusConfig[inv.status as keyof typeof statusConfig] || statusConfig.draft
                  return (
                    <Link 
                      key={inv.id} 
                      href={`/invoices/${inv.id}`}
                      className="group flex flex-col p-3 rounded-lg hover:bg-background transition-colors duration-150 border border-transparent hover:border-border"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="font-mono text-xs font-medium text-text-secondary">{inv.invoice_number}</p>
                        <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-sm ${statusData.color}`}>
                          {statusData.label}
                        </span>
                      </div>
                      <div className="flex justify-between items-end mt-1">
                        <p className="text-sm font-semibold text-text-primary truncate pr-4">{inv.client?.name || '-'}</p>
                        <p className="font-mono text-sm font-bold text-text-primary">{formatCurrency(inv.total)}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
