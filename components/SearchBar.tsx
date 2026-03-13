'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  placeholder?: string
  debounceMs?: number
}

export default function SearchBar({
  placeholder = 'Search by title or author...',
  debounceMs = 350,
}: Partial<SearchBarProps>) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [value, setValue] = useState(params.get('q') ?? '')

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params.toString())
      if (value) next.set('q', value)
      else next.delete('q')
      router.replace(pathname + '?' + next.toString())
    }, debounceMs)
    return () => clearTimeout(t)
  }, [value, debounceMs, pathname, params, router])

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className="pl-9" />
    </div>
  )
}
