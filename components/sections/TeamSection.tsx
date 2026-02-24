import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TeamConfig } from "@/lib/types";
import { User } from "lucide-react";

interface TeamSectionProps {
  config: TeamConfig;
  className?: string;
}

export function TeamSection({ config, className }: TeamSectionProps) {
  return (
    <section
      id="team"
      className={cn(
        "border-t border-border bg-background py-16 md:py-24",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">
              {config.subtitle}
            </p>
          )}
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {config.members.map((member, i) => (
            <li
              key={i}
              className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm"
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
                    <User className="h-14 w-14" />
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
