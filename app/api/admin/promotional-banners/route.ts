import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'apriniageosat',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'apriniageosatcoid',
  password: process.env.POSTGRES_PASSWORD || 'Kx9Qm7nP8rT2vW5yZ3aB6cE9fH1jL4mN',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
})

export async function GET() {
  try {
    const client = await pool.connect()
    
    const result = await client.query(`
      SELECT id, title, subtitle, description, primary_text, secondary_text, 
             discount_text, button_text, button_url, image_url, background_color, 
             text_color, accent_color, banner_type, is_active, display_order,
             created_at, updated_at
      FROM promotional_banners 
      WHERE is_active = true
      ORDER BY display_order ASC, created_at DESC
    `)
    
    client.release()

    return NextResponse.json({
      success: true,
      banners: result.rows
    })
  } catch (error) {
    console.error('Error fetching promotional banners:', error)
    
    // Return fallback banners if database fails
    const fallbackBanners = [
      {
        id: 1,
        title: 'GET EXTRA 50% OFF',
        subtitle: 'Fresh',
        description: 'Everyday',
        primary_text: 'Fresh',
        secondary_text: 'Everyday',
        discount_text: 'GET EXTRA 50% OFF',
        button_text: 'Shop now',
        button_url: '/shop',
        background_color: 'bg-yellow-50',
        text_color: 'text-gray-900',
        accent_color: 'text-red-500',
        banner_type: 'discount',
        is_active: true,
        display_order: 1
      },
      {
        id: 2,
        title: 'HOT THIS WEEK',
        subtitle: 'Fresh vegetable',
        description: '& Fruit basket',
        primary_text: 'Fresh vegetable',
        secondary_text: '& Fruit basket',
        discount_text: 'Fresh Packed to order',
        button_text: 'Shop now',
        button_url: '/shop/fresh',
        background_color: 'bg-green-50',
        text_color: 'text-gray-900',
        accent_color: 'text-green-600',
        banner_type: 'featured',
        is_active: true,
        display_order: 2
      },
      {
        id: 3,
        title: 'Fresh food',
        subtitle: 'Premium Quality',
        description: 'Delivered Fresh Daily',
        primary_text: 'Fresh food',
        secondary_text: 'Premium Quality',
        discount_text: 'Delivered Fresh Daily',
        button_text: 'Order Now',
        button_url: '/shop/fresh-food',
        background_color: 'bg-blue-50',
        text_color: 'text-gray-900',
        accent_color: 'text-blue-600',
        banner_type: 'promotional',
        is_active: true,
        display_order: 3
      }
    ]

    return NextResponse.json({
      success: true,
      banners: fallbackBanners,
      fallback: true
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title, subtitle, description, primary_text, secondary_text, discount_text,
      button_text, button_url, image_url, background_color, text_color, 
      accent_color, banner_type, is_active, display_order
    } = body

    const client = await pool.connect()

    const result = await client.query(`
      INSERT INTO promotional_banners (
        title, subtitle, description, primary_text, secondary_text, discount_text,
        button_text, button_url, image_url, background_color, text_color,
        accent_color, banner_type, is_active, display_order
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `, [
      title, subtitle, description, primary_text, secondary_text, discount_text,
      button_text, button_url, image_url, background_color, text_color,
      accent_color, banner_type, is_active, display_order
    ])

    client.release()

    return NextResponse.json({
      success: true,
      banner: result.rows[0],
      message: 'Promotional banner created successfully'
    })
  } catch (error) {
    console.error('Error creating promotional banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create promotional banner' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Banner ID is required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()

    // Build dynamic query based on provided fields
    const fields = Object.keys(updateData)
    const values = Object.values(updateData)
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')

    const result = await client.query(`
      UPDATE promotional_banners 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [id, ...values])

    client.release()

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      banner: result.rows[0],
      message: 'Promotional banner updated successfully'
    })
  } catch (error) {
    console.error('Error updating promotional banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update promotional banner' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Banner ID is required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()

    const result = await client.query(
      'DELETE FROM promotional_banners WHERE id = $1 RETURNING *',
      [id]
    )

    client.release()

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Promotional banner deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting promotional banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete promotional banner' },
      { status: 500 }
    )
  }
}
