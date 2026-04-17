"use client"

import { useEffect, useRef, useState } from "react"

export function LazyMount({
  children,
  rootMargin = "700px 0px",
  minHeight = 1,
}: {
  children: React.ReactNode
  rootMargin?: string
  minHeight?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || mounted) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [mounted, rootMargin])

  return (
    <div ref={ref} style={{ minHeight }}>
      {mounted ? children : null}
    </div>
  )
}

