import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ParallaxBackgroundClient } from "@/components/parallax-background-client"
import { LazyMount } from "@/components/lazy-mount"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <ParallaxBackgroundClient />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <LazyMount minHeight={900}>
        <SkillsSection />
      </LazyMount>
      <LazyMount minHeight={900}>
        <ExperienceSection />
      </LazyMount>
      <LazyMount minHeight={1100}>
        <ProjectsSection />
      </LazyMount>
      <LazyMount minHeight={700}>
        <ContactSection />
      </LazyMount>
      <Footer />
    </main>
  )
}
