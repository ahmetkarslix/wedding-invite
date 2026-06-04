// Site geneli ayarlar — tek yerden yönetilir.
export const SITE = {
  coupleNames: "Seher & Ahmet",
  title: "Seher & Ahmet — Düğün Davetiyesi",
  description:
    "Seher & Ahmet’in düğün davetiyesi. Kına, düğün detayları ve katılım onayı.",
} as const;

// Arka plan müziği — şimdilik kapalı.
// Açmak için: bir .mp3 dosyasını public/music/ içine koy, src'yi güncelle, enabled: true yap.
export const MUSIC = {
  enabled: false,
  src: "/music/track.mp3",
} as const;
