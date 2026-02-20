"use client";
import { TEventType } from "@/lib/types";

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  typeFilter: TEventType | "all";
  setTypeFilter: (value: TEventType | "all") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
}

export function FilterBar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  sortOrder,
  setSortOrder,
}: FilterBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      <input
        style={{
          width: "220px",
          padding: "6px 12px",
          border: "2px solid black",
          borderRadius: "6px",
          fontSize: "16px",
          fontFamily: "inherit",
          backgroundColor: "white",
          outline: "none",
        }}
        placeholder="Search events by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ flex: 1 }} />

      <button
        className="btn-pop"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        style={{
          padding: "6px 12px",
          border: "2px solid black",
          borderRadius: "6px",
          fontSize: "16px",
          fontFamily: "inherit",
          backgroundColor: "white",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "3px 3px 0px 0px black",
          whiteSpace: "nowrap",
        }}>
          {sortOrder === "asc" ? "Earliest First ↑" : "Latest First ↓"}
      </button>

      <select
        style={{
          width: "160px",
          padding: "6px 12px",
          border: "2px solid black",
          borderRadius: "6px",
          fontSize: "16px",
          fontFamily: "inherit",
          backgroundColor: "white",
          cursor: "pointer",
          outline: "none",
        }}
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value as any)}
      >
        <option value="all">Filter Event Type</option>
        <option value="workshop">Workshop</option>
        <option value="activity">Activity</option>
        <option value="tech_talk">Tech Talk</option>
      </select>
    </div>
  );
}
