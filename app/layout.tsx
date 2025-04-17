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
        url: "/humanizer-og.png", // This will be resolved against metadataBase
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
    images: ["/humanizer-og.png"], // This will be resolved against metadataBase
  },
  // Verification for search engines
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code if you have one
  },
  // Application icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  // Web manifest
  manifest: "/site.webmanifest",
  // Theme color
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Additional favicon links for maximum compatibility */}
        <link rel="mask-icon" href="/favicon.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono bg-black text-neutral-400`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'