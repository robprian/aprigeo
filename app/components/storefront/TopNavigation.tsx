"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function TopNavigation() {
  const [mounted, setMounted] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [language, setLanguage] = useState("English")
  const [currency, setCurrency] = useState("IDR")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-gray-100 py-2 text-xs border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Contact Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">(+62) 21-1234-5678</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">info@apriniageosat.co.id</span>
            </div>
          </div>

          {/* Right Side Links */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen)
                  setIsCurrencyOpen(false)
                }}
              >
                <span>{language}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-1 bg-white shadow-md border border-gray-100 rounded-md py-1 z-50 min-w-[120px]"
                >
                  {["English", "Indonesian"].map((lang) => (
                    <button
                      key={lang}
                      className="block w-full text-left px-4 py-1 hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                      onClick={() => {
                        setLanguage(lang)
                        setIsLanguageOpen(false)
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setIsCurrencyOpen(!isCurrencyOpen)
                  setIsLanguageOpen(false)
                }}
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isCurrencyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-1 bg-white shadow-md border border-gray-100 rounded-md py-1 z-50 min-w-[120px]"
                >
                  {["IDR", "USD", "EUR"].map((curr) => (
                    <button
                      key={curr}
                      className="block w-full text-left px-4 py-1 hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                      onClick={() => {
                        setCurrency(curr)
                        setIsCurrencyOpen(false)
                      }}
                    >
                      {curr}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="h-3 border-r border-gray-300"></div>

            {/* Quick Links */}
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
