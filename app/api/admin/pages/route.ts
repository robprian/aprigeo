import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache, deleteCache } from '@/lib/db'

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
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const slug = searchParams.get('slug')
    
    // If requesting specific page by slug
    if (slug) {
      const result = await query('SELECT * FROM pages WHERE slug = $1', [slug])
      
      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Page not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: result.rows[0]
      })
    }
    
    const offset = (page - 1) * limit
    
    // Build cache key
    const cacheKey = `admin_pages:${page}:${limit}:${status}:${search}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Build WHERE clause
    let whereClause = 'WHERE 1=1'
    const queryParams: any[] = []
    let paramIndex = 1
    
    if (status) {
      whereClause += ` AND is_published = $${paramIndex}`
      queryParams.push(status === 'published')
      paramIndex++
    }
    
    if (search) {
      whereClause += ` AND (title ILIKE $${paramIndex} OR content ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM pages
      ${whereClause}
    `
    
    const countResult = await query(countQuery, queryParams)
    const total = parseInt(countResult.rows[0].total)
    
    // Get pages
    const pagesQuery = `
      SELECT *
      FROM pages
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `
    
    queryParams.push(limit, offset)
    
    const result = await query(pagesQuery, queryParams)
    
    const response = {
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
    
    // Cache the result for 10 minutes
    await setCache(cacheKey, response, 600)
    
    return NextResponse.json(response)

  } catch (error) {
    console.error('Get pages error:', error)
    return NextResponse.json(
      { error: 'Failed to get pages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      title, 
      slug, 
      content, 
      excerpt, 
      meta_title, 
      meta_description, 
      is_published,
      template 
    } = await request.json()

    const result = await query(`
      INSERT INTO pages (
        title, slug, content, excerpt, meta_title, meta_description, 
        is_published, template, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING id
    `, [
      title,
      slug || title.toLowerCase().replace(/\s+/g, '-'),
      content,
      excerpt,
      meta_title,
      meta_description,
      is_published || false,
      template || 'default'
    ])

    const pageId = result.rows[0].id

    // Clear relevant caches
    await deleteCache('admin_pages:*')
    await deleteCache('pages:*')

    return NextResponse.json({ 
      success: true, 
      id: pageId,
      message: 'Page created successfully' 
    })

  } catch (error) {
    console.error('Create page error:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}
