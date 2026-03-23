export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue'

export interface Client {
  id: string
  user_id: string
  name: string
  email: string
  phone?: string
  address?: string
  created_at: string
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface Invoice {
  id: string
  user_id: string
  client_id: string
  invoice_number: string
  status: InvoiceStatus
  issue_date: string
  due_date: string
  subtotal: number
  tax_rate: number
  total: number
  notes?: string
  created_at: string
  updated_at: string
  client?: Client
  items?: InvoiceItem[]
}

export interface DashboardStats {
  total_revenue: number
  paid_count: number
  unpaid_count: number
  overdue_count: number
  monthly_revenue: { month: string; amount: number }[]
}
