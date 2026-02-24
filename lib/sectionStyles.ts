import type { Variant } from "./types";
import { cn } from "./utils";

/**
 * Variant-based section container styles.
 * One padding string per variant to avoid conflicting Tailwind classes.
 */
export function getSectionContainerClasses(
  variant: Variant,
  baseClasses: string,
  options?: { noPadding?: boolean }
): string {
  if (options?.noPadding) {
    return baseClasses;
  }
  const padding =
    variant === "luxe"
      ? "py-16 md:py-24 lg:py-28"
      : "py-16 md:py-24";
  return cn(baseClasses, padding);
}

/** Heading (h2) style for section titles — uses semantic text.primary */
export function getSectionTitleClasses(variant: Variant): string {
  return cn(
    "text-3xl font-bold tracking-tight text-text-primary sm:text-4xl",
    variant === "luxe" && "tracking-wide",
    variant === "classic" && "font-semibold"
  );
}

/** Subtitle (p) style below section title */
export function getSectionSubtitleClasses(): string {
  return "mt-4 text-lg text-muted-foreground";
}

/** Card/list item style that can vary by variant */
export function getCardClasses(variant: Variant): string {
  return cn(
    "rounded-lg border border-border bg-card shadow-sm",
    variant === "luxe" && "shadow-md",
    variant === "classic" && "transition-shadow hover:shadow-md"
  );
}
