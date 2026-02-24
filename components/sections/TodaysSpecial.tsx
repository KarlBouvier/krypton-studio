import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TodaysSpecialConfig } from "@/lib/types";

interface TodaysSpecialProps {
  config: TodaysSpecialConfig;
  className?: string;
}

export function TodaysSpecial({ config, className }: TodaysSpecialProps) {
  return (
    <section
      id="todays-special"
      className={cn(
        "border-t border-border bg-primary/10 py-10 md:py-14",
        className
      )}
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-primary/30 bg-card px-6 py-8 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left md:px-10 md:py-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                Plat du jour
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                {config.title}
              </h2>
              {config.description && (
                <p className="mt-2 text-muted-foreground">
                  {config.description}
                </p>
              )}
              {config.price && (
                <p className="mt-2 text-lg font-semibold text-primary">
                  {config.price}
                </p>
              )}
            </div>
          </div>
          {config.ctaText && config.ctaHref && (
            <Button asChild size="lg" className="shrink-0">
              <Link href={config.ctaHref}>{config.ctaText}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
