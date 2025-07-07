import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/banners/[id] - Get single banner
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const sql = `
      SELECT 
        id, title, subtitle, description, image_url, mobile_image_url,
        button_text, button_url, background_color, text_color,
        position, size, is_active, display_order, start_date, end_date,
        click_count, view_count, target_audience, created_at, updated_at
      FROM banners
      WHERE id = $1
    `

    const result = await query(sql, [id])

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
    console.error('Error fetching banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch banner' },
      { status: 500 }
    )
  }
}

// PUT /api/banners/[id] - Update banner
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

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
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

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
