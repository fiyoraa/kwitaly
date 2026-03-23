import * as z from 'zod'

export const invoiceItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  quantity: z.number().min(0.01, 'Kuantitas minimal 0.01'),
  unit_price: z.number().min(0, 'Harga satuan tidak boleh negatif'),
})

export const invoiceSchema = z.object({
  client_id: z.string().uuid('Pilih klien'),
  invoice_number: z.string().min(1, 'Nomor invoice wajib diisi'),
  status: z.enum(['draft', 'sent', 'paid', 'overdue']),
  issue_date: z.string().min(1, 'Tanggal invoice wajib diisi'),
  due_date: z.string().min(1, 'Tanggal jatuh tempo wajib diisi'),
  tax_rate: z.number().min(0).max(100),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, 'Minimal 1 item invoice diperlukan'),
})

export type InvoiceFormValues = z.infer<typeof invoiceSchema>
export type InvoiceItemFormValues = z.infer<typeof invoiceItemSchema>
