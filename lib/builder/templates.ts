import type { BusinessConfig } from "./types";

export type TemplateId =
  | "restaurant-modern"
  | "restaurant-pizzeria"
  | "restaurant-gastro"
  | "hairdresser-minimal"
  | "bookstore-cozy"
  | "shop-showcase";

const templateLoaders: Record<TemplateId, () => Promise<{ default: BusinessConfig }>> = {
  "restaurant-modern": () =>
    import("@/templates/builder/restaurant-modern.json").then((m) => ({
      default: m.default as BusinessConfig,
    })),
  "restaurant-pizzeria": () =>
    import("@/templates/builder/restaurant-pizzeria.json").then((m) => ({
      default: m.default as BusinessConfig,
    })),
  "restaurant-gastro": () =>
    import("@/templates/builder/restaurant-gastro.json").then((m) => ({
      default: m.default as BusinessConfig,
    })),
  "hairdresser-minimal": () =>
    import("@/templates/builder/hairdresser-minimal.json").then((m) => ({
      default: m.default as BusinessConfig,
    })),
  "bookstore-cozy": () =>
    import("@/templates/builder/bookstore-cozy.json").then((m) => ({
      default: m.default as BusinessConfig,
    })),
  "shop-showcase": () =>
    import("@/templates/builder/shop-showcase.json").then((m) => ({
      default: m.default as BusinessConfig,
    })),
};

export async function loadTemplate(templateId: TemplateId): Promise<BusinessConfig> {
  const loader = templateLoaders[templateId];
  if (!loader) {
    throw new Error(`Unknown template: ${templateId}`);
  }
  const mod = await loader();
  return mod.default;
}

export function getAvailableTemplates(): TemplateId[] {
  return Object.keys(templateLoaders) as TemplateId[];
}

