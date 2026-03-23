import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { formatCurrency, formatDate } from '@/lib/utils'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const supabase = createClient()
  
  // 1. Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const json = await request.json()
    const { invoice_id } = json

    if (!invoice_id) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 })
    }

    // 2. Fetch complete invoice data
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select(`
        *,
        client:clients(*),
        items:invoice_items(*)
      `)
      .eq('id', invoice_id)
      .eq('user_id', user.id) // Ensure ownership
      .single()

    if (invoiceError || !invoice) {
        return NextResponse.json({ error: 'Invoice not found or access denied' }, { status: 404 })
    }

    if (!invoice.client || !invoice.client.email) {
        return NextResponse.json({ error: 'Client email is missing' }, { status: 400 })
    }

    // 3. Create HTML Email Template
    const itemsHtml = invoice.items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.description}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${formatCurrency(item.unit_price)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${formatCurrency(item.total)}</td>
      </tr>
    `).join('')

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Halo ${invoice.client.name},</h2>
        <p>Terlampir adalah rincian tagihan dari <strong>Kwitaly</strong> untuk Invoice <strong>${invoice.invoice_number}</strong>.</p>
        
        <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td><strong>Tanggal Invoice:</strong> ${formatDate(invoice.issue_date)}</td>
            <td style="text-align: right;"><strong>Jatuh Tempo:</strong> ${formatDate(invoice.due_date)}</td>
          </tr>
        </table>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f8f8f8;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Deskripsi</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Harga</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        
        <div style="text-align: right; margin-bottom: 30px;">
          <p>Subtotal: ${formatCurrency(invoice.subtotal)}</p>
          <p>Pajak (${invoice.tax_rate}%): ${formatCurrency(invoice.total - invoice.subtotal)}</p>
          <h3 style="color: #1a1a2e; font-size: 20px;">Total Keseluruhan: ${formatCurrency(invoice.total)}</h3>
        </div>
        
        ${invoice.notes ? `<div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6c63ff; margin-bottom: 20px;"><p style="margin:0;"><strong>Catatan:</strong><br/>${invoice.notes}</p></div>` : ''}
        
        <p>Terima kasih atas kerja sama yang baik dengan kami!</p>
        <p style="color: #888; font-size: 12px; border-top: 1px solid #eee; padding-top: 10px; margin-top: 30px;">
           Email ini otomatis dikirim dari platform Kwitaly.
        </p>
      </div>
    `

    // 4. Send Email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Kwitaly <onboarding@resend.dev>',
      to: [invoice.client.email],
      subject: `Invoice ${invoice.invoice_number} dari Kwitaly`,
      html: htmlContent,
    })

    if (emailError) {
      throw new Error(`Failed to send email: ${emailError.message}`)
    }

    // 5. Update invoice status to "sent" 
    if (invoice.status === 'draft') {
        const { error: updateError } = await supabase
            .from('invoices')
            .update({ status: 'sent' })
            .eq('id', invoice_id)
            
        if (updateError) {
            console.error('Failed to update invoice status after sending email', updateError)
        }
    }

    return NextResponse.json({ success: true, data: emailData }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
