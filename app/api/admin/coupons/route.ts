import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache, deleteCache } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, data: [] })
    }

    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    
    const cacheKey = `coupons:${active}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    let whereClause = 'WHERE 1=1'
    const queryParams: any[] = []
    let paramIndex = 1
    
    if (active === 'true') {
      whereClause += ` AND is_active = true AND (expires_at IS NULL OR expires_at > NOW())`
    }
    
    const couponsQuery = `
      SELECT 
        *,
        CASE 
          WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'expired'
          WHEN is_active = false THEN 'inactive'
          ELSE 'active'
        END as status
      FROM coupons
      ${whereClause}
      ORDER BY created_at DESC
    `
    
    const result = await query(couponsQuery, queryParams)
    
    const response = {
      success: true,
      data: result.rows
    }
    
    // Cache the result for 10 minutes
    await setCache(cacheKey, response, 600)
    
    return NextResponse.json(response)

  } catch (error) {
    console.error('Get coupons error:', error)
    return NextResponse.json(
      { error: 'Failed to get coupons' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      code, 
      name,
      description, 
      type, 
      value,
      minimum_amount,
      maximum_discount,
      usage_limit,
      is_active,
      expires_at
    } = await request.json()

    const result = await query(`
      INSERT INTO coupons (
        code, name, description, type, value, minimum_amount, 
        maximum_discount, usage_limit, is_active, expires_at, 
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      RETURNING id
    `, [
      code.toUpperCase(),
      name,
      description,
      type,
      value,
      minimum_amount,
      maximum_discount,
      usage_limit,
      is_active !== false,
      expires_at
    ])

    const couponId = result.rows[0].id

    // Clear relevant caches
    await deleteCache('coupons:*')

    return NextResponse.json({ 
      success: true, 
      id: couponId,
      message: 'Coupon created successfully' 
    })

  } catch (error) {
    console.error('Create coupon error:', error)
    return NextResponse.json(
      { error: 'Failed to create coupon' },
      { status: 500 }
    )
  }
}
