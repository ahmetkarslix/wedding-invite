-- ---------------------------------------------------------------------------
-- Supabase şeması — bu dosyanın tamamını Supabase panelinde
-- SQL Editor'a yapıştırıp bir kez çalıştırın.
-- ---------------------------------------------------------------------------

-- İki etkinlik için enum
create type event_id as enum ('van', 'usak');

create table public.rsvps (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null,                 -- bir formdaki iki satırı gruplar
  full_name     text not null check (char_length(full_name) between 2 and 120),
  event_id      event_id not null,             -- 'van' = Kına & Düğün, 'usak' = Düğün
  attending     boolean not null,
  guest_count   smallint not null default 1 check (guest_count between 0 and 20),
  message       text check (message is null or char_length(message) <= 1000),
  name_key      text,                            -- Türkçe küçük harfe çevrilmiş isim (güncelleme eşleştirmesi için)
  created_at    timestamptz not null default now()
);

-- Admin tablosunda etkinliğe göre filtre/sıralama için
create index rsvps_event_created_idx on public.rsvps (event_id, created_at desc);
create index rsvps_submission_idx    on public.rsvps (submission_id);
create index rsvps_name_key_idx      on public.rsvps (name_key);

-- Güvenlik: RLS açık, anon/public için POLICY YOK => varsayılan ret.
-- service_role anahtarı (yalnız sunucuda) RLS'i baypas eder; tüm yazma/okuma
-- işlemleri sunucu tarafında yapılır. İstemci (anon) anahtarı hiç kullanılmaz.
alter table public.rsvps enable row level security;
