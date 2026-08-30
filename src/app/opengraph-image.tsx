import { ImageResponse } from "next/og";

export const alt = "Junior's Supermarket — The Real Meat People";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        color: "white",
        background: "linear-gradient(135deg, #7f1d1d, #b91c1c 55%, #111827)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 800 }}>Junior&apos;s Supermarket</div>
      <div style={{ marginTop: 22, fontSize: 38, fontWeight: 600 }}>The Real Meat People</div>
      <div style={{ marginTop: 38, fontSize: 26 }}>Fresh food and family value across the Rio Grande Valley</div>
    </div>,
    size
  );
}
