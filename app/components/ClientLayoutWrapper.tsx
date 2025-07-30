"use client"

import { usePathname } from 'next/navigation'
import Header from "@/app/components/storefront/Header"
import Footer from "@/app/components/storefront/Footer"

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname()
  
  // Pages that should not show header and footer
  const noLayoutPages = ['/admin/login']
  
  const shouldShowLayout = !noLayoutPages.includes(pathname)
  
  if (!shouldShowLayout) {
    return <>{children}</>
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
