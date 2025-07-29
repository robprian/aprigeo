import { NextResponse } from 'next/server';
import { pool, initializeDatabase } from '@/lib/db';

// Initialize database connection
initializeDatabase();

export async function GET() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' }, 
        { status: 500 }
      );
    }

    const client = await pool.connect();
    
    const result = await client.query(`
      SELECT 
        id,
        title,
        subtitle,
        description,
        image_url,
        button_text,
        button_link,
        discount_percentage,
        background_color,
        text_color,
        position_order,
        is_active,
        created_at,
        updated_at
      FROM banners 
      ORDER BY position_order ASC, created_at DESC
    `);
    
    client.release();
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching admin banners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banners' }, 
      { status: 500 }
    );
  }
}
