import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (slug) {
      // Get specific page
      const result = await pool.query(
        'SELECT * FROM page_settings WHERE page_slug = $1',
        [slug]
      )
      
      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Page not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        page: result.rows[0]
      })
    } else {
      // Get all pages
      const result = await pool.query(
        'SELECT * FROM page_settings ORDER BY display_order ASC, page_name ASC'
      )

      return NextResponse.json({
        success: true,
        pages: result.rows
      })
    }
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const {
      page_slug,
      page_name,
      is_visible = true,
      meta_title,
      meta_description,
      custom_content,
      page_type = 'static',
      display_order = 0
    } = data

    const result = await pool.query(
      `INSERT INTO page_settings 
       (page_slug, page_name, is_visible, meta_title, meta_description, custom_content, page_type, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [page_slug, page_name, is_visible, meta_title, meta_description, custom_content, page_type, display_order]
    )

    return NextResponse.json({
      success: true,
      page: result.rows[0]
    })
  } catch (error: any) {
    console.error('Error creating page:', error)
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Page slug already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create page' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const {
      id,
      page_slug,
      page_name,
      is_visible,
      meta_title,
      meta_description,
      custom_content,
      page_type,
      display_order
    } = data

    const result = await pool.query(
      `UPDATE page_settings 
       SET page_slug = $2, page_name = $3, is_visible = $4, meta_title = $5, 
           meta_description = $6, custom_content = $7, page_type = $8, display_order = $9
       WHERE id = $1
       RETURNING *`,
      [id, page_slug, page_name, is_visible, meta_title, meta_description, custom_content, page_type, display_order]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      page: result.rows[0]
    })
  } catch (error: any) {
    console.error('Error updating page:', error)
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Page slug already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update page' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Page ID is required' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      'DELETE FROM page_settings WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}
