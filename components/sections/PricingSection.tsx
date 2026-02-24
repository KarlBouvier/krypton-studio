import { cn } from "@/lib/utils";
import {
  getSectionContainerClasses,
  getSectionTitleClasses,
  getSectionSubtitleClasses,
} from "@/lib/sectionStyles";
import type { PricingConfig } from "@/lib/types";
import type { Variant } from "@/lib/types";

export interface PricingSectionProps {
  config: PricingConfig;
  variant: Variant;
  sectionId?: string;
  className?: string;
}

export function PricingSection({
  config,
  variant,
  sectionId = "pricing",
  className,
}: PricingSectionProps) {
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
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={getSectionTitleClasses(variant)}>{config.title}</h2>
          {config.subtitle && (
            <p className={getSectionSubtitleClasses()}>{config.subtitle}</p>
          )}
        </div>
        <ul className="mt-12 space-y-4 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          {config.items.map((item, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 border-b border-border px-6 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="font-medium text-foreground">
                  {item.name}
                </span>
                {item.description && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-lg font-semibold text-primary">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
