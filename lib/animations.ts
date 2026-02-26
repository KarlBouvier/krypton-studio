import type { Variant } from "./types";

/** Lightweight transition presets. luxe = refined/slower, classic = minimal/fast. */
export function getTransition(variant: Variant) {
  return variant === "luxe"
    ? { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const }
    : { duration: 0.2, ease: "easeOut" as const };
}

/** Scroll-in: luxe uses slightly more movement. */
export function getScrollInTransition(variant: Variant) {
  return variant === "luxe"
    ? { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
    : { duration: 0.25, ease: "easeOut" as const };
}

/** Step transition (BookingForm): luxe = smoother. */
export function getStepTransition(variant: Variant) {
  return variant === "luxe"
    ? { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }
    : { duration: 0.2, ease: "easeOut" as const };
}

/** Hover scale: subtle, same for both (avoid layout shift). */
export const HOVER_SCALE = 1.02;
export const TAP_SCALE = 0.98;
