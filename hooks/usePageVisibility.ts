"use client"

import { useState, useEffect } from "react"

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true)
  const [wasVisible, setWasVisible] = useState(true)

  useEffect(() => {
    // Update the visibility state when the document's visibility changes
    const handleVisibilityChange = () => {
      const visible = !document.hidden
      setWasVisible(isVisible)
      setIsVisible(visible)
    }

    // Add event listener
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Initial check
    setIsVisible(!document.hidden)

    // Clean up
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isVisible])

  return {
    isVisible,
    wasVisible,
    hasChanged: isVisible !== wasVisible
  }
}

export default usePageVisibility
