import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import RootLayoutWrapper from "./components/RootLayoutWrapper"

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
          <RootLayoutWrapper>
            {children}
          </RootLayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
