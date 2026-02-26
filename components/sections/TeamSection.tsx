import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getSectionContainerClasses,
  getSectionTitleClasses,
  getSectionSubtitleClasses,
  getCardClasses,
} from "@/lib/sectionStyles";
import type { TeamConfig } from "@/lib/types";
import type { Variant } from "@/lib/types";
import { User } from "lucide-react";
import { AnimateOnScroll, ScaleOnHover } from "@/components/ui/animations";

export interface TeamSectionProps {
  config: TeamConfig;
  variant: Variant;
  sectionId?: string;
  className?: string;
  animationsEnabled?: boolean;
}

export function TeamSection({
  config,
  variant,
  sectionId = "team",
  className,
  animationsEnabled = false,
}: TeamSectionProps) {
  return (
    <AnimateOnScroll
      enabled={animationsEnabled}
      variant={variant}
      as="section"
      id={sectionId}
      className={cn(
        getSectionContainerClasses(variant, "border-t border-border bg-background"),
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
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {config.members.map((member, i) => (
            <li key={i}>
              <ScaleOnHover enabled={animationsEnabled} className="h-full">
                <div
                  className={cn(
                    getCardClasses(variant),
                    "flex h-full flex-col items-center p-6 text-center"
                  )}
                >
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-border bg-muted">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <User className="h-14 w-14" aria-hidden />
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              {member.role && (
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>
              )}
              {member.bio && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {member.bio}
                </p>
              )}
                </div>
              </ScaleOnHover>
            </li>
          ))}
        </ul>
      </div>
    </AnimateOnScroll>
  );
}
