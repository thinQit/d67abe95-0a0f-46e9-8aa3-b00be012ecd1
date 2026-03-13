import "./globals.css"
import type { Metadata } from "next"
import { DM_Sans, Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-heading" })
const inter = Inter({ subsets: ["latin"], variable: "--font-body" })

export const metadata: Metadata = {
  title: "BookShop — Modern online bookstore",
  description:
    "Browse a seeded catalog of books, filter by genre, add to cart, sign in with Google, and manage inventory with an admin dashboard.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Featured", href: "/catalog?featured=true" },
    { label: "Cart", href: "/cart" },
    { label: "Orders", href: "/account/orders" },
    { label: "Admin", href: "/admin" },
  ]

  const footerColumns = [
    {
      title: "Shop",
      links: [
        { label: "Catalog", href: "/catalog" },
        { label: "Featured", href: "/catalog?featured=true" },
        { label: "Cart", href: "/cart" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Login", href: "/login" },
        { label: "Orders", href: "/account/orders" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Shipping & returns", href: "/help/shipping-returns" },
        { label: "Privacy", href: "/help/privacy" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ]

  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground">
        <Navbar
          logo="BookShop"
          navItems={navItems}
          ctaLabel="Shop now"
          ctaHref="/catalog"
          className="sticky top-0 z-50"
        />
        {children}
        <Footer
          brand="BookShop"
          description="A modern bookstore experience with seeded content, Google OAuth, and inventory-backed ordering."
          columns={footerColumns}
          copyright="© 2026 BookShop. All rights reserved."
        />
      </body>
    </html>
  )
}
