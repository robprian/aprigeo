import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/banners - Get all banners with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const position = searchParams.get('position')
    const active = searchParams.get('active')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let sql = `
      SELECT 
        id, title, subtitle, description, image_url, mobile_image_url,
        button_text, button_url, background_color, text_color,
        position, size, is_active, display_order, start_date, end_date,
        click_count, view_count, target_audience, created_at, updated_at
      FROM banners
      WHERE 1=1
    `
    const params: any[] = []
    let paramCount = 0

    if (position) {
      sql += ` AND position = $${++paramCount}`
      params.push(position)
    }

    if (active !== null && active !== 'all') {
      sql += ` AND is_active = $${++paramCount}`
      params.push(active === 'true')
    }

    // Only show banners that are within date range
    sql += ` AND (start_date <= NOW() AND (end_date IS NULL OR end_date >= NOW()))`

    sql += ` ORDER BY display_order ASC, created_at DESC`
    sql += ` LIMIT $${++paramCount} OFFSET $${++paramCount}`
    params.push(limit, offset)

    const result = await query(sql, params)
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      pagination: {
        limit,
        offset,
        total: result.rowCount || 0
      }
    })
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}

// POST /api/banners - Create new banner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title, subtitle, description, image_url, mobile_image_url,
      button_text, button_url, background_color, text_color,
      position, size, is_active, display_order, start_date, end_date,
      target_audience
    } = body

    const sql = `
      INSERT INTO banners (
        title, subtitle, description, image_url, mobile_image_url,
        button_text, button_url, background_color, text_color,
        position, size, is_active, display_order, start_date, end_date,
        target_audience
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `

    const result = await query(sql, [
      title, subtitle, description, image_url, mobile_image_url,
      button_text, button_url, background_color, text_color,
      position, size, is_active, display_order, start_date, end_date,
      target_audience
    ])

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}

// PUT /api/banners/[id] - Update banner
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    const {
      title, subtitle, description, image_url, mobile_image_url,
      button_text, button_url, background_color, text_color,
      position, size, is_active, display_order, start_date, end_date,
      target_audience
    } = body

    const sql = `
      UPDATE banners SET
        title = $1, subtitle = $2, description = $3, image_url = $4, mobile_image_url = $5,
        button_text = $6, button_url = $7, background_color = $8, text_color = $9,
        position = $10, size = $11, is_active = $12, display_order = $13, 
        start_date = $14, end_date = $15, target_audience = $16, updated_at = NOW()
      WHERE id = $17
      RETURNING *
    `

    const result = await query(sql, [
      title, subtitle, description, image_url, mobile_image_url,
      button_text, button_url, background_color, text_color,
      position, size, is_active, display_order, start_date, end_date,
      target_audience, id
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update banner' },
      { status: 500 }
    )
  }
}

// DELETE /api/banners/[id] - Delete banner
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    const sql = 'DELETE FROM banners WHERE id = $1 RETURNING *'
    const result = await query(sql, [id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Banner deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete banner' },
      { status: 500 }
    )
  }
}
