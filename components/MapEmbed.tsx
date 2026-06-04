import { eventFullVenue, mapEmbedUrl, type WeddingEvent } from "@/lib/events";

// Anahtarsız Google Maps gömme. "Yol Tarifi" butonu güvenilir yedektir.
export function MapEmbed({ event }: { event: WeddingEvent }) {
  return (
    <div className="overflow-hidden rounded-sm border border-line">
      <iframe
        src={mapEmbedUrl(event)}
        title={`${eventFullVenue(event)} konumu`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-56 w-full grayscale-[0.2]"
      />
    </div>
  );
}
