import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache, deleteCache } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, data: [] })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const cacheKey = `campaigns:${status}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    let whereClause = 'WHERE 1=1'
    const queryParams: any[] = []
    let paramIndex = 1
    
    if (status) {
      whereClause += ` AND status = $${paramIndex}`
      queryParams.push(status)
      paramIndex++
    }
    
    const campaignsQuery = `
      SELECT * FROM marketing_campaigns
      ${whereClause}
      ORDER BY created_at DESC
    `
    
    const result = await query(campaignsQuery, queryParams)
    
    const response = {
      success: true,
      data: result.rows
    }
    
    // Cache the result for 10 minutes
    await setCache(cacheKey, response, 600)
    
    return NextResponse.json(response)

  } catch (error) {
    console.error('Get campaigns error:', error)
    return NextResponse.json(
      { error: 'Failed to get campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      name, 
      description, 
      type, 
      status, 
      start_date, 
      end_date,
      budget,
      target_audience,
      metrics 
    } = await request.json()

    const result = await query(`
      INSERT INTO marketing_campaigns (
        name, description, type, status, start_date, end_date, 
        budget, target_audience, metrics, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING id
    `, [
      name,
      description,
      type,
      status || 'draft',
      start_date,
      end_date,
      budget,
      JSON.stringify(target_audience),
      JSON.stringify(metrics)
    ])

    const campaignId = result.rows[0].id

    // Clear relevant caches
    await deleteCache('campaigns:*')

    return NextResponse.json({ 
      success: true, 
      id: campaignId,
      message: 'Campaign created successfully' 
    })

  } catch (error) {
    console.error('Create campaign error:', error)
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}
