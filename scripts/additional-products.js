#!/usr/bin/env node

/**
 * Additional Products Script
 * Adds more GPS and surveying products to expand the product catalog
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

// Additional GPS and surveying products
const additionalProducts = [
  // More GPS Handheld products
  {
    name: 'Garmin Oregon 750t GPS Handheld',
    slug: 'garmin-oregon-750t-gps-handheld',
    description: 'GPS handheld dengan layar sentuh 3 inci, kamera 8MP, dan peta topografi. Ideal untuk eksplorasi outdoor dan geocaching.',
    price: 6800000,
    category: 'GPS Handheld',
    brand: 'Garmin',
    sku: 'GRM-OR750T-001',
    stock: 18,
    tags: ['GPS', 'Touchscreen', 'Camera', 'Topografi'],
    seo_title: 'Garmin Oregon 750t - GPS Handheld Touchscreen dengan Kamera 8MP',
    seo_description: 'Jual Garmin Oregon 750t GPS handheld layar sentuh 3 inci dengan kamera 8MP dan peta topografi. Cocok untuk outdoor dan geocaching.',
    meta_keywords: 'garmin oregon 750t, gps touchscreen, kamera gps, geocaching, outdoor navigation'
  },
  {
    name: 'Garmin Montana 700i GPS Handheld',
    slug: 'garmin-montana-700i-gps-handheld',
    description: 'GPS handheld dengan layar 5 inci, komunikasi satelit inReach, dan peta topografi preload. Untuk petualangan ekstrem.',
    price: 9200000,
    category: 'GPS Handheld',
    brand: 'Garmin',
    sku: 'GRM-MT700I-001',
    stock: 12,
    tags: ['GPS', 'inReach', 'Satelit', 'Ekstrem'],
    seo_title: 'Garmin Montana 700i - GPS Handheld dengan Komunikasi Satelit inReach',
    seo_description: 'Jual Garmin Montana 700i GPS handheld layar 5 inci dengan teknologi inReach untuk komunikasi satelit darurat.',
    meta_keywords: 'garmin montana 700i, gps inreach, komunikasi satelit, gps ekstrem, petualangan'
  },

  // More Total Station products
  {
    name: 'Leica FlexLine TS07 Total Station',
    slug: 'leica-flexline-ts07-total-station',
    description: 'Total station manual dengan akurasi 1 detik dan jangkauan reflektorless 1000m. Desain ergonomis untuk penggunaan intensif.',
    price: 185000000,
    category: 'Total Station',
    brand: 'Leica',
    sku: 'LCA-TS07-001',
    stock: 6,
    tags: ['Total Station', 'Manual', 'Akurasi Tinggi', 'Reflektorless'],
    seo_title: 'Leica FlexLine TS07 - Total Station Manual Akurasi 1 Detik',
    seo_description: 'Jual Leica FlexLine TS07 total station manual dengan akurasi 1 detik dan jangkauan reflektorless 1000m. Garansi resmi Leica.',
    meta_keywords: 'leica ts07, total station manual, akurasi 1 detik, reflektorless, leica flexline'
  },
  {
    name: 'Sokkia CX-105 Robotic Total Station',
    slug: 'sokkia-cx-105-robotic-total-station',
    description: 'Total station robotik dengan akurasi 5 detik dan jangkauan 5000m. Dilengkapi sistem tracking otomatis untuk efisiensi maksimal.',
    price: 295000000,
    category: 'Total Station',
    brand: 'Sokkia',
    sku: 'SKK-CX105-001',
    stock: 4,
    tags: ['Total Station', 'Robotik', 'Tracking', 'Otomatis'],
    seo_title: 'Sokkia CX-105 - Total Station Robotik dengan Tracking Otomatis',
    seo_description: 'Jual Sokkia CX-105 total station robotik dengan sistem tracking otomatis dan jangkauan 5000m. Efisiensi maksimal untuk survei.',
    meta_keywords: 'sokkia cx105, total station robotik, tracking otomatis, survei efisien, sokkia robotic'
  },
  {
    name: 'Topcon PS-103A Robotic Total Station',
    slug: 'topcon-ps-103a-robotic-total-station',
    description: 'Total station robotik dengan teknologi TSshield dan akurasi 3 detik. Sistem anti-pencurian dan tracking cerdas.',
    price: 345000000,
    category: 'Total Station',
    brand: 'Topcon',
    sku: 'TPC-PS103A-001',
    stock: 3,
    tags: ['Total Station', 'Robotik', 'TSshield', 'Anti-pencurian'],
    seo_title: 'Topcon PS-103A - Total Station Robotik dengan TSshield Technology',
    seo_description: 'Jual Topcon PS-103A total station robotik dengan teknologi TSshield anti-pencurian dan akurasi 3 detik. Keamanan maksimal.',
    meta_keywords: 'topcon ps103a, total station robotik, tsshield, anti pencurian, topcon robotic'
  },

  // More Theodolite products
  {
    name: 'Topcon DT-209 Digital Theodolite',
    slug: 'topcon-dt-209-digital-theodolite',
    description: 'Theodolite digital dengan akurasi 9 detik dan layar LCD dual-side. Mudah digunakan dengan menu yang intuitif.',
    price: 28000000,
    category: 'Theodolite',
    brand: 'Topcon',
    sku: 'TPC-DT209-001',
    stock: 20,
    tags: ['Theodolite', 'Digital', 'Dual-side', 'Intuitif'],
    seo_title: 'Topcon DT-209 - Theodolite Digital dengan Layar LCD Dual-side',
    seo_description: 'Jual Topcon DT-209 theodolite digital akurasi 9 detik dengan layar LCD dual-side dan menu intuitif. Mudah digunakan.',
    meta_keywords: 'topcon dt209, theodolite digital, dual side display, menu intuitif, topcon theodolite'
  },
  {
    name: 'Leica Builder 500 Theodolite',
    slug: 'leica-builder-500-theodolite',
    description: 'Theodolite konstruksi dengan akurasi 5 detik dan laser plummet. Tahan debu dan air IP65 untuk kondisi lapangan keras.',
    price: 42000000,
    category: 'Theodolite',
    brand: 'Leica',
    sku: 'LCA-B500-001',
    stock: 15,
    tags: ['Theodolite', 'Konstruksi', 'Laser Plummet', 'IP65'],
    seo_title: 'Leica Builder 500 - Theodolite Konstruksi Tahan Cuaca IP65',
    seo_description: 'Jual Leica Builder 500 theodolite konstruksi dengan akurasi 5 detik dan laser plummet. Tahan debu dan air IP65.',
    meta_keywords: 'leica builder 500, theodolite konstruksi, laser plummet, ip65, theodolite tahan cuaca'
  },

  // More Drone Survey products
  {
    name: 'DJI Matrice 300 RTK Survey Kit',
    slug: 'dji-matrice-300-rtk-survey-kit',
    description: 'Drone survey enterprise dengan RTK terintegrasi dan payload hingga 2.7kg. Waktu terbang 55 menit untuk survei area luas.',
    price: 185000000,
    category: 'Drone Survey',
    brand: 'DJI',
    sku: 'DJI-M300RTK-001',
    stock: 8,
    tags: ['Drone', 'Enterprise', 'RTK', 'Long Flight'],
    seo_title: 'DJI Matrice 300 RTK - Drone Survey Enterprise dengan Payload 2.7kg',
    seo_description: 'Jual DJI Matrice 300 RTK drone survey enterprise dengan payload 2.7kg dan waktu terbang 55 menit. Untuk survei area luas.',
    meta_keywords: 'dji matrice 300 rtk, drone enterprise, payload 2.7kg, survei area luas, dji m300'
  },
  {
    name: 'Autel EVO II Pro RTK Drone',
    slug: 'autel-evo-ii-pro-rtk-drone',
    description: 'Drone RTK dengan kamera 6K dan gimbal 3-axis. Waktu terbang 40 menit dengan akurasi posisi centimeter.',
    price: 125000000,
    category: 'Drone Survey',
    brand: 'Autel',
    sku: 'AUT-EVO2RTK-001',
    stock: 10,
    tags: ['Drone', 'RTK', '6K Camera', 'Gimbal'],
    seo_title: 'Autel EVO II Pro RTK - Drone RTK dengan Kamera 6K dan Gimbal 3-axis',
    seo_description: 'Jual Autel EVO II Pro RTK drone dengan kamera 6K dan gimbal 3-axis. Waktu terbang 40 menit dengan akurasi centimeter.',
    meta_keywords: 'autel evo ii pro rtk, drone rtk, kamera 6k, gimbal 3axis, autel drone'
  },

  // Laser Level products
  {
    name: 'Leica Rugby 880 Laser Level',
    slug: 'leica-rugby-880-laser-level',
    description: 'Laser level rotary dengan akurasi ±1mm dan jangkauan 800m. Tahan air dan debu IP67 untuk konstruksi ekstrem.',
    price: 85000000,
    category: 'Laser Level',
    brand: 'Leica',
    sku: 'LCA-RG880-001',
    stock: 12,
    tags: ['Laser Level', 'Rotary', 'IP67', 'Konstruksi'],
    seo_title: 'Leica Rugby 880 - Laser Level Rotary Tahan Air IP67',
    seo_description: 'Jual Leica Rugby 880 laser level rotary dengan akurasi ±1mm dan jangkauan 800m. Tahan air dan debu IP67.',
    meta_keywords: 'leica rugby 880, laser level rotary, ip67, konstruksi, laser rotary'
  },
  {
    name: 'Topcon RL-SV2S Laser Level',
    slug: 'topcon-rl-sv2s-laser-level',
    description: 'Laser level dengan dual slope dan remote control. Akurasi ±10 arc second untuk grading dan leveling presisi.',
    price: 95000000,
    category: 'Laser Level',
    brand: 'Topcon',
    sku: 'TPC-RLSV2S-001',
    stock: 9,
    tags: ['Laser Level', 'Dual Slope', 'Remote Control', 'Grading'],
    seo_title: 'Topcon RL-SV2S - Laser Level Dual Slope dengan Remote Control',
    seo_description: 'Jual Topcon RL-SV2S laser level dengan dual slope dan remote control. Akurasi ±10 arc second untuk grading presisi.',
    meta_keywords: 'topcon rl-sv2s, laser level dual slope, remote control, grading, topcon laser'
  }
];

// Additional categories
const additionalCategories = [
  {
    name: 'Laser Level',
    slug: 'laser-level',
    description: 'Laser level untuk leveling dan grading konstruksi',
    image_url: '/images/categories/laser-level.jpg'
  },
  {
    name: 'Water Level',
    slug: 'water-level',
    description: 'Waterpass dan alat leveling tradisional',
    image_url: '/images/categories/water-level.jpg'
  },
  {
    name: 'Measuring Tape',
    slug: 'measuring-tape',
    description: 'Meteran dan alat ukur jarak manual',
    image_url: '/images/categories/measuring-tape.jpg'
  }
];

// Additional brands
const additionalBrands = [
  {
    name: 'Autel',
    slug: 'autel',
    description: 'Teknologi drone dan robotika untuk survei profesional',
    logo_url: '/images/brands/autel.png'
  },
  {
    name: 'Trimble',
    slug: 'trimble',
    description: 'Solusi positioning dan geospatial terdepan',
    logo_url: '/images/brands/trimble.png'
  },
  {
    name: 'Pentax',
    slug: 'pentax',
    description: 'Instrumen survei dan total station berkualitas tinggi',
    logo_url: '/images/brands/pentax.png'
  }
];

async function addMoreProducts() {
  console.log('📦 Adding more products to the catalog...');

  try {
    // Add new categories
    console.log('📂 Adding new categories...');
    for (const category of additionalCategories) {
      await pool.query(
        `INSERT INTO categories (name, slug, description, image_url) VALUES ($1, $2, $3, $4) ON CONFLICT (slug) DO NOTHING`,
        [category.name, category.slug, category.description, category.image_url]
      );
    }
    console.log(`✓ Added ${additionalCategories.length} new categories`);

    // Add new brands
    console.log('🏷️ Adding new brands...');
    for (const brand of additionalBrands) {
      await pool.query(
        `INSERT INTO brands (name, slug, description, logo_url) VALUES ($1, $2, $3, $4) ON CONFLICT (slug) DO NOTHING`,
        [brand.name, brand.slug, brand.description, brand.logo_url]
      );
    }
    console.log(`✓ Added ${additionalBrands.length} new brands`);

    // Add new products
    console.log('🔧 Adding new products...');
    for (const product of additionalProducts) {
      // Get category and brand IDs
      const categoryResult = await pool.query('SELECT id FROM categories WHERE name = $1', [product.category]);
      const brandResult = await pool.query('SELECT id FROM brands WHERE name = $1', [product.brand]);

      const categoryId = categoryResult.rows[0]?.id;
      const brandId = brandResult.rows[0]?.id;

      if (categoryId && brandId) {
        await pool.query(
          `INSERT INTO products (
            name, slug, description, price, category_id, brand_id, sku, stock_quantity,
            tags, seo_title, seo_description, meta_keywords, is_active
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT (slug) DO NOTHING`,
          [
            product.name, product.slug, product.description, product.price, categoryId, brandId,
            product.sku, product.stock, product.tags, product.seo_title, 
            product.seo_description, product.meta_keywords, true
          ]
        );
      }
    }
    console.log(`✓ Added ${additionalProducts.length} new products`);

    // Final counts
    const productCount = await pool.query('SELECT COUNT(*) FROM products');
    const categoryCount = await pool.query('SELECT COUNT(*) FROM categories');
    const brandCount = await pool.query('SELECT COUNT(*) FROM brands');

    console.log('\n📊 Updated database statistics:');
    console.log(`   Products: ${productCount.rows[0].count}`);
    console.log(`   Categories: ${categoryCount.rows[0].count}`);
    console.log(`   Brands: ${brandCount.rows[0].count}`);

    console.log('\n🎉 Additional products added successfully!');
  } catch (error) {
    console.error('💥 Adding products failed:', error);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  addMoreProducts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { addMoreProducts };
