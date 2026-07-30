import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { topics, type Topic } from "@/content/dsa-school/topics"

const CONTENT_DIR = path.join(process.cwd(), "content", "dsa-school")

export type DaySummary = {
  day: number
  title: string
  date: string
  tags: string[]
}

export type Day = DaySummary & {
  content: string
}

export function getTopics(): Topic[] {
  return topics
}

export function getTopic(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug)
}

export function getDaysForTopic(slug: string): DaySummary[] {
  const topicDir = path.join(CONTENT_DIR, slug)
  if (!fs.existsSync(topicDir)) return []

  return fs
    .readdirSync(topicDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const day = Number.parseInt(file.replace(/\.md$/, ""), 10)
      const raw = fs.readFileSync(path.join(topicDir, file), "utf8")
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

export function getDay(slug: string, day: number): Day | undefined {
  const filePath = path.join(CONTENT_DIR, slug, `${day}.md`)
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
