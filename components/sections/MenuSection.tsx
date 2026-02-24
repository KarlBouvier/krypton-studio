import { cn } from "@/lib/utils";
import type { MenuConfig } from "@/lib/types";

interface MenuSectionProps {
  config: MenuConfig;
  className?: string;
}

export function MenuSection({ config, className }: MenuSectionProps) {
  return (
    <section
      id="menu"
      className={cn(
        "border-t border-border bg-muted/30 py-16 md:py-24",
        className
      )}
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
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
        <div className="mt-12 space-y-14">
          {config.categories.map((category) => (
            <div key={category.id}>
              <h3 className="mb-6 border-b border-border pb-2 text-xl font-semibold text-foreground sm:text-2xl">
                {category.name}
              </h3>
              <ul className="space-y-5">
                {category.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div>
                      <span className="font-medium text-foreground">
                        {item.name}
                      </span>
                      {item.description && (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.price && (
                      <span className="shrink-0 text-primary font-medium">
                        {item.price}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
