import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        success: true, 
        data: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 }
      })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    
    const offset = (page - 1) * limit
    
    // Build cache key
    const cacheKey = `admin_customers:${page}:${limit}:${search}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Build WHERE clause
    let whereClause = "WHERE u.role = 'customer'"
    const queryParams: any[] = []
    let paramIndex = 1
    
    if (search) {
      whereClause += ` AND (u.first_name ILIKE $${paramIndex} OR u.last_name ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM users u
      ${whereClause}
    `
    
    const countResult = await query(countQuery, queryParams)
    const total = parseInt(countResult.rows[0].total)
    
    // Get customers
    const customersQuery = `
      SELECT 
        u.*,
        cp.total_orders,
        cp.total_spent,
        cp.last_order_date,
        cp.company_name
      FROM users u
      LEFT JOIN customer_profiles cp ON u.id = cp.user_id
      ${whereClause}
      ORDER BY u.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `
    
    queryParams.push(limit, offset)
    
    const result = await query(customersQuery, queryParams)
    
    const response = {
      success: true,
      data: result.rows.map(row => ({
        ...row,
        password_hash: undefined // Don't send password hash
      })),
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
    console.error('Get customers error:', error)
    return NextResponse.json(
      { error: 'Failed to get customers' },
      { status: 500 }
    )
  }
}
