import type { ThemeId, ThemeTokens, ThemeVariant, ThemeSector } from "./types";

/**
 * Centralized theme configuration.
 * Semantic tokens (background.primary, text.primary, accent.primary) per theme.
 * Values are HSL triplets without "hsl()" — used in CSS as hsl(var(--name)).
 */
export const THEMES: Record<ThemeId, ThemeTokens> = {
  default: {
    backgroundPrimary: "0 0% 100%",
    textPrimary: "222.2 84% 4.9%",
    accentPrimary: "222.2 47.4% 11.2%",
  },
  "warm-classic": {
    backgroundPrimary: "30 25% 98%",
    textPrimary: "20 14% 12%",
    accentPrimary: "24 95% 53%",
  },
  "warm-luxe": {
    backgroundPrimary: "10 15% 8%",
    textPrimary: "30 20% 96%",
    accentPrimary: "43 96% 56%",
  },
  "coiffeur-classic": {
    backgroundPrimary: "0 0% 100%",
    textPrimary: "0 0% 9%",
    accentPrimary: "0 0% 9%",
  },
  "coiffeur-luxe": {
    backgroundPrimary: "0 0% 4%",
    textPrimary: "43 20% 95%",
    accentPrimary: "43 96% 56%",
  },
};

/**
 * Returns the theme ID for a given variant and sector.
 * Used to look up tokens and to derive the theme class.
 */
export function getThemeId(
  variant: ThemeVariant,
  sector?: string
): ThemeId {
  if (sector === "restaurant" || sector === "pizzeria") {
    return variant === "luxe" ? "warm-luxe" : "warm-classic";
  }
  if (sector === "coiffeur") {
    return variant === "luxe" ? "coiffeur-luxe" : "coiffeur-classic";
  }
  return "default";
}

/**
 * Returns the theme ID for the root element (data-theme attribute).
 * Use this so CSS [data-theme="..."] selectors apply reliably.
 */
export function getThemeClass(variant: string, sector?: string): string {
  return getThemeId(variant as ThemeVariant, sector);
}

/**
 * Returns semantic tokens for a theme (e.g. for runtime or tooling).
 */
export function getThemeTokens(themeId: ThemeId): ThemeTokens {
  return THEMES[themeId];
}
