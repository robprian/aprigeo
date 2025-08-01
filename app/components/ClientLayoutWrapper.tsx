"use client"

import { usePathname } from 'next/navigation'
import { SessionProvider } from "next-auth/react"
import Header from "@/app/components/storefront/Header"
import Footer from "@/app/components/storefront/Footer"
import FloatingContact from "@/app/components/ui/floating-contact"

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname()
  
  // Pages that should not show header and footer
  const noLayoutPages = ['/admin/login']
  
  // Pages that should not show floating contact
  const noFloatingContactPages = ['/admin', '/checkout', '/login']
  
  const shouldShowLayout = !noLayoutPages.includes(pathname)
  const shouldShowFloatingContact = !noFloatingContactPages.some(page => pathname.startsWith(page))
  
  if (!shouldShowLayout) {
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    )
  }
  
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        {shouldShowFloatingContact && (
          <FloatingContact 
            whatsappNumber="6281234567890"
            companyName="CV. Aprinia Geosat Solusindo"
          />
        )}
      </div>
    </SessionProvider>
  )
}
