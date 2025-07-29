"use client"

import { usePathname } from "next/navigation"
import Header from "@/app/components/storefront/Header"
import Footer from "@/app/components/storefront/Footer"

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Pages that should not have storefront header/footer
  const isAdminPage = pathname.startsWith('/admin')
  const isAccountPage = pathname.startsWith('/account')

  // For admin and account pages, don't show storefront header/footer
  if (isAdminPage || isAccountPage) {
    return <>{children}</>
  }

  // For all other pages, show storefront layout
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
