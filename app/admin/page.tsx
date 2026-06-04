import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import type { RsvpRow } from "@/lib/types";
import { RsvpTable } from "@/components/admin/RsvpTable";

export const metadata: Metadata = {
  title: "Katılım Yanıtları",
  robots: { index: false, follow: false },
};

// Her zaman taze veri; derleme sırasında önceden oluşturulmaz.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let rows: RsvpRow[] = [];
  let error: string | null = null;

  try {
    const supabase = getSupabaseAdmin();
    const res = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });
    if (res.error) error = res.error.message;
    else rows = (res.data ?? []) as RsvpRow[];
  } catch {
    error =
      "Veritabanı bağlantısı yapılandırılmamış. Lütfen SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY ortam değişkenlerini ayarlayın.";
  }

  return (
    <main className="mx-auto min-h-[100svh] w-full max-w-5xl px-6 py-12">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-body text-2xl font-light text-ink">Katılım Yanıtları</h1>
          <p className="mt-1 font-body text-sm text-muted">Seher &amp; Ahmet — Düğün Davetiyesi</p>
        </div>
        <form action="/api/admin-logout" method="post">
          <button
            type="submit"
            className="rounded-full border border-ink/25 px-4 py-2 font-body text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            Çıkış
          </button>
        </form>
      </header>

      {error ? (
        <p className="rounded-sm border border-dashed border-line bg-paper p-8 text-center font-body text-sm text-ink-soft">
          {error}
        </p>
      ) : (
        <RsvpTable rows={rows} />
      )}
    </main>
  );
}
