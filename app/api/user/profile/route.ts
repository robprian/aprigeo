import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const client = await pool.connect()

    try {
      // Get user profile with customer details
      const result = await client.query(`
        SELECT 
          u.id,
          u.email,
          u.first_name,
          u.last_name,
          u.phone,
          u.role,
          u.email_verified_at,
          u.created_at,
          cp.company_name,
          cp.tax_id,
          cp.date_of_birth,
          cp.gender,
          cp.total_orders,
          cp.total_spent,
          cp.last_order_date,
          cg.name as customer_group_name,
          cg.discount_percentage
        FROM users u
        LEFT JOIN customer_profiles cp ON u.id = cp.user_id
        LEFT JOIN customer_groups cg ON cp.customer_group_id = cg.id
        WHERE u.id = $1 AND u.is_active = true
      `, [session.user.id])

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      const user = result.rows[0]

      // Get user addresses
      const addressResult = await client.query(`
        SELECT id, type, name, company, address_line_1, address_line_2, 
               city, state, postal_code, country, phone, is_default
        FROM user_addresses 
        WHERE user_id = $1
        ORDER BY is_default DESC, created_at DESC
      `, [session.user.id])

      return NextResponse.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone,
          role: user.role,
          emailVerifiedAt: user.email_verified_at,
          createdAt: user.created_at,
          profile: {
            companyName: user.company_name,
            taxId: user.tax_id,
            dateOfBirth: user.date_of_birth,
            gender: user.gender,
            totalOrders: user.total_orders,
            totalSpent: user.total_spent,
            lastOrderDate: user.last_order_date,
            customerGroup: user.customer_group_name,
            discountPercentage: user.discount_percentage
          },
          addresses: addressResult.rows
        }
      })

    } finally {
      client.release()
    }

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      firstName, 
      lastName, 
      phone, 
      companyName, 
      taxId, 
      dateOfBirth, 
      gender 
    } = await request.json()

    // Validate input
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()

    try {
      // Update user basic info
      await client.query(`
        UPDATE users 
        SET first_name = $1, last_name = $2, phone = $3, updated_at = NOW()
        WHERE id = $4
      `, [firstName, lastName, phone, session.user.id])

      // Update or create customer profile
      const profileResult = await client.query(
        'SELECT id FROM customer_profiles WHERE user_id = $1',
        [session.user.id]
      )

      if (profileResult.rows.length === 0) {
        // Create profile if it doesn't exist
        await client.query(`
          INSERT INTO customer_profiles 
          (user_id, company_name, tax_id, date_of_birth, gender, total_orders, total_spent, created_at) 
          VALUES ($1, $2, $3, $4, $5, 0, 0.00, NOW())
        `, [session.user.id, companyName, taxId, dateOfBirth, gender])
      } else {
        // Update existing profile
        await client.query(`
          UPDATE customer_profiles 
          SET company_name = $1, tax_id = $2, date_of_birth = $3, gender = $4, updated_at = NOW()
          WHERE user_id = $5
        `, [companyName, taxId, dateOfBirth, gender, session.user.id])
      }

      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully'
      })

    } finally {
      client.release()
    }

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
