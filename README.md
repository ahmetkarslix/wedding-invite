# Seher & Ahmet — Düğün Davetiyesi

Mobil uyumlu, sade ve şık bir dijital düğün davetiyesi. İki düğün (Van — Kına & Düğün, Uşak — Düğün), geri sayım, takvime ekleme, harita/yol tarifi ve katılım onayı (RSVP) içerir. Katılım yanıtları Supabase'de saklanır; şifre korumalı `/admin` panelinden görüntülenir.

## Teknolojiler

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL) — katılım yanıtları için veritabanı
- **Vercel** — ücretsiz yayınlama (`*.vercel.app`)

---

## 1. Yerel kurulum

```bash
npm install
cp .env.example .env.local   # değerleri doldurun (aşağıya bakın)
npm run dev                  # http://localhost:3000
```

Ana sayfa veritabanı olmadan da çalışır. **Katılım formu** ve **/admin** için Supabase gerekir.

### Ortam değişkenleri (`.env.local`)

| Değişken | Açıklama |
|---|---|
| `SUPABASE_URL` | Supabase proje URL'i (Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` anahtarı — **gizli**, yalnız sunucuda kullanılır |
| `ADMIN_PASSWORD` | `/admin` paneline giriş şifresi |
| `ADMIN_COOKIE_SECRET` | Oturum çerezini imzalayan rastgele anahtar (≥32 karakter) |

Rastgele bir `ADMIN_COOKIE_SECRET` üretmek için:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 2. Supabase kurulumu

1. [supabase.com](https://supabase.com) üzerinde **ücretsiz** hesap açın ve yeni bir proje oluşturun (bölge: Frankfurt önerilir).
2. Sol menüden **SQL Editor**'a girin, [`supabase/schema.sql`](supabase/schema.sql) dosyasının içeriğini yapıştırıp **Run** deyin.
3. **Settings → API** bölümünden `Project URL` ve `service_role` anahtarını kopyalayıp `.env.local` (ve Vercel) değişkenlerine ekleyin.

> Güvenlik: Tablo RLS (Row Level Security) ile kilitlidir, anon erişim yoktur. Tüm yazma/okuma işlemleri sunucu tarafında `service_role` anahtarıyla yapılır; bu anahtar tarayıcıya asla gönderilmez.

---

## 3. Katılım yanıtlarını görüntüleme

İki yol vardır:

- **Site içi panel:** `/admin` adresine gidin, `ADMIN_PASSWORD` ile giriş yapın. Van/Uşak filtreleri, toplamlar ve **CSV indir** mevcuttur.
- **Supabase paneli (yedek):** Supabase → **Table Editor** → `rsvps` tablosu.

Veri modeli: her form gönderimi **iki satır** oluşturur (Van + Uşak), ortak bir `submission_id` ile gruplanır.

---

## 4. Vercel'e yayınlama

1. Projeyi GitHub'a gönderin.
2. [vercel.com](https://vercel.com) üzerinde **ücretsiz** hesap açın, **Import Project** ile repoyu seçin (Next.js otomatik algılanır).
3. **Environment Variables** bölümüne dört değişkeni ekleyin: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_COOKIE_SECRET`.
4. **Deploy** deyin. Proje adını değiştirerek `seher-ahmet.vercel.app` gibi bir adres alabilirsiniz.

### Keep-alive (önemli)

Supabase ücretsiz katmanı 7 gün hareketsizlikte projeyi duraklatır. [`vercel.json`](vercel.json) içindeki **Cron**, haftada bir `/api/keep-alive` rotasını çağırarak veritabanını aktif tutar. Ek ayar gerekmez.

---

## 5. İçeriği güncelleme

- **Etkinlik/tarih/adres/harita:** tek dosyadan → [`lib/events.ts`](lib/events.ts)
- **Çift adı / site başlığı:** [`lib/config.ts`](lib/config.ts)
- **Arka plan müziği:** [`public/music/NASIL-EKLENIR.txt`](public/music/NASIL-EKLENIR.txt)
- **Renkler / yazı tipleri:** [`app/globals.css`](app/globals.css) ve [`app/layout.tsx`](app/layout.tsx)

---

## Komutlar

```bash
npm run dev     # geliştirme sunucusu
npm run build   # üretim derlemesi
npm run start   # üretim sunucusu (build sonrası)
npm run lint    # ESLint
```
