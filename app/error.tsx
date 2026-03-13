"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-background text-foreground px-4">
      <h2 className="text-2xl font-bold">Something went wrong.</h2>
      <p className="text-muted-foreground text-center">Please try again or return to the catalog.</p>
      <Button onClick={() => reset()} className="transition-all duration-200 hover:scale-105">
        Try again
      </Button>
    </div>
  )
}
