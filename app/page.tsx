"use client";
import { useEffect, useState } from "react";
import { getEvents } from "@/lib/api";
import { TEvent } from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { FilterBar } from "@/components/FilterBar";
import { EventCard } from "@/components/EventCard";
import { useEventSort } from "@/hooks/useEventSort";

export default function Home() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const { search, setSearch, typeFilter, setTypeFilter, filteredEvents, sortOrder,setSortOrder } =
    useEventSort(events);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F1]">
        <div className="animate-bounce text-4xl mb-4">🐶</div>
        <div className="text-2xl font-bold font-comic tracking-widest">
          DRAWING COMICS...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20 overflow-x-hidden">
      <Navbar />

      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
        <FilterBar
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {filteredEvents.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-4 border-black border-dashed rounded-3xl bg-white">
            <p className="text-3xl font-bold mb-2">Good Grief!</p>
            <p className="text-xl">No events found matching that.</p>
          </div>
        )}
      </div>
    </main>
  );
}
