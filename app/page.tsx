import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { InventorySection } from "@/components/inventory-section"
import { ExecomSection } from "@/components/execom-section"
import { EventSection } from "@/components/event-section"
import { Footer } from "@/components/footer"
import { IdeaSubmissionSection } from "@/components/idea-submission-section"
import { CoordinatorSection } from "@/components/coordinator-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <EventSection />
      <IdeaSubmissionSection />
      <CoordinatorSection />
      <InventorySection />
      <ExecomSection />
      <Footer />
    </main>
  )
}
