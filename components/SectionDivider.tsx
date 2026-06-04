// İki yanında ince çizgi, ortada küçük yaprak süslemesi olan zarif ayraç.
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 text-accent ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-line sm:w-20" />
      <svg
        width="26"
        height="26"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 C 26 14 26 26 20 34 C 14 26 14 14 20 6 Z" />
        <path d="M20 10 L20 30" strokeOpacity={0.6} />
      </svg>
      <span className="h-px w-12 bg-line sm:w-20" />
    </div>
  );
}
