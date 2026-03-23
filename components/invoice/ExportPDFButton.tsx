'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface ExportPDFButtonProps {
  invoiceNumber: string
}

export default function ExportPDFButton({ invoiceNumber }: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      setError(null)
      
      const input = document.getElementById('invoice-preview')
      if (!input) {
        throw new Error('Invoice preview element not found')
      }

      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false
      })

      const imgData = canvas.toDataURL('image/png')
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`kwitaly-${invoiceNumber}.pdf`)
      
    } catch (err: any) {
      console.error('Error generating PDF:', err)
      setError(err.message || 'Failed to export PDF')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="inline-flex items-center px-4 py-2 border border-border shadow-sm text-sm font-semibold rounded-[8px] text-text-primary bg-surface hover:bg-surface-raised focus:outline-none disabled:opacity-50 transition-colors"
      >
        <Download className="w-4 h-4 mr-2 opacity-80" />
        {isExporting ? 'Mengekspor...' : 'Export PDF'}
      </button>
      {error && <span className="text-danger text-sm ml-2 font-medium">{error}</span>}
    </div>
  )
}
