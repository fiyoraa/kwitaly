'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'

interface RevenueData {
  month: string
  amount: number
}

export default function RevenueChart({ data }: { data: RevenueData[] }) {
  const hasData = data && data.length > 0 && data.some(d => d.amount > 0)
  
  if (!hasData) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-background rounded-lg border border-dashed border-border p-6">
        <div className="w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center mb-3">
          <span className="text-xl">📈</span>
        </div>
        <p className="text-text-secondary text-sm font-medium">Belum ada data pendapatan</p>
        <p className="text-text-tertiary text-xs mt-1">Selesaikan invoice untuk melihat grafik</p>
      </div>
    )
  }

  const formatYAxis = (tickItem: number) => {
    if (tickItem === 0) return '0'
    if (tickItem >= 1000000) return `${(tickItem / 1000000).toFixed(1)}Jt`
    if (tickItem >= 1000) return `${(tickItem / 1000).toFixed(0)}Rb`
    return tickItem.toString()
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#18181B" stopOpacity={0.06}/>
              <stop offset="95%" stopColor="#18181B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-tertiary)', fontSize: 11, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-tertiary)', fontSize: 11, fontWeight: 500 }}
            tickFormatter={formatYAxis}
            dx={-10}
          />
          <Tooltip 
            cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{ 
              borderRadius: '8px', 
              border: '1px solid var(--border)', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              backgroundColor: 'var(--surface)',
            }}
            itemStyle={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}
            formatter={(value: any) => [formatCurrency(Number(value) || 0), 'Total']}
            labelStyle={{ color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '6px', fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#18181B" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
