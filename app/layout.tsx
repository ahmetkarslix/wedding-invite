import type { Metadata } from "next";
import { Great_Vibes, Sacramento, Jost } from "next/font/google";
import { SITE } from "@/lib/config";
import "./globals.css";

// Kaligrafi: yalnızca "Seher & Ahmet" ve benzeri isimler (Türkçe özel karakter yok → latin yeterli)
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

// Küçük gün adları: "Cuma" / "Cumartesi" (Türkçe özel karakter yok)
const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
});

// Başlık + gövde: geometrik sans, Türkçe için latin-ext gerekli (ş ğ İ ç ö ü)
const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seher-ahmet.vercel.app"),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    locale: "tr_TR",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${greatVibes.variable} ${sacramento.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">{children}</body>
    </html>
  );
}
