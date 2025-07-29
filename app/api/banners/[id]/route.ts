import { NextResponse } from 'next/server';
import { pool, initializeDatabase } from '@/lib/db';

// Initialize database connection
initializeDatabase();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' }, 
        { status: 500 }
      );
    }

    const id = parseInt(params.id);
    
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
      WHERE id = $1
    `, [id]);
    
    client.release();
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Banner not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching banner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banner' }, 
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' }, 
        { status: 500 }
      );
    }

    const id = parseInt(params.id);
    const body = await request.json();
    const { 
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
      is_active 
    } = body;

    const client = await pool.connect();
    
    const result = await client.query(`
      UPDATE banners 
      SET title = $1, subtitle = $2, description = $3, image_url = $4, 
          button_text = $5, button_link = $6, discount_percentage = $7, 
          background_color = $8, text_color = $9, position_order = $10, 
          is_active = $11, updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *
    `, [
      title, subtitle, description, image_url, button_text, button_link,
      discount_percentage, background_color, text_color, position_order, 
      is_active, id
    ]);
    
    client.release();
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Banner not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json(
      { error: 'Failed to update banner' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' }, 
        { status: 500 }
      );
    }

    const id = parseInt(params.id);
    
    const client = await pool.connect();
    
    const result = await client.query(`
      DELETE FROM banners WHERE id = $1 RETURNING id
    `, [id]);
    
    client.release();
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Banner not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json(
      { error: 'Failed to delete banner' }, 
      { status: 500 }
    );
  }
}
