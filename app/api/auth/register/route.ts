import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const { email, password, first_name, last_name, phone } = await request.json();
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    // Check if user already exists
    const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    // Insert user
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, first_name, last_name, phone, role, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, first_name, last_name, phone, role',
      [email, password_hash, first_name, last_name, phone || null, 'customer', true]
    );
    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}
