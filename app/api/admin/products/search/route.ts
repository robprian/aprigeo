import { NextRequest, NextResponse } from 'next/server';
import { pool, initializeDatabase } from '@/lib/db';

// Mock products data untuk testing (fallback jika database tidak tersedia)
const mockProducts = [
  {
    id: 1,
    name: 'GPS Trimble R10 GNSS Receiver',
    slug: 'gps-trimble-r10-gnss-receiver',
    sku: 'TRM-R10-001',
    price: 15000000,
    category_id: 1,
    brand_id: 1,
    image_url: '/images/products/trimble-r10.jpg'
  },
  {
    id: 2,
    name: 'Total Station Topcon GT-1005',
    slug: 'total-station-topcon-gt-1005',
    sku: 'TOP-GT1005',
    price: 8500000,
    category_id: 2,
    brand_id: 2,
    image_url: '/images/products/topcon-gt1005.jpg'
  },
  {
    id: 3,
    name: 'Theodolite Nikon NE-102',
    slug: 'theodolite-nikon-ne-102',
    sku: 'NIK-NE102',
    price: 3200000,
    category_id: 2,
    brand_id: 3,
    image_url: '/images/products/nikon-ne102.jpg'
  },
  {
    id: 4,
    name: 'GPS Handheld Garmin eTrex 32x',
    slug: 'gps-handheld-garmin-etrex-32x',
    sku: 'GAR-ETX32X',
    price: 2800000,
    category_id: 1,
    brand_id: 4,
    image_url: '/images/products/garmin-etrex32x.jpg'
  },
  {
    id: 5,
    name: 'Leica FlexLine TS07 Total Station',
    slug: 'leica-flexline-ts07-total-station',
    sku: 'LEI-TS07',
    price: 12500000,
    category_id: 2,
    brand_id: 5,
    image_url: '/images/products/leica-ts07.jpg'
  },
  {
    id: 6,
    name: 'Trimble SPS985 GNSS Smart Antenna',
    slug: 'trimble-sps985-gnss-smart-antenna',
    sku: 'TRM-SPS985',
    price: 18500000,
    category_id: 1,
    brand_id: 1,
    image_url: '/images/products/trimble-sps985.jpg'
  },
  {
    id: 7,
    name: 'Sokkia CX-105 Total Station',
    slug: 'sokkia-cx-105-total-station',
    sku: 'SOK-CX105',
    price: 6800000,
    category_id: 2,
    brand_id: 6,
    image_url: '/images/products/sokkia-cx105.jpg'
  },
  {
    id: 8,
    name: 'GPS Trimble Catalyst DA2 Receiver',
    slug: 'gps-trimble-catalyst-da2-receiver',
    sku: 'TRM-CAT-DA2',
    price: 4500000,
    category_id: 1,
    brand_id: 1,
    image_url: '/images/products/trimble-catalyst.jpg'
  }
];

// Initialize database connection
initializeDatabase();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    let products = [];

    // Try database first, fallback to mock data
    try {
      if (pool) {
        const client = await pool.connect();
        
        let result;
        if (query.trim()) {
          // Search products by name, description, or SKU
          result = await client.query(`
            SELECT 
              id,
              name,
              slug,
              sku,
              price,
              category_id,
              brand_id,
              image_url
            FROM products 
            WHERE 
              name ILIKE $1 
              OR description ILIKE $1 
              OR sku ILIKE $1
              OR slug ILIKE $1
            ORDER BY 
              CASE 
                WHEN name ILIKE $2 THEN 1
                WHEN name ILIKE $1 THEN 2
                WHEN sku ILIKE $1 THEN 3
                ELSE 4
              END,
              name ASC
            LIMIT $3
          `, [`%${query}%`, `${query}%`, limit]);
        } else {
          // Return recent products if no search query
          result = await client.query(`
            SELECT 
              id,
              name,
              slug,
              sku,
              price,
              category_id,
              brand_id,
              image_url
            FROM products 
            ORDER BY created_at DESC
            LIMIT $1
          `, [limit]);
        }
        
        client.release();
        products = result.rows;
      } else {
        throw new Error('Database not available');
      }
    } catch (dbError) {
      console.log('Database unavailable, using mock data:', dbError);
      
      // Use mock data as fallback
      let filteredProducts = mockProducts;

      if (query.trim()) {
        const searchLower = query.toLowerCase();
        filteredProducts = mockProducts.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.slug.toLowerCase().includes(searchLower)
        );

        // Sort by relevance (name matches first)
        filteredProducts.sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().startsWith(searchLower);
          const bNameMatch = b.name.toLowerCase().startsWith(searchLower);
          
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          
          return a.name.localeCompare(b.name);
        });
      }

      products = filteredProducts.slice(0, limit);
    }
    
    // Format results for easier consumption
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      category_id: product.category_id,
      brand_id: product.brand_id,
      image_url: product.image_url,
      link: `/product/${product.slug}`,
      display: `${product.name} (${product.sku})`,
      value: `/product/${product.slug}`
    }));
    
    return NextResponse.json({
      products: formattedProducts,
      query,
      total: formattedProducts.length
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' }, 
      { status: 500 }
    );
  }
}
