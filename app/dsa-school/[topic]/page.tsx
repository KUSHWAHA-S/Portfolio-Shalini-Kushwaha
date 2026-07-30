import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { getDaysForTopic, getTopic } from "@/lib/dsa-school"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>
}): Promise<Metadata> {
  const { topic: topicSlug } = await params
  const topic = getTopic(topicSlug)
  return { title: topic ? `${topic.title} | DSA School` : "DSA School" }
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>
}) {
  const { topic: topicSlug } = await params
  const topic = getTopic(topicSlug)
  if (!topic) notFound()

  const days = getDaysForTopic(topicSlug)
  if (days.length > 0) {
    redirect(`/dsa-school/${topic.slug}/${days[0].day}`)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
        {topic.title}
      </h1>
      <p className="mb-10 text-muted-foreground">{topic.description}</p>
      <p className="text-muted-foreground">
        No notes yet for this topic — check back soon.
      </p>
    </div>
  )
}
