import { cn } from "@/lib/utils";
import {
  getSectionContainerClasses,
  getSectionTitleClasses,
  getSectionSubtitleClasses,
  getCardClasses,
} from "@/lib/sectionStyles";
import type { ServicesConfig } from "@/lib/types";
import type { Variant } from "@/lib/types";
import { UtensilsCrossed, Pizza, Scissors } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  default: UtensilsCrossed,
  restaurant: UtensilsCrossed,
  pizzeria: Pizza,
  coiffeur: Scissors,
};

export interface ServicesSectionProps {
  config: ServicesConfig;
  variant: Variant;
  /** Optional sector for icon choice (restaurant, pizzeria, coiffeur) */
  sector?: string;
  sectionId?: string;
  className?: string;
}

export function ServicesSection({
  config,
  variant,
  sector = "default",
  sectionId = "services",
  className,
}: ServicesSectionProps) {
  const Icon = iconMap[sector] ?? iconMap.default;

  return (
    <section
      id={sectionId}
      className={cn(
        getSectionContainerClasses(
          variant,
          "border-t border-border bg-muted/30"
        ),
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={getSectionTitleClasses(variant)}>{config.title}</h2>
          {config.subtitle && (
            <p className={getSectionSubtitleClasses()}>{config.subtitle}</p>
          )}
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {config.items.map((item, i) => (
            <li
              key={i}
              className={cn(
                getCardClasses(variant),
                "p-6 transition-shadow hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
