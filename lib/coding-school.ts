import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { subjects, type Subject, type Category } from "@/content/coding-school/subjects"

const CONTENT_DIR = path.join(process.cwd(), "content", "coding-school")

export type DaySummary = {
  day: number
  title: string
  date: string
  tags: string[]
}

export type Day = DaySummary & {
  content: string
}

export function getSubjects(): Subject[] {
  return subjects
}

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((subject) => subject.slug === slug)
}

export function getCategory(
  subjectSlug: string,
  categorySlug: string,
): Category | undefined {
  return getSubject(subjectSlug)?.categories.find(
    (category) => category.slug === categorySlug,
  )
}

export function getDaysForCategory(
  subjectSlug: string,
  categorySlug: string,
): DaySummary[] {
  const categoryDir = path.join(CONTENT_DIR, subjectSlug, categorySlug)
  if (!fs.existsSync(categoryDir)) return []

  return fs
    .readdirSync(categoryDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const day = Number.parseInt(file.replace(/\.md$/, ""), 10)
      const raw = fs.readFileSync(path.join(categoryDir, file), "utf8")
      const { data } = matter(raw)
      return {
        day,
        title: data.title ?? `Day ${day}`,
        date: data.date ?? "",
        tags: data.tags ?? [],
      }
    })
    .sort((a, b) => a.day - b.day)
}

export function getDay(
  subjectSlug: string,
  categorySlug: string,
  day: number,
): Day | undefined {
  const filePath = path.join(CONTENT_DIR, subjectSlug, categorySlug, `${day}.md`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)

  return {
    day,
    title: data.title ?? `Day ${day}`,
    date: data.date ?? "",
    tags: data.tags ?? [],
    content,
  }
}
