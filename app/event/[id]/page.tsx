"use client";
import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { getEventById, getEvents } from "@/lib/api";
import { TEvent } from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState<TEvent | undefined>(undefined);
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventId = Number(resolvedParams.id);
      const foundEvent = await getEventById(eventId);
      setEvent(foundEvent);

      if (foundEvent) {
        const allEvents = await getEvents();
        const related = allEvents.filter((e) =>
          foundEvent.related_events.includes(e.id),
        );
        setRelatedEvents(related);
      }

      setLoading(false);
    };

    fetchEvent();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F1]">
        <div className="animate-bounce text-4xl mb-4">🐶</div>
        <div className="text-2xl font-bold font-comic tracking-widest">
          LOADING EVENT...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F1]">
        <div className="text-4xl font-bold mb-4">Good Grief!</div>
        <div className="text-xl mb-8">Event not found.</div>
        <Link
          href="/"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#E11D48",
            color: "white",
            border: "2px solid black",
            padding: "10px 20px",
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "4px 4px 0px 0px black",
          }}
        >
          ← Back to Events
        </Link>
      </div>
    );
  }

  const startDate = new Date(event.start_time);
  const endDate = new Date(event.end_time);
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return (
    <main className="min-h-screen bg-[#F9F7F1]">
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#E11D48",
            color: "white",
            padding: "8px 16px",
            border: "2px solid black",
            borderRadius: "8px",
            marginBottom: "24px",
            textDecoration: "none",
            boxShadow: "3px 3px 0px 0px black",
          }}
        >
          ← Back to Events
        </Link>

        <div
          style={{
            backgroundColor: "white",
            border: "4px solid black",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "32px",
            boxShadow: "8px 8px 0px 0px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            {event.name}
          </h1>

          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "inline-block",
                border: "2px solid black",
                borderRadius: "9999px",
                padding: "4px 16px",
                fontSize: "16px",
                fontWeight: "bold",
                marginRight: "16px",
              }}
            >
              {startDate.toLocaleTimeString([], timeFormat)} -{" "}
              {endDate.toLocaleTimeString([], timeFormat)}
            </div>
            <div
              style={{
                display: "inline-block",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              {startDate.toLocaleDateString([], dateFormat)}
            </div>
          </div>

          {event.description && (
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              {event.description}
            </p>
          )}

          {event.speakers.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                Speakers
              </h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {event.speakers.map((speaker, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#FFF8EE",
                      border: "2px solid black",
                      borderRadius: "9999px",
                      padding: "4px 16px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    🎤 {speaker.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            {event.public_url && (
              <button
                onClick={() => window.open(event.public_url, "_blank")}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: "#A3D977",
                  border: "2px solid black",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                View Public Link →
              </button>
            )}
            {isAuthenticated && event.private_url && (
              <button
                onClick={() => window.open(event.private_url, "_blank")}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  color: "white",
                  border: "2px solid black",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Hacker Link →
              </button>
            )}
          </div>
        </div>

        {relatedEvents.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Related Events
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {relatedEvents.map((relEvent) => (
                <Link
                  key={relEvent.id}
                  href={`/event/${relEvent.id}`}
                  style={{
                    backgroundColor: "white",
                    border: "3px solid black",
                    borderRadius: "12px",
                    padding: "16px",
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    {relEvent.name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    {new Date(relEvent.start_time).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
