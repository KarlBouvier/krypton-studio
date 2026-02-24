# Theme system

Centralized theme handling for **luxe** and **classic** variants.

## Semantic tokens

| Token | CSS variable | Tailwind | Purpose |
|-------|--------------|----------|---------|
| `background.primary` | `--background-primary` | `bg-background-primary` | Page/section background |
| `text.primary` | `--text-primary` | `text-text-primary` | Main text color |
| `accent.primary` | `--accent-primary` | `bg-accent-primary`, `text-accent-primary` | CTAs, links, highlights |

Components that use these utilities adapt automatically when the theme class changes on a parent (e.g. `theme-warm`, `theme-luxe`, `theme-coiffeur`).

## Usage

```ts
import { getThemeClass, getThemeId, getThemeTokens, THEMES } from "@/lib/theme";

// Get root class for layout (variant + sector)
const themeClass = getThemeClass("luxe", "coiffeur"); // "theme-coiffeur theme-luxe"

// Get theme ID for lookups
const themeId = getThemeId("luxe", "coiffeur"); // "coiffeur-luxe"

// Get token values (HSL strings)
const tokens = getThemeTokens(themeId);
// { backgroundPrimary: "0 0% 4%", textPrimary: "43 20% 95%", accentPrimary: "43 96% 56%" }
```

## Theme IDs

- `default` — fallback
- `warm-classic` / `warm-luxe` — restaurant, pizzeria
- `coiffeur-classic` / `coiffeur-luxe` — coiffeur

Token values are defined in `config.ts` and mirrored in `app/globals.css` for each theme class.
