import { directionsUrl, type WeddingEvent } from "@/lib/events";

export function DirectionsButton({ event }: { event: WeddingEvent }) {
  return (
    <a
      href={directionsUrl(event)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-5 py-2.5 font-body text-xs font-light uppercase tracking-[0.15em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
      Yol Tarifi
    </a>
  );
}
