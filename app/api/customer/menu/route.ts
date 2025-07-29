import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'geosat_store',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
})

export async function GET() {
  try {
    const client = await pool.connect()
    
    try {
      const result = await client.query(`
        SELECT id, title, url, icon, description, badge, is_active, order_index
        FROM customer_menu_items 
        WHERE is_active = true 
        ORDER BY order_index ASC
      `)

      return NextResponse.json({
        success: true,
        menuItems: result.rows
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch customer menu items' 
      },
      { status: 500 }
    )
  }
}
