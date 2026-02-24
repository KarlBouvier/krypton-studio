"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BookingConfig } from "@/lib/types";

interface BookingFormProps {
  config: BookingConfig;
  className?: string;
}

export function BookingForm({ config, className }: BookingFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
    };

    setStatus("loading");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(json.message ?? "Une erreur est survenue.");
        return;
      }

      setStatus("success");
      setMessage(config.successMessage);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion. Réessayez plus tard.");
    }
  }

  return (
    <section id="booking" className={cn("border-t border-border py-16 md:py-24", className)}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">{config.subtitle}</p>
          )}
        </div>
        <div className="mx-auto mt-12 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="sr-only">{config.title}</CardTitle>
              <CardDescription className="sr-only">{config.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <div className="rounded-md border border-green-200 bg-green-50 p-4 text-center text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200">
                  {message}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
                      Nom
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jean Dupont"
                      disabled={status === "loading"}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jean@exemple.fr"
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="mb-1 block text-sm font-medium text-foreground">
                        Date
                      </label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="mb-1 block text-sm font-medium text-foreground">
                        Heure
                      </label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-destructive">{message}</p>
                  )}
                  <Button type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Envoi en cours…" : "Envoyer la demande"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
