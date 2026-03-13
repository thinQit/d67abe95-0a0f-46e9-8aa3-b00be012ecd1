'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CartLineItem from '@/components/CartLineItem'
import Price from '@/components/Price'

interface Item {
  id: string
  title: string
  price: number
  quantity: number
  stock: number
  imageSrc: string
}

interface CartDrawerProps {
  isOpen?: boolean
  items?: Item[]
  onClose?: () => void
  onQuantityChange?: (id: string, qty: number) => void
  onRemove?: (id: string) => void
}

export default function CartDrawer({
  isOpen = false,
  items = [],
  onClose = () => {},
  onQuantityChange = () => {},
  onRemove = () => {},
}: Partial<CartDrawerProps>) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className={'fixed inset-0 z-50 ' + (isOpen ? '' : 'pointer-events-none')}>
      <div className={'absolute inset-0 bg-black/40 ' + (isOpen ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <aside className={'absolute right-0 top-0 h-full w-full max-w-md bg-white p-4 transition-transform ' + (isOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <Button size="icon" variant="ghost" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <CartLineItem key={item.id} {...item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="mb-4 flex items-center justify-between"><span>Subtotal</span><Price value={subtotal} /></div>
          <Button className="w-full bg-[#0B5CFF] hover:bg-[#0a4ed9]">Proceed to Checkout</Button>
        </div>
      </aside>
    </div>
  )
}
