import { Phone, Mail } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animations";
import { cn } from "@/lib/utils";
import {
  getSectionContainerClasses,
  getSectionTitleClasses,
  getSectionSubtitleClasses,
} from "@/lib/sectionStyles";
import type { Variant } from "@/lib/types";

export interface ContactConfig {
  title: string;
  subtitle?: string;
  phone: string;
  email?: string;
}

export interface ContactSectionProps {
  config: ContactConfig;
  variant: Variant;
  sectionId?: string;
  className?: string;
  animationsEnabled?: boolean;
}

export function ContactSection({
  config,
  variant,
  sectionId = "contact",
  className,
  animationsEnabled = false,
}: ContactSectionProps) {
  return (
    <AnimateOnScroll
      enabled={animationsEnabled}
      variant={variant}
      as="section"
      id={sectionId}
      className={cn(
        getSectionContainerClasses(variant, "border-t border-border"),
        className
      )}
    >
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <h2 className={getSectionTitleClasses(variant)}>{config.title}</h2>
        {config.subtitle && (
          <p className={getSectionSubtitleClasses()}>{config.subtitle}</p>
        )}
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          <a
            href={`tel:${config.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-6 py-4 text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Phone className="h-5 w-5 shrink-0 text-primary" />
            <span className="font-medium">{config.phone}</span>
          </a>
          {config.email && (
            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-6 py-4 text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <span className="font-medium">{config.email}</span>
            </a>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
