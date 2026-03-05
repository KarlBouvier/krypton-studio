import { notFound } from "next/navigation";
import { SectionRenderer } from "@/lib/builder/SectionRenderer";
import { loadTemplate, type TemplateId } from "@/lib/builder/templates";
import { getThemeId } from "@/lib/theme";
import type { ThemeVariant } from "@/lib/theme";

function mapBusinessTypeToThemeSector(type: string): string | undefined {
  if (type === "restaurant") return "restaurant";
  if (type === "hairdresser") return "coiffeur";
  if (type === "bookstore") return "bookstore";
  return undefined;
}

export default async function BuilderTemplatePage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;

  let business;
  try {
    business = await loadTemplate(template as TemplateId);
  } catch {
    notFound();
  }

  const themeId =
    business.themeId ??
    getThemeId(
      business.variant as unknown as ThemeVariant,
      mapBusinessTypeToThemeSector(business.type)
    );

  return (
    <div
      data-theme={themeId}
      className="min-h-screen bg-background-primary text-text-primary font-sans antialiased"
    >
      <SectionRenderer
        sections={business.sections}
        variant={business.variant}
        animationsEnabled={business.animations.enabled}
      />
    </div>
  );
}

