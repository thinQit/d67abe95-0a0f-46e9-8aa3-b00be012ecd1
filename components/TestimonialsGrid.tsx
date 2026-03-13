"use client";

import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Testimonial {
  name: string
  text: string
  rating: number
}

interface TestimonialsGridProps {
  testimonials?: Testimonial[]
}

export default function TestimonialsGrid({
  testimonials = [
    { name: 'Ava R.', text: 'Fast shipping and perfect book condition.', rating: 5 },
    { name: 'Noah P.', text: 'Love the genre filters and recommendations.', rating: 5 },
    { name: 'Liam T.', text: 'Checkout was smooth with Google login.', rating: 4 },
  ],
}: Partial<TestimonialsGridProps>) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((t) => (
        <Card key={t.name} className="rounded-xl p-4">
          <div className="mb-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={'h-4 w-4 ' + (i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground')} />)}
          </div>
          <p className="text-sm">{t.text}</p>
          <p className="mt-3 text-sm font-semibold">{t.name}</p>
        </Card>
      ))}
    </div>
  )
}
