import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache } from '@/lib/db'
import { DashboardStats } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const cacheKey = 'admin:dashboard:stats'
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    // Get current month and previous month dates
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
    
    // Total Sales
    const salesQuery = `
      SELECT 
        COALESCE(SUM(CASE WHEN created_at >= $1 THEN total_amount ELSE 0 END), 0) as current_month_sales,
        COALESCE(SUM(CASE WHEN created_at >= $2 AND created_at <= $3 THEN total_amount ELSE 0 END), 0) as previous_month_sales
      FROM orders 
      WHERE status = 'completed'
    `
    
    const salesResult = await query(salesQuery, [currentMonthStart, previousMonthStart, previousMonthEnd])
    const currentSales = parseFloat(salesResult.rows[0].current_month_sales)
    const previousSales = parseFloat(salesResult.rows[0].previous_month_sales)
    const salesChange = previousSales > 0 ? ((currentSales - previousSales) / previousSales) * 100 : 0
    
    // Total Orders
    const ordersQuery = `
      SELECT 
        COUNT(CASE WHEN created_at >= $1 THEN 1 END) as current_month_orders,
        COUNT(CASE WHEN created_at >= $2 AND created_at <= $3 THEN 1 END) as previous_month_orders
      FROM orders
    `
    
    const ordersResult = await query(ordersQuery, [currentMonthStart, previousMonthStart, previousMonthEnd])
    const currentOrders = parseInt(ordersResult.rows[0].current_month_orders)
    const previousOrders = parseInt(ordersResult.rows[0].previous_month_orders)
    const ordersChange = previousOrders > 0 ? ((currentOrders - previousOrders) / previousOrders) * 100 : 0
    
    // Visitors (simulated data - in real app you'd track this)
    const visitorsQuery = `
      SELECT 
        COUNT(CASE WHEN created_at >= $1 THEN 1 END) as current_month_visitors,
        COUNT(CASE WHEN created_at >= $2 AND created_at <= $3 THEN 1 END) as previous_month_visitors
      FROM users 
      WHERE role = 'customer'
    `
    
    const visitorsResult = await query(visitorsQuery, [currentMonthStart, previousMonthStart, previousMonthEnd])
    const currentVisitors = parseInt(visitorsResult.rows[0].current_month_visitors) * 50 // Simulate visitor multiplier
    const previousVisitors = parseInt(visitorsResult.rows[0].previous_month_visitors) * 50
    const visitorsChange = previousVisitors > 0 ? ((currentVisitors - previousVisitors) / previousVisitors) * 100 : 0
    
    // Total Products Sold
    const productsSoldQuery = `
      SELECT 
        COALESCE(SUM(CASE WHEN o.created_at >= $1 THEN oi.quantity ELSE 0 END), 0) as current_month_sold,
        COALESCE(SUM(CASE WHEN o.created_at >= $2 AND o.created_at <= $3 THEN oi.quantity ELSE 0 END), 0) as previous_month_sold
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status = 'completed'
    `
    
    const productsSoldResult = await query(productsSoldQuery, [currentMonthStart, previousMonthStart, previousMonthEnd])
    const currentProductsSold = parseInt(productsSoldResult.rows[0].current_month_sold)
    const previousProductsSold = parseInt(productsSoldResult.rows[0].previous_month_sold)
    const productsSoldChange = previousProductsSold > 0 ? ((currentProductsSold - previousProductsSold) / previousProductsSold) * 100 : 0
    
    const stats: DashboardStats = {
      total_sales: {
        value: currentSales,
        change: salesChange,
        trend: salesChange >= 0 ? 'up' : 'down'
      },
      total_orders: {
        value: currentOrders,
        change: ordersChange,
        trend: ordersChange >= 0 ? 'up' : 'down'
      },
      visitors: {
        value: currentVisitors,
        change: visitorsChange,
        trend: visitorsChange >= 0 ? 'up' : 'down'
      },
      total_products_sold: {
        value: currentProductsSold,
        change: productsSoldChange,
        trend: productsSoldChange >= 0 ? 'up' : 'down'
      }
    }
    
    const response = { success: true, data: stats }
    
    // Cache the result for 5 minutes
    await setCache(cacheKey, response, 300)
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Dashboard stats API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}