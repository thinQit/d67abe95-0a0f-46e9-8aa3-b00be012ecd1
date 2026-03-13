"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TextGenerateEffect = ({ words, className, filter = true, duration = 0.5 }: { words: string; className?: string; filter?: boolean; duration?: number }) => {
  const wordsArray = words.split(" ")
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setComplete(true), wordsArray.length * 100 + 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <motion.span key={word + idx} className="inline-block mr-1.5" initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: duration, delay: idx * 0.1 }}>
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TextGenerateEffect
