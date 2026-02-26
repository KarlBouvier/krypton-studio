"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from "lucide-react";
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
import { useCalendar } from "@/hooks/useCalendar";
import { useAvailableSlots, useSlotsWithAvailability } from "@/hooks/useAvailableSlots";
import {
  AnimateOnScroll,
  AnimatePresence,
  StepTransition,
} from "@/components/ui/animations";

export interface BookingFormProps {
  config: BookingConfig;
  variant: Variant;
  sectionId?: string;
  className?: string;
  animationsEnabled?: boolean;
}

const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function BookingForm({
  config,
  variant,
  sectionId = "booking",
  className,
  animationsEnabled = false,
}: BookingFormProps) {
  const labels = config.formLabels;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const calendar = useCalendar(config);
  const { selectedDate, setSelectedDate, calendarDays, viewMonthLabel, viewYear, prevMonth, nextMonth, isDaySelectable, isDayDisabled } = calendar;
  const { slots, isLoading: slotsLoading } = useAvailableSlots(
    selectedDate,
    config
  );
  const slotsWithAvailability = useSlotsWithAvailability(selectedDate, config);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleNextFromDate = () => {
    if (selectedDate) setStep(2);
  };

  const handleNextFromTime = () => {
    if (selectedTime) setStep(3);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedTime(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      date: selectedDate ? toDateKey(selectedDate) : "",
      time: selectedTime ?? "",
    };

    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setMessage(config.successMessage);
      setStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      form.reset();
    } catch {
      setStatus("error");
      setMessage(labels.errorGeneric ?? "Une erreur est survenue.");
    }
  }

  return (
    <AnimateOnScroll
      enabled={animationsEnabled}
      variant={variant}
      as="section"
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
        <div className="mx-auto mt-12 max-w-lg">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    step >= 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {step > 1 ? "1" : <Calendar className="h-4 w-4" />}
                </span>
                <span className="h-0.5 w-6 rounded bg-border" />
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    step >= 2
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {step > 2 ? "2" : <Clock className="h-4 w-4" />}
                </span>
                <span className="h-0.5 w-6 rounded bg-border" />
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}
                >
                  <User className="h-4 w-4" />
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <div
                  className="rounded-lg border border-green-200 bg-green-50 p-6 text-center text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200"
                  role="status"
                >
                  <p className="font-medium">{message}</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {/* Step 1: Date */}
                  {step === 1 && (
                    <StepTransition
                      key={1}
                      step={1}
                      enabled={animationsEnabled}
                      variant={variant}
                    >
                      <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          {labels.dateLabel}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={prevMonth}
                            aria-label="Mois précédent"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <span className="min-w-[140px] text-center text-sm font-medium text-foreground">
                            {viewMonthLabel} {viewYear}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={nextMonth}
                            aria-label="Mois suivant"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
                        {WEEKDAY_LABELS.map((label) => (
                          <div key={label} className="py-1">
                            {label}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day) => {
                          const disabled = isDayDisabled(day);
                          const selectable = isDaySelectable(day);
                          return (
                            <button
                              key={day.dateKey}
                              type="button"
                              disabled={disabled}
                              onClick={() =>
                                selectable ? handleSelectDate(day.date) : undefined
                              }
                              className={cn(
                                "flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-md text-sm transition-colors sm:min-h-[4rem]",
                                !day.isCurrentMonth && "text-muted-foreground/60",
                                day.isToday &&
                                  "ring-1 ring-primary ring-offset-2 ring-offset-background",
                                selectable &&
                                  "hover:bg-accent hover:text-accent-foreground",
                                selectedDate &&
                                  toDateKey(selectedDate) === day.dateKey &&
                                  "bg-primary text-primary-foreground hover:bg-primary/90",
                                disabled &&
                                  "cursor-not-allowed opacity-60",
                                day.isClosed &&
                                  "bg-muted/50 text-muted-foreground",
                                day.isFullDay &&
                                  "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
                                !disabled &&
                                  !selectable &&
                                  day.isCurrentMonth &&
                                  !day.isClosed &&
                                  !day.isFullDay &&
                                  "cursor-default"
                              )}
                            >
                              <span className="font-medium">
                                {day.date.getDate()}
                              </span>
                              {day.isClosed && (
                                <span className="text-[10px] font-normal opacity-90">
                                  Fermé
                                </span>
                              )}
                              {day.isFullDay && !day.isClosed && (
                                <span className="text-[10px] font-normal opacity-90">
                                  Complet
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-muted" />
                          Fermé
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-amber-200 dark:bg-amber-800" />
                          Complet
                        </span>
                      </div>
                      <Button
                        type="button"
                        className="w-full"
                        disabled={!selectedDate}
                        onClick={handleNextFromDate}
                      >
                        Continuer
                      </Button>
                    </div>
                    </StepTransition>
                  )}

                  {/* Step 2: Time */}
                  {step === 2 && (
                    <StepTransition
                      key={2}
                      step={2}
                      enabled={animationsEnabled}
                      variant={variant}
                    >
                      <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          {labels.timeLabel}
                        </h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleBack}
                        >
                          Modifier la date
                        </Button>
                      </div>
                      {selectedDate && (
                        <p className="text-sm text-muted-foreground">
                          {selectedDate.toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      )}
                      {slotsLoading ? (
                        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                          Chargement…
                        </div>
                      ) : slotsWithAvailability.length === 0 ? (
                        <p className="rounded-lg border border-amber-200 bg-amber-50 py-4 text-center text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                          Aucun créneau disponible ce jour-là.
                        </p>
                      ) : (
                        <>
                          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                            {slotsWithAvailability.map(({ time, available }) =>
                              available ? (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setSelectedTime(time)}
                                  className={cn(
                                    "rounded-md border py-2 text-sm font-medium transition-colors",
                                    selectedTime === time
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border bg-background hover:border-primary/50 hover:bg-accent"
                                  )}
                                >
                                  {time}
                                </button>
                              ) : (
                                <div
                                  key={time}
                                  className="flex items-center justify-center rounded-md border border-dashed border-muted-foreground/30 bg-muted/30 py-2 text-sm text-muted-foreground"
                                  title="Créneau réservé ou indisponible"
                                >
                                  {time}
                                  <span className="sr-only"> — réservé</span>
                                </div>
                              )
                            )}
                          </div>
                          <p className="text-center text-xs text-muted-foreground">
                            Créneaux grisés = réservés ou indisponibles
                          </p>
                        </>
                      )}
                      <Button
                        type="button"
                        className="w-full"
                        disabled={!selectedTime || slots.length === 0}
                        onClick={handleNextFromTime}
                      >
                        Continuer
                      </Button>
                    </div>
                    </StepTransition>
                  )}

                  {/* Step 3: Info + Submit */}
                  {step === 3 && (
                    <StepTransition
                      key={3}
                      step={3}
                      enabled={animationsEnabled}
                      variant={variant}
                    >
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          Vos coordonnées
                        </h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleBack}
                        >
                          Changer l&apos;heure
                        </Button>
                      </div>
                      {selectedDate && selectedTime && (
                        <p className="text-sm text-muted-foreground">
                          {selectedDate.toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          à {selectedTime}
                        </p>
                      )}
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
                      <input
                        type="hidden"
                        name="date"
                        value={
                          selectedDate ? toDateKey(selectedDate) : ""
                        }
                      />
                      <input
                        type="hidden"
                        name="time"
                        value={selectedTime ?? ""}
                      />
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
                    </StepTransition>
                  )}
                </AnimatePresence>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
