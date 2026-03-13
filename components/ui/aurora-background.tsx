"use client"

import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }: AuroraBackgroundProps) => {
  return (
    <div className={cn("relative flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg", className)} {...props}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn("pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] animate-aurora", showRadialGradient && "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]")}
          style={{ backgroundImage: "repeating-linear-gradient(100deg, #3b82f6 10%, #06b6d4 15%, #6366f1 20%, #8b5cf6 25%, #3b82f6 30%)", backgroundSize: "200% 200%" }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default AuroraBackground
