'use client'

import { cn } from '@/lib/utils'

interface CategoryNavProps {
  categories?: string[]
  activeCategory?: string
  quickLinks?: { label: string; href: string }[]
  onCategoryChange?: (category: string) => void
  className?: string
}

export default function CategoryNav({
  categories = ['All', 'Fiction', 'Fantasy', 'Mystery', 'Self-Help', 'Business', 'Sci-Fi'],
  activeCategory = 'All',
  quickLinks = [
    { label: 'New Arrivals', href: '/catalog?sort=new' },
    { label: 'Best Sellers', href: '/catalog?sort=popular' },
  ],
  onCategoryChange = () => {},
  className = '',
}: Partial<CategoryNavProps>) {
  return (
    <div className={cn('border-y bg-white', className)}>
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition',
              activeCategory === category ? 'border-[#0B5CFF] bg-[#0B5CFF] text-white' : 'hover:bg-muted'
            )}
          >
            {category}
          </button>
        ))}
        <div className="ml-auto hidden gap-2 md:flex">
          {quickLinks.map((link) => (
            <a key={link.label} href={link.href} className="whitespace-nowrap text-sm text-[#0B5CFF] hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
