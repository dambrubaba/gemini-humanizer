import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "AI Text Humanizer - Transform AI-generated content into human content"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  // Use the public URL path for the OG image
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        background: "#000",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/public/humanizer-og.png" alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>,
    {
      ...size,
    },
  )
}
