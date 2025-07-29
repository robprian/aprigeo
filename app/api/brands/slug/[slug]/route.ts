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

    // Get brand by slug with product count
    const result = await query(
      `SELECT 
        b.id,
        b.name,
        b.slug,
        b.description,
        b.logo_url,
        b.is_active,
        b.created_at,
        b.updated_at,
        COUNT(p.id) as products_count
      FROM brands b
      LEFT JOIN products p ON b.id = p.brand_id AND p.is_active = true
      WHERE b.slug = $1 AND b.is_active = true
      GROUP BY b.id`,
      [slug]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Brand not found' },
        { status: 404 }
      )
    }

    const brand = {
      ...result.rows[0],
      products_count: parseInt(result.rows[0].products_count) || 0
    }

    return NextResponse.json({
      success: true,
      data: brand
    })
  } catch (error) {
    console.error('Brand slug API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brand' },
      { status: 500 }
    )
  }
}
