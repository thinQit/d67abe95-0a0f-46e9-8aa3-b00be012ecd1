"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: ReactNode;
}

export default function SectionReveal({ children }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-6"
      )}
    >
      {children}
    </div>
  );
}
