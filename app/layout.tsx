import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, Syne } from "next/font/google" // Added Syne
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

// Added this to load the tactical font globally
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
})

export const metadata: Metadata = {
  title: "FISAT AICTE IDEA Lab",
  description: "Innovation, Prototyping & Student Ideas at FISAT",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      {/* Added syne.variable here */}
      <body className={`${inter.className} ${spaceGrotesk.variable} ${syne.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}