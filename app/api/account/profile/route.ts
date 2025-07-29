import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user profile
    const profileResult = await pool.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [userId]
    )

    // Get user addresses
    const addressesResult = await pool.query(
      'SELECT * FROM user_addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC',
      [userId]
    )

    return NextResponse.json({
      success: true,
      profile: profileResult.rows[0] || null,
      addresses: addressesResult.rows
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { type, ...profileData } = data

    if (type === 'profile') {
      const {
        user_id,
        username,
        first_name,
        last_name,
        phone,
        date_of_birth,
        gender,
        profile_image_url,
        bio,
        preferences,
        notification_settings
      } = profileData

      // Check if profile exists
      const existingProfile = await pool.query(
        'SELECT id FROM user_profiles WHERE user_id = $1',
        [user_id]
      )

      let result
      if (existingProfile.rows.length > 0) {
        // Update existing profile
        result = await pool.query(
          `UPDATE user_profiles 
           SET username = $2, first_name = $3, last_name = $4, phone = $5, 
               date_of_birth = $6, gender = $7, profile_image_url = $8, bio = $9,
               preferences = $10, notification_settings = $11
           WHERE user_id = $1
           RETURNING *`,
          [user_id, username, first_name, last_name, phone, date_of_birth, 
           gender, profile_image_url, bio, preferences, notification_settings]
        )
      } else {
        // Create new profile
        result = await pool.query(
          `INSERT INTO user_profiles 
           (user_id, username, first_name, last_name, phone, date_of_birth, 
            gender, profile_image_url, bio, preferences, notification_settings)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           RETURNING *`,
          [user_id, username, first_name, last_name, phone, date_of_birth, 
           gender, profile_image_url, bio, preferences, notification_settings]
        )
      }

      return NextResponse.json({
        success: true,
        profile: result.rows[0]
      })
    } else if (type === 'address') {
      const {
        user_id,
        address_type,
        is_default,
        label,
        recipient_name,
        phone,
        address_line_1,
        address_line_2,
        city,
        state,
        postal_code,
        country,
        notes
      } = profileData

      // If this is set as default, unset other default addresses
      if (is_default) {
        await pool.query(
          'UPDATE user_addresses SET is_default = false WHERE user_id = $1',
          [user_id]
        )
      }

      const result = await pool.query(
        `INSERT INTO user_addresses 
         (user_id, address_type, is_default, label, recipient_name, phone,
          address_line_1, address_line_2, city, state, postal_code, country, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         RETURNING *`,
        [user_id, address_type, is_default, label, recipient_name, phone,
         address_line_1, address_line_2, city, state, postal_code, country, notes]
      )

      return NextResponse.json({
        success: true,
        address: result.rows[0]
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid type specified' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Error creating/updating profile:', error)
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Username already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to save profile data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { type, id, ...updateData } = data

    if (type === 'address') {
      const {
        address_type,
        is_default,
        label,
        recipient_name,
        phone,
        address_line_1,
        address_line_2,
        city,
        state,
        postal_code,
        country,
        notes,
        user_id
      } = updateData

      // If this is set as default, unset other default addresses
      if (is_default) {
        await pool.query(
          'UPDATE user_addresses SET is_default = false WHERE user_id = $1 AND id != $2',
          [user_id, id]
        )
      }

      const result = await pool.query(
        `UPDATE user_addresses 
         SET address_type = $2, is_default = $3, label = $4, recipient_name = $5, 
             phone = $6, address_line_1 = $7, address_line_2 = $8, city = $9, 
             state = $10, postal_code = $11, country = $12, notes = $13
         WHERE id = $1
         RETURNING *`,
        [id, address_type, is_default, label, recipient_name, phone,
         address_line_1, address_line_2, city, state, postal_code, country, notes]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Address not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        address: result.rows[0]
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid type specified' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error updating profile data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update profile data' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')

    if (!id || !type) {
      return NextResponse.json(
        { success: false, error: 'ID and type are required' },
        { status: 400 }
      )
    }

    if (type === 'address') {
      const result = await pool.query(
        'DELETE FROM user_addresses WHERE id = $1 RETURNING *',
        [id]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Address not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Address deleted successfully'
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid type specified' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error deleting profile data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete profile data' },
      { status: 500 }
    )
  }
}
