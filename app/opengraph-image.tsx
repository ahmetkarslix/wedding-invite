import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Seher & Ahmet — Düğün Davetiyesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Google Fonts'tan Jost Light yükle (OG görseldeki metin için)
  let jostData: ArrayBuffer | undefined;
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Jost:wght@300",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
      },
    ).then((r) => r.text());
    const url = css.match(
      /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/,
    )?.[1];
    if (url) jostData = await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    /* font yüklenemezse varsayılan kullanılır */
  }

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
          fontFamily: "Jost, serif",
        }}
      >
        {/* İnce kenarlıklı kart */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid #E7E0D4",
            padding: "56px 100px",
            gap: "0",
          }}
        >
          {/* DAVETLİSİNİZ */}
          <p
            style={{
              fontSize: 16,
              letterSpacing: "0.55em",
              fontWeight: 300,
              color: "#4A453E",
              margin: 0,
            }}
          >
            DAVETLİSİNİZ
          </p>

          {/* İsimler */}
          <p
            style={{
              fontSize: 80,
              fontWeight: 300,
              margin: "20px 0 0 0",
              lineHeight: 1.1,
            }}
          >
            Seher
          </p>
          <p
            style={{
              fontSize: 36,
              color: "#9A8A6B",
              margin: "4px 0",
              fontWeight: 300,
            }}
          >
            &
          </p>
          <p
            style={{
              fontSize: 80,
              fontWeight: 300,
              margin: "0 0 24px 0",
              lineHeight: 1.1,
            }}
          >
            Ahmet
          </p>

          {/* Dekoratif çizgi */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: 50,
                height: 1,
                backgroundColor: "#E7E0D4",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                backgroundColor: "#9A8A6B",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                width: 50,
                height: 1,
                backgroundColor: "#E7E0D4",
              }}
            />
          </div>

          {/* Tarih ve şehirler */}
          <p
            style={{
              fontSize: 20,
              letterSpacing: "0.2em",
              fontWeight: 300,
              color: "#4A453E",
              margin: "24px 0 0 0",
            }}
          >
            18 & 26 Eylül 2026
          </p>
          <p
            style={{
              fontSize: 14,
              letterSpacing: "0.4em",
              fontWeight: 300,
              color: "#8A8175",
              margin: "10px 0 0 0",
            }}
          >
            VAN & UŞAK
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: jostData
        ? [{ name: "Jost", data: jostData, style: "normal" as const, weight: 300 as const }]
        : [],
    },
  );
}
