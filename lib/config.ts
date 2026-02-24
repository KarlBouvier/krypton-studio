import type { SiteConfig } from "./types";

const configCache = new Map<string, SiteConfig>();

export function getConfigPath(sector: string, variant: string): string {
  return `${sector}-${variant}`;
}

const configLoaders: Record<
  string,
  () => Promise<{ default: SiteConfig }>
> = {
  "restaurant-luxe": () =>
    import("@/config/restaurant-luxe.json").then((m) => ({ default: m.default as SiteConfig })),
  "restaurant-classic": () =>
    import("@/config/restaurant-classic.json").then((m) => ({ default: m.default as SiteConfig })),
  "pizzeria-luxe": () =>
    import("@/config/pizzeria-luxe.json").then((m) => ({ default: m.default as SiteConfig })),
  "pizzeria-classic": () =>
    import("@/config/pizzeria-classic.json").then((m) => ({ default: m.default as SiteConfig })),
  "coiffeur-luxe": () =>
    import("@/config/coiffeur-luxe.json").then((m) => ({ default: m.default as SiteConfig })),
  "coiffeur-classic": () =>
    import("@/config/coiffeur-classic.json").then((m) => ({ default: m.default as SiteConfig })),
};

export async function loadConfig(
  sector: string,
  variant: string
): Promise<SiteConfig | null> {
  const key = getConfigPath(sector, variant);
  if (configCache.has(key)) {
    return configCache.get(key)!;
  }
  const loader = configLoaders[key];
  if (!loader) return null;
  try {
    const mod = await loader();
    const data = mod.default as SiteConfig;
    configCache.set(key, data);
    return data;
  } catch {
    return null;
  }
}

export function getThemeClass(variant: string, sector?: string): string {
  const luxe = variant === "luxe" ? " theme-luxe" : "";
  if (sector === "restaurant" || sector === "pizzeria") {
    return `theme-warm${luxe}`.trim();
  }
  if (sector === "coiffeur") {
    return `theme-coiffeur${luxe}`.trim();
  }
  return luxe.trim() || "";
}

export function getAvailableDemos(): { sector: string; variant: string }[] {
  return Object.keys(configLoaders).map((key) => {
    const [sector, variant] = key.split("-");
    return { sector, variant };
  });
}
