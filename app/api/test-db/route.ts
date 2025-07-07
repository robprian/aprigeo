import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    const result = await query('SELECT COUNT(*) as count FROM products WHERE is_active = true')
    const count = result.rows[0].count
    
    console.log('Product count:', count)
    
    const products = await query(`
      SELECT 
        p.id, p.name, p.slug, p.price, p.is_active,
        c.name as category_name,
        b.name as brand_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.is_active = true
      LIMIT 5
    `)
    
    return NextResponse.json({
      success: true,
      count: count,
      sample_products: products.rows
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
