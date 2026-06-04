"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { RsvpRow } from "@/lib/types";
import type { EventId } from "@/lib/events";
import { eventDisplayLabel } from "@/lib/events";
import { StatCard } from "./StatCard";

type Filter = "all" | EventId;

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      timeZone: "Europe/Istanbul",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function summarize(rows: RsvpRow[], id: EventId) {
  const list = rows.filter((r) => r.event_id === id);
  const attending = list.filter((r) => r.attending);
  const guests = attending.reduce((sum, r) => sum + r.guest_count, 0);
  return {
    responses: list.length,
    guests,
    notAttending: list.length - attending.length,
  };
}

export function RsvpTable({ rows }: { rows: RsvpRow[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const van = useMemo(() => summarize(rows, "van"), [rows]);
  const usak = useMemo(() => summarize(rows, "usak"), [rows]);

  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.event_id === filter)),
    [rows, filter],
  );

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "Tümü" },
    { key: "van", label: "Van" },
    { key: "usak", label: "Uşak" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard title="Kına & Düğün — Van" guests={van.guests} responses={van.responses} notAttending={van.notAttending} />
        <StatCard title="Düğün — Uşak" guests={usak.guests} responses={usak.responses} notAttending={usak.notAttending} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-line p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key)}
              className={clsx(
                "rounded-full px-4 py-1.5 font-body text-sm transition-colors",
                filter === t.key ? "bg-ink text-cream" : "text-ink-soft hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <a
          href="/api/admin-export"
          className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 font-body text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
          CSV indir
        </a>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-sm border border-dashed border-line bg-paper p-10 text-center font-body text-muted">
          Henüz katılım yanıtı yok.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-line">
          <table className="w-full border-collapse bg-paper text-left font-body text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3 font-normal">Tarih</th>
                <th className="px-4 py-3 font-normal">Ad Soyad</th>
                <th className="px-4 py-3 font-normal">Etkinlik</th>
                <th className="px-4 py-3 font-normal">Durum</th>
                <th className="px-4 py-3 text-center font-normal">Kişi</th>
                <th className="px-4 py-3 font-normal">Mesaj</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id} className="border-b border-line/70 last:border-0 align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3 text-ink">{r.full_name}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{eventDisplayLabel(r.event_id)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs",
                        r.attending ? "bg-ink text-cream" : "bg-line text-ink-soft",
                      )}
                    >
                      {r.attending ? "Katılıyor" : "Katılmıyor"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums text-ink">{r.attending ? r.guest_count : "—"}</td>
                  <td className="max-w-xs px-4 py-3 text-ink-soft">{r.message || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
