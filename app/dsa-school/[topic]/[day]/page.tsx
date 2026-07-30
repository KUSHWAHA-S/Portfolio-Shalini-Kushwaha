import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getDay, getDaysForTopic, getTopic } from "@/lib/dsa-school"
import { DsaMarkdown } from "@/components/dsa-school/dsa-markdown"

type Params = { topic: string; day: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { topic: topicSlug, day: dayParam } = await params
  const topic = getTopic(topicSlug)
  const day = getDay(topicSlug, Number.parseInt(dayParam, 10))
  return {
    title:
      topic && day ? `${day.title} — ${topic.title} | DSA School` : "DSA School",
  }
}

export default async function DayPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { topic: topicSlug, day: dayParam } = await params
  const dayNumber = Number.parseInt(dayParam, 10)
  const topic = getTopic(topicSlug)
  if (!topic) notFound()

  const day = getDay(topicSlug, dayNumber)
  if (!day) notFound()

  const days = getDaysForTopic(topicSlug)
  const index = days.findIndex((d) => d.day === dayNumber)
  const prevDay = index > 0 ? days[index - 1] : undefined
  const nextDay = index < days.length - 1 ? days[index + 1] : undefined

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="mb-2 text-sm text-primary">
        {topic.title} · Day {day.day}
      </p>
      <h1 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
        {day.title}
      </h1>

      <DsaMarkdown content={day.content} />

      <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
        {prevDay ? (
          <Link
            href={`/dsa-school/${topic.slug}/${prevDay.day}`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← Day {prevDay.day}: {prevDay.title}
          </Link>
        ) : (
          <span />
        )}
        {nextDay && (
          <Link
            href={`/dsa-school/${topic.slug}/${nextDay.day}`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Day {nextDay.day}: {nextDay.title} →
          </Link>
        )}
      </div>
    </div>
  )
}
