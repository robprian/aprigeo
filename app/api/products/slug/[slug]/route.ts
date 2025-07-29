import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://apriniageosat:Kx9Qm7nP8rT2vW5yZ3aB6cE9fH1jL4mN@localhost:5432/apriniageosatcoid',
})

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params

    const query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        b.name as brand_name,
        b.slug as brand_slug,
        4.5 as rating,
        0 as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.slug = $1
    `

    const result = await pool.query(query, [slug])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const product = result.rows[0]
    
    // Format the product data
    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      original_price: product.original_price ? parseFloat(product.original_price) : null,
      description: product.description,
      specifications: product.specifications,
      images: (() => {
        try {
          if (!product.images || product.images === '[]' || product.images === '') {
            return ['/placeholder.jpg']
          }
          return JSON.parse(product.images)
        } catch (e) {
          return ['/placeholder.jpg']
        }
      })(),
      stock: product.stock,
      category_id: product.category_id,
      brand_id: product.brand_id,
      category: {
        name: product.category_name,
        slug: product.category_slug
      },
      brand: {
        name: product.brand_name,
        slug: product.brand_slug
      },
      rating: parseFloat(product.rating),
      review_count: parseInt(product.review_count),
      features: (() => {
        try {
          if (!product.features || product.features === '[]' || product.features === '') {
            return []
          }
          return JSON.parse(product.features)
        } catch (e) {
          return []
        }
      })(),
      tags: (() => {
        try {
          if (!product.tags || product.tags === '[]' || product.tags === '') {
            return []
          }
          return JSON.parse(product.tags)
        } catch (e) {
          return []
        }
      })()
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
