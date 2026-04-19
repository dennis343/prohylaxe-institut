import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Prophylaxe-Institut by Minka — Praxismentoring für Zahnärzte"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #f8f3e8 0%, #f3ecdb 55%, #efe4c9 100%)",
          color: "#14203a",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8a6a2b",
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 54,
                height: 54,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 27,
                background: "#14203a",
                color: "#f8f3e8",
                fontFamily: "serif",
                fontSize: 30,
                fontStyle: "italic",
              }}
            >
              M
            </div>
            Prophylaxe-Institut
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8a6a2b",
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            by Minka
          </div>
        </div>

        {/* Main block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.05,
              fontStyle: "normal",
              color: "#14203a",
              maxWidth: 1000,
            }}
          >
            Nachhaltiger Praxis­erfolg
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.05,
              fontStyle: "italic",
              color: "#a88138",
            }}
          >
            mit System.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 26,
              color: "#40496a",
              fontFamily: "sans-serif",
              maxWidth: 900,
            }}
          >
            Persönliches Mentoring für Zahnarztpraxen — über 150 begleitete
            Praxen. Beratung 50–80 % förderfähig.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#8a6a2b",
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>Beratung</span>
            <span
              style={{
                display: "flex",
                width: 32,
                height: 1,
                background: "#a88138",
              }}
            />
            <span>Mentoring</span>
            <span
              style={{
                display: "flex",
                width: 32,
                height: 1,
                background: "#a88138",
              }}
            />
            <span>Förderfähig</span>
          </div>
          <div style={{ display: "flex", color: "#40496a" }}>
            prophylaxe-institut.de
          </div>
        </div>

        {/* Accent corner */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 54,
            right: 54,
            width: 120,
            height: 120,
            borderTop: "1px solid #a88138",
            borderRight: "1px solid #a88138",
          }}
        />
      </div>
    ),
    { ...size },
  )
}
