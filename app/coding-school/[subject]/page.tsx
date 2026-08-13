import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getDaysForCategory, getSubject } from "@/lib/coding-school"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>
}): Promise<Metadata> {
  const { subject: subjectSlug } = await params
  const subject = getSubject(subjectSlug)
  return { title: subject ? `${subject.title} | Coding School` : "Coding School" }
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject: subjectSlug } = await params
  const subject = getSubject(subjectSlug)
  if (!subject) notFound()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
        {subject.title}
      </h1>
      <p className="mb-12 max-w-2xl text-muted-foreground">
        {subject.description}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subject.categories.map((category) => {
          const dayCount = getDaysForCategory(subject.slug, category.slug).length

          return (
            <Link
              key={category.slug}
              href={`/coding-school/${subject.slug}/${category.slug}`}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                {category.title}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {category.description}
              </p>
              <span className="text-xs text-primary">
                {dayCount > 0
                  ? `${dayCount} note${dayCount > 1 ? "s" : ""}`
                  : "Coming soon"}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
