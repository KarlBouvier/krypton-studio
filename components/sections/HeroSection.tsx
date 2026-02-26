import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animations";
import { cn } from "@/lib/utils";
import {
  getSectionContainerClasses,
  getSectionTitleClasses,
  getSectionSubtitleClasses,
} from "@/lib/sectionStyles";
import type { HeroConfig } from "@/lib/types";
import type { Variant } from "@/lib/types";

export interface HeroSectionProps {
  config: HeroConfig;
  variant: Variant;
  sectionId?: string;
  className?: string;
  animationsEnabled?: boolean;
}

export function HeroSection({
  config,
  variant,
  sectionId = "hero",
  className,
  animationsEnabled = false,
}: HeroSectionProps) {
  const hasBgImage = Boolean(config.image?.trim());

  return (
    <AnimateOnScroll
      enabled={animationsEnabled}
      variant={variant}
      as="section"
      id={sectionId}
      className={cn(
        getSectionContainerClasses(
          variant,
          "relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:min-h-[80vh]",
          { noPadding: true }
        ),
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
              : "text-foreground",
            variant === "luxe" && "tracking-wide"
          )}
        >
          {config.title}
        </h1>
        {config.subtitle && (
          <p
            className={cn(
              getSectionSubtitleClasses(),
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
    </AnimateOnScroll>
  );
}
