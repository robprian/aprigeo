import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache } from '@/lib/db'
import { Brand } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    // Handle build-time static generation
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        data: []
      })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const includeCount = searchParams.get('includeCount') === 'true'
    const featured = searchParams.get('featured') === 'true'
    
    const offset = (page - 1) * limit
    
    const cacheKey = `brands:${page}:${limit}:${includeCount}:${featured}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Build WHERE clause
    let whereClause = 'WHERE b.is_active = true'
    if (featured) {
      whereClause += ' AND b.featured = true'
    }
    
    // Build query with optional product count
    let selectClause = `
      b.id,
      b.name,
      b.slug,
      b.description,
      b.logo_url,
      b.website_url,
      b.country,
      b.phone,
      b.email,
      b.rating,
      b.featured,
      b.is_active,
      b.created_at,
      b.updated_at
    `
    
    if (includeCount) {
      selectClause += `,
        COUNT(p.id) as products_count
      `
    }
    
    const brandsQuery = `
      SELECT ${selectClause}
      FROM brands b
      ${includeCount ? 'LEFT JOIN products p ON b.id = p.brand_id AND p.is_active = true' : ''}
      ${whereClause}
      ${includeCount ? 'GROUP BY b.id' : ''}
      ORDER BY b.featured DESC, b.name ASC
      LIMIT $1 OFFSET $2
    `
    
    const result = await query(brandsQuery, [limit, offset])
    
    const brands: Brand[] = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      logo_url: row.logo_url,
      website_url: row.website_url,
      country: row.country,
      phone: row.phone,
      email: row.email,
      rating: row.rating,
      featured: row.featured,
      is_active: row.is_active,
      created_at: row.created_at,
      updated_at: row.updated_at,
      products_count: includeCount ? parseInt(row.products_count) || 0 : undefined
    }))
    
    // Cache the result for 10 minutes
    await setCache(cacheKey, { success: true, data: brands }, 600)
    
    return NextResponse.json({ success: true, data: brands })
    
  } catch (error) {
    console.error('Brands API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brands' },
      { status: 500 }
    )
  }
}
