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
  // Get the OG image from the public folder
  const ogImageUrl = new URL(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Humanizer%20OG-Z4ajcZU8V8yKwjI79QHJS5JaLdXFou.png",
  )
  const imageData = await fetch(ogImageUrl).then((res) => res.arrayBuffer())

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
      <img
        src={Buffer.from(imageData).toString("base64") || "/placeholder.svg"}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>,
    {
      ...size,
    },
  )
}
