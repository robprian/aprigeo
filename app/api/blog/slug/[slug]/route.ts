import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { BlogPost } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Handle build-time static generation
    if (process.env.NODE_ENV === 'production' && !process.env.RUNTIME_PHASE) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Get blog post by slug
    const result = await query(`
      SELECT 
        bp.id,
        bp.title,
        bp.slug,
        bp.content,
        bp.excerpt,
        bp.featured_image,
        bp.status,
        bp.published_at,
        bp.created_at,
        bp.updated_at,
        u.first_name,
        u.last_name,
        u.email as author_email
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.slug = $1 AND bp.status = 'published'
    `, [slug])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    const post = result.rows[0]

    const blogPost: BlogPost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      featured_image: post.featured_image,
      author_id: post.author_id || 18,
      status: post.status,
      published_at: post.published_at,
      created_at: post.created_at,
      updated_at: post.updated_at,
      author: post.first_name ? {
        id: post.author_id || 18,
        first_name: post.first_name,
        last_name: post.last_name || '',
        email: post.author_email,
        role: 'admin' as const,
        is_active: true,
        created_at: post.created_at,
        updated_at: post.updated_at
      } : undefined
    }

    return NextResponse.json(blogPost)

  } catch (error) {
    console.error('Blog post fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}
