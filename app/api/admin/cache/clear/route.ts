import { NextRequest, NextResponse } from 'next/server'
import { deleteCache } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Clear all product-related caches
    await Promise.all([
      deleteCache('products:*'),
      deleteCache('featured:*'),
      deleteCache('categories:*'),
      deleteCache('blog:*'),
      deleteCache('bestselling:*')
    ])

    return NextResponse.json({ 
      success: true, 
      message: 'All caches cleared successfully' 
    })

  } catch (error) {
    console.error('Cache clear error:', error)
    return NextResponse.json(
      { error: 'Failed to clear caches' },
      { status: 500 }
    )
  }
}
