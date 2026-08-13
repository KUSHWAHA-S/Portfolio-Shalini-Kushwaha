import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { CategorySidebar } from "@/components/coding-school/category-sidebar"
import { getCategory, getDaysForCategory, getSubject } from "@/lib/coding-school"

export default async function CategoryLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ subject: string; category: string }>
}) {
  const { subject: subjectSlug, category: categorySlug } = await params
  const subject = getSubject(subjectSlug)
  if (!subject) notFound()

  const category = getCategory(subjectSlug, categorySlug)
  if (!category) notFound()

  const days = getDaysForCategory(subjectSlug, categorySlug)

  return (
    <SidebarProvider>
      <CategorySidebar
        subjectSlug={subject.slug}
        categorySlug={category.slug}
        categoryTitle={category.title}
        mode={subject.mode}
        days={days}
      />
      <SidebarInset>
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
