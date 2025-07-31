import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const client = await pool.connect()
    
    try {
      // Get orders with items and product details
      const ordersQuery = `
        SELECT 
          o.id,
          o.order_number,
          o.status,
          o.subtotal,
          o.tax_amount,
          o.shipping_amount,
          o.total_amount,
          o.currency,
          o.payment_status,
          o.payment_method,
          o.shipping_method,
          o.created_at,
          o.updated_at,
          oa.address_line_1,
          oa.address_line_2,
          oa.city,
          oa.state,
          oa.postal_code,
          oa.country
        FROM orders o
        LEFT JOIN order_addresses oa ON o.id = oa.order_id AND oa.type = 'shipping'
        WHERE o.user_id = $1
        ORDER BY o.created_at DESC
      `
      
      const ordersResult = await client.query(ordersQuery, [userId])
      const orders = ordersResult.rows

      // Get order items for each order
      for (const order of orders) {
        const itemsQuery = `
          SELECT 
            oi.id,
            oi.quantity,
            oi.price,
            oi.total,
            p.id as product_id,
            p.name as product_name,
            p.slug as product_slug,
            p.images
          FROM order_items oi
          JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = $1
        `
        
        const itemsResult = await client.query(itemsQuery, [order.id])
        order.items = itemsResult.rows.map(item => ({
          id: item.product_id,
          name: item.product_name,
          slug: item.product_slug,
          price: parseFloat(item.price),
          quantity: item.quantity,
          total: parseFloat(item.total),
          image: item.images && item.images.length > 0 ? item.images[0] : '/placeholder.svg?height=80&width=80'
        }))
      }

      // Format the response
      const formattedOrders = orders.map(order => ({
        id: order.order_number,
        date: order.created_at,
        status: order.status,
        total: parseFloat(order.total_amount),
        items: order.items,
        shipping: {
          address: [
            order.address_line_1,
            order.address_line_2,
            `${order.city}, ${order.state} ${order.postal_code}`,
            order.country
          ].filter(Boolean).join(', '),
          method: order.shipping_method || 'Standard Shipping',
          tracking: null, // TODO: Add tracking table
          carrier: null,   // TODO: Add carrier info
          estimatedDelivery: null
        },
        payment: {
          method: order.payment_method || 'Credit Card',
          last4: null, // TODO: Add payment details table
          subtotal: parseFloat(order.subtotal),
          shipping: parseFloat(order.shipping_amount || 0),
          tax: parseFloat(order.tax_amount || 0),
          total: parseFloat(order.total_amount)
        }
      }))

      return NextResponse.json({ 
        success: true, 
        data: formattedOrders 
      })

    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
