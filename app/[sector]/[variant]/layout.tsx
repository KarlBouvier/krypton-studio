import { getThemeClass } from "@/lib/config";

export default async function SectorVariantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ sector: string; variant: string }>;
}) {
  const { sector, variant } = await params;
  const themeClass = getThemeClass(variant, sector);

  return (
    <div className={themeClass}>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </div>
    </div>
  );
}
