import type { SiteConfig } from "@/lib/types";
import type { BusinessConfig, BusinessType, AnySection } from "./types";

function mapSectorToBusinessType(sector: SiteConfig["sector"]): BusinessType {
  switch (sector) {
    case "restaurant":
    case "pizzeria":
      return "restaurant";
    case "coiffeur":
      return "hairdresser";
    default:
      return "shop";
  }
}

/**
 * Adapter: converts current (legacy) `SiteConfig` shape into a `BusinessConfig`
 * backed by a `sections[]` list, without changing existing JSON configs yet.
 */
export function adaptSiteConfigToBusinessConfig(config: SiteConfig): BusinessConfig {
  const animationsEnabled = config.animations?.enabled ?? false;

  const sections: AnySection[] = [
    { id: "navbar", type: "navbar", props: { config: config.nav } },
    { id: "hero", type: "hero", props: { config: config.hero } },
  ];

  if (config.todaysSpecial) {
    sections.push({
      id: "todays-special",
      type: "todaysSpecial",
      props: { config: config.todaysSpecial },
    });
  }

  if (config.menu) {
    sections.push({ id: "menu", type: "menu", props: { config: config.menu } });
  } else {
    sections.push({
      id: "services",
      type: "services",
      props: { config: config.services, sector: config.sector },
    });
  }

  if (config.pricing) {
    sections.push({
      id: "pricing",
      type: "pricing",
      props: { config: config.pricing },
    });
  }

  sections.push({
    id: "gallery",
    type: "gallery",
    props: { config: config.gallery },
  });

  if (config.openingHours) {
    sections.push({
      id: "hours",
      type: "openingHours",
      props: { config: config.openingHours },
    });
  }

  if (config.booking) {
    sections.push({
      id: "booking",
      type: "booking",
      props: { config: config.booking },
    });
  }

  if (config.team) {
    sections.push({
      id: "team",
      type: "team",
      props: { config: config.team },
    });
  }

  sections.push({
    id: "testimonials",
    type: "testimonials",
    props: { config: config.testimonials },
  });

  sections.push({ id: "footer", type: "footer", props: { config: config.footer } });

  return {
    type: mapSectorToBusinessType(config.sector),
    variant: config.variant,
    animations: { enabled: animationsEnabled },
    sections,
  };
}

