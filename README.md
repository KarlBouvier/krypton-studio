# KC Demos

Next.js 14 (App Router) MVP for showcasing multiple business website demos: restaurant, pizzeria, coiffeur — with **luxe** and **classic** variants.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Button, Input, Card)

## Routing

- **Home:** `/` — list of available demos
- **Demos:** `/[sector]/[variant]`

Examples:

- `/restaurant/luxe`
- `/restaurant/classic`
- `/pizzeria/classic`
- `/pizzeria/luxe`
- `/coiffeur/luxe`
- `/coiffeur/classic`

## Architecture

- **`/app/[sector]/[variant]/page.tsx`** — Dynamic page: loads config and renders shared sections
- **`/templates/{sector}/{variant}`** — Optional overrides per sector/variant (extend later)
- **`/components/ui`** — shadcn-style UI primitives
- **`/components/sections`** — Reusable sections: Navbar, Hero, Services, Gallery, BookingForm, Testimonials, Footer
- **`/lib`** — `config.ts` (load config, theme), `types.ts`, `utils.ts`
- **`/config`** — JSON files per sector/variant (e.g. `restaurant-luxe.json`)

## Content system

Each demo is driven by a JSON config:

- `config/restaurant-luxe.json`
- `config/restaurant-classic.json`
- `config/pizzeria-luxe.json`
- `config/pizzeria-classic.json`
- `config/coiffeur-luxe.json`
- `config/coiffeur-classic.json`

Content (nav, hero, services, gallery, testimonials, footer, booking) is fully data-driven.

## Themes

- **luxe:** dark background, gold accents (`theme-luxe` class on layout)
- **classic:** light, clean (default CSS variables)

## Booking (mock)

- Form: name, email, date, time
- POST `/api/book` — logs payload and returns success
- Success message from config (`booking.successMessage`)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then try e.g. `/restaurant/luxe` or `/coiffeur/classic`.

## Build

```bash
npm run build
npm run start
```

## Adding a new demo

1. Add a new config file in `/config`, e.g. `config/bistro-luxe.json`.
2. Register it in `lib/config.ts` in `configLoaders` and add the static import.
3. Optional: add a template in `templates/bistro/luxe.tsx` if you need a custom layout for that combo.
