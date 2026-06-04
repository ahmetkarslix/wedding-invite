import { googleCalendarUrl, type WeddingEvent } from "@/lib/events";

export function AddToCalendarButton({ event }: { event: WeddingEvent }) {
  return (
    <a
      href={googleCalendarUrl(event)}
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
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
      Takvime Ekle
    </a>
  );
}
