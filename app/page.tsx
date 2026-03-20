import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ExperienceJourney } from "@/components/experience-journey"
import { ProjectsSection } from "@/components/projects-section"
import { TechStack } from "@/components/tech-stack"
import { StickyNotes } from "@/components/sticky-notes"
import { MusicPlayer } from "@/components/music-player"
import { Footer } from "@/components/footer"
import { SectionDivider } from "@/components/section-divider"
import { ThemeSelector } from "@/components/ThemeSelector"

export default function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <SectionDivider />
      <ExperienceJourney />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <TechStack />
      <SectionDivider />
      <StickyNotes />
      <Footer />
      <MusicPlayer />
      <ThemeSelector />
    </main>
  )
}
