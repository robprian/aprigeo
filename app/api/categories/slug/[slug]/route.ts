import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      )
    }

    // Get category by slug with product count
    const result = await query(
      `SELECT 
        c.id,
        c.name,
        c.slug,
        c.description,
        c.image_url,
        c.parent_id,
        c.is_active,
        c.sort_order,
        c.created_at,
        c.updated_at,
        COUNT(p.id) as products_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
      WHERE c.slug = $1 AND c.is_active = true
      GROUP BY c.id`,
      [slug]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      )
    }

    const category = {
      ...result.rows[0],
      products_count: parseInt(result.rows[0].products_count) || 0
    }

    return NextResponse.json({
      success: true,
      data: category
    })
  } catch (error) {
    console.error('Category slug API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}
