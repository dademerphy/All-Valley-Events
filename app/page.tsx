"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { FiltersBar } from "@/components/FiltersBar";
import { EventCard } from "@/components/EventCard";
import { SubmitEventModal } from "@/components/SubmitEventModal";
import { sampleEvents } from "@/lib/sampleEvents";
import { EventItem } from "@/lib/types";
import { isOnOrAfter, sortByDateAsc, uniq } from "@/lib/utils";

const LS_EVENTS = "ave.userEvents.v1";
const LS_SAVED = "ave.saved.v1";

export default function HomePage() {
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [openSubmit, setOpenSubmit] = useState(false);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
  const [category, setCategory] = useState("All");
  const [dateISO, setDateISO] = useState(todayISO);

  const [userEvents, setUserEvents] = useState<EventItem[]>([]);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_EVENTS);
      if (raw) setUserEvents(JSON.parse(raw));
    } catch {}
    try {
      const raw2 = localStorage.getItem(LS_SAVED);
      if (raw2) setSavedIds(JSON.parse(raw2));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_EVENTS, JSON.stringify(userEvents));
    } catch {}
  }, [userEvents]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_SAVED, JSON.stringify(savedIds));
    } catch {}
  }, [savedIds]);

  const allEvents = useMemo(() => {
    const merged = [...sampleEvents, ...userEvents].filter((e) => isOnOrAfter(e.dateISO, todayISO));
    return sortByDateAsc(merged);
  }, [userEvents, todayISO]);

  const cityOptions = useMemo(() => {
    const cities = uniq(allEvents.map((e) => e.city)).sort((a, b) => a.localeCompare(b));
    return cities;
  }, [allEvents]);

  const featured = useMemo(() => allEvents.filter((e) => e.featured), [allEvents]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allEvents.filter((e) => {
      if (city !== "All" && e.city !== city) return false;
      if (category !== "All" && e.category !== category) return false;
      if (dateISO && e.dateISO !== dateISO) return false;

      if (!q) return true;
      const hay = `${e.title} ${e.description} ${e.city} ${e.venue ?? ""} ${e.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [allEvents, query, city, category, dateISO]);

  function toggleSave(id: string) {
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const savedList = useMemo(() => {
    const ids = Object.keys(savedIds).filter((k) => savedIds[k]);
    return allEvents.filter((e) => ids.includes(e.id));
  }, [allEvents, savedIds]);

  return (
    <>
      <Header
        onOpenSubmit={() => setOpenSubmit(true)}
        onJumpToFeatured={() => featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      <main className="container">
        <section className="hero">
          <div className="heroCard">
            <div>
              <h1 className="h1">Find something fun in the RGV — fast.</h1>
              <p className="p">
                All Valley Events collects public events across every city in the Rio Grande Valley, organizes them cleanly, and keeps
                the community coming back for what’s next.
              </p>

              <div className="badges">
                <span className="badge">Community-first</span>
                <span className="badge">Family-friendly</span>
                <span className="badge">Search + filters</span>
                <span className="badge">Save events</span>
                <span className="badge">Submit events</span>
              </div>
            </div>

            <div className="ctaBox">
              <h3 className="ctaTitle">Don’t miss out!</h3>
              <p className="ctaText">
                Bookmark your favorites and check back often — the Valley always has something happening.
              </p>
              <button className="btn btnPrimary" onClick={() => setOpenSubmit(true)}>
                Add an event
              </button>
              <hr className="hr" />
              <p className="ctaText" style={{ marginBottom: 10 }}>
                Tip: Try searching “market” or filter by city to discover new places.
              </p>
              <button className="btn" onClick={() => setDateISO(todayISO)}>
                Show today
              </button>
            </div>
          </div>
        </section>

        <div className="grid">
          <div>
            <FiltersBar
              query={query}
              setQuery={setQuery}
              city={city}
              setCity={setCity}
              category={category}
              setCategory={setCategory}
              dateISO={dateISO}
              setDateISO={setDateISO}
              cityOptions={cityOptions}
            />

            <div className="panel" style={{ marginTop: 14 }}>
              <div className="sectionHead">
                <h2 className="sectionTitle">Events</h2>
                <div className="sectionMeta">{filtered.length} found • upcoming only</div>
              </div>
              <div className="list">
                {filtered.length === 0 ? (
                  <div className="card">
                    <div>
                      <h3 className="cardTitle">No matches.</h3>
                      <p className="cardSub">Try clearing a filter or searching a different keyword.</p>
                      <div className="metaRow">
                        <button
                          className="smallBtn"
                          onClick={() => {
                            setQuery("");
                            setCity("All");
                            setCategory("All");
                          }}
                        >
                          Clear filters
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  filtered.map((e) => <EventCard key={e.id} event={e} saved={!!savedIds[e.id]} onToggleSave={toggleSave} />)
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="panel" ref={featuredRef}>
              <div className="sectionHead">
                <h2 className="sectionTitle">Featured</h2>
                <div className="sectionMeta">{featured.length} highlights</div>
              </div>
              <div className="list">
                {featured.length === 0 ? (
                  <div className="card">
                    <div>
                      <h3 className="cardTitle">No featured events yet.</h3>
                      <p className="cardSub">When you have real data, you can feature the best events here.</p>
                    </div>
                  </div>
                ) : (
                  featured.map((e) => <EventCard key={e.id} event={e} saved={!!savedIds[e.id]} onToggleSave={toggleSave} />)
                )}
              </div>
            </div>

            <div className="panel" style={{ marginTop: 14 }}>
              <div className="sectionHead">
                <h2 className="sectionTitle">Saved</h2>
                <div className="sectionMeta">{savedList.length} saved</div>
              </div>
              <div className="list">
                {savedList.length === 0 ? (
                  <div className="card">
                    <div>
                      <h3 className="cardTitle">Nothing saved yet.</h3>
                      <p className="cardSub">Tap “Save” on an event to keep it here.</p>
                    </div>
                  </div>
                ) : (
                  savedList.map((e) => <EventCard key={e.id} event={e} saved={!!savedIds[e.id]} onToggleSave={toggleSave} />)
                )}
              </div>
            </div>

            <div className="footer">
              <div className="panel" style={{ padding: 14 }}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>What’s next (optional upgrades)</div>
                <div style={{ color: "rgba(255,255,255,0.70)", lineHeight: 1.5 }}>
                  Add a real “Submit Event” pipeline (admin review), connect to a database, and auto-import from city calendars / FB
                  events. This starter is built to evolve cleanly.
                </div>
              </div>
              <div style={{ marginTop: 10 }}>© {new Date().getFullYear()} All Valley Events • Built for the RGV community</div>
            </div>
          </div>
        </div>
      </main>

      <SubmitEventModal
        open={openSubmit}
        onClose={() => setOpenSubmit(false)}
        onSubmit={(evt) => setUserEvents((prev) => [evt, ...prev])}
      />
    </>
  );
}
