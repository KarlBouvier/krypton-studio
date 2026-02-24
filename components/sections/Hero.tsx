import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HeroConfig } from "@/lib/types";

interface HeroProps {
  config: HeroConfig;
  className?: string;
}

export function Hero({ config, className }: HeroProps) {
  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:min-h-[80vh]",
        className
      )}
    >
      <div className="container mx-auto max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {config.title}
        </h1>
        {config.subtitle && (
          <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
            {config.subtitle}
          </p>
        )}
        {config.ctaText && config.ctaHref && (
          <div className="pt-4">
            <Button asChild size="lg" className="text-base">
              <Link href={config.ctaHref}>{config.ctaText}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
