import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryConfig } from "@/lib/types";

interface GalleryProps {
  config: GalleryConfig;
  className?: string;
}

export function Gallery({ config, className }: GalleryProps) {
  return (
    <section
      id="gallery"
      className={cn("border-t border-border py-16 md:py-24", className)}
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
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/2] overflow-hidden rounded-lg border border-border bg-muted"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
