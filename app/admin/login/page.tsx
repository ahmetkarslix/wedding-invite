import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yönetici Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm rounded-sm border border-line bg-paper p-8">
        <h1 className="text-center font-body text-sm uppercase tracking-[0.3em] text-ink">
          Yönetici Girişi
        </h1>
        <p className="mt-2 text-center font-body text-xs font-light text-muted">
          Katılım yanıtlarını görüntülemek için şifrenizi girin.
        </p>

        <form action="/api/admin-login" method="post" className="mt-6 flex flex-col gap-4">
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Şifre"
            aria-label="Yönetici şifresi"
            className="rounded-sm border border-ink/20 bg-paper px-4 py-3 font-body text-ink outline-none transition-colors focus:border-ink focus-visible:ring-2 focus-visible:ring-ink/30"
          />
          {sp?.error && (
            <p className="font-body text-sm text-red-700" role="alert">
              Hatalı şifre. Lütfen tekrar deneyin.
            </p>
          )}
          <button
            type="submit"
            className="rounded-full bg-ink px-6 py-3 font-body text-sm uppercase tracking-[0.2em] text-cream transition-opacity hover:opacity-90"
          >
            Giriş
          </button>
        </form>
      </div>
    </main>
  );
}
