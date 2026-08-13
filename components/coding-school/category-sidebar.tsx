"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { DaySummary } from "@/lib/coding-school"
import type { Mode } from "@/content/coding-school/subjects"

export function CategorySidebar({
  subjectSlug,
  categorySlug,
  categoryTitle,
  mode,
  days,
}: {
  subjectSlug: string
  categorySlug: string
  categoryTitle: string
  mode: Mode
  days: DaySummary[]
}) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" className="top-14">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{categoryTitle}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {days.length === 0 && (
                <SidebarMenuItem>
                  <span className="px-2 text-sm text-muted-foreground">
                    No notes yet
                  </span>
                </SidebarMenuItem>
              )}
              {days.map((day) => {
                const href = `/coding-school/${subjectSlug}/${categorySlug}/${day.day}`
                return (
                  <SidebarMenuItem key={day.day}>
                    <SidebarMenuButton asChild isActive={pathname === href}>
                      <Link href={href}>
                        {mode === "pattern" ? day.title : `Day ${day.day}`}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
