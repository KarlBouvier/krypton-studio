import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OpeningHoursConfig } from "@/lib/types";

interface OpeningHoursProps {
  config: OpeningHoursConfig;
  className?: string;
}

export function OpeningHours({ config, className }: OpeningHoursProps) {
  return (
    <section
      id="hours"
      className={cn(
        "border-t border-border bg-background py-16 md:py-24",
        className
      )}
    >
      <div className="container mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
            <Clock className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">
              {config.subtitle}
            </p>
          )}
        </div>
        <ul className="mt-10 space-y-3 rounded-lg border border-border bg-card p-6 shadow-sm">
          {config.days.map((day, i) => (
            <li
              key={i}
              className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <span className="font-medium text-foreground">{day.label}</span>
              <span className="text-muted-foreground">{day.hours}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
