"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { avatarPalettes, getVisualThemeMode } from "@/lib/visual-theme"

const HeroScene = dynamic(() => import("./hero-scene").then((m) => m.HeroScene), {
  ssr: false,
})

// Cartoon Avatar Component
function CartoonAvatar() {
  const { resolvedTheme } = useTheme()
  const avatarRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const lastOffsetRef = useRef({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const avatarPalette = useMemo(
    () => avatarPalettes[getVisualThemeMode(resolvedTheme)],
    [resolvedTheme],
  )

  useEffect(() => {
    setMounted(true)

    const handlePointerMove = (event: MouseEvent) => {
      if (!avatarRef.current) return

      const rect = avatarRef.current.getBoundingClientRect()
      const avatarCenterX = rect.left + rect.width / 2
      const avatarCenterY = rect.top + rect.height / 2
      const deltaX = event.clientX - avatarCenterX
      const deltaY = event.clientY - avatarCenterY
      const distance = Math.hypot(deltaX, deltaY)
      const maxOffset = 3.5

      if (distance === 0) {
        setPupilOffset({ x: 0, y: 0 })
        return
      }

      const intensity = Math.min(distance / 180, 1)
      const scale = (maxOffset * intensity) / distance

      const next = {
        x: deltaX * scale,
        y: deltaY * scale,
      }

      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(() => {
        const prev = lastOffsetRef.current
        if (Math.abs(prev.x - next.x) > 0.01 || Math.abs(prev.y - next.y) > 0.01) {
          lastOffsetRef.current = next
          setPupilOffset(next)
        }
        frameRef.current = null
      })
    }

    const resetEyes = () => {
      const center = { x: 0, y: 0 }
      lastOffsetRef.current = center
      setPupilOffset(center)
    }

    window.addEventListener("mousemove", handlePointerMove)
    window.addEventListener("mouseleave", resetEyes)

    return () => {
      window.removeEventListener("mousemove", handlePointerMove)
      window.removeEventListener("mouseleave", resetEyes)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  if (!mounted) {
    return <div className="w-48 h-48 md:w-64 md:h-64" aria-hidden="true" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.8, duration: 0.8, type: "spring", bounce: 0.5 }}
      className="relative"
    >
      {/* Floating rings around avatar */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/30"
        style={{ scale: 1.3 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
        style={{ scale: 1.5 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main avatar container */}
      <motion.div
        ref={avatarRef}
        className="relative w-48 h-48 md:w-64 md:h-64"
        whileHover={{ scale: 1.05 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.3 }
        }}
      >
        {/* Avatar background glow */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/40 via-primary/20 to-transparent rounded-full blur-xl" />
        
        {/* Avatar body */}
        <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
          {/* Background circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="url(#avatarGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
          
          {/* Hair back layer */}
          <motion.path
            d="M50 96 Q50 40 100 35 Q150 40 150 96 L150 150 Q147 173 126 183 L112 183 Q129 169 131 143 L131 88 Q129 57 100 52 Q71 57 69 88 L69 143 Q71 169 88 183 L74 183 Q53 173 50 150 Z"
            style={{ fill: avatarPalette.hair }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.08, duration: 0.45 }}
          />

          {/* Face */}
          <motion.ellipse
            cx="100"
            cy="107"
            rx="46"
            ry="57"
            style={{ fill: avatarPalette.skin }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.12, duration: 0.4 }}
          />

          {/* Hair top layer */}
          <motion.path
            d="M55 89 Q58 52 84 42 Q99 37 116 42 Q141 49 145 89 Q132 66 116 60 Q102 56 88 58 Q72 61 55 89"
            style={{ fill: avatarPalette.hair }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.18, duration: 0.4 }}
          />
          <motion.path
            d="M74 52 Q87 46 97 48 Q90 60 87 74 Q76 67 74 52"
            style={{ fill: avatarPalette.hairHighlight }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.22, duration: 0.3 }}
          />
          <motion.path
            d="M100 44 Q104 60 108 80"
            style={{ stroke: avatarPalette.hair }}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.24, duration: 0.3 }}
          />
          <motion.path
            d="M57 82 Q56 111 62 145 Q66 166 82 177 Q67 174 58 160 Q50 146 50 122 Q50 99 57 82"
            style={{ fill: avatarPalette.hair }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.22, duration: 0.35 }}
          />
          <motion.path
            d="M143 82 Q144 111 138 145 Q134 166 118 177 Q133 174 142 160 Q150 146 150 122 Q150 99 143 82"
            style={{ fill: avatarPalette.hair }}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.22, duration: 0.35 }}
          />

          {/* Eyebrows */}
          <motion.path
            d="M68 83 Q78 77 88 81"
            style={{ stroke: avatarPalette.eyebrow }}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.34, duration: 0.25 }}
          />
          <motion.path
            d="M112 81 Q122 77 132 83"
            style={{ stroke: avatarPalette.eyebrow }}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.38, duration: 0.25 }}
          />

          {/* Left eye */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
          >
            <ellipse cx="77" cy="102" rx="13" ry="14" fill="white" />
            <motion.circle
              animate={{ cx: 79 + pupilOffset.x, cy: 103 + pupilOffset.y }}
              r="6"
              style={{ fill: avatarPalette.pupil }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            />
            <motion.circle
              animate={{ cx: 81 + pupilOffset.x, cy: 100 + pupilOffset.y }}
              r="2.2"
              fill="white"
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            />
          </motion.g>

          {/* Right eye */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.34, type: "spring" }}
          >
            <ellipse cx="123" cy="102" rx="13" ry="14" fill="white" />
            <motion.circle
              animate={{ cx: 121 + pupilOffset.x, cy: 103 + pupilOffset.y }}
              r="6"
              style={{ fill: avatarPalette.pupil }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            />
            <motion.circle
              animate={{ cx: 123 + pupilOffset.x, cy: 100 + pupilOffset.y }}
              r="2.2"
              fill="white"
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            />
          </motion.g>

          {/* Nose */}
          <motion.path
            d="M101 106 Q105 116 101 123"
            style={{ stroke: avatarPalette.nose }}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.46, duration: 0.28 }}
          />

          {/* Smile */}
          <motion.path
            d="M85 137 Q100 146 115 137"
            style={{ stroke: avatarPalette.lip }}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.56, duration: 0.4 }}
          />
          <motion.path
            d="M88 138 Q100 143 112 138"
            fill="none"
            style={{ stroke: avatarPalette.lipHighlight }}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.62, duration: 0.2 }}
          />

          {/* Blush */}
          <motion.ellipse
            cx="62"
            cy="124"
            rx="8"
            ry="5"
            style={{ fill: avatarPalette.blush }}
            opacity="0.12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.66, duration: 0.25 }}
          />
          <motion.ellipse
            cx="138"
            cy="124"
            rx="8"
            ry="5"
            style={{ fill: avatarPalette.blush }}
            opacity="0.12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.66, duration: 0.25 }}
          />

          {/* Earrings */}
          <motion.g
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.25 }}
          >
            <circle cx="58" cy="126" r="4" style={{ fill: avatarPalette.earring }} />
            <circle cx="142" cy="126" r="4" style={{ fill: avatarPalette.earring }} />
          </motion.g>
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: avatarPalette.backgroundStart }} />
              <stop offset="100%" style={{ stopColor: avatarPalette.backgroundEnd }} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Floating elements around avatar */}
        <motion.div
          className="absolute -top-4 -right-4 text-primary"
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -left-4 text-primary/60"
          animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <span className="text-2xl font-mono">{"</>"}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=k29120shalini%40gmail.com"
  const fullSurname = "Kushwaha"
  const [displaySurname, setDisplaySurname] = useState("K")
  const [isSurnameHovered, setIsSurnameHovered] = useState(false)
  const [enableHeavyVisuals, setEnableHeavyVisuals] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia?.("(min-width: 768px)")?.matches ?? false
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    setIsDesktop(desktop)

    if (!desktop || reduceMotion) return

    const idle = (cb: () => void) => {
      if ("requestIdleCallback" in window) {
        ;(window as any).requestIdleCallback(cb, { timeout: 1200 })
      } else {
        setTimeout(cb, 900)
      }
    }

    idle(() => setEnableHeavyVisuals(true))
  }, [])

  useEffect(() => {
    if (!isSurnameHovered) {
      setDisplaySurname("K")
      return
    }

    let currentIndex = 1
    const interval = window.setInterval(() => {
      currentIndex += 1
      setDisplaySurname(fullSurname.slice(0, currentIndex))

      if (currentIndex >= fullSurname.length) {
        window.clearInterval(interval)
      }
    }, 85)

    return () => window.clearInterval(interval)
  }, [fullSurname, isSurnameHovered])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {enableHeavyVisuals ? <HeroScene /> : null}

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 justify-center md:justify-start mb-4"
            >
              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-2xl"
              >
                {"👋"}
              </motion.span>
              <span className="text-primary font-mono">Hi there, I&apos;m</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-foreground"
              onHoverStart={() => setIsSurnameHovered(true)}
              onHoverEnd={() => setIsSurnameHovered(false)}
            >
              {isDesktop
                ? "Shalini".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.05, type: "spring" }}
                      whileHover={{
                        scale: 1.2,
                        rotate: Math.random() > 0.5 ? 5 : -5,
                      }}
                      className="inline-block cursor-default transition-colors hover:text-primary"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))
                : "Shalini"}
              <span>{"\u00A0"}</span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="relative inline-block w-[2ch] cursor-default"
              >
                <span
                  className={`transition-opacity duration-150 ${
                    isSurnameHovered ? "opacity-0" : "opacity-100"
                  }`}
                >
                  K.
                </span>
                <span className="absolute left-0 top-0 whitespace-nowrap pointer-events-none">
                  {displaySurname}.
                </span>
              </motion.span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-muted-foreground"
            >
              Frontend Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg max-w-xl mb-8 leading-relaxed"
            >
              Crafting high-quality frontend experiences at the intersection of
              performance, scalability, and design. With nearly 4 years of
              experience, I build modern web and mobile applications that are
              fast, accessible, and thoughtfully engineered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base group"
                asChild
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View My Work</span>
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {"→"}
                  </motion.span>
                </motion.a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-muted hover:border-primary hover:text-primary px-8 py-6 text-base"
                asChild
              >
                <motion.a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Say Hello
                </motion.a>
              </Button>
            </motion.div>
          </div>

          {/* Avatar */}
          <div className="hidden md:block">
            <CartoonAvatar />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-mono">scroll down</span>
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
