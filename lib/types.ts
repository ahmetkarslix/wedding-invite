import type { EventId } from "./events";

// Supabase "rsvps" tablosundaki bir satır.
export interface RsvpRow {
  id: string;
  submission_id: string;
  full_name: string;
  event_id: EventId;
  attending: boolean;
  guest_count: number;
  message: string | null;
  created_at: string;
}
