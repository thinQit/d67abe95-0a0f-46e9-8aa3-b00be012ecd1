'use client'

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface RowData {
  id: string
  title: string
  stock: number
  featured: boolean
  price: number
}

interface AdminDataTableProps {
  rows?: RowData[]
}

export default function AdminDataTable({
  rows = [
    { id: '1', title: 'Atomic Habits', stock: 24, featured: true, price: 19.99 },
    { id: '2', title: 'Dune', stock: 10, featured: false, price: 14.5 },
  ],
}: Partial<AdminDataTableProps>) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => rows.filter((r) => r.title.toLowerCase().includes(query.toLowerCase())), [rows, query])

  return (
    <div className="space-y-3 rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter books..." />
        <Button variant="outline">Bulk Feature</Button>
      </div>
      <table className="w-full text-left text-sm">
        <thead><tr className="border-b"><th className="py-2">Title</th><th>Stock</th><th>Featured</th><th>Price</th></tr></thead>
        <tbody>
          {filtered.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="py-2">{row.title}</td>
              <td><input className="w-16 rounded border px-2 py-1" defaultValue={row.stock} /></td>
              <td><input type="checkbox" defaultChecked={row.featured} /></td>
              <td>${row.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
