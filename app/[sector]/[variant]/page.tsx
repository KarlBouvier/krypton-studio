import { notFound } from "next/navigation";
import { loadConfig } from "@/lib/config";
import type { Variant } from "@/lib/types";
import { adaptSiteConfigToBusinessConfig } from "@/lib/builder/legacyAdapter";
import { SectionRenderer } from "@/lib/builder/SectionRenderer";

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
  const business = adaptSiteConfigToBusinessConfig(config);

  return (
    <>
      <SectionRenderer
        sections={business.sections}
        variant={v}
        animationsEnabled={business.animations.enabled}
      />
    </>
  );
}
