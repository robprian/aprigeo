import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, price, category_id, brand_id, description, slug, images, stock_quantity, is_featured, is_active } = await request.json()

    // Insert product into database
    const result = await query(`
      INSERT INTO products (
        name, slug, description, price, stock_quantity, 
        category_id, brand_id, images, is_featured, is_active,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      RETURNING id
    `, [
      name,
      slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      price,
      stock_quantity || 0,
      category_id,
      brand_id,
      JSON.stringify(images || []),
      is_featured || false,
      is_active !== false
    ])

    const productId = result.rows[0].id

    // Clear relevant caches
    await deleteCache('products:*')
    await deleteCache('featured:*')

    return NextResponse.json({ 
      success: true, 
      id: productId,
      message: 'Product created successfully' 
    })

  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Build dynamic update query
    const updateFields: string[] = []
    const updateValues: any[] = []
    let paramIndex = 1

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'images' && Array.isArray(value)) {
          updateFields.push(`${key} = $${paramIndex}`)
          updateValues.push(JSON.stringify(value))
        } else {
          updateFields.push(`${key} = $${paramIndex}`)
          updateValues.push(value)
        }
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
    updateValues.push(id)

    const updateQuery = `
      UPDATE products 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id
    `

    const result = await query(updateQuery, updateValues)

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Soft delete the product
    const result = await query(`
      UPDATE products 
      SET is_active = false, updated_at = NOW()
      WHERE id = $1
      RETURNING id
    `, [id])

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
