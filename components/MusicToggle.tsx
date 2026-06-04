"use client";

import { useEffect, useRef, useState } from "react";

// Müzik varsayılan AÇIK gelir. Tarayıcılar sesli autoplay'i engellediği için
// kullanıcının ilk etkileşiminde (dokunma/kaydırma/tıklama) otomatik başlar.
// Ziyaretçi isterse sağ alttaki butonla kapatabilir.
export function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const triedAutoplay = useRef(false);

  const tryPlay = async () => {
    const audio = audioRef.current;
    if (!audio || audio.currentTime > 0) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      // Tarayıcı engelledi — ilk etkileşimde tekrar denenecek
    }
  };

  useEffect(() => {
    if (triedAutoplay.current) return;
    triedAutoplay.current = true;

    // Sayfa yüklenince otomatik başlatmayı dene
    tryPlay();

    // Tarayıcı engellerse, ilk kullanıcı etkileşiminde başlat
    const onInteraction = () => {
      tryPlay();
      cleanup();
    };

    const events = ["click", "touchstart", "scroll", "keydown"] as const;
    for (const e of events) document.addEventListener(e, onInteraction, { once: true, passive: true });

    const cleanup = () => {
      for (const e of events) document.removeEventListener(e, onInteraction);
    };

    return cleanup;
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Müziği kapat" : "Müziği aç"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 bg-paper/90 text-ink shadow-sm backdrop-blur transition-colors hover:border-ink"
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="m23 9-6 6M17 9l6 6" />
          </svg>
        )}
      </button>
    </>
  );
}
