export type EventCategory =
  | "Family"
  | "Music"
  | "Food"
  | "Sports"
  | "Markets"
  | "Community"
  | "Arts"
  | "Education";

export type EventItem = {
  id: string;
  title: string;
  description: string;
  city: string;
  venue?: string;
  category: EventCategory;
  dateISO: string;
  startTime?: string;
  price?: string;
  url?: string;
  featured?: boolean;
};
