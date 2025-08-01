import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache, initializeDatabase } from '@/lib/db'
import { BlogPost, PaginatedResponse } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    initializeDatabase()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'all'
    
    const offset = (page - 1) * limit
    
    // Build WHERE clause
    let whereClause = 'WHERE 1=1'
    if (status !== 'all') {
      whereClause += ` AND bp.status = '${status}'`
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM blog_posts bp
      ${whereClause}
    `
    
    const countResult = await query(countQuery)
    const total = parseInt(countResult.rows[0].total)
    
    // Get blog posts with author info
    const postsQuery = `
      SELECT 
        bp.*,
        u.first_name,
        u.last_name
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      ${whereClause}
      ORDER BY bp.created_at DESC
      LIMIT $1 OFFSET $2
    `
    
    const result = await query(postsQuery, [limit, offset])
    
    const posts: BlogPost[] = result.rows.map((row: any) => ({
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
        first_name: row.first_name || 'Admin',
        last_name: row.last_name || 'User',
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
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Admin Blog API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, slug, content, excerpt, featured_image, author_id, status } = await request.json()

    // Insert blog post into database
    const result = await query(`
      INSERT INTO blog_posts (
        title, slug, content, excerpt, featured_image, 
        author_id, status, published_at, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING id
    `, [
      title,
      slug || title.toLowerCase().replace(/\s+/g, '-'),
      content,
      excerpt,
      featured_image,
      author_id || 18, // Default author
      status || 'published',
      status === 'published' ? new Date() : null
    ])

    const blogId = result.rows[0].id

    // Clear blog caches
    await deleteCache('blog:*')

    return NextResponse.json({ 
      success: true, 
      id: blogId,
      message: 'Blog post created successfully' 
    })

  } catch (error) {
    console.error('Create blog error:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      )
    }

    // Build dynamic update query
    const updateFields: string[] = []
    const updateValues: any[] = []
    let paramIndex = 1

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = $${paramIndex}`)
        updateValues.push(value)
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
    
    // If publishing, set published_at
    if (updateData.status === 'published') {
      updateFields.push(`published_at = NOW()`)
    }
    
    updateValues.push(id)

    const updateQuery = `
      UPDATE blog_posts 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id
    `

    const result = await query(updateQuery, updateValues)

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Clear blog caches
    await deleteCache('blog:*')

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post updated successfully' 
    })

  } catch (error) {
    console.error('Update blog error:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
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
        { error: 'Blog post ID is required' },
        { status: 400 }
      )
    }

    // Delete the blog post
    const result = await query(`
      DELETE FROM blog_posts 
      WHERE id = $1
      RETURNING id
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Clear blog caches
    await deleteCache('blog:*')

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post deleted successfully' 
    })

  } catch (error) {
    console.error('Delete blog error:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
