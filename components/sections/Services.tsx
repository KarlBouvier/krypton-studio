import { cn } from "@/lib/utils";
import type { ServicesConfig } from "@/lib/types";
import { UtensilsCrossed, Pizza, Scissors } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  default: UtensilsCrossed,
  restaurant: UtensilsCrossed,
  pizzeria: Pizza,
  coiffeur: Scissors,
};

interface ServicesProps {
  config: ServicesConfig;
  sector?: string;
  className?: string;
}

export function Services({ config, sector = "default", className }: ServicesProps) {
  const Icon = iconMap[sector] ?? iconMap.default;

  return (
    <section
      id="services"
      className={cn("border-t border-border bg-muted/30 py-16 md:py-24", className)}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">{config.subtitle}</p>
          )}
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {config.items.map((item, i) => (
            <li
              key={i}
              className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
