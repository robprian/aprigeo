import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await query(`
      SELECT * FROM brands WHERE id = $1
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Get brand error:', error)
    return NextResponse.json(
      { error: 'Failed to get brand' },
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
    const { name, slug, description, logo_url, is_active } = await request.json()

    const result = await query(`
      UPDATE brands SET
        name = $1,
        slug = $2,
        description = $3,
        logo_url = $4,
        is_active = $5,
        updated_at = NOW()
      WHERE id = $6
      RETURNING id
    `, [
      name,
      slug,
      description,
      logo_url,
      is_active,
      id
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    // Clear relevant caches
    await deleteCache('brands:*')

    return NextResponse.json({
      success: true,
      message: 'Brand updated successfully'
    })

  } catch (error) {
    console.error('Update brand error:', error)
    return NextResponse.json(
      { error: 'Failed to update brand' },
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

    // Check if brand has products
    const productCheck = await query('SELECT COUNT(*) as count FROM products WHERE brand_id = $1', [id])
    
    if (parseInt(productCheck.rows[0].count) > 0) {
      return NextResponse.json(
        { error: 'Cannot delete brand with products. Please move products to another brand first.' },
        { status: 400 }
      )
    }

    // Check if brand exists
    const checkResult = await query('SELECT id FROM brands WHERE id = $1', [id])
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    // Delete brand
    await query('DELETE FROM brands WHERE id = $1', [id])

    // Clear relevant caches
    await deleteCache('brands:*')

    return NextResponse.json({
      success: true,
      message: 'Brand deleted successfully'
    })

  } catch (error) {
    console.error('Delete brand error:', error)
    return NextResponse.json(
      { error: 'Failed to delete brand' },
      { status: 500 }
    )
  }
}
