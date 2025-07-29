"use client"

import type React from "react"
import CustomerHeader from "@/app/components/account/CustomerHeader"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader />
      
      {/* Main Content - Full width without sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
