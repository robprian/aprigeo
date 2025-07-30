import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await query(`
      SELECT * FROM categories WHERE id = $1
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Get category error:', error)
    return NextResponse.json(
      { error: 'Failed to get category' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { name, slug, description, image_url, parent_id, is_active, sort_order } = await request.json()

    const result = await query(`
      UPDATE categories SET
        name = $1,
        slug = $2,
        description = $3,
        image_url = $4,
        parent_id = $5,
        is_active = $6,
        sort_order = $7,
        updated_at = NOW()
      WHERE id = $8
      RETURNING id
    `, [
      name,
      slug,
      description,
      image_url,
      parent_id,
      is_active,
      sort_order,
      id
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Clear relevant caches
    await deleteCache('categories:*')

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully'
    })

  } catch (error) {
    console.error('Update category error:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
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

    // Check if category has products
    const productCheck = await query('SELECT COUNT(*) as count FROM products WHERE category_id = $1', [id])
    
    if (parseInt(productCheck.rows[0].count) > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with products. Please move products to another category first.' },
        { status: 400 }
      )
    }

    // Check if category exists
    const checkResult = await query('SELECT id FROM categories WHERE id = $1', [id])
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Delete category
    await query('DELETE FROM categories WHERE id = $1', [id])

    // Clear relevant caches
    await deleteCache('categories:*')

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    })

  } catch (error) {
    console.error('Delete category error:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
