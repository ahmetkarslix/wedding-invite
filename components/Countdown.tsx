"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(target: number): Parts {
  let d = Math.max(0, target - Date.now());
  const days = Math.floor(d / 86_400_000);
  d -= days * 86_400_000;
  const hours = Math.floor(d / 3_600_000);
  d -= hours * 3_600_000;
  const mins = Math.floor(d / 60_000);
  d -= mins * 60_000;
  const secs = Math.floor(d / 1_000);
  return { days, hours, mins, secs };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();

  // Başlangıç değeri hesaplanır; sunucu/istemci saati farklıysa
  // suppressHydrationWarning ile sessizce geçilir.
  const [parts, setParts] = useState<Parts>(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items: { value: number; label: string }[] = [
    { value: parts.days, label: "Gün" },
    { value: parts.hours, label: "Saat" },
    { value: parts.mins, label: "Dakika" },
    { value: parts.secs, label: "Saniye" },
  ];

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-6" suppressHydrationWarning>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center" suppressHydrationWarning>
          <span className="font-body text-3xl font-light tabular-nums text-ink sm:text-5xl" suppressHydrationWarning>
            {pad(item.value)}
          </span>
          <span className="mt-2 font-body text-[0.65rem] uppercase tracking-[0.2em] text-muted sm:text-xs">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
