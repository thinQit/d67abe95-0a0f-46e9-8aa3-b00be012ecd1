"use client"

import React from "react"
import { cn } from "@/lib/utils"

export const Vortex = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("relative min-h-[20rem] overflow-hidden rounded-md bg-black flex items-center justify-center", className)}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-teal-500/30 to-green-500/30 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default Vortex
