"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme !== "light" : true

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed top-24 right-4 md:right-8 z-40 h-14 w-14 rounded-full border border-border/70 bg-background/85 text-foreground shadow-lg backdrop-blur-xl transition-colors hover:border-primary/50 hover:text-primary"
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="absolute inset-0 rounded-full bg-linear-to-br from-primary/12 via-transparent to-accent/10" />
      <motion.span
        className="absolute inset-1 rounded-full bg-primary/10"
        animate={{ scale: isDark ? 1 : 0.82, opacity: isDark ? 0.22 : 0.1 }}
        transition={{ duration: 0.25 }}
      />
      <span className="relative flex h-full w-full items-center justify-center">
        <motion.span
          animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute"
        >
          <Moon className="h-6 w-6 fill-current" />
        </motion.span>
        <motion.span
          animate={{ rotate: isDark ? -90 : 0, scale: isDark ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute"
        >
          <Sun className="h-6 w-6" />
        </motion.span>
      </span>
    </motion.button>
  )
}
