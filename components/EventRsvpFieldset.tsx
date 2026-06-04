"use client";

import { useId, useState } from "react";
import type { EventId } from "@/lib/events";
import { GuestStepper } from "./GuestStepper";

// Form içinde tek bir etkinlik bloğu: katılım seçimi + (katılıyorsa) kişi sayısı.
export function EventRsvpFieldset({
  id,
  title,
  subtitle,
  error,
}: {
  id: EventId;
  title: string;
  subtitle: string;
  error?: string;
}) {
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [count, setCount] = useState(1);
  const legendId = useId();
  const guestsLabelId = useId();

  const optionBase =
    "flex flex-1 cursor-pointer items-center justify-center rounded-full border px-4 py-3 font-body text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink/40 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-cream";
  const selected = "border-ink bg-ink text-cream";
  const unselected = "border-ink/25 text-ink hover:border-ink";

  return (
    <fieldset className="rounded-sm border border-line bg-paper/70 p-5 sm:p-6">
      <legend id={legendId} className="px-2 font-body text-sm uppercase tracking-[0.2em] text-ink">
        {title}
      </legend>
      <p className="font-body text-xs font-light text-muted">{subtitle}</p>

      <div
        role="radiogroup"
        aria-labelledby={legendId}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <label className={`${optionBase} ${attending === "yes" ? selected : unselected}`}>
          <input
            type="radio"
            name={`${id}_attending`}
            value="yes"
            checked={attending === "yes"}
            onChange={() => setAttending("yes")}
            className="sr-only"
          />
          <span>Katılıyorum</span>
        </label>
        <label className={`${optionBase} ${attending === "no" ? selected : unselected}`}>
          <input
            type="radio"
            name={`${id}_attending`}
            value="no"
            checked={attending === "no"}
            onChange={() => setAttending("no")}
            className="sr-only"
          />
          <span>Katılamayacağım</span>
        </label>
      </div>

      {attending === "yes" && (
        <div className="mt-5 flex flex-col gap-3">
          <span id={guestsLabelId} className="font-body text-xs uppercase tracking-[0.18em] text-muted">
            Siz dahil kaç kişi olacaksınız?
          </span>
          <GuestStepper value={count} onChange={setCount} labelId={guestsLabelId} />
        </div>
      )}

      {/* Form değeri: katılmıyorsa 0 */}
      <input type="hidden" name={`${id}_guestCount`} value={attending === "yes" ? count : 0} />

      {error && (
        <p className="mt-3 font-body text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
