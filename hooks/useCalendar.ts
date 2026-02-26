import { useState, useMemo, useCallback } from "react";
import type { BookingConfig } from "@/lib/types";
import { getAvailableSlotsForDate } from "./useAvailableSlots";

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isClosed: boolean;
  /** Jour entièrement réservé (plus de créneaux). */
  isFullDay: boolean;
  hasAvailability: boolean;
  dateKey: string;
}

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b);
}

export interface UseCalendarResult {
  viewDate: Date;
  viewMonthLabel: string;
  viewYear: number;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  prevMonth: () => void;
  nextMonth: () => void;
  calendarDays: CalendarDay[];
  isDayDisabled: (day: CalendarDay) => boolean;
  isDaySelectable: (day: CalendarDay) => boolean;
}

const MONTH_LABELS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

/**
 * Calendar state for the booking date picker: view month, selected date,
 * and day metadata (past, closed, has availability).
 */
export function useCalendar(config: BookingConfig): UseCalendarResult {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const closedDays = useMemo(
    () => new Set(config.closedDays ?? []),
    [config.closedDays]
  );
  const fullDaysSet = useMemo(
    () => new Set(config.fullDays ?? []),
    [config.fullDays]
  );

  const prevMonth = useCallback(() => {
    setViewDate((d) => {
      const next = new Date(d);
      next.setMonth(next.getMonth() - 1);
      return next;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewDate((d) => {
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  }, []);

  const viewYear = viewDate.getFullYear();
  const viewMonthLabel = MONTH_LABELS[viewDate.getMonth()] ?? "";

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startDow = first.getDay();
    const daysInMonth = last.getDate();
    const result: CalendarDay[] = [];
    // Monday = first day of week: lead with prev month cells
    const leadDays = (startDow - 1 + 7) % 7;

    for (let i = 0; i < leadDays; i++) {
      const d = new Date(year, month, 1 - leadDays + i);
      const dateKey = toDateKey(d);
      const isPast = d < today;
      const isClosed = closedDays.has(d.getDay());
      const isFullDay = fullDaysSet.has(dateKey);
      const hasAvailability =
        !isPast && !isClosed && !isFullDay && getAvailableSlotsForDate(d, config).length > 0;
      result.push({
        date: d,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        isPast,
        isClosed,
        isFullDay,
        hasAvailability,
        dateKey,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dateKey = toDateKey(d);
      const isPast = d < today;
      const isClosed = closedDays.has(d.getDay());
      const isFullDay = fullDaysSet.has(dateKey);
      const hasAvailability =
        !isPast && !isClosed && !isFullDay && getAvailableSlotsForDate(d, config).length > 0;
      result.push({
        date: d,
        isCurrentMonth: true,
        isToday: isSameDay(d, today),
        isPast,
        isClosed,
        isFullDay,
        hasAvailability,
        dateKey,
      });
    }

    const remaining = 42 - result.length;
    for (let i = 0; i < remaining; i++) {
      const d = new Date(year, month + 1, i + 1);
      const dateKey = toDateKey(d);
      const isPast = d < today;
      const isClosed = closedDays.has(d.getDay());
      const isFullDay = fullDaysSet.has(dateKey);
      const hasAvailability =
        !isPast && !isClosed && !isFullDay && getAvailableSlotsForDate(d, config).length > 0;
      result.push({
        date: d,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        isPast,
        isClosed,
        isFullDay,
        hasAvailability,
        dateKey,
      });
    }

    return result;
  }, [viewDate, today, closedDays, fullDaysSet, config]);

  const isDayDisabled = useCallback(
    (day: CalendarDay): boolean => day.isPast || day.isClosed || day.isFullDay,
    []
  );

  const isDaySelectable = useCallback(
    (day: CalendarDay): boolean =>
      !day.isPast && !day.isClosed && day.hasAvailability,
    []
  );

  return {
    viewDate,
    viewMonthLabel,
    viewYear,
    selectedDate,
    setSelectedDate,
    prevMonth,
    nextMonth,
    calendarDays,
    isDayDisabled,
    isDaySelectable,
  };
}
