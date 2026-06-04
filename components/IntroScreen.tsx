"use client";

import { useState } from "react";
import { FloralHeart } from "./FloralHeart";

// Tam ekran giriş kapağı — "Davetiyeyi açmak için dokunun".
// Dokunulunca yukarı kayarak açılır; müzik de bu etkileşimle başlar
// (tarayıcı kullanıcı etkileşimi algılar → autoplay izni verir).
export function IntroScreen() {
  const [dismissed, setDismissed] = useState(false);
  const [hidden, setHidden] = useState(false);

  const open = () => {
    setDismissed(true);
    // Animasyon bittikten sonra DOM'dan kaldır (800ms)
    setTimeout(() => setHidden(true), 800);
  };

  if (hidden) return null;

  return (
    <div
      onClick={open}
      onKeyDown={(e) => e.key === "Enter" && open()}
      role="button"
      tabIndex={0}
      aria-label="Davetiyeyi açmak için dokunun"
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-cream transition-all duration-700 ease-in-out ${
        dismissed ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Üst dekoratif çizgi */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3">
          <span className="block h-px w-8 bg-line sm:w-14" />
          <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="block h-px w-8 bg-line sm:w-14" />
        </div>
      </div>

      {/* İçerik — sıralı fade-in animasyonu */}
      <p
        className="animate-[fadeIn_0.8s_ease_0.3s_both] font-body text-[0.65rem] font-light uppercase tracking-[0.55em] text-muted sm:text-xs"
      >
        Davetlisiniz
      </p>

      <FloralHeart className="mt-8 h-20 w-20 animate-[fadeIn_0.8s_ease_0.7s_both] text-ink/80 sm:h-24 sm:w-24" />

      <h1 className="mt-8 animate-[fadeIn_0.8s_ease_1.1s_both] font-script leading-none text-ink">
        <span className="block text-5xl sm:text-6xl md:text-7xl">Seher</span>
        <span className="my-1 block text-3xl text-accent sm:text-4xl">&amp;</span>
        <span className="block text-5xl sm:text-6xl md:text-7xl">Ahmet</span>
      </h1>

      <div className="mt-8 flex animate-[fadeIn_0.8s_ease_1.5s_both] items-center gap-3">
        <span className="block h-px w-8 bg-line" />
        <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="block h-px w-8 bg-line" />
      </div>

      <p className="mt-6 animate-[fadeIn_0.8s_ease_1.9s_both] font-body text-xs font-light uppercase tracking-[0.3em] text-muted">
        18 &amp; 26 Eylül 2026
      </p>

      {/* Dokunma ipucu — yavaş nefes alan animasyon */}
      <div className="absolute bottom-12 flex animate-[fadeIn_0.8s_ease_2.5s_both] flex-col items-center gap-3">
        <p className="font-body text-[0.65rem] font-light uppercase tracking-[0.3em] text-muted/80 sm:text-xs">
          Davetiyeyi açmak için dokunun
        </p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce text-muted/60"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>

      {/* Alt dekoratif çizgi */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3">
          <span className="block h-px w-8 bg-line sm:w-14" />
          <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="block h-px w-8 bg-line sm:w-14" />
        </div>
      </div>
    </div>
  );
}
