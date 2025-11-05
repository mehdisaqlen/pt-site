// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PubThrive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 64,
          background:
            "radial-gradient(1200px 600px at 0% 0%, #0b0b0f 0%, #0b0b0f 35%, #10131a 60%, #0b0b0f 100%)",
          color: "white",
          fontSize: 56,
          lineHeight: 1.1,
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7 }}>pubthrive.com</div>
        <div style={{ fontWeight: 700 }}>PubThrive</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {/* If you have /public/logo.png it will show */}
          <img
            src={`${
              process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://pubthrive.com"
            }/logo.png`}
            width="72"
            height="72"
          />
          <div style={{ fontSize: 28, opacity: 0.8 }}>
            Smarter AdTech & Publisher Growth
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
