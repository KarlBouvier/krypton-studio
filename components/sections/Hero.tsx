import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HeroConfig } from "@/lib/types";

interface HeroProps {
  config: HeroConfig;
  className?: string;
}

export function Hero({ config, className }: HeroProps) {
  const hasBgImage = Boolean(config.image?.trim());

  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:min-h-[80vh]",
        hasBgImage && "min-h-[80vh] md:min-h-[90vh]",
        className
      )}
    >
      {hasBgImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={config.image!}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-black/50" aria-hidden />
        </>
      )}
      <div className="container relative z-10 mx-auto max-w-4xl space-y-6">
        <h1
          className={cn(
            "text-4xl font-bold tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl",
            hasBgImage
              ? "text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
              : "text-foreground"
          )}
        >
          {config.title}
        </h1>
        {config.subtitle && (
          <p
            className={cn(
              "text-lg sm:text-xl md:text-2xl",
              hasBgImage
                ? "text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]"
                : "text-muted-foreground"
            )}
          >
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
