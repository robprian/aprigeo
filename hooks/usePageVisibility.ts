import { useState, useEffect } from 'react'

export function usePageVisibility(slug: string) {
  const [isVisible, setIsVisible] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    const checkVisibility = async () => {
      try {
        const response = await fetch(`/api/pages/visibility?slug=${slug}`)
        const data = await response.json()
        
        if (data.success) {
          setIsVisible(data.visible)
        }
      } catch (error) {
        console.error('Error checking page visibility:', error)
        // Default to visible on error
        setIsVisible(true)
      } finally {
        setLoading(false)
      }
    }

    checkVisibility()
  }, [slug])

  return { isVisible, loading }
}
