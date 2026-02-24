import { getThemeClass } from "@/lib/config";

export default async function SectorVariantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ sector: string; variant: string }>;
}) {
  const { variant } = await params;
  const themeClass = getThemeClass(variant);

  return (
    <div className={themeClass}>
      <div className="min-h-screen bg-background text-foreground">{children}</div>
    </div>
  );
}
