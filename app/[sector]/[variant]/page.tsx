import { notFound } from "next/navigation";
import { loadConfig } from "@/lib/config";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TodaysSpecial } from "@/components/sections/TodaysSpecial";
import { MenuSection } from "@/components/sections/MenuSection";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { OpeningHours } from "@/components/sections/OpeningHours";
import { PricingSection } from "@/components/sections/PricingSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { BookingForm } from "@/components/sections/BookingForm";
import { Testimonials } from "@/components/sections/Testimonials";
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

  return (
    <>
      <Navbar config={config.nav} />
      <Hero config={config.hero} />
      {config.todaysSpecial && <TodaysSpecial config={config.todaysSpecial} />}
      {config.menu ? (
        <MenuSection config={config.menu} />
      ) : (
        <Services config={config.services} sector={config.sector} />
      )}
      {config.pricing && <PricingSection config={config.pricing} />}
      <Gallery config={config.gallery} />
      {config.openingHours && (
        <OpeningHours config={config.openingHours} />
      )}
      {config.booking && <BookingForm config={config.booking} />}
      {config.team && <TeamSection config={config.team} />}
      <Testimonials config={config.testimonials} />
      <Footer config={config.footer} />
    </>
  );
}
