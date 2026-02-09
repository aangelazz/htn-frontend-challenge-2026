import { useState, useMemo } from "react";
import { TEvent, TEventType } from "@/lib/types";

export function useEventSort(events: TEvent[]) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TEventType | "all">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === "all" || event.event_type === typeFilter;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        return sortOrder === "asc"
          ? a.start_time - b.start_time
          : b.start_time - a.start_time;
      });
  }, [events, search, typeFilter, sortOrder]);

  return {
    search, setSearch,
    typeFilter, setTypeFilter,
    sortOrder, setSortOrder,
    filteredEvents,
  };
}