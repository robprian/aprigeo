import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect()
    
    try {
      // Simple test query
      const result = await client.query('SELECT COUNT(*) as count FROM products')
      const productCount = parseInt(result.rows[0].count)
      
      const orderResult = await client.query('SELECT COUNT(*) as count FROM orders')
      const orderCount = parseInt(orderResult.rows[0].count)
      
      return NextResponse.json({
        success: true,
        data: {
          products: productCount,
          orders: orderCount,
          message: 'Database connection successful'
        }
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
