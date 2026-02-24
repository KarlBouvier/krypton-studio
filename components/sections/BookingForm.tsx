"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getSectionContainerClasses,
  getSectionTitleClasses,
  getSectionSubtitleClasses,
} from "@/lib/sectionStyles";
import type { BookingConfig } from "@/lib/types";
import type { Variant } from "@/lib/types";

export interface BookingFormProps {
  config: BookingConfig;
  variant: Variant;
  sectionId?: string;
  className?: string;
}

export function BookingForm({
  config,
  variant,
  sectionId = "booking",
  className,
}: BookingFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const labels = config.formLabels;

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
        setMessage(json.message ?? (labels.errorGeneric ?? ""));
        return;
      }

      setStatus("success");
      setMessage(config.successMessage);
      form.reset();
    } catch {
      setStatus("error");
      setMessage(labels.connectionError ?? "");
    }
  }

  return (
    <section
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
        <div className="mx-auto mt-12 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="sr-only">{config.title}</CardTitle>
              <CardDescription className="sr-only">
                {config.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <div className="rounded-md border border-green-200 bg-green-50 p-4 text-center text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200">
                  {message}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      {labels.nameLabel}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={labels.namePlaceholder}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      {labels.emailLabel}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={labels.emailPlaceholder}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="date"
                        className="mb-1 block text-sm font-medium text-foreground"
                      >
                        {labels.dateLabel}
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
                      <label
                        htmlFor="time"
                        className="mb-1 block text-sm font-medium text-foreground"
                      >
                        {labels.timeLabel}
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
                  {status === "error" && message && (
                    <p className="text-sm text-destructive">{message}</p>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading"
                      ? labels.submittingLabel
                      : labels.submitLabel}
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
