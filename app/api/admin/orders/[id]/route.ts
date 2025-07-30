import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Get order details with customer info
    const orderQuery = `
      SELECT 
        o.*,
        u.first_name,
        u.last_name,
        u.email,
        u.phone
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = $1
    `
    
    const orderResult = await query(orderQuery, [id])
    
    if (orderResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    const order = orderResult.rows[0]
    
    // Get order items
    const itemsQuery = `
      SELECT 
        oi.*,
        p.name as product_name,
        p.slug as product_slug,
        p.images
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `
    
    const itemsResult = await query(itemsQuery, [id])
    
    // Get order addresses
    const addressQuery = `
      SELECT * FROM order_addresses WHERE order_id = $1
    `
    
    const addressResult = await query(addressQuery, [id])
    
    return NextResponse.json({
      success: true,
      data: {
        ...order,
        items: itemsResult.rows,
        addresses: addressResult.rows
      }
    })

  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { error: 'Failed to get order' },
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
    const { status, payment_status, shipping_method, notes } = await request.json()

    const result = await query(`
      UPDATE orders SET
        status = COALESCE($1, status),
        payment_status = COALESCE($2, payment_status),
        shipping_method = COALESCE($3, shipping_method),
        notes = COALESCE($4, notes),
        updated_at = NOW()
      WHERE id = $5
      RETURNING id
    `, [
      status,
      payment_status,
      shipping_method,
      notes,
      id
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Clear relevant caches
    await deleteCache('admin_orders:*')

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully'
    })

  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
