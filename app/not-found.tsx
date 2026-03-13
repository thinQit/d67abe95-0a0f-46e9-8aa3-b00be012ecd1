import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-3xl font-bold">Page not found</h2>
      <p className="text-muted-foreground">The page you’re looking for doesn’t exist.</p>
      <Button asChild className="transition-all duration-200 hover:scale-105">
        <Link href="/catalog">Browse catalog</Link>
      </Button>
    </div>
  )
}
