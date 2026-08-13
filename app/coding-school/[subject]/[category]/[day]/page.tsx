import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  getCategory,
  getDay,
  getDaysForCategory,
  getSubject,
} from "@/lib/coding-school"
import { NoteMarkdown } from "@/components/coding-school/note-markdown"

type Params = { subject: string; category: string; day: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { subject: subjectSlug, category: categorySlug, day: dayParam } =
    await params
  const category = getCategory(subjectSlug, categorySlug)
  const day = getDay(subjectSlug, categorySlug, Number.parseInt(dayParam, 10))
  return {
    title:
      category && day
        ? `${day.title} — ${category.title} | Coding School`
        : "Coding School",
  }
}

export default async function DayPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { subject: subjectSlug, category: categorySlug, day: dayParam } =
    await params
  const dayNumber = Number.parseInt(dayParam, 10)

  const subject = getSubject(subjectSlug)
  if (!subject) notFound()

  const category = getCategory(subjectSlug, categorySlug)
  if (!category) notFound()

  const day = getDay(subjectSlug, categorySlug, dayNumber)
  if (!day) notFound()

  const days = getDaysForCategory(subjectSlug, categorySlug)
  const index = days.findIndex((d) => d.day === dayNumber)
  const prevDay = index > 0 ? days[index - 1] : undefined
  const nextDay = index < days.length - 1 ? days[index + 1] : undefined

  const isPattern = subject.mode === "pattern"
  const basePath = `/coding-school/${subjectSlug}/${categorySlug}`

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="mb-2 text-sm text-primary">
        {isPattern ? category.title : `${category.title} · Day ${day.day}`}
      </p>
      <h1 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
        {day.title}
      </h1>

      <NoteMarkdown content={day.content} />

      <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
        {prevDay ? (
          <Link
            href={`${basePath}/${prevDay.day}`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← {isPattern ? prevDay.title : `Day ${prevDay.day}: ${prevDay.title}`}
          </Link>
        ) : (
          <span />
        )}
        {nextDay && (
          <Link
            href={`${basePath}/${nextDay.day}`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            {isPattern ? nextDay.title : `Day ${nextDay.day}: ${nextDay.title}`} →
          </Link>
        )}
      </div>
    </div>
  )
}
