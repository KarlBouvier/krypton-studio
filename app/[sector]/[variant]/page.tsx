import { notFound } from "next/navigation";
import { loadConfig } from "@/lib/config";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
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
      <Services config={config.services} sector={config.sector} />
      <Gallery config={config.gallery} />
      {config.booking && <BookingForm config={config.booking} />}
      <Testimonials config={config.testimonials} />
      <Footer config={config.footer} />
    </>
  );
}
