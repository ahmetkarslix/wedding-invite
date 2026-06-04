import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Supabase ücretsiz katmanı 7 gün hareketsizlikte projeyi duraklatır.
// Vercel Cron bu rotayı haftada bir çağırır → önemsiz bir okuma ile aktif tutar.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("rsvps").select("id").limit(1);
    if (error) return NextResponse.json({ ok: false }, { status: 500 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
