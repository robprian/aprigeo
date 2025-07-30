import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache, getCache, setCache } from '@/lib/db'
import { Brand, PaginatedResponse } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search')
    const status = searchParams.get('status') // 'active', 'inactive', 'all'
    const sort = searchParams.get('sort') || 'name'
    const order = searchParams.get('order') || 'ASC'
    
    const offset = (page - 1) * limit
    
    // Build cache key
    const cacheKey = `admin:brands:${page}:${limit}:${search}:${status}:${sort}:${order}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Build WHERE clause - Admin can see all brands including inactive
    let whereClause = 'WHERE 1=1'
    const queryParams: any[] = []
    let paramIndex = 1
    
    if (status === 'active') {
      whereClause += ` AND b.is_active = true`
    } else if (status === 'inactive') {
      whereClause += ` AND b.is_active = false`
    }
    // If status is 'all' or not specified, show all brands
    
    if (search) {
      whereClause += ` AND (b.name ILIKE $${paramIndex} OR b.description ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }
    
    // Build ORDER BY clause
    let orderClause = ''
    switch (sort) {
      case 'name':
        orderClause = `ORDER BY b.name ${order}`
        break
      case 'created_at':
        orderClause = `ORDER BY b.created_at ${order}`
        break
      case 'product_count':
        orderClause = `ORDER BY product_count ${order}`
        break
      default:
        orderClause = `ORDER BY b.name ${order}`
        break
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM brands b
      ${whereClause}
    `
    
    const countResult = await query(countQuery, queryParams)
    const total = parseInt(countResult.rows[0].total)
    
    // Get brands with product count
    const brandsQuery = `
      SELECT 
        b.*,
        COUNT(p.id) as product_count
      FROM brands b
      LEFT JOIN products p ON b.id = p.brand_id AND p.is_active = true
      ${whereClause}
      GROUP BY b.id
      ${orderClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `
    
    queryParams.push(limit, offset)
    
    const result = await query(brandsQuery, queryParams)
    
    const brands: (Brand & { product_count: number })[] = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      logo_url: row.logo_url,
      website_url: row.website_url,
      is_active: row.is_active,
      meta_title: row.meta_title,
      meta_description: row.meta_description,
      created_at: row.created_at,
      updated_at: row.updated_at,
      product_count: parseInt(row.product_count) || 0
    }))
    
    const response: PaginatedResponse<Brand & { product_count: number }> = {
      data: brands,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
    
    // Cache the result for 2 minutes (shorter for admin)
    await setCache(cacheKey, response, 120)
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Admin brands API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brands' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, slug, description, logo_url, is_active } = await request.json()

    const result = await query(`
      INSERT INTO brands (
        name, slug, description, logo_url, is_active, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id
    `, [
      name,
      slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      logo_url,
      is_active !== false
    ])

    const brandId = result.rows[0].id

    // Clear relevant caches
    await deleteCache('brands:*')

    return NextResponse.json({ 
      success: true, 
      id: brandId,
      message: 'Brand created successfully' 
    })

  } catch (error) {
    console.error('Create brand error:', error)
    return NextResponse.json(
      { error: 'Failed to create brand' },
      { status: 500 }
    )
  }
}
