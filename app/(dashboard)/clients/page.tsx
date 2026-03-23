import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Pencil, Plus, Trash2, Phone, BriefcaseBusiness } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

async function deleteClient(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const supabase = createClient()
  await supabase.from('clients').delete().eq('id', id)
  revalidatePath('/clients')
}

function getColorFromName(name: string) {
  const colors = [
    'bg-[var(--info-bg)] text-[var(--info)] border border-blue-100',
    'bg-[var(--success-bg)] text-[var(--success)] border border-green-100',
    'bg-[var(--warning-bg)] text-[var(--warning)] border border-yellow-100',
    'bg-purple-50 text-purple-600 border border-purple-100',
    'bg-pink-50 text-pink-600 border border-pink-100',
    'bg-indigo-50 text-indigo-600 border border-indigo-100',
    'bg-orange-50 text-orange-600 border border-orange-100',
    'bg-[var(--surface-raised)] text-[var(--text-secondary)] border border-[var(--border)]',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default async function ClientsPage() {
  const supabase = createClient()
  
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*, invoices(count)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary tracking-tight">Klien</h1>
          <p className="text-sm font-medium text-text-secondary mt-1">Daftar klien yang bekerja sama dengan Anda.</p>
        </div>
        <Link 
          href="/clients/new" 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-accent-foreground text-sm font-medium rounded-full hover:bg-accent-hover transition-colors shadow-subtle"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Klien
        </Link>
      </header>

      {error && (
        <div className="bg-danger-bg text-danger p-4 rounded-xl border border-red-100 text-sm font-medium shadow-sm">
          Gagal mengambil data klien: {error.message}
        </div>
      )}

      {(!clients || clients.length === 0) && !error ? (
        <div className="bg-surface border border-border flex flex-col items-center justify-center py-20 rounded-xl shadow-sm text-center">
          <div className="w-16 h-16 bg-surface-raised rounded-full flex items-center justify-center mb-4 text-text-tertiary">
            <BriefcaseBusiness className="w-8 h-8 opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-1">Belum ada klien</h3>
          <p className="text-sm text-text-secondary mb-6 max-w-sm">
            Tambahkan informasi klien Anda agar dapat mulai membuat invoice untuk mereka.
          </p>
          <Link 
            href="/clients/new"
            className="text-sm font-medium text-info hover:text-blue-700 transition flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Tambah Klien Baru
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients?.map((client: any) => (
            <div key={client.id} className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-subtle transition-all duration-200 group relative flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${getColorFromName(client.name)}`}>
                  {client.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity bg-surface-raised rounded-lg border border-border overflow-hidden">
                  <Link href={`/clients/${client.id}`} className="p-2 text-text-secondary hover:text-info hover:bg-background transition-colors" title="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                  <form action={deleteClient} className="border-l border-border">
                    <input type="hidden" name="id" value={client.id} />
                    <button type="submit" className="p-2 text-text-secondary hover:text-danger hover:bg-background transition-colors cursor-pointer block" title="Hapus">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary tracking-tight truncate pr-2">{client.name}</h3>
                <p className="text-sm text-text-secondary truncate mt-0.5">{client.email}</p>
                
                {client.phone && (
                  <div className="mt-3 flex items-center text-xs font-medium text-text-tertiary">
                    <Phone className="w-3 h-3 mr-1.5" />
                    {client.phone}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-sm">
                <span className="text-text-secondary font-medium">Total Invoice</span>
                <span className="font-mono font-semibold text-text-primary bg-surface-raised border border-border px-2.5 py-1 rounded-md">
                  {client.invoices?.[0]?.count || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
