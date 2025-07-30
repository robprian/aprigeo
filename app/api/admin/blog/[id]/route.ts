import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { title, slug, content, excerpt, featured_image, status, published_at } = await request.json()

    const result = await query(`
      UPDATE blog_posts SET
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        content = COALESCE($3, content),
        excerpt = COALESCE($4, excerpt),
        featured_image = COALESCE($5, featured_image),
        status = COALESCE($6, status),
        published_at = COALESCE($7, published_at),
        updated_at = NOW()
      WHERE id = $8
      RETURNING id
    `, [
      title,
      slug,
      content,
      excerpt,
      featured_image,
      status,
      published_at,
      id
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Clear relevant caches
    await deleteCache('blog:*')

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully'
    })

  } catch (error) {
    console.error('Update blog post error:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if blog post exists
    const checkResult = await query('SELECT id FROM blog_posts WHERE id = $1', [id])
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Delete blog post
    await query('DELETE FROM blog_posts WHERE id = $1', [id])

    // Clear relevant caches
    await deleteCache('blog:*')

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    })

  } catch (error) {
    console.error('Delete blog post error:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
