'use client'

import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuantityStepperProps {
  value?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  className?: string
}

export default function QuantityStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange = () => {},
  className = '',
}: Partial<QuantityStepperProps>) {
  return (
    <div className={cn('inline-flex items-center rounded-lg border', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-r-none"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center text-sm font-medium">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-l-none"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
