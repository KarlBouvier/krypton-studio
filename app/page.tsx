import Link from "next/link";
import {
  ArrowRight,
  UtensilsCrossed,
  Pizza,
  Scissors,
  BookOpen,
  Flame,
} from "lucide-react";

const INDEX_ITEMS: {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}[] = [
  {
    id: "restaurant-luxe",
    title: "Table gastronomique",
    subtitle: "Fine dining & expérience raffinée",
    href: "/restaurant/luxe",
    icon: UtensilsCrossed,
    accent: "from-amber-500/20 to-orange-600/10",
  },
  {
    id: "restaurant-pizzeria",
    title: "Pizza & convivialité",
    subtitle: "Pizzeria au feu de bois, contact direct",
    href: "/builder/restaurant-pizzeria",
    icon: Pizza,
    accent: "from-red-500/20 to-rose-600/10",
  },
  {
    id: "pizzeria-luxe",
    title: "Pizzeria d'exception",
    subtitle: "Ambiance premium, carte soignée",
    href: "/pizzeria/luxe",
    icon: Pizza,
    accent: "from-amber-600/20 to-yellow-700/10",
  },
  {
    id: "coiffeur-luxe",
    title: "Haute coiffure",
    subtitle: "Salon premium & rendez-vous",
    href: "/coiffeur/luxe",
    icon: Scissors,
    accent: "from-slate-600/20 to-zinc-700/10",
  },
  {
    id: "bookstore-cozy",
    title: "Librairie de quartier",
    subtitle: "Livres, douceur & coups de cœur",
    href: "/builder/bookstore-cozy",
    icon: BookOpen,
    accent: "from-emerald-600/20 to-teal-700/10",
  },
  {
    id: "shop-showcase",
    title: "Bougies fait main",
    subtitle: "Créatrice artisanale, senteurs & flamme",
    href: "/builder/shop-showcase",
    icon: Flame,
    accent: "from-pink-400/20 to-rose-500/10",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <main className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Krypton Studio
          </h1>
          <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
            Sites vitrines pour commerces locaux. Choisissez une démo pour découvrir.
          </p>
        </header>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDEX_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${item.accent}`}
                    aria-hidden
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Voir la démo
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="https://www.kryptonconsult.com/" target="_blank" className="mt-16 text-center text-sm text-muted-foreground hover:text-primary underline">
          Propulsé par KryptonConsult
        </Link>
      </main>
    </div>
  );
}
