import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getSectionContainerClasses,
  getSectionTitleClasses,
  getSectionSubtitleClasses,
} from "@/lib/sectionStyles";
import type { GalleryConfig } from "@/lib/types";
import type { Variant } from "@/lib/types";
import { AnimateOnScroll, ScaleOnHover } from "@/components/ui/animations";

export interface GallerySectionProps {
  config: GalleryConfig;
  variant: Variant;
  sectionId?: string;
  className?: string;
  animationsEnabled?: boolean;
}

export function GallerySection({
  config,
  variant,
  sectionId = "gallery",
  className,
  animationsEnabled = false,
}: GallerySectionProps) {
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
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={getSectionTitleClasses(variant)}>{config.title}</h2>
          {config.subtitle && (
            <p className={getSectionSubtitleClasses()}>{config.subtitle}</p>
          )}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.images.map((img, i) => (
            <ScaleOnHover key={i} enabled={animationsEnabled}>
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-border bg-muted">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </ScaleOnHover>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
