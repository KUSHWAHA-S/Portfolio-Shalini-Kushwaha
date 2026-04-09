"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { aboutPalettes, getVisualThemeMode } from "@/lib/visual-theme"

export function AboutSection() {
  const { resolvedTheme } = useTheme()
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const aboutPalette = useMemo(
    () => aboutPalettes[getVisualThemeMode(resolvedTheme)],
    [resolvedTheme],
  )
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30])
  const imageX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9])

  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <section id="about" className="py-24 md:py-32 relative" ref={containerRef}>
      <motion.div 
        className="max-w-4xl mx-auto px-6"
        style={{ opacity, scale }}
      >
        {/* Header - slides in from RIGHT */}
        <motion.h2 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12 text-foreground"
        >
          <motion.span 
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-primary font-mono text-lg md:text-xl"
          >
            01.
          </motion.span>
          About Me
          <motion.span 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex-1 h-px bg-border ml-4 max-w-xs origin-right" 
          />
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Text content - staggered fade with blur */}
          <motion.div 
            className="md:col-span-2 space-y-4"
            style={{ x }}
          >
            {[
              "Most of my work revolves around building fast, responsive interfaces that feel simple and intuitive to use. I pay close attention to the small things, performance, accessibility, and interaction details that often go unnoticed but make a big difference.",
              "I like working through complex problems and shaping them into something clean and usable.",
              "Outside of that, you’ll find me sketching, painting, or out exploring food, anything that breaks the routine and keeps things interesting.",
            ].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)", x: -50 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ 
                  delay: 0.3 + index * 0.15, 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="text-muted-foreground leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
          
          {/* Cartoon style profile - enters from right with bounce */}
          <motion.div
            initial={{ opacity: 0, x: 150, rotate: 15, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 80 }}
            style={{ x: imageX }}
            className="relative group"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <motion.div 
                className="aspect-square bg-linear-to-br from-primary/30 to-secondary/20 rounded-2xl flex items-center justify-center relative"
                whileHover={{ scale: 1.05, rotate: -3 }}
                transition={{ duration: 0.4 }}
              >
                {/* Cartoon developer illustration */}
                {mounted ? (
                <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                  {/* Background */}
                  <motion.rect
                    x="20"
                    y="20"
                    width="160"
                    height="160"
                    rx="20"
                    fill="url(#cardGradient)"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />
                  
                  {/* Laptop */}
                  <motion.g
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.8, type: "spring" }}
                  >
                    <rect x="50" y="110" width="100" height="60" rx="5" fill={aboutPalette.laptopShell} />
                    <rect x="55" y="115" width="90" height="45" rx="3" fill={aboutPalette.laptopScreen} />
                    <motion.rect
                      x="60"
                      y="120"
                      width="30"
                      height="3"
                      rx="1"
                      fill={aboutPalette.codeAccent}
                      animate={{ width: [30, 50, 30] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <rect x="60" y="127" width="40" height="3" rx="1" fill={aboutPalette.codeMuted} />
                    <rect x="60" y="134" width="25" height="3" rx="1" fill={aboutPalette.codeMuted} />
                    <motion.rect
                      x="60"
                      y="141"
                      width="35"
                      height="3"
                      rx="1"
                      fill={aboutPalette.codeHighlight}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <rect x="40" y="170" width="120" height="8" rx="4" fill={aboutPalette.codeMuted} />
                  </motion.g>
                  
                  {/* Coffee cup */}
                  <motion.g
                    initial={{ scale: 0, rotate: -30 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 1, type: "spring" }}
                  >
                    <rect x="155" y="140" width="25" height="30" rx="3" fill={aboutPalette.cup} />
                    <rect x="158" y="145" width="19" height="10" rx="2" fill={aboutPalette.cupDetail} />
                    <motion.path
                      d="M165 135 Q168 130 171 135"
                      stroke={aboutPalette.codeMuted}
                      strokeWidth="2"
                      fill="none"
                      animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.g>
                  
                  {/* Plant */}
                  <motion.g
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 1.1, type: "spring" }}
                  >
                    <rect x="20" y="150" width="20" height="25" rx="3" fill={aboutPalette.plantPot} />
                    <motion.ellipse
                      cx="30"
                      cy="145"
                      rx="12"
                      ry="8"
                      fill={aboutPalette.plantLeaf}
                      animate={{ scaleY: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.ellipse
                      cx="25"
                      cy="140"
                      rx="8"
                      ry="6"
                      fill={aboutPalette.plantLeafDark}
                      animate={{ scaleY: [1, 1.15, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                    />
                  </motion.g>
                  
                  {/* Floating code symbols */}
                  <motion.text
                    x="40"
                    y="50"
                    fill={aboutPalette.codeAccent}
                    fontSize="14"
                    fontFamily="monospace"
                    animate={{ y: [50, 45, 50], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {"</>"}
                  </motion.text>
                  <motion.text
                    x="140"
                    y="60"
                    fill={aboutPalette.codeHighlight}
                    fontSize="12"
                    fontFamily="monospace"
                    animate={{ y: [60, 55, 60], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    {"{ }"}
                  </motion.text>
                  <motion.text
                    x="90"
                    y="40"
                    fill={aboutPalette.symbolWarm}
                    fontSize="10"
                    fontFamily="monospace"
                    animate={{ y: [40, 35, 40], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    {"()=>"}
                  </motion.text>
                  
                  <defs>
                    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={aboutPalette.cardStart} />
                      <stop offset="100%" stopColor={aboutPalette.cardEnd} />
                    </linearGradient>
                  </defs>
                </svg>
                ) : null}
                
                {/* Sparkle decorations */}
                <motion.div
                  className="absolute top-4 right-4 text-primary"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Border decoration */}
            <motion.div 
              className="absolute inset-0 border-2 border-primary rounded-2xl -z-10"
              initial={{ x: 16, y: 16 }}
              whileHover={{ x: 8, y: 8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
