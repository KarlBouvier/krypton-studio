import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FooterConfig } from "@/lib/types";

interface FooterProps {
  config: FooterConfig;
  className?: string;
}

const DEVELOPED_BY_URL = "https://www.kryptonconsult.com/";

export function Footer({ config, className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-border bg-muted/50 py-12 md:py-16",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            {config.tagline && (
              <p className="font-medium text-foreground">{config.tagline}</p>
            )}
            <p className="mt-1 text-sm text-muted-foreground">{config.copyright}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Développé par{" "}
              <Link
                href={DEVELOPED_BY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                KryptonConsult
              </Link>
            </p>
          </div>
          {config.links && config.links.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-6 md:justify-end">
              {config.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
