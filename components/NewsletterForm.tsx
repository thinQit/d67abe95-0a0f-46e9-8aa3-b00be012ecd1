'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NewsletterFormProps {
  title?: string
  privacyNote?: string
}

export default function NewsletterForm({
  title = 'Get weekly book picks in your inbox',
  privacyNote = 'We respect your privacy. Unsubscribe anytime.',
}: Partial<NewsletterFormProps>) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  return (
    <div className="rounded-xl border bg-white p-6">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="flex gap-2">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <Button onClick={() => setSuccess(true)} className="bg-[#E63946] hover:bg-[#d9333f]">Subscribe</Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{success ? 'Thanks! You are subscribed.' : privacyNote}</p>
    </div>
  )
}
