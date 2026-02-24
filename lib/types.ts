export type Sector = "restaurant" | "pizzeria" | "coiffeur";
export type Variant = "luxe" | "classic";

export interface SiteConfig {
  sector: Sector;
  variant: Variant;
  siteName: string;
  tagline?: string;
  nav: NavConfig;
  hero: HeroConfig;
  services: ServicesConfig;
  /** Restaurant/pizzeria: menu with categories. When present, can replace or complement services. */
  menu?: MenuConfig;
  gallery: GalleryConfig;
  /** Restaurant/pizzeria: opening hours block */
  openingHours?: OpeningHoursConfig;
  /** Coiffeur: pricing list */
  pricing?: PricingConfig;
  /** Coiffeur: team members */
  team?: TeamConfig;
  testimonials: TestimonialsConfig;
  footer: FooterConfig;
  booking?: BookingConfig;
  /** Restaurant/pizzeria: today's special highlight */
  todaysSpecial?: TodaysSpecialConfig;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

export interface MenuConfig {
  title: string;
  subtitle?: string;
  categories: MenuCategory[];
}

export interface OpeningHoursConfig {
  title: string;
  subtitle?: string;
  days: { label: string; hours: string }[];
}

export interface TodaysSpecialConfig {
  title: string;
  description?: string;
  price?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface NavConfig {
  logoText: string;
  links: { label: string; href: string }[];
}

export interface HeroConfig {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

export interface ServicesConfig {
  title: string;
  subtitle?: string;
  items: ServiceItem[];
}

export interface GalleryConfig {
  title: string;
  subtitle?: string;
  images: { src: string; alt: string }[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
}

export interface TestimonialsConfig {
  title: string;
  subtitle?: string;
  items: TestimonialItem[];
}

export interface FooterConfig {
  tagline?: string;
  copyright: string;
  links?: { label: string; href: string }[];
}

export interface BookingConfig {
  title: string;
  subtitle?: string;
  successMessage: string;
}

export interface PricingItem {
  name: string;
  description?: string;
  price: string;
}

export interface PricingConfig {
  title: string;
  subtitle?: string;
  items: PricingItem[];
}

export interface TeamMember {
  name: string;
  role?: string;
  image?: string;
  bio?: string;
}

export interface TeamConfig {
  title: string;
  subtitle?: string;
  members: TeamMember[];
}
