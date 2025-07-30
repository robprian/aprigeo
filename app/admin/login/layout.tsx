"use client"

import React from 'react'
import Image from 'next/image'

interface AdminLoginLayoutProps {
  children: React.ReactNode
}

export default function AdminLoginLayout({ children }: AdminLoginLayoutProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 rounded-xl shadow-lg">
              <div className="text-white font-bold text-xl tracking-wider">
                CV. APRINIA
              </div>
              <div className="text-blue-100 text-sm uppercase tracking-widest mt-1">
                Geosat Solusindo
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Masuk ke panel administrasi CV. Aprinia
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 sm:text-sm">
            © 2025 CV. Aprinia Geosat Solusindo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
