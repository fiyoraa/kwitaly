import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { invoiceSchema } from '@/lib/validations/invoice'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      client:clients(*),
      items:invoice_items(*)
    `)
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const json = await request.json()
    
    // Partial update support for status API calls
    if (json.status && Object.keys(json).length === 1) {
      const { data, error } = await supabase
        .from('invoices')
        .update({ status: json.status })
        .eq('id', params.id)
        .select()
        .single()
        
      if (error) throw new Error(error.message)
      return NextResponse.json(data)
    }

    // Full update
    const body = invoiceSchema.parse(json)
    const subtotal = body.items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0)
    const taxRate = body.tax_rate || 0
    const total = subtotal + (subtotal * taxRate / 100)

    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .update({
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
      .eq('id', params.id)
      .select()
      .single()

    if (invoiceError) throw new Error(invoiceError.message)

    // Replace items: Delete old, insert new
    const { error: deleteError } = await supabase
      .from('invoice_items')
      .delete()
      .eq('invoice_id', params.id)
      
    if (deleteError) throw new Error(deleteError.message)

    const itemsToInsert = body.items.map(item => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price
    }))

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsToInsert)

    if (itemsError) throw new Error(itemsError.message)

    return NextResponse.json(invoice)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
