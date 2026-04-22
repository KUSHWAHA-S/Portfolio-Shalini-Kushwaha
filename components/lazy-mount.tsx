"use client"

import { useEffect, useRef, useState } from "react"

export function LazyMount({
  children,
  rootMargin = "700px 0px",
  minHeight = 1,
  id,
}: {
  children: React.ReactNode
  rootMargin?: string
  minHeight?: number
  id?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || mounted) return

    const mount = () => setMounted(true)

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          mount()
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)

    const onHashChange = () => {
      if (id && window.location.hash === `#${id}`) mount()
    }
    onHashChange()
    window.addEventListener("hashchange", onHashChange)

    return () => {
      io.disconnect()
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [mounted, rootMargin, id])

  return (
    <div ref={ref} id={id} style={{ minHeight }}>
      {mounted ? children : null}
    </div>
  )
}

