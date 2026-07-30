import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getTopics } from "@/lib/dsa-school"
import { DsaTopNav } from "@/components/dsa-school/dsa-top-nav"
import { BackToPortfolio } from "@/components/dsa-school/back-to-portfolio"

export const metadata: Metadata = {
  title: "DSA School | Shalini Kushwaha",
  description:
    "A day-wise data structures & algorithms learning roadmap and notes.",
}

export default function DsaSchoolLayout({
  children,
}: {
  children: ReactNode
}) {
  const topics = getTopics()

  return (
    <div className="min-h-screen bg-background">
      <BackToPortfolio />
      <DsaTopNav topics={topics} />
      {children}
    </div>
  )
}
