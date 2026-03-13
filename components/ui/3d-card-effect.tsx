"use client"

import React, { createContext, useState, useContext, useRef } from "react"
import { cn } from "@/lib/utils"

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}])

export const CardContainer = ({ children, className, containerClassName }: { children: React.ReactNode; className?: string; containerClassName?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = "rotateY(" + x + "deg) rotateX(" + (-y) + "deg)"
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div className={cn("flex items-center justify-center", containerClassName)} style={{ perspective: "1000px" }}>
        <div ref={containerRef} onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { setIsMouseEntered(false); if (containerRef.current) containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)" }}
          className={cn("flex items-center justify-center relative transition-all duration-200 ease-linear", className)}
          style={{ transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export const CardBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>{children}</div>
)

export const CardItem = ({ as: Tag = "div", children, className, translateX = 0, translateY = 0, translateZ = 0, ...rest }: any) => {
  const [isMouseEntered] = useContext(MouseEnterContext)
  const transform = isMouseEntered ? "translateX(" + translateX + "px) translateY(" + translateY + "px) translateZ(" + translateZ + "px)" : "translateX(0px) translateY(0px) translateZ(0px)"
  return <Tag className={cn("w-fit transition duration-200 ease-linear", className)} style={{ transform }} {...rest}>{children}</Tag>
}

export const useMouseEnter = () => useContext(MouseEnterContext)
export default CardContainer
