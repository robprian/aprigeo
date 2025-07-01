import { NextRequest, NextResponse } from 'next/server'
import { query, getCache, setCache } from '@/lib/db'
import { Category } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeCount = searchParams.get('include_count') === 'true'
    
    const cacheKey = `categories:${includeCount}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }
    
    let categoriesQuery = `
      SELECT 
        c.*
        ${includeCount ? ', COUNT(p.id) as products_count' : ''}
      FROM categories c
      ${includeCount ? 'LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true' : ''}
      WHERE c.is_active = true
      ${includeCount ? 'GROUP BY c.id' : ''}
      ORDER BY c.sort_order ASC, c.name ASC
    `
    
    const result = await query(categoriesQuery)
    
    const categories: Category[] = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      image_url: row.image_url,
      parent_id: row.parent_id,
      is_active: row.is_active,
      sort_order: row.sort_order,
      created_at: row.created_at,
      updated_at: row.updated_at,
      products_count: includeCount ? parseInt(row.products_count) || 0 : undefined
    }))
    
    // Cache the result for 10 minutes
    await setCache(cacheKey, { success: true, data: categories }, 600)
    
    return NextResponse.json({ success: true, data: categories })
    
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}