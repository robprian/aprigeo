import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache, getCache, setCache } from '@/lib/db'
import { Category, PaginatedResponse } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search')
    const status = searchParams.get('status') // 'active', 'inactive', 'all'
    const sort = searchParams.get('sort') || 'sort_order'
    const order = searchParams.get('order') || 'ASC'
    
    const offset = (page - 1) * limit
    
    // Build cache key
    const cacheKey = `admin:categories:${page}:${limit}:${search}:${status}:${sort}:${order}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Build WHERE clause - Admin can see all categories including inactive
    let whereClause = 'WHERE 1=1'
    const queryParams: any[] = []
    let paramIndex = 1
    
    if (status === 'active') {
      whereClause += ` AND c.is_active = true`
    } else if (status === 'inactive') {
      whereClause += ` AND c.is_active = false`
    }
    // If status is 'all' or not specified, show all categories
    
    if (search) {
      whereClause += ` AND (c.name ILIKE $${paramIndex} OR c.description ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }
    
    // Build ORDER BY clause
    let orderClause = ''
    switch (sort) {
      case 'name':
        orderClause = `ORDER BY c.name ${order}`
        break
      case 'created_at':
        orderClause = `ORDER BY c.created_at ${order}`
        break
      case 'product_count':
        orderClause = `ORDER BY product_count ${order}`
        break
      case 'sort_order':
      default:
        orderClause = `ORDER BY c.sort_order ${order}`
        break
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM categories c
      ${whereClause}
    `
    
    const countResult = await query(countQuery, queryParams)
    const total = parseInt(countResult.rows[0].total)
    
    // Get categories with product count
    const categoriesQuery = `
      SELECT 
        c.*,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
      ${whereClause}
      GROUP BY c.id
      ${orderClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `
    
    queryParams.push(limit, offset)
    
    const result = await query(categoriesQuery, queryParams)
    
    const categories: (Category & { product_count: number })[] = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      image_url: row.image_url,
      parent_id: row.parent_id,
      is_active: row.is_active,
      sort_order: row.sort_order,
      meta_title: row.meta_title,
      meta_description: row.meta_description,
      created_at: row.created_at,
      updated_at: row.updated_at,
      product_count: parseInt(row.product_count) || 0
    }))
    
    const response: PaginatedResponse<Category & { product_count: number }> = {
      data: categories,
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
    console.error('Admin categories API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, slug, description, image_url, parent_id, is_active, sort_order } = await request.json()

    const result = await query(`
      INSERT INTO categories (
        name, slug, description, image_url, parent_id, is_active, sort_order, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING id
    `, [
      name,
      slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      image_url,
      parent_id,
      is_active !== false,
      sort_order || 0
    ])

    const categoryId = result.rows[0].id

    // Clear relevant caches
    await deleteCache('categories:*')

    return NextResponse.json({ 
      success: true, 
      id: categoryId,
      message: 'Category created successfully' 
    })

  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
