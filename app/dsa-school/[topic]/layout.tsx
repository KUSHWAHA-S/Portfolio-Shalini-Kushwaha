import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { DsaSidebar } from "@/components/dsa-school/dsa-sidebar"
import { getDaysForTopic, getTopic } from "@/lib/dsa-school"

export default async function TopicLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ topic: string }>
}) {
  const { topic: topicSlug } = await params
  const topic = getTopic(topicSlug)
  if (!topic) notFound()

  const days = getDaysForTopic(topicSlug)

  return (
    <SidebarProvider>
      <DsaSidebar topicSlug={topic.slug} topicTitle={topic.title} days={days} />
      <SidebarInset>
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
