import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { InventorySection } from "@/components/inventory-section"
import { ExecomSection } from "@/components/execom-section"
import { EventSection } from "@/components/event-section"
import { Footer } from "@/components/footer"
import { IdeaSubmissionSection } from "@/components/idea-submission-section"
import { CoordinatorSection } from "@/components/coordinator-section"
import { ProjectPortalComingSoonSection } from "@/components/project-portal-3d-section"
import { SlotReservationSection } from "@/components/slot-reservation-section"
import GalleryPreview from "@/components/GalleryPreview"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* 1. HERO - Target for "HOME" */}
      <section id="home">
        <HeroSection />
      </section>

      {/* 2. ABOUT - Target for "ABOUT" */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 3. EVENTS - Target for "EVENTS" */}
      <section id="events">
        <EventSection />
      </section>

      {/* 4. IDEA SUBMISSION - Target for "Submit Idea" button */}
      <section id="idea">
        <IdeaSubmissionSection />
      </section>

      <CoordinatorSection />
      <SlotReservationSection />

      {/* 5. INVENTORY - Target for "INVENTORY" */}
      <section id="inventory">
        <InventorySection />
      </section>

     <section id="inventory">
        <GalleryPreview />
      </section>

      {/* 6. EXECOM - Target for Navbar "Incubation" or "More" dropdown */}
      

      <Footer />
    </main>
  )
}