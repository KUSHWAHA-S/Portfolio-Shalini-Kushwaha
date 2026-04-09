"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <motion.a
            href="mailto:k29120shalini@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono"
          >
            <p>Designed & Built by Shalini Kushwaha</p>
          </motion.a>
          <p className="text-muted-foreground text-xs font-mono mt-2">
            Built with Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
