"use client";

import { EventCategory } from "@/lib/types";

const categories: (EventCategory | "All")[] = [
  "All",
  "Family",
  "Music",
  "Food",
  "Sports",
  "Markets",
  "Community",
  "Arts",
  "Education"
];

export function FiltersBar({
  query,
  setQuery,
  city,
  setCity,
  category,
  setCategory,
  dateISO,
  setDateISO,
  cityOptions
}: {
  query: string;
  setQuery: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  dateISO: string;
  setDateISO: (v: string) => void;
  cityOptions: string[];
}) {
  return (
    <div className="panel">
      <div className="filters">
        <div className="field">
          <label>Search</label>
          <input
            className="input"
            placeholder='Try: "market", "music", "McAllen"...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="field">
          <label>City</label>
          <select className="select" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="All">All cities</option>
            {cityOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Category</label>
          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
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
      </div>
    </div>
  );
}
