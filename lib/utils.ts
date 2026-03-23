import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '-'
  return format(new Date(date), 'd MMMM yyyy', { locale: id })
}

export function generateInvoiceNumber(): string {
  const date = new Date()
  const yearMonth = format(date, 'yyyyMM')
  const randomStr = Math.floor(1000 + Math.random() * 9000).toString()
  return `KWT-${yearMonth}-${randomStr}`
}

export const statusConfig = {
  draft: { label: 'Draft', color: 'bg-surface-raised text-text-secondary border border-border', dot: 'bg-text-tertiary' },
  sent: { label: 'Terkirim', color: 'bg-info-bg text-info border border-blue-100', dot: 'bg-info' },
  paid: { label: 'Lunas', color: 'bg-success-bg text-success border border-green-100', dot: 'bg-success' },
  overdue: { label: 'Jatuh Tempo', color: 'bg-danger-bg text-danger border border-red-100', dot: 'bg-danger' },
} as const
