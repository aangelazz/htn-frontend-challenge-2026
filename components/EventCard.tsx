import { TEvent, TEventType } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

const THEME: Record<
  TEventType,
  { border: string; bg: string; tag: { bg: string; border: string } }
> = {
  workshop: {
    border: "#C2410C",
    bg: "#FFF8EE",
    tag: { bg: "#FDE68A", border: "#92400E" },
  },
  activity: {
    border: "#B45309",
    bg: "#FEFCE8",
    tag: { bg: "#BBF7D0", border: "#166534" },
  },
  tech_talk: {
    border: "#1D4ED8",
    bg: "#EFF6FF",
    tag: { bg: "#BFDBFE", border: "#1E40AF" },
  },
};

const DEFAULT_THEME = {
  border: "#000",
  bg: "#FFF8EE",
  tag: { bg: "#E5E7EB", border: "#6B7280" },
};

export function EventCard({ event }: { event: TEvent }) {
  const { isAuthenticated } = useAuth();
  const isPrivate = event.permission === "private";

  if (isPrivate && !isAuthenticated) return null;

  const theme = THEME[event.event_type] ?? DEFAULT_THEME;
  const { border: color, bg, tag } = theme;

  const startDate = new Date(event.start_time);
  const endDate = new Date(event.end_time);
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  return (
    <div
      className="card-pop"
      style={{
        backgroundColor: bg,
        border: `3px solid ${color}`,
        boxShadow: `5px 5px 0px 0px ${color}`,
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "260px",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: "8px",
        }}
      >
        {event.name}
      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "inline-block",
            border: `2px solid ${color}`,
            borderRadius: "9999px",
            padding: "2px 12px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {startDate.toLocaleTimeString([], timeFormat)}
          {" - "}
          {endDate.toLocaleTimeString([], timeFormat)}
        </div>
        <div style={{ fontSize: "13px", fontWeight: "bold", color: "#555" }}>
          {startDate.toLocaleDateString([], dateFormat)}
        </div>
      </div>

      {event.description && (
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.4,
            marginBottom: "16px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {event.description}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          marginTop: "auto",
        }}
      >
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <span
            className="tag-bounce"
            style={{
              backgroundColor: tag.bg,
              border: `2px solid ${tag.border}`,
              borderRadius: "9999px",
              padding: "2px 10px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "lowercase",
            }}
          >
            {event.event_type.replace("_", " ")}
          </span>
          <span
            className="tag-bounce"
            style={{
              backgroundColor: isPrivate ? "#F3E8FF" : "#ECFDF5",
              border: `2px solid ${isPrivate ? "#7C3AED" : "#059669"}`,
              borderRadius: "9999px",
              padding: "2px 10px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "lowercase",
            }}
          >
            {isPrivate ? "private" : "public"}
          </span>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {event.public_url && (
            <a
              href={event.public_url}
              target="_blank"
              className="link-pop"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#A3D977",
                border: "2px solid black",
                borderRadius: "9999px",
                padding: "2px 12px",
                textDecoration: "none",
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              View Public Link →
            </a>
          )}

          {isAuthenticated && event.private_url && (
            <a
              href={event.private_url}
              target="_blank"
              className="link-pop"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
                borderRadius: "9999px",
                padding: "2px 12px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Hacker Link →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
