#!/usr/bin/env node

/**
 * Comprehensive Database Seeding Script
 * Seeds the database with a complete GPS store dataset including:
 * - Products with SEO optimization
 * - Categories and brands
 * - Blog posts
 * - Banners
 * - Sample users and orders
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'gps_survey_store',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
};

const pool = new Pool(dbConfig);

// Comprehensive GPS products data
const gpsProducts = [
  {
    name: 'Garmin GPSMAP 64st Handheld GPS',
    slug: 'garmin-gpsmap-64st-handheld-gps',
    description: 'GPS handheld profesional dengan layar 2.6 inci dan peta topografi Indonesia. Dilengkapi kompas 3-axis dan barometer untuk navigasi presisi tinggi.',
    price: 4500000,
    category: 'GPS Handheld',
    brand: 'Garmin',
    sku: 'GRM-64ST-001',
    stock: 15,
    images: ['/images/products/garmin-gpsmap-64st.jpg'],
    tags: ['GPS', 'Handheld', 'Topografi', 'Navigasi', 'Outdoor'],
    seo_title: 'Garmin GPSMAP 64st - GPS Handheld Terbaik untuk Survei dan Outdoor',
    seo_description: 'Jual Garmin GPSMAP 64st GPS handheld profesional dengan peta topografi Indonesia. Akurasi tinggi, tahan air, garansi resmi.',
    meta_keywords: 'garmin gpsmap 64st, gps handheld, survei gps, navigasi outdoor, peta topografi'
  },
  {
    name: 'Leica Viva GS18 I GNSS RTK Rover',
    slug: 'leica-viva-gs18-i-gnss-rtk-rover',
    description: 'GNSS RTK rover dengan teknologi IMU terdepan. Akurasi centimeter dengan kemiringan hingga 30 derajat. Ideal untuk survei konstruksi dan pemetaan.',
    price: 285000000,
    category: 'GNSS RTK',
    brand: 'Leica',
    sku: 'LCA-GS18I-001',
    stock: 3,
    images: ['/images/products/leica-viva-gs18i.jpg'],
    tags: ['GNSS', 'RTK', 'Survei', 'Konstruksi', 'Pemetaan'],
    seo_title: 'Leica Viva GS18 I - GNSS RTK Rover Terdepan untuk Survei Profesional',
    seo_description: 'Jual Leica Viva GS18 I GNSS RTK rover dengan teknologi IMU. Akurasi centimeter, cocok untuk survei konstruksi. Garansi resmi Leica.',
    meta_keywords: 'leica viva gs18i, gnss rtk, survei konstruksi, pemetaan profesional, leica indonesia'
  },
  {
    name: 'Topcon Hiper VR GNSS System',
    slug: 'topcon-hiper-vr-gnss-system',
    description: 'Sistem GNSS dengan teknologi Universal Tracking yang mampu menerima semua sinyal satelit. Performa tinggi untuk survei dan pemetaan detail.',
    price: 195000000,
    category: 'GNSS RTK',
    brand: 'Topcon',
    sku: 'TPC-HIPVR-001',
    stock: 5,
    images: ['/images/products/topcon-hiper-vr.jpg'],
    tags: ['GNSS', 'Universal Tracking', 'Survei', 'Pemetaan'],
    seo_title: 'Topcon Hiper VR - Sistem GNSS Universal Tracking untuk Survei Akurat',
    seo_description: 'Jual Topcon Hiper VR GNSS system dengan Universal Tracking technology. Terima semua sinyal satelit untuk akurasi maksimal.',
    meta_keywords: 'topcon hiper vr, gnss system, universal tracking, survei akurat, topcon indonesia'
  },
  {
    name: 'Sokkia GRX3 GNSS Receiver',
    slug: 'sokkia-grx3-gnss-receiver',
    description: 'GNSS receiver dengan teknologi 226 channel tracking. Mendukung GPS, GLONASS, Galileo, dan BeiDou untuk akurasi dan reliabilitas tinggi.',
    price: 165000000,
    category: 'GNSS RTK',
    brand: 'Sokkia',
    sku: 'SKK-GRX3-001',
    stock: 8,
    images: ['/images/products/sokkia-grx3.jpg'],
    tags: ['GNSS', 'Multi-constellation', 'Survei', 'Pemetaan'],
    seo_title: 'Sokkia GRX3 - GNSS Receiver Multi-Constellation untuk Survei Presisi',
    seo_description: 'Jual Sokkia GRX3 GNSS receiver dengan 226 channel tracking. Dukungan GPS, GLONASS, Galileo, BeiDou. Akurasi tinggi.',
    meta_keywords: 'sokkia grx3, gnss receiver, multi constellation, survei presisi, sokkia indonesia'
  },
  {
    name: 'DJI Phantom 4 RTK Drone Survey',
    slug: 'dji-phantom-4-rtk-drone-survey',
    description: 'Drone survey profesional dengan sistem RTK terintegrasi. Akurasi centimeter untuk pemetaan aerial dan fotogrametri. Cocok untuk survei lahan luas.',
    price: 85000000,
    category: 'Drone Survey',
    brand: 'DJI',
    sku: 'DJI-P4RTK-001',
    stock: 12,
    images: ['/images/products/dji-phantom-4-rtk.jpg'],
    tags: ['Drone', 'RTK', 'Aerial Survey', 'Fotogrametri', 'Pemetaan'],
    seo_title: 'DJI Phantom 4 RTK - Drone Survey Terbaik untuk Pemetaan Aerial',
    seo_description: 'Jual DJI Phantom 4 RTK drone survey dengan akurasi centimeter. Cocok untuk pemetaan aerial dan fotogrametri. Garansi resmi DJI.',
    meta_keywords: 'dji phantom 4 rtk, drone survey, pemetaan aerial, fotogrametri, dji indonesia'
  }
];

// Categories data
const categories = [
  {
    name: 'GPS Handheld',
    slug: 'gps-handheld',
    description: 'GPS handheld untuk navigasi outdoor dan survei lapangan',
    image_url: '/images/categories/gps-handheld.jpg'
  },
  {
    name: 'GNSS RTK',
    slug: 'gnss-rtk',
    description: 'Sistem GNSS RTK untuk survei profesional dengan akurasi tinggi',
    image_url: '/images/categories/gnss-rtk.jpg'
  },
  {
    name: 'Total Station',
    slug: 'total-station',
    description: 'Total station untuk pengukuran sudut dan jarak presisi',
    image_url: '/images/categories/total-station.jpg'
  },
  {
    name: 'Drone Survey',
    slug: 'drone-survey',
    description: 'Drone untuk survei aerial dan pemetaan fotogrametri',
    image_url: '/images/categories/drone-survey.jpg'
  },
  {
    name: 'Theodolite',
    slug: 'theodolite',
    description: 'Theodolite digital dan analog untuk pengukuran sudut',
    image_url: '/images/categories/theodolite.jpg'
  }
];

// Brands data
const brands = [
  {
    name: 'Garmin',
    slug: 'garmin',
    description: 'Perusahaan teknologi GPS terkemuka dunia',
    logo_url: '/images/brands/garmin.png'
  },
  {
    name: 'Leica',
    slug: 'leica',
    description: 'Pemimpin teknologi survei dan pemetaan presisi',
    logo_url: '/images/brands/leica.png'
  },
  {
    name: 'Topcon',
    slug: 'topcon',
    description: 'Solusi teknologi positioning dan survei global',
    logo_url: '/images/brands/topcon.png'
  },
  {
    name: 'Sokkia',
    slug: 'sokkia',
    description: 'Inovasi instrumen survei dan pemetaan profesional',
    logo_url: '/images/brands/sokkia.png'
  },
  {
    name: 'DJI',
    slug: 'dji',
    description: 'Teknologi drone terdepan untuk survei aerial',
    logo_url: '/images/brands/dji.png'
  }
];

// Blog posts data
const blogPosts = [
  {
    title: 'Panduan Lengkap Memilih GPS untuk Survei Lapangan',
    slug: 'panduan-lengkap-memilih-gps-untuk-survei-lapangan',
    excerpt: 'Tips memilih GPS yang tepat untuk kebutuhan survei lapangan dengan akurasi tinggi',
    content: 'Dalam dunia survei dan pemetaan, pemilihan GPS yang tepat sangat menentukan akurasi hasil pengukuran...',
    image_url: '/images/blog/panduan-memilih-gps.jpg',
    author: 'Admin GPS Store',
    published: true,
    tags: ['GPS', 'Survei', 'Panduan', 'Tips']
  },
  {
    title: 'Teknologi GNSS RTK: Revolusi Akurasi dalam Survei Modern',
    slug: 'teknologi-gnss-rtk-revolusi-akurasi-dalam-survei-modern',
    excerpt: 'Mengenal teknologi GNSS RTK dan keunggulannya dalam survei konstruksi dan pemetaan',
    content: 'GNSS RTK (Real-Time Kinematic) telah mengubah cara survei dilakukan dengan akurasi centimeter...',
    image_url: '/images/blog/gnss-rtk-technology.jpg',
    author: 'Admin GPS Store',
    published: true,
    tags: ['GNSS', 'RTK', 'Teknologi', 'Survei']
  },
  {
    title: 'Drone Survey: Masa Depan Pemetaan Aerial Indonesia',
    slug: 'drone-survey-masa-depan-pemetaan-aerial-indonesia',
    excerpt: 'Bagaimana drone survey mengubah industri pemetaan dan survei di Indonesia',
    content: 'Teknologi drone survey telah membawa revolusi dalam industri pemetaan aerial Indonesia...',
    image_url: '/images/blog/drone-survey-indonesia.jpg',
    author: 'Admin GPS Store',
    published: true,
    tags: ['Drone', 'Aerial Survey', 'Pemetaan', 'Indonesia']
  }
];

async function seedComprehensiveData() {
  console.log('🌱 Starting comprehensive database seeding...');

  try {
    // Clear existing data
    await pool.query('TRUNCATE TABLE products, categories, brands, blog_posts RESTART IDENTITY CASCADE');
    console.log('✓ Cleared existing data');

    // Insert categories
    console.log('📂 Inserting categories...');
    for (const category of categories) {
      await pool.query(
        `INSERT INTO categories (name, slug, description, image_url) VALUES ($1, $2, $3, $4)`,
        [category.name, category.slug, category.description, category.image_url]
      );
    }
    console.log(`✓ Inserted ${categories.length} categories`);

    // Insert brands
    console.log('🏷️ Inserting brands...');
    for (const brand of brands) {
      await pool.query(
        `INSERT INTO brands (name, slug, description, logo_url) VALUES ($1, $2, $3, $4)`,
        [brand.name, brand.slug, brand.description, brand.logo_url]
      );
    }
    console.log(`✓ Inserted ${brands.length} brands`);

    // Insert products
    console.log('📦 Inserting products...');
    for (const product of gpsProducts) {
      // Get category and brand IDs
      const categoryResult = await pool.query('SELECT id FROM categories WHERE name = $1', [product.category]);
      const brandResult = await pool.query('SELECT id FROM brands WHERE name = $1', [product.brand]);

      const categoryId = categoryResult.rows[0]?.id;
      const brandId = brandResult.rows[0]?.id;

      await pool.query(
        `INSERT INTO products (
          name, slug, description, price, category_id, brand_id, sku, stock_quantity,
          images, tags, seo_title, seo_description, meta_keywords, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          product.name, product.slug, product.description, product.price, categoryId, brandId,
          product.sku, product.stock, product.images, product.tags,
          product.seo_title, product.seo_description, product.meta_keywords, true
        ]
      );
    }
    console.log(`✓ Inserted ${gpsProducts.length} products`);

    // Insert blog posts
    console.log('📝 Inserting blog posts...');
    for (const post of blogPosts) {
      await pool.query(
        `INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author, published, tags) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [post.title, post.slug, post.excerpt, post.content, post.image_url, post.author, post.published, post.tags]
      );
    }
    console.log(`✓ Inserted ${blogPosts.length} blog posts`);

    // Verify final counts
    const productCount = await pool.query('SELECT COUNT(*) FROM products');
    const categoryCount = await pool.query('SELECT COUNT(*) FROM categories');
    const brandCount = await pool.query('SELECT COUNT(*) FROM brands');
    const blogCount = await pool.query('SELECT COUNT(*) FROM blog_posts');

    console.log('\n📊 Final database statistics:');
    console.log(`   Products: ${productCount.rows[0].count}`);
    console.log(`   Categories: ${categoryCount.rows[0].count}`);
    console.log(`   Brands: ${brandCount.rows[0].count}`);
    console.log(`   Blog Posts: ${blogCount.rows[0].count}`);

    console.log('\n🎉 Comprehensive database seeding completed successfully!');
  } catch (error) {
    console.error('💥 Comprehensive seeding failed:', error);
    throw error;
  }
}

// Run the seeding
if (require.main === module) {
  seedComprehensiveData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { seedComprehensiveData };
