import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { toCsv } from "@/lib/csv";
import type { RsvpRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  // Bu rota /admin/* dışında olduğundan middleware korumaz — burada kontrol ediyoruz.
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token, process.env.ADMIN_COOKIE_SECRET ?? ""))) {
    return new NextResponse("Yetkisiz", { status: 401 });
  }

  let rows: RsvpRow[] = [];
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return new NextResponse("Veri okunamadı", { status: 500 });
    rows = (data ?? []) as RsvpRow[];
  } catch {
    return new NextResponse("Sunucu yapılandırması eksik", { status: 500 });
  }

  // Excel'in Türkçe karakterleri doğru göstermesi için UTF-8 BOM ekle.
  const BOM = String.fromCharCode(0xfeff);
  const body = BOM + toCsv(rows);
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="katilim-yanitlari.csv"',
    },
  });
}
