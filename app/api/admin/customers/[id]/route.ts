import { NextRequest, NextResponse } from 'next/server'
import { query, deleteCache } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Get customer details
    const customerQuery = `
      SELECT 
        u.*,
        cp.total_orders,
        cp.total_spent,
        cp.last_order_date,
        cp.company_name,
        cp.tax_id,
        cp.date_of_birth,
        cp.gender
      FROM users u
      LEFT JOIN customer_profiles cp ON u.id = cp.user_id
      WHERE u.id = $1 AND u.role = 'customer'
    `
    
    const customerResult = await query(customerQuery, [id])
    
    if (customerResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }
    
    const customer = customerResult.rows[0]
    
    // Get customer addresses
    const addressQuery = `
      SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC
    `
    
    const addressResult = await query(addressQuery, [id])
    
    // Get recent orders
    const ordersQuery = `
      SELECT 
        id,
        order_number,
        status,
        total_amount,
        created_at
      FROM orders 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT 10
    `
    
    const ordersResult = await query(ordersQuery, [id])
    
    return NextResponse.json({
      success: true,
      data: {
        ...customer,
        password_hash: undefined, // Don't send password hash
        addresses: addressResult.rows,
        recent_orders: ordersResult.rows
      }
    })

  } catch (error) {
    console.error('Get customer error:', error)
    return NextResponse.json(
      { error: 'Failed to get customer' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { 
      first_name, 
      last_name, 
      email, 
      phone, 
      is_active,
      company_name,
      tax_id 
    } = await request.json()

    // Update user
    const userResult = await query(`
      UPDATE users SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        phone = COALESCE($4, phone),
        is_active = COALESCE($5, is_active),
        updated_at = NOW()
      WHERE id = $6 AND role = 'customer'
      RETURNING id
    `, [
      first_name,
      last_name,
      email,
      phone,
      is_active,
      id
    ])

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }

    // Update or create customer profile
    if (company_name || tax_id) {
      await query(`
        INSERT INTO customer_profiles (user_id, company_name, tax_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id) 
        DO UPDATE SET
          company_name = COALESCE($2, customer_profiles.company_name),
          tax_id = COALESCE($3, customer_profiles.tax_id)
      `, [id, company_name, tax_id])
    }

    // Clear relevant caches
    await deleteCache('admin_customers:*')

    return NextResponse.json({
      success: true,
      message: 'Customer updated successfully'
    })

  } catch (error) {
    console.error('Update customer error:', error)
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if customer has orders
    const orderCheck = await query('SELECT COUNT(*) as count FROM orders WHERE user_id = $1', [id])
    
    if (parseInt(orderCheck.rows[0].count) > 0) {
      return NextResponse.json(
        { error: 'Cannot delete customer with existing orders. Consider deactivating instead.' },
        { status: 400 }
      )
    }

    // Check if customer exists
    const checkResult = await query('SELECT id FROM users WHERE id = $1 AND role = \'customer\'', [id])
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }

    // Delete customer (this will cascade to profiles and addresses)
    await query('DELETE FROM users WHERE id = $1', [id])

    // Clear relevant caches
    await deleteCache('admin_customers:*')

    return NextResponse.json({
      success: true,
      message: 'Customer deleted successfully'
    })

  } catch (error) {
    console.error('Delete customer error:', error)
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    )
  }
}
