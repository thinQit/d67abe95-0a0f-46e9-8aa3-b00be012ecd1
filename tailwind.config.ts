import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        chart: { "1": "hsl(var(--chart-1))", "2": "hsl(var(--chart-2))", "3": "hsl(var(--chart-3))", "4": "hsl(var(--chart-4))", "5": "hsl(var(--chart-5))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        meteor: "meteor 5s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "scroll-left": "scroll-left var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "scroll-right": "scroll-right var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "move-up": "move-up 1.4s ease forwards",
        "move-down": "move-down 1.4s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "fade-out": "fade-out 0.5s ease forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        aurora: { from: { backgroundPosition: "50% 50%, 50% 50%" }, to: { backgroundPosition: "350% 50%, 350% 50%" } },
        meteor: { "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" }, "70%": { opacity: "1" }, "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" } },
        shimmer: { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "-200% 0" } },
        spotlight: { "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" }, "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" } },
        "scroll-left": { to: { transform: "translate(calc(-50% - 0.5rem))" } },
        "scroll-right": { to: { transform: "translate(calc(50% + 0.5rem))" } },
        "move-up": { "0%": { transform: "translateY(5%)", opacity: "0" }, "100%": { transform: "translateY(0%)", opacity: "1" } },
        "move-down": { "0%": { transform: "translateY(-5%)", opacity: "0" }, "100%": { transform: "translateY(0%)", opacity: "1" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "fade-out": { "0%": { opacity: "1" }, "100%": { opacity: "0" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
    },
  },
  plugins: [],
}
export default config
