import "./globals.css"
import type { Metadata } from "next"
import { DM_Sans, Inter } from "next/font/google"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "600"],
})

export const metadata: Metadata = {
  title: "BookShop — Modern Bookstore with Genre Browsing, Cart & Admin Inventory",
  description:
    "Browse seeded books, search by title, filter by genre, add to cart, sign in with Google, and manage inventory and orders via an admin dashboard.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${inter.variable} font-sans bg-background text-foreground`}>
        <SiteHeader
          logo="BookShop"
          navItems={[
            { label: "Home", href: "/" },
            { label: "Catalog", href: "/catalog" },
            { label: "Cart", href: "/cart" },
            { label: "Orders", href: "/account/orders" },
            { label: "Admin", href: "/admin" },
          ]}
          ctaLabel="Shop Now"
          ctaHref="/catalog"
          className="sticky top-0 z-50"
        />
        {children}
        <SiteFooter
          brand="BookShop"
          description="A modern bookstore demo with seeded content, Google OAuth, cart persistence, and admin inventory tools."
          columns={[
            {
              title: "Shop",
              links: [
                { label: "Catalog", href: "/catalog" },
                { label: "Cart", href: "/cart" },
                { label: "Orders", href: "/account/orders" },
              ],
            },
            {
              title: "Account",
              links: [
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
              ],
            },
            {
              title: "Admin",
              links: [
                { label: "Dashboard", href: "/admin" },
                { label: "Inventory", href: "/admin/inventory" },
                { label: "Orders", href: "/admin/orders" },
              ],
            },
          ]}
          copyright="© 2026 BookShop. Demo storefront for seeded books."
        />
      </body>
    </html>
  )
}
