import Link from "next/link"
import { getSubjects } from "@/lib/coding-school"

export default function CodingSchoolPage() {
  const subjects = getSubjects()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
        Coding School
      </h1>
      <p className="mb-12 max-w-2xl text-muted-foreground">
        A learning roadmap across subjects — pick one to follow along with
        the notes.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/coding-school/${subject.slug}`}
            className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              {subject.title}
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {subject.description}
            </p>
            <span className="text-xs text-primary">
              {subject.categories.length} categor
              {subject.categories.length === 1 ? "y" : "ies"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
