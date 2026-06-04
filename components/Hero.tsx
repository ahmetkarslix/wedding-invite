import { FloralHeart } from "./FloralHeart";

// Açılış: DAVETLİSİNİZ + "Seher & Ahmet" (kaligrafi) + çiçekli kalp.
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-body text-sm font-light uppercase tracking-[0.5em] text-ink-soft sm:text-base sm:tracking-[0.6em]">
        Davetlisiniz
      </p>

      <h1 className="mt-8 font-script leading-none text-ink">
        <span className="block text-6xl sm:text-7xl md:text-8xl">Seher</span>
        <span className="my-1 block text-4xl text-accent sm:text-5xl">&amp;</span>
        <span className="block text-6xl sm:text-7xl md:text-8xl">Ahmet</span>
      </h1>

      <FloralHeart className="mt-10 h-28 w-28 text-ink sm:h-32 sm:w-32" />

      <p className="mt-10 max-w-md font-body text-sm font-light leading-relaxed text-muted">
        Hayatımızın en özel gününde sizi de aramızda görmekten mutluluk duyarız.
      </p>

      <a
        href="#geri-sayim"
        aria-label="Aşağı kaydır"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-ink"
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
    </section>
  );
}
