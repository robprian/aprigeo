import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/app/components/storefront/Header"
import Footer from "@/app/components/storefront/Footer"

export const metadata: Metadata = {
  title: "CV. Aprinia Geosat Solusindo - Survey Equipment & GPS Tools",
  description:
    "Professional survey equipment, GPS tools, satellite phones and mapping solutions by CV. Aprinia Geosat Solusindo",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
