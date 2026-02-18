import { EventItem } from "./types";

export function formatEventDate(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function sortByDateAsc(events: EventItem[]): EventItem[] {
  return [...events].sort((a, b) => a.dateISO.localeCompare(b.dateISO));
}

export function isOnOrAfter(dateISO: string, thresholdISO: string): boolean {
  return dateISO >= thresholdISO;
}
