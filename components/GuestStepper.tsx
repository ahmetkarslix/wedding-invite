"use client";

// Kişi sayısı için erişilebilir −/değer/+ kontrolü.
// Form değerini taşıyan gizli input ebeveyn fieldset'tedir; bu bileşen yalnızca görseldir.
export function GuestStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  labelId,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  labelId?: string;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink";

  return (
    <div className="flex items-center gap-4" role="group" aria-labelledby={labelId}>
      <button type="button" onClick={dec} disabled={value <= min} aria-label="Bir kişi azalt" className={btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14" />
        </svg>
      </button>
      <span className="min-w-[2.5rem] text-center font-body text-2xl font-light tabular-nums text-ink" aria-live="polite">
        {value}
      </span>
      <button type="button" onClick={inc} disabled={value >= max} aria-label="Bir kişi artır" className={btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
