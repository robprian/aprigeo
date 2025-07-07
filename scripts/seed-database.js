#!/usr/bin/env node

/**
 * Main Database Seeding Script for GPS Survey Store
 * This script seeds the database with complete GPS-related data
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'gps_survey_store',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
};

const pool = new Pool(dbConfig);

// SQL file paths
const sqlFiles = [
  'schema_postgres.sql',
  'seed_gps_products.sql',
  'seed_gps_products_part2.sql',
  'seed_gps_products_part3.sql',
  'banner_system.sql'
];

async function executeSqlFile(filePath) {
  try {
    const fullPath = path.join(__dirname, '..', 'database', filePath);
    const sql = fs.readFileSync(fullPath, 'utf8');
    
    console.log(`Executing ${filePath}...`);
    await pool.query(sql);
    console.log(`✓ ${filePath} executed successfully`);
  } catch (error) {
    console.error(`✗ Error executing ${filePath}:`, error.message);
    throw error;
  }
}

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  console.log('Database config:', {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user
  });

  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✓ Database connection successful');

    // Execute SQL files in order
    for (const file of sqlFiles) {
      await executeSqlFile(file);
    }

    // Verify data was inserted
    const result = await pool.query('SELECT COUNT(*) FROM products');
    console.log(`✓ Products in database: ${result.rows[0].count}`);

    const categoryResult = await pool.query('SELECT COUNT(*) FROM categories');
    console.log(`✓ Categories in database: ${categoryResult.rows[0].count}`);

    const brandResult = await pool.query('SELECT COUNT(*) FROM brands');
    console.log(`✓ Brands in database: ${brandResult.rows[0].count}`);

    const bannerResult = await pool.query('SELECT COUNT(*) FROM banners');
    console.log(`✓ Banners in database: ${bannerResult.rows[0].count}`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('💥 Database seeding failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
