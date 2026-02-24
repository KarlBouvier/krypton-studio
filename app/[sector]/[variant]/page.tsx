import { notFound } from "next/navigation";
import { loadConfig } from "@/lib/config";
import type { Variant } from "@/lib/types";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TodaysSpecial } from "@/components/sections/TodaysSpecial";
import { MenuSection } from "@/components/sections/MenuSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { OpeningHours } from "@/components/sections/OpeningHours";
import { PricingSection } from "@/components/sections/PricingSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { BookingForm } from "@/components/sections/BookingForm";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Footer } from "@/components/sections/Footer";

interface PageProps {
  params: Promise<{ sector: string; variant: string }>;
}

export default async function SectorVariantPage({ params }: PageProps) {
  const { sector, variant } = await params;
  const config = await loadConfig(sector, variant);

  if (!config) {
    notFound();
  }

  const v = config.variant as Variant;

  return (
    <>
      <Navbar config={config.nav} />
      <HeroSection config={config.hero} variant={v} />
      {config.todaysSpecial && (
        <TodaysSpecial config={config.todaysSpecial} variant={v} />
      )}
      {config.menu ? (
        <MenuSection config={config.menu} variant={v} />
      ) : (
        <ServicesSection
          config={config.services}
          variant={v}
          sector={config.sector}
        />
      )}
      {config.pricing && (
        <PricingSection config={config.pricing} variant={v} />
      )}
      <GallerySection config={config.gallery} variant={v} />
      {config.openingHours && (
        <OpeningHours config={config.openingHours} />
      )}
      {config.booking && (
        <BookingForm config={config.booking} variant={v} />
      )}
      {config.team && <TeamSection config={config.team} variant={v} />}
      <TestimonialsSection config={config.testimonials} variant={v} />
      <Footer config={config.footer} />
    </>
  );
}
