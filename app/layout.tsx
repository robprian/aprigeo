import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ClientLayoutWrapper from "@/app/components/ClientLayoutWrapper"

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
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
