import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-2xl font-bold text-foreground">Démo introuvable</h1>
      <p className="text-muted-foreground">
        Ce secteur ou cette variante n’existe pas. Revenez à l’accueil pour choisir un démo.
      </p>
      <Button asChild>
        <Link href="/">Retour à l’accueil</Link>
      </Button>
    </div>
  );
}
