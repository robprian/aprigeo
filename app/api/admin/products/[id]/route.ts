import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await query(`
      SELECT 
        p.*,
        c.name as category_name,
        b.name as brand_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.id = $1
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const product = result.rows[0]
    
    return NextResponse.json({
      success: true,
      data: {
        ...product,
        images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
        tags: typeof product.tags === 'string' ? JSON.parse(product.tags) : product.tags
      }
    })

  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Failed to get product' },
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
    const data = await request.json()
    
    const {
      name,
      slug,
      description,
      short_description,
      sku,
      price,
      compare_price,
      cost_price,
      category_id,
      brand_id,
      is_active,
      is_featured,
      in_stock,
      stock_quantity,
      weight,
      dimensions,
      images,
      tags,
      meta_title,
      meta_description
    } = data

    const result = await query(`
      UPDATE products SET
        name = $1,
        slug = $2,
        description = $3,
        short_description = $4,
        sku = $5,
        price = $6,
        compare_price = $7,
        cost_price = $8,
        category_id = $9,
        brand_id = $10,
        is_active = $11,
        is_featured = $12,
        in_stock = $13,
        stock_quantity = $14,
        weight = $15,
        dimensions = $16,
        images = $17,
        tags = $18,
        meta_title = $19,
        meta_description = $20,
        updated_at = NOW()
      WHERE id = $21
      RETURNING id
    `, [
      name,
      slug,
      description,
      short_description,
      sku,
      price,
      compare_price,
      cost_price,
      category_id,
      brand_id,
      is_active,
      is_featured,
      in_stock,
      stock_quantity,
      weight,
      JSON.stringify(dimensions),
      JSON.stringify(images),
      JSON.stringify(tags),
      meta_title,
      meta_description,
      id
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Clear relevant caches
    await deleteCache('products:*')
    await deleteCache('featured:*')

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully'
    })

  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
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

    // Check if product exists
    const checkResult = await query('SELECT id FROM products WHERE id = $1', [id])
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Delete product
    await query('DELETE FROM products WHERE id = $1', [id])

    // Clear relevant caches
    await deleteCache('products:*')
    await deleteCache('featured:*')

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })

  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
