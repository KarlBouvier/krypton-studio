import { getThemeId } from "@/lib/theme";
import type { ThemeVariant } from "@/lib/theme";

export default async function SectorVariantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ sector: string; variant: string }>;
}) {
  const { sector, variant } = await params;
  const themeId = getThemeId(variant as ThemeVariant, sector);

  return (
    <div
      data-theme={themeId}
      className="min-h-screen bg-background-primary text-text-primary font-sans antialiased"
    >
      {children}
    </div>
  );
}
