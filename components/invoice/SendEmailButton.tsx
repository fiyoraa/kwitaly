'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SendEmailButtonProps {
  invoiceId: string
  clientName: string
}

export default function SendEmailButton({ invoiceId, clientName }: SendEmailButtonProps) {
  const router = useRouter()
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSendEmail = async () => {
    try {
      setIsSending(true)
      setStatus('idle')
      setErrorMessage('')
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_id: invoiceId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim email')
      }

      setStatus('success')
      router.refresh()
      
      setTimeout(() => setStatus('idle'), 5000)
      
    } catch (err: any) {
      console.error('Error sending email:', err)
      setStatus('error')
      setErrorMessage(err.message || 'Terjadi kesalahan internal')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleSendEmail}
        disabled={isSending || status === 'success'}
        className={`inline-flex items-center px-4 py-2 shadow-sm text-sm font-semibold rounded-[8px] focus:outline-none transition-colors border disabled:opacity-50 ${
          status === 'success' 
            ? 'bg-success-bg text-success border-success/20' 
            : 'text-accent-foreground bg-accent hover:bg-accent-hover border-transparent'
        }`}
      >
        {status === 'success' ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Terkirim!
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            {isSending ? 'Mengirim...' : `Kirim Invoice ke ${clientName || 'Klien'}`}
          </>
        )}
      </button>
      {status === 'error' && <span className="text-danger font-medium text-sm ml-2">{errorMessage}</span>}
    </div>
  )
}
