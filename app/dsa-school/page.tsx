import Link from "next/link"
import { getDaysForTopic, getTopics } from "@/lib/dsa-school"

export default function DsaSchoolPage() {
  const topics = getTopics()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
        DSA School
      </h1>
      <p className="mb-12 max-w-2xl text-muted-foreground">
        A day-wise roadmap through data structures & algorithms — pick a
        category to follow along with the notes.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const dayCount = getDaysForTopic(topic.slug).length

          return (
            <Link
              key={topic.slug}
              href={`/dsa-school/${topic.slug}`}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                {topic.title}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {topic.description}
              </p>
              <span className="text-xs text-primary">
                {dayCount > 0 ? `${dayCount} note${dayCount > 1 ? "s" : ""}` : "Coming soon"}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
