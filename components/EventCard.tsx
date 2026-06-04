import { eventFullVenue, type WeddingEvent } from "@/lib/events";
import { AddToCalendarButton } from "./AddToCalendarButton";
import { DirectionsButton } from "./DirectionsButton";
import { MapEmbed } from "./MapEmbed";

// Tek bir etkinlik kartı — davetiyedeki sıralamayı izler:
// başlık · tarih · saat · gün (el yazısı) · salon · adres · harita · butonlar
export function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <article className="flex flex-col rounded-sm border border-line bg-paper p-6 text-center shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:p-8">
      <span className="font-body text-[0.7rem] uppercase tracking-[0.3em] text-muted">
        {event.city}
      </span>
      <h3 className="mt-3 font-body text-xl font-normal uppercase tracking-[0.22em] text-ink sm:text-2xl">
        {event.kicker}
      </h3>

      <p className="mt-5 font-body text-2xl font-light text-ink">{event.dateLabel}</p>
      <p className="mt-1 font-body text-sm tracking-wide text-ink-soft">{event.timeLabel}</p>
      <p className="mt-1 font-day text-3xl leading-none text-accent">{event.dayLabel}</p>

      <div className="mx-auto my-6 h-px w-10 bg-line" />

      <p className="font-body text-base text-ink">{eventFullVenue(event)}</p>
      <p className="mt-1 font-body text-sm font-light leading-relaxed text-muted">
        {event.address}
      </p>

      <div className="mt-6">
        <MapEmbed event={event} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <AddToCalendarButton event={event} />
        <DirectionsButton event={event} />
      </div>
    </article>
  );
}
