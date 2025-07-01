import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache } from '@/lib/db'
import { Product, ApiResponse, PaginatedResponse } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    // Handle build-time static generation
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        data: [],
        pagination: { page: 1, limit: 12, total: 0, pages: 0 }
      })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'DESC'
    
    const offset = (page - 1) * limit
    
    // Build cache key
    const cacheKey = `products:${page}:${limit}:${category}:${featured}:${search}:${sort}:${order}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Build WHERE clause
    let whereClause = 'WHERE p.is_active = true'
    const queryParams: any[] = []
    let paramIndex = 1
    
    if (category) {
      whereClause += ` AND c.slug = $${paramIndex}`
      queryParams.push(category)
      paramIndex++
    }
    
    if (featured === 'true') {
      whereClause += ` AND p.is_featured = true`
    }
    
    if (search) {
      whereClause += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }
    
    // Build ORDER BY clause
    let orderClause = ''
    switch (sort) {
      case 'price_asc':
        orderClause = 'ORDER BY p.price ASC'
        break
      case 'price_desc':
        orderClause = 'ORDER BY p.price DESC'
        break
      case 'name':
        orderClause = 'ORDER BY p.name ASC'
        break
      case 'created_at':
      default:
        orderClause = `ORDER BY p.created_at ${order}`
        break
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `
    
    const countResult = await query(countQuery, queryParams)
    const total = parseInt(countResult.rows[0].total)
    
    // Get products
    const productsQuery = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        b.name as brand_name,
        b.slug as brand_slug,
        COALESCE(AVG(pr.rating), 0) as rating,
        COUNT(pr.id) as reviews
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_reviews pr ON p.id = pr.product_id
      ${whereClause}
      GROUP BY p.id, c.name, c.slug, b.name, b.slug
      ${orderClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `
    
    queryParams.push(limit, offset)
    
    const result = await query(productsQuery, queryParams)
    
    const products: Product[] = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      short_description: row.short_description,
      sku: row.sku,
      price: parseFloat(row.price),
      compare_price: row.compare_price ? parseFloat(row.compare_price) : undefined,
      cost_price: row.cost_price ? parseFloat(row.cost_price) : undefined,
      category_id: row.category_id,
      brand_id: row.brand_id,
      is_active: row.is_active,
      is_featured: row.is_featured,
      in_stock: row.in_stock,
      stock_quantity: row.stock_quantity,
      weight: row.weight,
      dimensions: row.dimensions,
      images: row.images || [],
      tags: row.tags || [],
      meta_title: row.meta_title,
      meta_description: row.meta_description,
      created_at: row.created_at,
      updated_at: row.updated_at,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name,
        slug: row.category_slug,
        description: '',
        is_active: true,
        sort_order: 0,
        created_at: '',
        updated_at: ''
      } : undefined,
      brand: row.brand_name ? {
        id: row.brand_id,
        name: row.brand_name,
        slug: row.brand_slug,
        description: '',
        is_active: true,
        created_at: '',
        updated_at: ''
      } : undefined,
      rating: parseFloat(row.rating) || 0,
      reviews: parseInt(row.reviews) || 0,
      badge: row.is_featured ? 'Featured' : (row.compare_price ? 'Sale' : undefined)
    }))
    
    const response: PaginatedResponse<Product> = {
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
    
    // Cache the result for 5 minutes
    await setCache(cacheKey, response, 300)
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}