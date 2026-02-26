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
  /** When true, enables subtle UI animations (fade-in, hover, step transitions). */
  animations?: { enabled?: boolean };
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
  /** Badge text above title (e.g. "Plat du jour", "Today's special") */
  badgeLabel: string;
  title: string;
  description?: string;
  price?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface NavConfig {
  logoText: string;
  links: { label: string; href: string }[];
  /** Accessibility: mobile menu button labels */
  menuOpenLabel?: string;
  menuCloseLabel?: string;
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

export interface BookingFormLabels {
  nameLabel: string;
  emailLabel: string;
  dateLabel: string;
  timeLabel: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  submitLabel: string;
  submittingLabel: string;
  errorGeneric?: string;
  connectionError?: string;
}

/** Day of week 0 = Sunday, 6 = Saturday. open/close in "HH:mm". */
export interface BookingOpeningHoursEntry {
  dayOfWeek: number;
  open: string;
  close: string;
}

/** Blocked time range on a specific date (YYYY-MM-DD). end optional = rest of day. */
export interface BookingBlockedSlot {
  date: string;
  start: string;
  end?: string;
}

export interface BookingConfig {
  title: string;
  subtitle?: string;
  successMessage: string;
  formLabels: BookingFormLabels;
  /** Slot length in minutes (e.g. 30). Default 30. */
  slotDurationMinutes?: number;
  /** Days closed: 0 = Sunday … 6 = Saturday. */
  closedDays?: number[];
  /** Opening hours per day for slot generation. If absent, defaults to Mon–Fri 9:00–18:00. */
  openingHours?: BookingOpeningHoursEntry[];
  /** Blocked time ranges on specific dates. */
  blockedSlots?: BookingBlockedSlot[];
  /** Dates (YYYY-MM-DD) that are fully booked (no slots). */
  fullDays?: string[];
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
