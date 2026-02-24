import { cn } from "@/lib/utils";
import type { PricingConfig } from "@/lib/types";

interface PricingSectionProps {
  config: PricingConfig;
  className?: string;
}

export function PricingSection({ config, className }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className={cn(
        "border-t border-border bg-muted/30 py-16 md:py-24",
        className
      )}
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">
              {config.subtitle}
            </p>
          )}
        </div>
        <ul className="mt-12 space-y-4 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          {config.items.map((item, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 border-b border-border px-6 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="font-medium text-foreground">{item.name}</span>
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
