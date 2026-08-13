import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { getCategory, getDaysForCategory, getSubject } from "@/lib/coding-school"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; category: string }>
}): Promise<Metadata> {
  const { subject: subjectSlug, category: categorySlug } = await params
  const category = getCategory(subjectSlug, categorySlug)
  return { title: category ? `${category.title} | Coding School` : "Coding School" }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ subject: string; category: string }>
}) {
  const { subject: subjectSlug, category: categorySlug } = await params
  const subject = getSubject(subjectSlug)
  if (!subject) notFound()

  const category = getCategory(subjectSlug, categorySlug)
  if (!category) notFound()

  const days = getDaysForCategory(subjectSlug, categorySlug)
  if (days.length > 0) {
    redirect(`/coding-school/${subjectSlug}/${categorySlug}/${days[0].day}`)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
        {category.title}
      </h1>
      <p className="mb-10 text-muted-foreground">{category.description}</p>
      <p className="text-muted-foreground">
        No notes yet for this category — check back soon.
      </p>
    </div>
  )
}
