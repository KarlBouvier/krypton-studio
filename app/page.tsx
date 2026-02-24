import Link from "next/link";
import { getAvailableDemos } from "@/lib/config";

export default function HomePage() {
  const demos = getAvailableDemos();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Krypton Studio
        </h1>
        <p className="mt-4 text-muted-foreground">
          Choisissez un secteur et une variante pour voir le démo.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map(({ sector, variant }) => (
            <li key={`${sector}-${variant}`}>
              <Link
                href={`/${sector}/${variant}`}
                className="block rounded-lg border border-border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="font-medium capitalize text-foreground">{sector}</span>
                <span className="ml-2 text-muted-foreground capitalize">— {variant}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
