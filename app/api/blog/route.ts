import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache } from '@/lib/db'
import { BlogPost, PaginatedResponse } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    // Handle build-time static generation
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        data: [],
        pagination: { page: 1, limit: 6, total: 0, pages: 0 }
      })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const featured = searchParams.get('featured') === 'true'
    
    const offset = (page - 1) * limit
    
    const cacheKey = `blog:${page}:${limit}:${featured}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Build WHERE clause
    let whereClause = 'WHERE bp.status = \'published\''
    if (featured) {
      whereClause += ' AND bp.featured_image IS NOT NULL'
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM blog_posts bp
      ${whereClause}
    `
    
    const countResult = await query(countQuery)
    const total = parseInt(countResult.rows[0].total)
    
    // Get blog posts
    const postsQuery = `
      SELECT 
        bp.*,
        u.first_name,
        u.last_name
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      ${whereClause}
      ORDER BY bp.published_at DESC, bp.created_at DESC
      LIMIT $1 OFFSET $2
    `
    
    const result = await query(postsQuery, [limit, offset])
    
    const posts: BlogPost[] = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      excerpt: row.excerpt,
      featured_image: row.featured_image,
      author_id: row.author_id,
      status: row.status,
      published_at: row.published_at,
      created_at: row.created_at,
      updated_at: row.updated_at,
      author: {
        id: row.author_id,
        email: '',
        first_name: row.first_name,
        last_name: row.last_name,
        role: 'admin',
        is_active: true,
        created_at: '',
        updated_at: ''
      }
    }))
    
    const response: PaginatedResponse<BlogPost> = {
      data: posts,
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
    console.error('Blog API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}