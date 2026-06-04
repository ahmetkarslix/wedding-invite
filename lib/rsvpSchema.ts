import { z } from "zod";

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
    .max(120, "İsim çok uzun."),
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
