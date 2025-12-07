import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { ResearchSection } from "@/components/research-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EducationSection />
      <SkillsSection />
      <ResearchSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  )
}
