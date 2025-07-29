import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Cache for page visibility to avoid database calls on every request
const pageVisibilityCache = new Map<string, { visible: boolean, timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Page slug is required' },
        { status: 400 }
      )
    }

    // Check cache first
    const cached = pageVisibilityCache.get(slug)
    const now = Date.now()
    
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        visible: cached.visible
      })
    }

    // Query database
    const result = await pool.query(
      'SELECT is_visible FROM page_settings WHERE page_slug = $1',
      [slug]
    )

    let visible = true // Default to visible if page not in settings
    if (result.rows.length > 0) {
      visible = result.rows[0].is_visible
    }

    // Update cache
    pageVisibilityCache.set(slug, { visible, timestamp: now })

    return NextResponse.json({
      success: true,
      visible
    })
  } catch (error) {
    console.error('Error checking page visibility:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check page visibility', visible: true },
      { status: 500 }
    )
  }
}
