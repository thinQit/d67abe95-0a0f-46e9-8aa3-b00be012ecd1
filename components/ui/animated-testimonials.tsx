"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Testimonial {
  quote: string
  name: string
  designation: string
  src?: string
}

export const AnimatedTestimonials = ({ testimonials, className, autoplay = true }: { testimonials: Testimonial[]; className?: string; autoplay?: boolean }) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return
    const interval = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  if (!testimonials || testimonials.length === 0) return null

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative h-80 w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex items-center justify-center">
              {testimonials[active]?.src ? <img src={testimonials[active].src} alt={testimonials[active].name} className="h-full w-full object-cover" /> : <span className="text-6xl font-bold text-gray-400">{testimonials[active]?.name?.[0]}</span>}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <h3 className="text-2xl font-bold dark:text-white">{testimonials[active]?.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[active]?.designation}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-6 italic">&ldquo;{testimonials[active]?.quote}&rdquo;</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-4">
            <button onClick={() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)} className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">&larr;</button>
            <button onClick={() => setActive((p) => (p + 1) % testimonials.length)} className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">&rarr;</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedTestimonials
