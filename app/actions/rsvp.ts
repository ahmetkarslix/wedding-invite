"use server";

import { headers } from "next/headers";
import { rsvpSchema, type RsvpState } from "@/lib/rsvpSchema";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import type { EventId } from "@/lib/events";

// En iyi çaba (best-effort) oran sınırı — sunucusuz ortamda örnekler arası
// paylaşılmaz ama basit istismarı engellemeye yeter.
const hits = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 5;
  const cur = hits.get(ip);
  if (!cur || now - cur.ts > windowMs) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  cur.count += 1;
  return cur.count > max;
}

export async function submitRsvp(
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  // 1) Honeypot: bot bu gizli alanı doldurursa sahte başarı döndür, kayıt yapma.
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot.trim() !== "") {
    return { ok: true, message: "Teşekkürler! Yanıtınız alındı." };
  }

  // 2) Ham veriyi topla
  const raw = {
    fullName: formData.get("fullName"),
    message: formData.get("message") || undefined,
    van: {
      attending: formData.get("van_attending"),
      guestCount: formData.get("van_guestCount") ?? 0,
    },
    usak: {
      attending: formData.get("usak_attending"),
      guestCount: formData.get("usak_guestCount") ?? 0,
    },
  };

  // 3) Doğrula
  const parsed = rsvpSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Lütfen formdaki alanları kontrol edin.", errors };
  }

  // 4) Oran sınırı
  const hdrs = await headers();
  const ip =
    (hdrs.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return {
      ok: false,
      message: "Çok fazla deneme yaptınız. Lütfen biraz sonra tekrar deneyin.",
    };
  }

  // 5) Satırları hazırla (etkinlik başına bir satır, ortak submission_id)
  const data = parsed.data;
  const submissionId = crypto.randomUUID();
  const rows = (["van", "usak"] as const).map((id: EventId) => {
    const r = data[id];
    const attending = r.attending === "yes";
    return {
      submission_id: submissionId,
      full_name: data.fullName,
      event_id: id,
      attending,
      guest_count: attending ? Math.max(1, r.guestCount) : 0,
      message: data.message && data.message.trim() ? data.message.trim() : null,
    };
  });

  // 6) Kaydet
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("rsvps").insert(rows);
    if (error) {
      return {
        ok: false,
        message: "Yanıtınız kaydedilemedi. Lütfen biraz sonra tekrar deneyin.",
      };
    }
  } catch {
    return {
      ok: false,
      message: "Sunucu yapılandırması tamamlanmamış. Lütfen daha sonra tekrar deneyin.",
    };
  }

  return {
    ok: true,
    message: "Teşekkürler! Katılım yanıtınız bize ulaştı. 💛",
  };
}
