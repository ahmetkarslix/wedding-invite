import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// SERVICE ROLE anahtarı yalnızca sunucuda kullanılır; "server-only" sayesinde
// bu modül bir client bileşene import edilirse derleme hata verir.
// İstemci (anon) anahtarı hiç kullanılmaz — tüm DB erişimi sunucu tarafında.

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase ortam değişkenleri eksik: SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlı olmalı.",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
