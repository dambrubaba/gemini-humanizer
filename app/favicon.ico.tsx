import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/x-icon"

// Image generation
export default async function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        background: "#000",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/robot-head.png" alt="Robot head icon" style={{ width: "80%", height: "80%", objectFit: "contain" }} />
    </div>,
    {
      ...size,
    },
  )
}
