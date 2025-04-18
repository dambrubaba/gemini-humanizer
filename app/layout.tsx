import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Define metadata for the application
export const metadata: Metadata = {
  title: "AI Text Humanizer",
  description: "Transform AI-generated text into natural, human-like writing with multiple style options",
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  authors: [{ name: "bramha", url: "https://damburudhar.vercel.app" }],
  creator: "bramha",
  publisher: "bramha",
  keywords: [
    "AI text humanizer",
    "AI detection bypass",
    "humanize text",
    "natural language",
    "text transformer",
    "AI writing",
    "human writing",
    "Gemini API",
  ],
  // Open Graph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AI Text Humanizer",
    description: "Transform AI-generated text into natural, human-like writing with multiple style options",
    siteName: "AI Text Humanizer",
    images: [
      {
        url: "/Humanizer_OG.png", // Correct file name
        width: 1200,
        height: 630,
        alt: "AI Text Humanizer - Transform AI-generated content into human content",
      },
    ],
  },
  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "AI Text Humanizer",
    description: "Transform AI-generated text into natural, human-like writing with multiple style options",
    creator: "@scionofshiv",
    images: ["/Humanizer_OG.png"], // Correct file name
  },
  // Verification for search engines
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code if you have one
  },
  // Application icons
  icons: {
    icon: [
      { url: "/Robot_head.png", type: "image/png" }, // Correct file name
    ],
    apple: [{ url: "/Robot_head.png", sizes: "180x180", type: "image/png" }], // Correct file name
    other: [
      { url: "/Robot_head.png", sizes: "192x192", type: "image/png" }, // Correct file name
    ],
  },
  // Web manifest
  manifest: "/site.webmanifest",
  // Theme color
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional favicon links for maximum compatibility */}
        <link rel="icon" href="/Robot_head.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Robot_head.png" />
        <meta name="msapplication-TileImage" content="/Robot_head.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        {/* Explicit OG image tag as a fallback */}
        <meta property="og:image" content="/Humanizer_OG.png" />
        <meta property="twitter:image" content="/Humanizer_OG.png" />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
