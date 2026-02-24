import { cn } from "@/lib/utils";
import {
  getSectionContainerClasses,
  getSectionTitleClasses,
  getSectionSubtitleClasses,
  getCardClasses,
} from "@/lib/sectionStyles";
import type { TestimonialsConfig } from "@/lib/types";
import type { Variant } from "@/lib/types";
import { Quote } from "lucide-react";

export interface TestimonialsSectionProps {
  config: TestimonialsConfig;
  variant: Variant;
  sectionId?: string;
  className?: string;
}

export function TestimonialsSection({
  config,
  variant,
  sectionId = "testimonials",
  className,
}: TestimonialsSectionProps) {
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
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {config.items.map((item, i) => (
            <li key={i} className={cn(getCardClasses(variant), "p-6")}>
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
