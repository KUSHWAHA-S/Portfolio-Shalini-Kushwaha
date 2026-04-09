"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import { backgroundPalettes, getVisualThemeMode } from "@/lib/visual-theme"

interface Particle {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
  color: string
}

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  type: "circle" | "square" | "ring" | "dot" | "cross"
  parallaxFactor: number
  rotation: number
  opacity: number
  color: string
}

function FallingParticle({ particle }: { particle: Particle }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 3000], [0, 300 * (particle.size / 8)])
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${particle.x}%`,
        width: particle.size,
        height: particle.size,
        opacity: particle.opacity,
        y,
        filter: "blur(0.5px)",
        backgroundColor: particle.color,
      }}
      animate={{
        top: ["-5%", "105%"],
      }}
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

function FloatingShape({ element }: { element: FloatingElement }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 4000], [0, 1000 * element.parallaxFactor])
  const rotate = useTransform(scrollY, [0, 4000], [element.rotation, element.rotation + 180 * element.parallaxFactor])
  
  const shapeClass = {
    circle: "rounded-full",
    square: "",
    ring: "rounded-full border-2 bg-transparent",
    dot: "rounded-full",
    cross: "bg-transparent",
  }
  
  if (element.type === "cross") {
    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${element.x}%`,
          top: `${element.y}%`,
          width: element.size,
          height: element.size,
          opacity: element.opacity,
          y,
          rotate,
          color: element.color,
        }}
      >
        <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2" style={{ backgroundColor: element.color }} />
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2" style={{ backgroundColor: element.color }} />
      </motion.div>
    )
  }
  
  return (
    <motion.div
      className={`absolute pointer-events-none ${shapeClass[element.type]}`}
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: element.size,
        height: element.size,
        opacity: element.opacity,
        y,
        rotate,
        backgroundColor: element.type === "ring" ? "transparent" : element.color,
        borderColor: element.type === "ring" ? element.color : undefined,
      }}
    />
  )
}

function getShapeColor(
  type: FloatingElement["type"],
  index: number,
  palette: readonly string[],
) {
  const paletteByType: Record<FloatingElement["type"], string[]> = {
    circle: [palette[0], palette[1]],
    square: [palette[2], palette[4]],
    ring: [palette[1], palette[3]],
    dot: [palette[3], palette[4]],
    cross: [palette[0], palette[2]],
  }

  const options = paletteByType[type]
  return options[index % options.length]
}

export function ParallaxBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const { scrollY } = useScroll()
  const backgroundPalette = useMemo(
    () => backgroundPalettes[getVisualThemeMode(resolvedTheme)],
    [resolvedTheme],
  )
  
  useEffect(() => {
    setMounted(true)

    // Create falling particles
    const newParticles: Particle[] = []
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.4 + 0.15,
        color: backgroundPalette.shapes[Math.floor(Math.random() * backgroundPalette.shapes.length)],
      })
    }
    setParticles(newParticles)
    
    // Create floating geometric shapes
    const shapes: FloatingElement[] = []
    const types: FloatingElement["type"][] = ["circle", "square", "ring", "dot", "cross"]
    for (let i = 0; i < 20; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      shapes.push({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 200,
        size: Math.random() * 40 + 10,
        type,
        parallaxFactor: Math.random() * 0.8 + 0.2,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.15 + 0.08,
        color: getShapeColor(type, i, backgroundPalette.shapes),
      })
    }
    setFloatingElements(shapes)
  }, [backgroundPalette])

  const gradient1Y = useTransform(scrollY, [0, 3000], [0, 400])
  const gradient2Y = useTransform(scrollY, [0, 3000], [0, 600])
  const gradient3Y = useTransform(scrollY, [0, 3000], [0, 300])

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large gradient orbs - more visible */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          left: "-15%",
          top: "5%",
          y: gradient1Y,
          background: `radial-gradient(circle, ${backgroundPalette.orbs[0]} 0%, transparent 70%)`,
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          right: "-10%",
          top: "40%",
          y: gradient2Y,
          background: `radial-gradient(circle, ${backgroundPalette.orbs[1]} 0%, transparent 70%)`,
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          left: "30%",
          top: "70%",
          y: gradient3Y,
          background: `radial-gradient(circle, ${backgroundPalette.orbs[2]} 0%, transparent 70%)`,
        }}
      />
      
      {/* Floating geometric shapes with parallax */}
      {floatingElements.map((element) => (
        <FloatingShape key={element.id} element={element} />
      ))}
      
      {/* Falling particles */}
      {particles.map((particle) => (
        <FallingParticle key={particle.id} particle={particle} />
      ))}
      
      {/* Grid lines overlay - very subtle */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  )
}
