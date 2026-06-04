"use client";

import { useActionState } from "react";
import { submitRsvp } from "@/app/actions/rsvp";
import type { RsvpState } from "@/lib/rsvpSchema";
import { getEvent } from "@/lib/events";
import { EventRsvpFieldset } from "./EventRsvpFieldset";

const initialState: RsvpState = { ok: false };

function eventSubtitle(id: "van" | "usak"): string {
  const e = getEvent(id);
  return `${e.dateLabel} · ${e.dayLabel} · ${e.timeLabel}`;
}

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);

  if (state.ok) {
    return (
      <div className="mx-auto max-w-md rounded-sm border border-line bg-paper p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent text-accent">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-6 font-body text-lg font-light text-ink" role="status">
          {state.message}
        </p>
        <p className="mt-2 font-body text-sm font-light text-muted">
          Bizi mutlu ettiğiniz için teşekkür ederiz.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mx-auto flex max-w-xl flex-col gap-6" noValidate>
      {/* Honeypot — gerçek kullanıcılar görmez */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="visually-hidden"
      />

      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="fullName" className="font-body text-xs uppercase tracking-[0.2em] text-muted">
          Ad Soyad
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Adınız ve soyadınız"
          className="rounded-sm border border-ink/20 bg-paper px-4 py-3 font-body text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink focus-visible:ring-2 focus-visible:ring-ink/30"
        />
        {state.errors?.fullName && (
          <p className="font-body text-sm text-red-700" role="alert">
            {state.errors.fullName}
          </p>
        )}
      </div>

      <EventRsvpFieldset
        id="van"
        title="Kına & Düğün — Van"
        subtitle={eventSubtitle("van")}
        error={state.errors?.["van.attending"]}
      />
      <EventRsvpFieldset
        id="usak"
        title="Düğün — Uşak"
        subtitle={eventSubtitle("usak")}
        error={state.errors?.["usak.attending"]}
      />

      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="message" className="font-body text-xs uppercase tracking-[0.2em] text-muted">
          Mesajınız / dileğiniz <span className="lowercase tracking-normal">(opsiyonel)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={1000}
          placeholder="Çifte iletmek istedikleriniz…"
          className="resize-none rounded-sm border border-ink/20 bg-paper px-4 py-3 font-body text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink focus-visible:ring-2 focus-visible:ring-ink/30"
        />
        {state.errors?.message && (
          <p className="font-body text-sm text-red-700" role="alert">
            {state.errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 font-body text-sm uppercase tracking-[0.25em] text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Gönderiliyor…" : "Katılımını Onayla"}
      </button>

      {!state.ok && state.message && (
        <p className="text-center font-body text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
