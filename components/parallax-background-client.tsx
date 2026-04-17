"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const ParallaxBackground = dynamic(
  () => import("@/components/parallax-background").then((m) => m.ParallaxBackground),
  { ssr: false },
)

export function ParallaxBackgroundClient() {
  const [mode, setMode] = useState<"off" | "lite" | "full">("off")

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia?.("(min-width: 768px)")?.matches

    if (reduceMotion) {
      setMode("off")
      return
    }

    if (isDesktop) {
      // Keep the heavier visuals desktop-only.
      setMode("full")
      return
    }

    // Mobile: allow a lightweight, transform-only animated background.
    const t = setTimeout(() => setMode("lite"), 250)
    return () => clearTimeout(t)
  }, [])

  if (mode === "off") return null

  if (mode === "lite") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full bg-(--bg-orb-1) blur-3xl opacity-70 animate-[float-slow_10s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] -right-28 h-[360px] w-[360px] rounded-full bg-(--bg-orb-2) blur-3xl opacity-60 animate-[drift_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-140px] left-[18%] h-[420px] w-[420px] rounded-full bg-(--bg-orb-3) blur-3xl opacity-55 animate-[float-slow_14s_ease-in-out_infinite]" />
      </div>
    )
  }

  return <ParallaxBackground />
}

