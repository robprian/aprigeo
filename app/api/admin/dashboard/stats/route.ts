import { NextRequest, NextResponse } from 'next/server'
import { query, initializeDatabase } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Initialize database connection
    initializeDatabase()
    
    // Get total revenue (sum of orders)
    const revenueQuery = `
      SELECT COALESCE(SUM(total), 0) as total_revenue
      FROM orders 
    `
    const revenueResult = await query(revenueQuery)
    const totalRevenue = parseFloat(revenueResult.rows[0].total_revenue)

    // Get total orders count
    const ordersCountQuery = `
      SELECT COUNT(*) as total_orders
      FROM orders
    `
    const ordersCountResult = await query(ordersCountQuery)
    const totalOrders = parseInt(ordersCountResult.rows[0].total_orders)

    // Get total products count
    const productsCountQuery = `
      SELECT COUNT(*) as total_products
      FROM products
      WHERE is_active = true
    `
    const productsCountResult = await query(productsCountQuery)
    const totalProducts = parseInt(productsCountResult.rows[0].total_products)

    // Get total customers count
    const customersCountQuery = `
      SELECT COUNT(*) as total_customers
      FROM users
      WHERE role = 'customer'
    `
    const customersCountResult = await query(customersCountQuery)
    const totalCustomers = parseInt(customersCountResult.rows[0].total_customers)

    // Get recent orders
    const recentOrdersQuery = `
      SELECT 
        o.order_number,
        o.status,
        o.total,
        o.created_at,
        u.first_name,
        u.last_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 5
    `
    const recentOrdersResult = await query(recentOrdersQuery)
    
    // Get monthly revenue for last 6 months
    const monthlyRevenueQuery = `
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        SUM(total) as revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month
    `
    const monthlyRevenueResult = await query(monthlyRevenueQuery)

    // Get order status distribution
    const orderStatusQuery = `
      SELECT 
        status,
        COUNT(*) as count
      FROM orders
      GROUP BY status
    `
    const orderStatusResult = await query(orderStatusQuery)

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
      GROUP BY p.id, p.name, p.slug
      ORDER BY revenue DESC
      LIMIT 5
    `
    const topProductsResult = await query(topProductsQuery)

    const stats = {
      overview: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers
      },
      recentOrders: recentOrdersResult.rows.map((row: any) => ({
        orderNumber: row.order_number,
        status: row.status,
        amount: parseFloat(row.total),
        customer: `${row.first_name} ${row.last_name}`,
        date: row.created_at
      })),
      monthlyRevenue: monthlyRevenueResult.rows.map((row: any) => ({
        month: row.month,
        revenue: parseFloat(row.revenue)
      })),
      orderStatus: orderStatusResult.rows.map((row: any) => ({
        status: row.status,
        count: parseInt(row.count)
      })),
      topProducts: topProductsResult.rows.map((row: any) => ({
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

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
