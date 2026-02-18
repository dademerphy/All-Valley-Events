"use client";

import { useMemo, useState } from "react";
import { EventCategory, EventItem } from "@/lib/types";

const cats: EventCategory[] = ["Family", "Music", "Food", "Sports", "Markets", "Community", "Arts", "Education"];

function id(): string {
  return `evt-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;
}

export function SubmitEventModal({
  open,
  onClose,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (evt: EventItem) => void;
}) {
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState<EventCategory>("Community");
  const [dateISO, setDateISO] = useState(todayISO);
  const [startTime, setStartTime] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  if (!open) return null;

  function submit() {
    const cleanTitle = title.trim();
    const cleanCity = city.trim();
    const cleanDesc = description.trim();

    if (!cleanTitle || !cleanCity || !cleanDesc) {
      alert("Please add: Title, City, and Description.");
      return;
    }

    onSubmit({
      id: id(),
      title: cleanTitle,
      description: cleanDesc,
      city: cleanCity,
      venue: venue.trim() || undefined,
      category,
      dateISO,
      startTime: startTime.trim() || undefined,
      price: price.trim() || undefined,
      url: url.trim() || undefined,
      featured: false
    });

    setTitle("");
    setDescription("");
    setCity("");
    setVenue("");
    setCategory("Community");
    setDateISO(todayISO);
    setStartTime("");
    setPrice("");
    setUrl("");
    onClose();
  }

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3 className="modalTitle">Submit an Event</h3>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modalBody">
          <div className="field">
            <label>Event Title *</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Example: Downtown Art Walk" />
          </div>

          <div className="field">
            <label>Description *</label>
            <input
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What’s happening and why should people come?"
            />
          </div>

          <div className="field">
            <label>City *</label>
            <input className="input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Example: McAllen" />
          </div>

          <div className="field">
            <label>Venue</label>
            <input className="input" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Example: Main Street Plaza" />
          </div>

          <div className="field">
            <label>Category</label>
            <select className="select" value={category} onChange={(e) => setCategory(e.target.value as EventCategory)}>
              {cats.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Date</label>
            <input className="input" type="date" value={dateISO} onChange={(e) => setDateISO(e.target.value)} />
          </div>

          <div className="field">
            <label>Start Time</label>
            <input className="input" value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder='Example: 6:30 PM' />
          </div>

          <div className="field">
            <label>Price</label>
            <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Example: Free / $10" />
          </div>

          <div className="field">
            <label>Link (optional)</label>
            <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
          </div>
        </div>

        <div className="modalActions">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btnPrimary" onClick={submit}>
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}
