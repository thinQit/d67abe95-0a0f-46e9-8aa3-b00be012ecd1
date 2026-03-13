'use client'

import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckoutStepsProps {
  step?: number
  labels?: string[]
}

export default function CheckoutSteps({
  step = 1,
  labels = ['Sign In', 'Shipping', 'Review', 'Place Order'],
}: Partial<CheckoutStepsProps>) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {labels.map((label, i) => {
        const index = i + 1
        const done = index < step
        const active = index === step
        return (
          <div key={label} className="flex items-center gap-2">
            {done ? <CheckCircle2 className="h-5 w-5 text-[#0B5CFF]" /> : <Circle className={cn('h-5 w-5', active && 'text-[#0B5CFF]')} />}
            <span className={cn('text-sm', active && 'font-semibold text-[#0B5CFF]')}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
