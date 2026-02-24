import { cn } from "@/lib/utils";
import type { TestimonialsConfig } from "@/lib/types";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  config: TestimonialsConfig;
  className?: string;
}

export function Testimonials({ config, className }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
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
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {config.items.map((item, i) => (
            <li
              key={i}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="h-8 w-8 text-primary/50" />
              <p className="mt-4 text-foreground">{item.quote}</p>
              <p className="mt-4 font-medium text-foreground">{item.author}</p>
              {item.role && (
                <p className="text-sm text-muted-foreground">{item.role}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
