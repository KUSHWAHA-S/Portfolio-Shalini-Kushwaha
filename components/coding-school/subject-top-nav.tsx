"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Subject } from "@/content/coding-school/subjects"

export function SubjectTopNav({ subjects }: { subjects: Subject[] }) {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-40 h-14 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="no-scrollbar mx-auto flex h-full max-w-6xl items-center gap-2 overflow-x-auto px-6 pl-36">
        {subjects.map((subject) => {
          const href = `/coding-school/${subject.slug}`
          const isActive = pathname?.startsWith(href)

          return (
            <Link
              key={subject.slug}
              href={href}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm whitespace-nowrap transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {subject.title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
