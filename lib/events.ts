// ---------------------------------------------------------------------------
// Tüm etkinlik verisinin TEK doğruluk kaynağı.
// Etkinlik kartları, geri sayım, takvim linkleri, haritalar ve admin etiketleri
// hepsi buradan türetilir — böylece bilgi tutarsızlığı olmaz.
// Türkiye saati UTC+3'tür ve yaz saati uygulaması yoktur.
// ---------------------------------------------------------------------------

export type EventId = "van" | "usak";

export interface WeddingEvent {
  id: EventId;
  kicker: string; // "Kına & Düğün" / "Düğün"
  city: string; // "Van" / "Uşak"
  venue: string; // salon adı
  venueLine2?: string; // "(Firuze)"
  address: string; // tam adres
  dateLabel: string; // "18.09.2026"
  dayLabel: string; // "Cuma" / "Cumartesi"
  timeLabel: string; // "19.00" / "Yemek 18.00"
  isoStart: string; // yerel başlangıç (UTC+3) — geri sayım için
  calStartUtc: string; // Google Calendar UTC: "YYYYMMDDTHHmmssZ"
  calEndUtc: string; // başlangıç + 4 saat
  mapsQuery: string; // harita arama metni (embed + yol tarifi)
}

export const EVENTS: WeddingEvent[] = [
  {
    id: "van",
    kicker: "Kına & Düğün",
    city: "Van",
    venue: "Çırağan Sarayı Düğün Salonu",
    address: "Cumhuriyet, Girne Sk. No:32, 65150 Van Merkez/Van",
    dateLabel: "18.09.2026",
    dayLabel: "Cuma",
    timeLabel: "19.00",
    isoStart: "2026-09-18T19:00:00+03:00",
    calStartUtc: "20260918T160000Z",
    calEndUtc: "20260918T200000Z",
    mapsQuery: "Çırağan Sarayı Düğün Salonu, Cumhuriyet, Girne Sk. No:32, 65150 Van Merkez/Van",
  },
  {
    id: "usak",
    kicker: "Düğün",
    city: "Uşak",
    venue: "Çağrı Düğün Salonu",
    venueLine2: "(Firuze)",
    address: "İslice, 1. Dere Sk. No:46, 64400 Merkez/Uşak",
    dateLabel: "26.09.2026",
    dayLabel: "Cumartesi",
    timeLabel: "Yemek 19.00 · Düğün 20.00",
    isoStart: "2026-09-26T19:00:00+03:00",
    calStartUtc: "20260926T160000Z",
    calEndUtc: "20260926T210000Z",
    mapsQuery: "Çağrı Düğün Salonu Firuze, İslice, 1. Dere Sk. No:46, 64400 Merkez/Uşak",
  },
];

export function getEvent(id: EventId): WeddingEvent {
  const e = EVENTS.find((x) => x.id === id);
  if (!e) throw new Error(`Bilinmeyen etkinlik: ${id}`);
  return e;
}

// Geri sayımın hedefi: ilk etkinlik (Van — Kına & Düğün)
export const FIRST_EVENT = EVENTS[0];

export function eventFullVenue(e: WeddingEvent): string {
  return e.venueLine2 ? `${e.venue} ${e.venueLine2}` : e.venue;
}

export function eventDisplayLabel(id: EventId): string {
  const e = getEvent(id);
  return `${e.kicker} — ${e.city}`;
}

// "Takvime Ekle" — Google Calendar şablon linki
export function googleCalendarUrl(e: WeddingEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Seher & Ahmet — ${e.kicker} (${e.city})`,
    dates: `${e.calStartUtc}/${e.calEndUtc}`,
    details: "Seher & Ahmet düğün davetiyesi. Bizi mutluluğumuza ortak edin 💛",
    location: `${eventFullVenue(e)}, ${e.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// "Yol Tarifi" — Google Maps directions (API anahtarı gerekmez)
export function directionsUrl(e: WeddingEvent): string {
  const params = new URLSearchParams({ api: "1", destination: e.mapsQuery });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

// Gömülü harita iframe kaynağı (API anahtarı gerekmez)
export function mapEmbedUrl(e: WeddingEvent): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(e.mapsQuery)}&output=embed`;
}
