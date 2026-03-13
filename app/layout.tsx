import './globals.css'
import { DM_Sans, Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${inter.variable} bg-background text-foreground antialiased`}>
        <Navbar
          logo="BookShop"
          navItems={[
            { label: 'Home', href: '/' },
            { label: 'Catalog', href: '/catalog' },
            { label: 'Cart', href: '/cart' },
            { label: 'Orders', href: '/orders' },
            { label: 'Admin', href: '/admin' },
          ]}
          ctaLabel="Shop now"
          ctaHref="/catalog"
          className="sticky top-0 z-50"
        />
        <main>{children}</main>
        <Footer
          brand="BookShop"
          description="A modern seeded bookstore demo with auth, cart, and admin inventory."
          columns={[
            {
              title: 'Shop',
              links: [
                { label: 'Catalog', href: '/catalog' },
                { label: 'Cart', href: '/cart' },
                { label: 'Orders', href: '/orders' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About', href: '/about' },
                { label: 'Testimonials', href: '/testimonials' },
                { label: 'Contact', href: '/contact' },
              ],
            },
            {
              title: 'Admin',
              links: [
                { label: 'Inventory', href: '/admin/inventory' },
                { label: 'Orders', href: '/admin/orders' },
                { label: 'Settings', href: '/admin/settings' },
              ],
            },
          ]}
          copyright="© 2026 BookShop. All rights reserved."
        />
      </body>
    </html>
  )
}
