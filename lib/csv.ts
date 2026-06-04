import type { RsvpRow } from "./types";
import { eventDisplayLabel } from "./events";

function escapeCell(value: string): string {
  if (/[",\n\r;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      timeZone: "Europe/Istanbul",
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

// RSVP satırlarını CSV metnine dönüştürür (Excel için BOM çağıran tarafta eklenir).
export function toCsv(rows: RsvpRow[]): string {
  const headers = ["Tarih", "Ad Soyad", "Etkinlik", "Katılım", "Kişi", "Mesaj"];
  const lines = [headers.join(",")];

  for (const r of rows) {
    const cells = [
      formatDate(r.created_at),
      r.full_name,
      eventDisplayLabel(r.event_id),
      r.attending ? "Katılıyor" : "Katılmıyor",
      String(r.guest_count),
      r.message ?? "",
    ];
    lines.push(cells.map(escapeCell).join(","));
  }

  return lines.join("\r\n");
}
