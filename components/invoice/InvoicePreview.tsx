import { formatCurrency, formatDate } from '@/lib/utils'

export default function InvoicePreview({ invoice }: { invoice: any }) {
  return (
    <div 
      id="invoice-preview" 
      // Offscreen positioning to hide it from normal UI layout but keep it in DOM for html2canvas
      className="absolute left-[-9999px] top-[-9999px] bg-white text-black p-10 w-[800px] text-sm"
    >
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Kwitaly</h1>
          <p className="mt-2 text-gray-500 max-w-sm">
            Menyediakan solusi invoice profesional untuk bisnis kecil dan freelancer.
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-light text-gray-800 mb-2">INVOICE</h2>
          <p className="font-medium text-gray-900">{invoice.invoice_number}</p>
        </div>
      </div>

      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="text-gray-500 font-medium mb-1">Ditagihkan Kepada:</p>
          <p className="text-xl font-medium text-gray-900">{invoice.client?.name}</p>
          <p className="text-gray-600 mt-1">{invoice.client?.email}</p>
          {invoice.client?.phone && <p className="text-gray-600">{invoice.client?.phone}</p>}
          {invoice.client?.address && (
            <p className="text-gray-600 whitespace-pre-line mt-2 max-w-xs">{invoice.client?.address}</p>
          )}
        </div>
        
        <div className="text-right space-y-4">
          <div>
            <p className="text-gray-500 font-medium mb-1">Tanggal Invoice</p>
            <p className="text-gray-900 font-medium">{formatDate(invoice.issue_date)}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1">Jatuh Tempo</p>
            <p className="text-gray-900 font-medium">{formatDate(invoice.due_date)}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-12">
        <thead className="border-b-2 border-gray-900">
          <tr>
            <th className="py-3 text-left font-semibold text-gray-900 uppercase">Deskripsi</th>
            <th className="py-3 text-center font-semibold text-gray-900 uppercase">Kuantitas</th>
            <th className="py-3 text-right font-semibold text-gray-900 uppercase">Harga Satuan</th>
            <th className="py-3 text-right font-semibold text-gray-900 uppercase">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y border-b-2 border-gray-200">
          {invoice.items?.map((item: any) => (
            <tr key={item.id}>
              <td className="py-4 text-gray-900">{item.description}</td>
              <td className="py-4 text-gray-900 text-center">{item.quantity}</td>
              <td className="py-4 text-gray-900 text-right">{formatCurrency(item.unit_price)}</td>
              <td className="py-4 text-gray-900 text-right font-medium">{formatCurrency(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-start">
        <div className="w-1/2 pr-12">
          {invoice.notes && (
            <>
              <p className="font-semibold text-gray-900 mb-2">Catatan:</p>
              <p className="text-gray-600 whitespace-pre-line text-sm">{invoice.notes}</p>
            </>
          )}
        </div>
        <div className="w-1/2 ml-auto">
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Pajak ({invoice.tax_rate}%)</span>
              <span>{formatCurrency(invoice.total - invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t-2 border-gray-900 pt-4 mt-2">
              <span>Total Keseluruhan</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t text-center text-gray-400 text-xs">
        <p>Invoice ini dibuat secara sah oleh sistem komputer dan tidak memerlukan tanda tangan basah.</p>
        <p className="mt-1">Dibuat menggunakan Kwitaly</p>
      </div>
    </div>
  )
}
