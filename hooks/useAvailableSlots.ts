import { useMemo } from "react";
import type {
  BookingConfig,
  BookingOpeningHoursEntry,
  BookingBlockedSlot,
} from "@/lib/types";

const DEFAULT_OPENING_HOURS: BookingOpeningHoursEntry[] = [
  { dayOfWeek: 1, open: "09:00", close: "18:00" },
  { dayOfWeek: 2, open: "09:00", close: "18:00" },
  { dayOfWeek: 3, open: "09:00", close: "18:00" },
  { dayOfWeek: 4, open: "09:00", close: "18:00" },
  { dayOfWeek: 5, open: "09:00", close: "18:00" },
];

function parseTime(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Pure function: compute available time slots for a given date from config.
 * Used by useAvailableSlots and by useCalendar to know if a day has availability.
 */
export function getAvailableSlotsForDate(
  date: Date,
  config: BookingConfig
): string[] {
  const slotDuration = config.slotDurationMinutes ?? 30;
  const openingHours = config.openingHours?.length
    ? config.openingHours
    : DEFAULT_OPENING_HOURS;
  const dayOfWeek = date.getDay();
  const dateKey = toDateKey(date);

  if (config.fullDays?.includes(dateKey)) {
    return [];
  }

  const daySchedule = openingHours.find((e) => e.dayOfWeek === dayOfWeek);
  if (!daySchedule) {
    return [];
  }

  let startM = parseTime(daySchedule.open);
  const endM = parseTime(daySchedule.close);
  const slots: string[] = [];

  while (startM + slotDuration <= endM) {
    slots.push(formatTime(startM));
    startM += slotDuration;
  }

  const blocked = (config.blockedSlots ?? []).filter((b) => b.date === dateKey);
  if (blocked.length === 0) {
    return slots;
  }

  return slots.filter((slot) => {
    const slotStartM = parseTime(slot);
    const slotEndM = slotStartM + slotDuration;
    const isBlocked = blocked.some((b) => {
      const blockStartM = parseTime(b.start);
      const blockEndM = b.end ? parseTime(b.end) : 24 * 60;
      return slotStartM < blockEndM && slotEndM > blockStartM;
    });
    return !isBlocked;
  });
}

export interface SlotWithAvailability {
  time: string;
  available: boolean;
}

/**
 * Returns all slots for the day (within opening hours) with availability flag.
 * Use in the UI to show both available and reserved/blocked slots.
 */
export function getSlotsWithAvailability(
  date: Date,
  config: BookingConfig
): SlotWithAvailability[] {
  const slotDuration = config.slotDurationMinutes ?? 30;
  const openingHours = config.openingHours?.length
    ? config.openingHours
    : DEFAULT_OPENING_HOURS;
  const dayOfWeek = date.getDay();
  const dateKey = toDateKey(date);

  if (config.fullDays?.includes(dateKey)) {
    return [];
  }

  const daySchedule = openingHours.find((e) => e.dayOfWeek === dayOfWeek);
  if (!daySchedule) {
    return [];
  }

  let startM = parseTime(daySchedule.open);
  const endM = parseTime(daySchedule.close);
  const allSlots: string[] = [];
  while (startM + slotDuration <= endM) {
    allSlots.push(formatTime(startM));
    startM += slotDuration;
  }

  const availableSet = new Set(getAvailableSlotsForDate(date, config));
  return allSlots.map((time) => ({
    time,
    available: availableSet.has(time),
  }));
}

export interface UseAvailableSlotsResult {
  slots: string[];
  isLoading: boolean;
}

/**
 * Returns available time slots for the given date based on config.
 * No async work; "isLoading" is false (kept for future API use).
 */
export function useAvailableSlots(
  date: Date | null,
  config: BookingConfig
): UseAvailableSlotsResult {
  const slots = useMemo(() => {
    if (!date) return [];
    return getAvailableSlotsForDate(date, config);
  }, [date, config]);

  return {
    slots,
    isLoading: false,
  };
}

export function useSlotsWithAvailability(
  date: Date | null,
  config: BookingConfig
): SlotWithAvailability[] {
  return useMemo(() => {
    if (!date) return [];
    return getSlotsWithAvailability(date, config);
  }, [date, config]);
}
