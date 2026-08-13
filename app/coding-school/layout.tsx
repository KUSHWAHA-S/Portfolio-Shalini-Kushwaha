import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getSubjects } from "@/lib/coding-school"
import { SubjectTopNav } from "@/components/coding-school/subject-top-nav"
import { BackToPortfolio } from "@/components/coding-school/back-to-portfolio"

export const metadata: Metadata = {
  title: "Coding School | Shalini Kushwaha",
  description:
    "A learning roadmap and notes across DSA, React, and JavaScript.",
}

export default function CodingSchoolLayout({
  children,
}: {
  children: ReactNode
}) {
  const subjects = getSubjects()

  return (
    <div className="min-h-screen bg-background">
      <BackToPortfolio />
      <SubjectTopNav subjects={subjects} />
      {children}
    </div>
  )
}
