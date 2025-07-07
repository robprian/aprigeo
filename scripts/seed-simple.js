#!/usr/bin/env node

/**
 * Simple Database Seeding Script
 * Seeds the database with basic GPS store data for quick setup
 */

const { Pool } = require('pg');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'gps_survey_store',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
};

const pool = new Pool(dbConfig);

// Simple GPS products
const simpleProducts = [
  {
    name: 'Garmin eTrex 32x GPS Handheld',
    slug: 'garmin-etrex-32x-gps-handheld',
    description: 'GPS handheld dengan layar 2.2 inci dan peta TopoActive. Cocok untuk hiking dan outdoor.',
    price: 3200000,
    category: 'GPS Handheld',
    brand: 'Garmin',
    sku: 'GRM-ETRX32-001',
    stock: 25
  },
  {
    name: 'Leica Viva GS16 GNSS',
    slug: 'leica-viva-gs16-gnss',
    description: 'GNSS receiver dengan teknologi SmartTrack+ untuk akurasi tinggi dalam survei profesional.',
    price: 245000000,
    category: 'GNSS RTK',
    brand: 'Leica',
    sku: 'LCA-GS16-001',
    stock: 5
  },
  {
    name: 'Topcon GT-605 Total Station',
    slug: 'topcon-gt-605-total-station',
    description: 'Total station reflektorless dengan akurasi 5 detik dan jangkauan 600m.',
    price: 125000000,
    category: 'Total Station',
    brand: 'Topcon',
    sku: 'TPC-GT605-001',
    stock: 8
  },
  {
    name: 'DJI Mavic 3 Enterprise',
    slug: 'dji-mavic-3-enterprise',
    description: 'Drone enterprise dengan kamera 4K dan payload fleksibel untuk survei aerial.',
    price: 65000000,
    category: 'Drone Survey',
    brand: 'DJI',
    sku: 'DJI-MV3E-001',
    stock: 10
  },
  {
    name: 'Sokkia DT-540 Digital Theodolite',
    slug: 'sokkia-dt-540-digital-theodolite',
    description: 'Theodolite digital dengan akurasi 5 detik dan layar LCD untuk pengukuran sudut presisi.',
    price: 45000000,
    category: 'Theodolite',
    brand: 'Sokkia',
    sku: 'SKK-DT540-001',
    stock: 15
  }
];

// Basic categories
const basicCategories = [
  { name: 'GPS Handheld', slug: 'gps-handheld' },
  { name: 'GNSS RTK', slug: 'gnss-rtk' },
  { name: 'Total Station', slug: 'total-station' },
  { name: 'Drone Survey', slug: 'drone-survey' },
  { name: 'Theodolite', slug: 'theodolite' }
];

// Basic brands
const basicBrands = [
  { name: 'Garmin', slug: 'garmin' },
  { name: 'Leica', slug: 'leica' },
  { name: 'Topcon', slug: 'topcon' },
  { name: 'Sokkia', slug: 'sokkia' },
  { name: 'DJI', slug: 'dji' }
];

async function seedSimpleData() {
  console.log('🌱 Starting simple database seeding...');

  try {
    // Insert categories
    console.log('📂 Inserting basic categories...');
    for (const category of basicCategories) {
      await pool.query(
        `INSERT INTO categories (name, slug, description) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING`,
        [category.name, category.slug, `Kategori ${category.name} untuk produk GPS dan survei`]
      );
    }
    console.log(`✓ Inserted ${basicCategories.length} categories`);

    // Insert brands
    console.log('🏷️ Inserting basic brands...');
    for (const brand of basicBrands) {
      await pool.query(
        `INSERT INTO brands (name, slug, description) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING`,
        [brand.name, brand.slug, `Brand ${brand.name} untuk produk GPS dan survei`]
      );
    }
    console.log(`✓ Inserted ${basicBrands.length} brands`);

    // Insert products
    console.log('📦 Inserting basic products...');
    for (const product of simpleProducts) {
      // Get category and brand IDs
      const categoryResult = await pool.query('SELECT id FROM categories WHERE name = $1', [product.category]);
      const brandResult = await pool.query('SELECT id FROM brands WHERE name = $1', [product.brand]);

      const categoryId = categoryResult.rows[0]?.id;
      const brandId = brandResult.rows[0]?.id;

      await pool.query(
        `INSERT INTO products (
          name, slug, description, price, category_id, brand_id, sku, stock_quantity, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (slug) DO NOTHING`,
        [
          product.name, product.slug, product.description, product.price, 
          categoryId, brandId, product.sku, product.stock, true
        ]
      );
    }
    console.log(`✓ Inserted ${simpleProducts.length} products`);

    // Verify counts
    const productCount = await pool.query('SELECT COUNT(*) FROM products');
    const categoryCount = await pool.query('SELECT COUNT(*) FROM categories');
    const brandCount = await pool.query('SELECT COUNT(*) FROM brands');

    console.log('\n📊 Database statistics:');
    console.log(`   Products: ${productCount.rows[0].count}`);
    console.log(`   Categories: ${categoryCount.rows[0].count}`);
    console.log(`   Brands: ${brandCount.rows[0].count}`);

    console.log('\n🎉 Simple database seeding completed successfully!');
  } catch (error) {
    console.error('💥 Simple seeding failed:', error);
    throw error;
  }
}

// Run the seeding
if (require.main === module) {
  seedSimpleData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { seedSimpleData };
