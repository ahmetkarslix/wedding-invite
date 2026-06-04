-- Mevcut tabloya name_key sütunu ekle (aynı kişinin yanıtını güncellemek için).
-- Supabase SQL Editor'da çalıştırın.
ALTER TABLE public.rsvps ADD COLUMN IF NOT EXISTS name_key text;
CREATE INDEX IF NOT EXISTS rsvps_name_key_idx ON public.rsvps (name_key);
