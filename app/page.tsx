import { HeroSection } from "@/components/hero-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { ResearchSection } from "@/components/research-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="bg-background">
      <HeroSection />
      <EducationSection />
      <SkillsSection />
      <ResearchSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
