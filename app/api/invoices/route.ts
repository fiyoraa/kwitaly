import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { invoiceSchema } from '@/lib/validations/invoice'

export async function GET(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const statusParam = searchParams.get('status')
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let query = supabase
    .from('invoices')
    .select(`
      *,
      client:clients(id, name, email)
    `)
    .order('created_at', { ascending: false })

  if (statusParam) {
    query = query.eq('status', statusParam)
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const json = await request.json()
    const body = invoiceSchema.parse(json)

    const subtotal = body.items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0)
    const taxRate = body.tax_rate || 0
    const total = subtotal + (subtotal * taxRate / 100)

    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        user_id: user.id,
        client_id: body.client_id,
        invoice_number: body.invoice_number,
        status: body.status,
        issue_date: body.issue_date,
        due_date: body.due_date,
        subtotal,
        tax_rate: taxRate,
        total,
        notes: body.notes,
      })
      .select()
      .single()

    if (invoiceError) throw new Error(invoiceError.message)

    const itemsToInsert = body.items.map(item => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price
    }))

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsToInsert)

    if (itemsError) {
      // Manual rollback
      await supabase.from('invoices').delete().eq('id', invoice.id)
      throw new Error(itemsError.message)
    }

    return NextResponse.json(invoice, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 })
  }
}
