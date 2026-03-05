import type { AnySection, BusinessConfig } from "./types";
import type { Variant } from "@/lib/types";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TodaysSpecial } from "@/components/sections/TodaysSpecial";
import { MenuSection } from "@/components/sections/MenuSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { OpeningHours } from "@/components/sections/OpeningHours";
import { PricingSection } from "@/components/sections/PricingSection";
import { BookingForm } from "@/components/sections/BookingForm";
import { ContactSection } from "@/components/sections/ContactSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Footer } from "@/components/sections/Footer";

export interface SectionRendererProps {
  sections: AnySection[];
  /** Common context that sections share */
  variant: Variant;
  animationsEnabled: boolean;
}

export function SectionRenderer({
  sections,
  variant,
  animationsEnabled,
}: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => (
        <RenderedSection
          key={`${section.type}:${section.id}`}
          section={section}
          variant={variant}
          animationsEnabled={animationsEnabled}
        />
      ))}
    </>
  );
}

function RenderedSection({
  section,
  variant,
  animationsEnabled,
}: {
  section: AnySection;
  variant: BusinessConfig["variant"];
  animationsEnabled: boolean;
}) {
  switch (section.type) {
    case "navbar":
      return <Navbar config={section.props.config} />;
    case "hero":
      return (
        <HeroSection
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "todaysSpecial":
      return (
        <TodaysSpecial
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "menu":
      return (
        <MenuSection
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "services":
      return (
        <ServicesSection
          config={section.props.config}
          variant={variant}
          sector={section.props.sector}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "gallery":
      return (
        <GallerySection
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "openingHours":
      return (
        <OpeningHours
          config={section.props.config}
          variant={variant}
          animationsEnabled={animationsEnabled}
          sectionId={section.id}
        />
      );
    case "pricing":
      return (
        <PricingSection
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "booking":
      return (
        <BookingForm
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "contact":
      return (
        <ContactSection
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "team":
      return (
        <TeamSection
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "testimonials":
      return (
        <TestimonialsSection
          config={section.props.config}
          variant={variant}
          sectionId={section.id}
          animationsEnabled={animationsEnabled}
        />
      );
    case "footer":
      return (
        <Footer
          config={section.props.config}
          variant={variant}
          animationsEnabled={animationsEnabled}
        />
      );
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}

