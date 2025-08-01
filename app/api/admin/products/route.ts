import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache, getCache, setCache } from '@/lib/db'
import { Product, PaginatedResponse } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const status = searchParams.get('status') // 'active', 'inactive', 'all'
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'DESC'
    
    const offset = (page - 1) * limit
    
    // Build cache key
    const cacheKey = `admin:products:${page}:${limit}:${search}:${category}:${status}:${sort}:${order}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Build WHERE clause - Admin can see all products including inactive
    let whereClause = 'WHERE 1=1'
    const queryParams: any[] = []
    let paramIndex = 1
    
    if (status === 'active') {
      whereClause += ` AND p.is_active = true`
    } else if (status === 'inactive') {
      whereClause += ` AND p.is_active = false`
    }
    // If status is 'all' or not specified, show all products
    
    if (category) {
      whereClause += ` AND c.slug = $${paramIndex}`
      queryParams.push(category)
      paramIndex++
    }
    
    if (search) {
      whereClause += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex} OR p.sku ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }
    
    // Build ORDER BY clause
    let orderClause = ''
    switch (sort) {
      case 'name':
        orderClause = `ORDER BY p.name ${order}`
        break
      case 'price':
        orderClause = `ORDER BY p.price ${order}`
        break
      case 'stock':
        orderClause = `ORDER BY p.stock_quantity ${order}`
        break
      case 'category':
        orderClause = `ORDER BY c.name ${order}`
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
      LEFT JOIN brands b ON p.brand_id = b.id
      ${whereClause}
    `
    
    const countResult = await query(countQuery, queryParams)
    const total = parseInt(countResult.rows[0].total)
    
    // Get products with full details for admin
    const productsQuery = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        b.name as brand_name,
        b.slug as brand_slug,
        COALESCE(AVG(r.rating), 0) as rating,
        COUNT(r.id) as reviews,
        COUNT(DISTINCT oi.id) as total_sales
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN reviews r ON p.id = r.product_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
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
      images: Array.isArray(row.images) ? row.images : (row.images ? JSON.parse(row.images) : ['/placeholder.svg']),
      image: (() => {
        const imagesArray = Array.isArray(row.images) ? row.images : (row.images ? JSON.parse(row.images) : ['/placeholder.svg'])
        return imagesArray[0] || '/placeholder.svg'
      })(),
      tags: Array.isArray(row.tags) ? row.tags : (row.tags ? JSON.parse(row.tags) : []),
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
      total_sales: parseInt(row.total_sales) || 0,
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
    
    // Cache the result for 2 minutes (shorter for admin)
    await setCache(cacheKey, response, 120)
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Admin products API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, price, category_id, brand_id, description, slug, images, stock_quantity, is_featured, is_active } = await request.json()

    // Insert product into database
    const result = await query(`
      INSERT INTO products (
        name, slug, description, price, stock_quantity, 
        category_id, brand_id, images, is_featured, is_active,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      RETURNING id
    `, [
      name,
      slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      price,
      stock_quantity || 0,
      category_id,
      brand_id,
      JSON.stringify(images || []),
      is_featured || false,
      is_active !== false
    ])

    const productId = result.rows[0].id

    // Clear relevant caches
    await deleteCache('products:*')
    await deleteCache('featured:*')

    return NextResponse.json({ 
      success: true, 
      id: productId,
      message: 'Product created successfully' 
    })

  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Build dynamic update query
    const updateFields: string[] = []
    const updateValues: any[] = []
    let paramIndex = 1

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'images' && Array.isArray(value)) {
          updateFields.push(`${key} = $${paramIndex}`)
          updateValues.push(JSON.stringify(value))
        } else {
          updateFields.push(`${key} = $${paramIndex}`)
          updateValues.push(value)
        }
        paramIndex++
      }
    })

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    updateFields.push(`updated_at = NOW()`)
    updateValues.push(id)

    const updateQuery = `
      UPDATE products 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id
    `

    const result = await query(updateQuery, updateValues)

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Clear relevant caches
    await deleteCache('products:*')
    await deleteCache('featured:*')

    return NextResponse.json({ 
      success: true, 
      message: 'Product updated successfully' 
    })

  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Soft delete the product
    const result = await query(`
      UPDATE products 
      SET is_active = false, updated_at = NOW()
      WHERE id = $1
      RETURNING id
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Clear relevant caches
    await deleteCache('products:*')
    await deleteCache('featured:*')

    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    })

  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
