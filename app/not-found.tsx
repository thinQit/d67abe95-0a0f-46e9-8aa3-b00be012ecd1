import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-background text-foreground px-4">
      <h2 className="text-3xl font-bold">Page not found</h2>
      <p className="text-muted-foreground">We couldn’t find that page in BookShop.</p>
      <Button asChild className="transition-all duration-200 hover:scale-105">
        <Link href="/catalog">Browse Catalog</Link>
      </Button>
    </div>
  )
}
