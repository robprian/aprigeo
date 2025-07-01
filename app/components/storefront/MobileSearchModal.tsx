"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface MobileSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
      searchInputRef.current?.focus()
    } else {
      document.body.classList.remove("overflow-hidden")
      setSearchTerm("")
    }
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${searchTerm}`)
      onClose()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleClose = () => {
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
      <div className="relative p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Search</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md p-1"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleInputChange}
            ref={searchInputRef}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default MobileSearchModal
