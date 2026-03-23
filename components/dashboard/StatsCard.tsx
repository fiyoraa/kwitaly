import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode
}

export default function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 flex flex-col justify-between h-full hover:shadow-subtle transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <div className="text-text-tertiary">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-mono font-semibold text-text-primary tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-text-tertiary mt-2 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
