// Bölüm altında "aşağı kaydır" ipucu — bir sonraki bölüme yumuşak kaydırır.
// Hero'daki okla aynı stil; dikkat çekmek için hafif zıplar (reduced-motion'da durur).
export function ScrollCue({
  href,
  label = "Aşağı kaydır",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`mt-12 flex justify-center ${className}`}>
      <a
        href={href}
        aria-label={label}
        className="scroll-cue text-muted transition-colors hover:text-ink"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </div>
  );
}
