import { TEvent } from "./types";

const GRAPHQL_ENDPOINT = "https://api.hackthenorth.com/v3/frontend-challenge";

const GET_EVENTS_QUERY = `
  query {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        name
      }
      public_url
      private_url
      related_events
    }
  }
`;

export async function getEvents(): Promise<TEvent[]> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_EVENTS_QUERY,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GraphQL Error: ${res.status} - ${errorText}`);
  }

  const json = await res.json();
  return json.data.sampleEvents;
}

export async function getEventById(id: number): Promise<TEvent | undefined> {
  const events = await getEvents();
  return events.find((e) => e.id === id);
}