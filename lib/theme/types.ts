/**
 * Semantic theme tokens.
 * All values are HSL triplets (e.g. "0 0% 100%") for use with hsl(var(--token)).
 */
export interface ThemeTokens {
  /** background.primary — page/section background */
  backgroundPrimary: string;
  /** text.primary — main text color */
  textPrimary: string;
  /** accent.primary — CTAs, links, highlights */
  accentPrimary: string;
}

/** Variant: luxe (premium, dark/gold) vs classic (light, minimal) */
export type ThemeVariant = "luxe" | "classic";

/** Sector determines which theme family applies (warm, coiffeur, default) */
export type ThemeSector = "restaurant" | "pizzeria" | "coiffeur";

/** Theme ID — maps to a CSS class combination */
export type ThemeId =
  | "default"
  | "warm-classic"
  | "warm-luxe"
  | "coiffeur-classic"
  | "coiffeur-luxe";

/** Semantic token keys for type-safe usage */
export const SEMANTIC_TOKEN_KEYS = [
  "backgroundPrimary",
  "textPrimary",
  "accentPrimary",
] as const;

export type SemanticTokenKey = (typeof SEMANTIC_TOKEN_KEYS)[number];
