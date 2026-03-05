import type {
  BookingConfig,
  FooterConfig,
  GalleryConfig,
  HeroConfig,
  MenuConfig,
  NavConfig,
  OpeningHoursConfig,
  PricingConfig,
  ServicesConfig,
  TeamConfig,
  TestimonialsConfig,
  TodaysSpecialConfig,
  Variant,
} from "@/lib/types";

/**
 * High-level business category used for feature gating & templates.
 * Keep this stable; new subtypes can be represented by template IDs.
 */
export type BusinessType = "restaurant" | "hairdresser" | "bookstore" | "shop";

export type SectionType =
  | "navbar"
  | "hero"
  | "todaysSpecial"
  | "menu"
  | "services"
  | "gallery"
  | "openingHours"
  | "pricing"
  | "booking"
  | "contact"
  | "team"
  | "testimonials"
  | "footer";

export interface ContactSectionConfig {
  title: string;
  subtitle?: string;
  phone: string;
  email?: string;
}

export type SectionId = string;

export interface BaseSection<TType extends SectionType, TProps> {
  id: SectionId;
  type: TType;
  props: TProps;
}

export type NavbarSection = BaseSection<
  "navbar",
  { config: NavConfig; themeClass?: string }
>;
export type HeroSection = BaseSection<"hero", { config: HeroConfig }>;
export type TodaysSpecialSection = BaseSection<
  "todaysSpecial",
  { config: TodaysSpecialConfig }
>;
export type MenuSection = BaseSection<"menu", { config: MenuConfig }>;
export type ServicesSection = BaseSection<
  "services",
  { config: ServicesConfig; sector?: string }
>;
export type GallerySection = BaseSection<"gallery", { config: GalleryConfig }>;
export type OpeningHoursSection = BaseSection<
  "openingHours",
  { config: OpeningHoursConfig }
>;
export type PricingSection = BaseSection<"pricing", { config: PricingConfig }>;
export type BookingSection = BaseSection<"booking", { config: BookingConfig }>;
export type ContactSection = BaseSection<
  "contact",
  { config: ContactSectionConfig }
>;
export type TeamSection = BaseSection<"team", { config: TeamConfig }>;
export type TestimonialsSection = BaseSection<
  "testimonials",
  { config: TestimonialsConfig }
>;
export type FooterSection = BaseSection<"footer", { config: FooterConfig }>;

export type AnySection =
  | NavbarSection
  | HeroSection
  | TodaysSpecialSection
  | MenuSection
  | ServicesSection
  | GallerySection
  | OpeningHoursSection
  | PricingSection
  | BookingSection
  | ContactSection
  | TeamSection
  | TestimonialsSection
  | FooterSection;

export interface BusinessConfig {
  type: BusinessType;
  /** UI variant (classic/luxe) - used for styling & motion tuning. */
  variant: Variant;
  /** Override theme (e.g. "candle-classic"). When set, used instead of type-based theme. */
  themeId?: string;
  /** Animation flags/config. */
  animations: { enabled: boolean };
  /** Ordered list of sections to render. */
  sections: AnySection[];
}

