"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export function BackToPortfolio() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-4 left-4 z-50"
    >
      <Link
        href="/"
        className="flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-lg transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Portfolio
      </Link>
    </motion.div>
  )
}
