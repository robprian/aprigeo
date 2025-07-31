import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect()
    
    try {
      // Get total revenue (sum of completed orders)
      const revenueQuery = `
        SELECT COALESCE(SUM(total_amount), 0) as total_revenue
        FROM orders 
        WHERE payment_status = 'completed'
      `
      const revenueResult = await client.query(revenueQuery)
      const totalRevenue = parseFloat(revenueResult.rows[0].total_revenue)

      // Get total orders count
      const ordersCountQuery = `
        SELECT COUNT(*) as total_orders
        FROM orders
      `
      const ordersCountResult = await client.query(ordersCountQuery)
      const totalOrders = parseInt(ordersCountResult.rows[0].total_orders)

      // Get total products count
      const productsCountQuery = `
        SELECT COUNT(*) as total_products
        FROM products
        WHERE is_active = true
      `
      const productsCountResult = await client.query(productsCountQuery)
      const totalProducts = parseInt(productsCountResult.rows[0].total_products)

      // Get total customers count
      const customersCountQuery = `
        SELECT COUNT(*) as total_customers
        FROM users
        WHERE role = 'customer'
      `
      const customersCountResult = await client.query(customersCountQuery)
      const totalCustomers = parseInt(customersCountResult.rows[0].total_customers)

      // Get recent orders
      const recentOrdersQuery = `
        SELECT 
          o.order_number,
          o.status,
          o.total_amount,
          o.created_at,
          u.first_name,
          u.last_name
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
        LIMIT 5
      `
      const recentOrdersResult = await client.query(recentOrdersQuery)
      
      // Get monthly revenue for last 6 months
      const monthlyRevenueQuery = `
        SELECT 
          DATE_TRUNC('month', created_at) as month,
          SUM(total_amount) as revenue
        FROM orders
        WHERE payment_status = 'completed' 
          AND created_at >= NOW() - INTERVAL '6 months'
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY month
      `
      const monthlyRevenueResult = await client.query(monthlyRevenueQuery)

      // Get order status distribution
      const orderStatusQuery = `
        SELECT 
          status,
          COUNT(*) as count
        FROM orders
        GROUP BY status
      `
      const orderStatusResult = await client.query(orderStatusQuery)

      // Get top products by revenue
      const topProductsQuery = `
        SELECT 
          p.name,
          p.slug,
          SUM(oi.total) as revenue,
          SUM(oi.quantity) as quantity_sold
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        JOIN orders o ON oi.order_id = o.id
        WHERE o.payment_status = 'completed'
        GROUP BY p.id, p.name, p.slug
        ORDER BY revenue DESC
        LIMIT 5
      `
      const topProductsResult = await client.query(topProductsQuery)

      const stats = {
        overview: {
          totalRevenue,
          totalOrders,
          totalProducts,
          totalCustomers
        },
        recentOrders: recentOrdersResult.rows.map(row => ({
          orderNumber: row.order_number,
          status: row.status,
          amount: parseFloat(row.total_amount),
          customer: `${row.first_name} ${row.last_name}`,
          date: row.created_at
        })),
        monthlyRevenue: monthlyRevenueResult.rows.map(row => ({
          month: row.month,
          revenue: parseFloat(row.revenue)
        })),
        orderStatus: orderStatusResult.rows.map(row => ({
          status: row.status,
          count: parseInt(row.count)
        })),
        topProducts: topProductsResult.rows.map(row => ({
          name: row.name,
          slug: row.slug,
          revenue: parseFloat(row.revenue),
          quantitySold: parseInt(row.quantity_sold)
        }))
      }

      return NextResponse.json({ 
        success: true, 
        data: stats 
      })

    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
