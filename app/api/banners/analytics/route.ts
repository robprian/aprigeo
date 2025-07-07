import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// POST /api/banners/analytics - Track banner events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { banner_id, event_type, device_type } = body
    
    // Get user info from headers
    const user_agent = request.headers.get('user-agent') || ''
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      '127.0.0.1'
    const referrer = request.headers.get('referer') || ''

    // Insert analytics record
    const analyticsResult = await query(
      `INSERT INTO banner_analytics (banner_id, event_type, user_agent, ip_address, referrer, device_type)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [banner_id, event_type, user_agent, ip_address, referrer, device_type]
    )

    // Update banner counters
    if (event_type === 'view') {
      await query(
        'UPDATE banners SET view_count = view_count + 1 WHERE id = $1',
        [banner_id]
      )
    } else if (event_type === 'click') {
      await query(
        'UPDATE banners SET click_count = click_count + 1 WHERE id = $1',
        [banner_id]
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully'
    })
  } catch (error) {
    console.error('Error tracking banner event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

// GET /api/banners/analytics - Get banner analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const banner_id = searchParams.get('banner_id')
    const days = parseInt(searchParams.get('days') || '30')

    let sql = `
      SELECT 
        b.id, b.title, b.position,
        COUNT(CASE WHEN ba.event_type = 'view' THEN 1 END) as views,
        COUNT(CASE WHEN ba.event_type = 'click' THEN 1 END) as clicks,
        ROUND(
          COUNT(CASE WHEN ba.event_type = 'click' THEN 1 END)::numeric / 
          NULLIF(COUNT(CASE WHEN ba.event_type = 'view' THEN 1 END), 0) * 100, 2
        ) as ctr
      FROM banners b
      LEFT JOIN banner_analytics ba ON b.id = ba.banner_id 
        AND ba.created_at >= NOW() - INTERVAL '${days} days'
    `

    const params: any[] = []
    let paramCount = 0

    if (banner_id) {
      sql += ` WHERE b.id = $${++paramCount}`
      params.push(banner_id)
    }

    sql += ` GROUP BY b.id, b.title, b.position ORDER BY views DESC`

    const result = await query(sql, params)

    return NextResponse.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching banner analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
