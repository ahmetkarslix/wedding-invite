import { z } from "zod";

// Ad-soyad doğrulaması (client + server ortak kullanır).
// \p{L} = herhangi bir Unicode harf (Türkçe ş ğ İ ç ö ü dahil), u bayrağı şart.
// En az iki kelime (ad + soyad); kelimeler tire/kesme ile birleşebilir (Ayşe-Nur, O'Brien).
export const NAME_REGEX =
  /^\p{L}+(?:['’\-]\p{L}+)*(?:\s+\p{L}+(?:['’\-]\p{L}+)*)+$/u;

// Geçersizse Türkçe hata mesajı, geçerliyse null döndürür.
export function validateFullName(raw: string): string | null {
  const v = (raw ?? "").trim().replace(/\s+/g, " ");
  if (v.length < 2) return "Lütfen adınızı ve soyadınızı girin.";
  if (/[0-9]/.test(v)) return "İsimde rakam kullanılamaz.";
  if (/\s/.test(v) === false) return "Lütfen hem adınızı hem soyadınızı yazın.";
  if (!NAME_REGEX.test(v)) return "İsimde yalnızca harf kullanabilirsiniz.";
  if (v.length > 120) return "İsim çok uzun.";
  return null;
}

// Bir etkinlik için katılım yanıtı
export const eventResponseSchema = z.object({
  attending: z.enum(["yes", "no"], {
    message: "Lütfen bu etkinlik için katılım durumunu seçin.",
  }),
  guestCount: z.coerce.number().int().min(0).max(20),
});

// Tüm form (iki etkinlik tek gönderimde)
export const rsvpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Lütfen adınızı ve soyadınızı girin.")
    .max(120, "İsim çok uzun.")
    .refine((v) => validateFullName(v) === null, {
      message: "Lütfen geçerli bir ad ve soyad girin (yalnızca harf, ad ve soyad).",
    }),
  message: z.string().trim().max(1000, "Mesaj 1000 karakteri aşamaz.").optional(),
  van: eventResponseSchema,
  usak: eventResponseSchema,
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

// Server action'ın döndürdüğü durum (useActionState ile kullanılır).
export type RsvpState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};
