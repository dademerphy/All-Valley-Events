"use client";

import { EventItem } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";

export function EventCard({
  event,
  saved,
  onToggleSave
}: {
  event: EventItem;
  saved: boolean;
  onToggleSave: (id: string) => void;
}) {
  return (
    <div className="card">
      <div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <h3 className="cardTitle">{event.title}</h3>
          {event.featured && <span className="tag">⭐ Featured</span>}
        </div>

        <p className="cardSub">{event.description}</p>

        <div className="metaRow">
          <span className="tag">
            {formatEventDate(event.dateISO)}
            {event.startTime ? ` • ${event.startTime}` : ""}
          </span>
          <span className="tag">{event.city}</span>
          <span className="tag">{event.category}</span>
          {event.venue && <span className="tag">{event.venue}</span>}
          {event.price && <span className="tag">{event.price}</span>}
        </div>
      </div>

      <div className="cardRight">
        <button className="smallBtn" onClick={() => onToggleSave(event.id)}>
          {saved ? "Saved ✓" : "Save"}
        </button>
        {event.url ? (
          <a className="smallBtn" href={event.url} target="_blank" rel="noreferrer">
            Details ↗
          </a>
        ) : (
          <span className="tag">More info soon</span>
        )}
      </div>
    </div>
  );
}
