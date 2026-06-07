import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// WhatsApp / sosyal medya paylaşım önizleme görseli (og:image).
// Fontlar YERELDEN gömülür — çalışma anında ağ gerekmez, Türkçe karakterler garanti.
export const runtime = "nodejs";
export const alt = "Seher & Ahmet — Düğün Davetiyesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const greatVibes = readFileSync(
  join(process.cwd(), "assets/fonts/GreatVibes-Regular.ttf"),
);
const marcellus = readFileSync(
  join(process.cwd(), "assets/fonts/Marcellus-Regular.ttf"),
);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FBF8F1",
          color: "#1A1714",
          fontFamily: "Marcellus",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid #E7E0D4",
            padding: "48px 110px",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 11, color: "#4A453E" }}>
            DAVETLİSİNİZ
          </div>

          <div
            style={{
              fontFamily: "Great Vibes",
              fontSize: 110,
              lineHeight: 1,
              marginTop: 18,
            }}
          >
            Seher
          </div>
          <div
            style={{
              fontFamily: "Great Vibes",
              fontSize: 56,
              color: "#9A8A6B",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            &
          </div>
          <div
            style={{
              fontFamily: "Great Vibes",
              fontSize: 110,
              lineHeight: 1,
              marginBottom: 26,
            }}
          >
            Ahmet
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 54, height: 1, backgroundColor: "#E7E0D4" }} />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: "#9A8A6B",
                margin: "0 16px",
              }}
            />
            <div style={{ width: 54, height: 1, backgroundColor: "#E7E0D4" }} />
          </div>

          <div style={{ fontSize: 28, letterSpacing: 3, color: "#4A453E", marginTop: 26 }}>
            18 & 26 Eylül 2026
          </div>
          <div style={{ fontSize: 17, letterSpacing: 9, color: "#8A8175", marginTop: 12 }}>
            VAN & UŞAK
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Great Vibes", data: greatVibes, weight: 400, style: "normal" },
        { name: "Marcellus", data: marcellus, weight: 400, style: "normal" },
      ],
    },
  );
}
