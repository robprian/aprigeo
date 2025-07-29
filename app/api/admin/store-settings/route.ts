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
      SELECT setting_key, setting_value, setting_type, setting_group, description
      FROM store_settings 
      WHERE is_active = true
      ORDER BY setting_group, setting_key
    `)
    
    client.release()

    // Group settings by category for easier handling
    const groupedSettings: Record<string, any> = {}
    result.rows.forEach(row => {
      if (!groupedSettings[row.setting_group]) {
        groupedSettings[row.setting_group] = {}
      }
      groupedSettings[row.setting_group][row.setting_key] = {
        value: row.setting_value,
        type: row.setting_type,
        description: row.description
      }
    })

    return NextResponse.json({
      success: true,
      data: groupedSettings
    })
  } catch (error) {
    console.error('Error fetching store settings:', error)
    
    // Return fallback data if database fails
    const fallbackSettings = {
      general: {
        company_name: { value: 'CV. Aprinia Geosat Solusindo', type: 'text' },
        company_description: { value: 'CV. Aprinia Geosat Solusindo provides professional survey equipment, GPS tools, and mapping solutions for all your geospatial needs.', type: 'textarea' }
      },
      contact: {
        contact_address: { value: 'Jl. Raya Pasar Minggu No.123, Jakarta Selatan, Indonesia', type: 'textarea' },
        contact_phone: { value: '(+62) 21-1234-5678', type: 'phone' },
        contact_email: { value: 'info@apriniageosat.co.id', type: 'email' },
        business_hours: { value: 'Mon-Fri: 8:00 AM - 5:00 PM', type: 'text' }
      },
      social: {
        facebook_url: { value: '#', type: 'url' },
        instagram_url: { value: '#', type: 'url' },
        twitter_url: { value: '#', type: 'url' }
      }
    }

    return NextResponse.json({
      success: true,
      data: fallbackSettings,
      fallback: true
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid settings data' },
        { status: 400 }
      )
    }

    const client = await pool.connect()

    try {
      await client.query('BEGIN')

      // Update each setting
      for (const [key, value] of Object.entries(settings)) {
        await client.query(`
          UPDATE store_settings 
          SET setting_value = $1, updated_at = CURRENT_TIMESTAMP
          WHERE setting_key = $2
        `, [value as string, key])
      }

      await client.query('COMMIT')
      
      return NextResponse.json({
        success: true,
        message: 'Store settings updated successfully'
      })
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating store settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update store settings' },
      { status: 500 }
    )
  }
}
