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
  gallery: GalleryConfig;
  testimonials: TestimonialsConfig;
  footer: FooterConfig;
  booking?: BookingConfig;
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
