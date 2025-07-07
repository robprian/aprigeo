#!/usr/bin/env node

// Script untuk generate images dan update database
import { imageScraper } from '../lib/image-scraper';
import fs from 'fs';
import path from 'path';

const DATABASE_DIR = path.join(__dirname, '..', 'database');

async function updateSeedFileWithImages() {
  console.log('🖼️  Generating images for GPS store...');
  
  // Generate all images
  const images = await imageScraper.generateAllImages();
  
  console.log('📝 Updating seed files with image URLs...');
  
  // Read existing seed files
  const seedFiles = [
    'seed_gps_products.sql',
    'seed_gps_products_part2.sql', 
    'seed_gps_products_part3.sql'
  ];
  
  for (const seedFile of seedFiles) {
    const filePath = path.join(DATABASE_DIR, seedFile);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update product images
      Object.entries(images.products).forEach(([slug, imageUrls]) => {
        const imageArray = JSON.stringify(imageUrls);
        // Replace placeholder images in product inserts
        content = content.replace(
          new RegExp(`'\\["/images/products/${slug}[^']*'\\]'`, 'g'),
          `'${imageArray}'`
        );
      });
      
      // Update category images
      Object.entries(images.categories).forEach(([slug, imageUrl]) => {
        content = content.replace(
          new RegExp(`'/images/categories/${slug}[^']*'`, 'g'),
          `'${imageUrl}'`
        );
      });
      
      // Update brand images  
      Object.entries(images.brands).forEach(([slug, imageUrl]) => {
        content = content.replace(
          new RegExp(`'/images/brands/${slug}[^']*'`, 'g'),
          `'${imageUrl}'`
        );
      });
      
      // Write updated content
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${seedFile}`);
    }
  }
  
  console.log('🎉 All seed files updated with image URLs!');
}

// Create comprehensive seed file with all data
async function createComprehensiveSeedFile() {
  console.log('📦 Creating comprehensive seed file...');
  
  const images = await imageScraper.generateAllImages();
  
  const seedContent = `-- Comprehensive GPS Store Database Seed
-- Auto-generated with image URLs
-- Date: ${new Date().toISOString()}

-- Clear existing data
DELETE FROM product_attributes;
DELETE FROM product_reviews;
DELETE FROM products;
DELETE FROM brands;
DELETE FROM categories;

-- Reset sequences
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE brands_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Insert Brands with auto-generated images
INSERT INTO brands (name, slug, description, logo_url, is_active) VALUES
('Garmin', 'garmin', 'Leading GPS technology and navigation solutions', '${images.brands['garmin']}', true),
('Trimble', 'trimble', 'Professional surveying and GPS equipment', '${images.brands['trimble']}', true),
('Leica Geosystems', 'leica-geosystems', 'Premium surveying and measurement solutions', '${images.brands['leica-geosystems']}', true),
('Topcon', 'topcon', 'Innovative positioning and surveying solutions', '${images.brands['topcon']}', true),
('Sokkia', 'sokkia', 'Precision measurement and surveying instruments', '${images.brands['sokkia']}', true),
('Magellan', 'magellan', 'Consumer and professional GPS devices', '${images.brands['magellan']}', true),
('TomTom', 'tomtom', 'Navigation and location technology', '${images.brands['tomtom']}', true),
('Hemisphere GNSS', 'hemisphere-gnss', 'High-precision GNSS solutions', '${images.brands['hemisphere-gnss']}', true),
('Spectra Precision', 'spectra-precision', 'Construction and surveying equipment', '${images.brands['spectra-precision']}', true),
('Carlson', 'carlson', 'Surveying software and hardware solutions', '${images.brands['carlson']}', true),
('South', 'south', 'Professional surveying instruments', '${images.brands['south']}', true),
('HI-TARGET', 'hi-target', 'Surveying and mapping equipment', '${images.brands['hi-target']}', true),
('CHC Navigation', 'chc-navigation', 'GNSS and surveying solutions', '${images.brands['chc-navigation']}', true),
('Stonex', 'stonex', 'High-tech surveying instruments', '${images.brands['stonex']}', true),
('UniStrong', 'unistrong', 'GNSS and surveying equipment', '${images.brands['unistrong']}', true);

-- Insert Categories with auto-generated images
INSERT INTO categories (name, slug, description, image_url, parent_id, is_active, sort_order) VALUES
('GPS Handheld', 'gps-handheld', 'GPS genggam untuk outdoor, hiking, dan navigasi personal', '${images.categories['gps-handheld']}', NULL, true, 1),
('GPS Surveying', 'gps-surveying', 'Alat GPS profesional untuk survei dan pemetaan', '${images.categories['gps-surveying']}', NULL, true, 2),
('Total Station', 'total-station', 'Total station untuk survei konstruksi dan pemetaan', '${images.categories['total-station']}', NULL, true, 3),
('Theodolite', 'theodolite', 'Theodolite untuk pengukuran sudut dan elevasi', '${images.categories['theodolite']}', NULL, true, 4),
('Level Optik', 'level-optik', 'Waterpass dan level optik untuk konstruksi', '${images.categories['level-optik']}', NULL, true, 5),
('Laser Level', 'laser-level', 'Laser level untuk konstruksi dan finishing', '${images.categories['laser-level']}', NULL, true, 6),
('Ranging Pole', 'ranging-pole', 'Rambu ukur dan ranging pole untuk survei', '${images.categories['ranging-pole']}', NULL, true, 7),
('Prisma Reflektor', 'prisma-reflektor', 'Prisma dan reflektor untuk total station', '${images.categories['prisma-reflektor']}', NULL, true, 8),
('GPS Mapping', 'gps-mapping', 'GPS untuk pemetaan dan GIS', '${images.categories['gps-mapping']}', NULL, true, 9),
('Software Survei', 'software-survei', 'Software untuk survei dan pemetaan', '${images.categories['software-survei']}', NULL, true, 10),
('Tripod', 'tripod', 'Tripod untuk alat survei dan GPS', '${images.categories['tripod']}', NULL, true, 11),
('Aksesoris GPS', 'aksesoris-gps', 'Aksesoris dan spare part GPS', '${images.categories['aksesoris-gps']}', NULL, true, 12),
('Drone Survey', 'drone-survey', 'Drone untuk survei dan pemetaan udara', '${images.categories['drone-survey']}', NULL, true, 13),
('Ground Penetrating Radar', 'ground-penetrating-radar', 'GPR untuk survei bawah tanah', '${images.categories['ground-penetrating-radar']}', NULL, true, 14),
('Compass & Clinometer', 'compass-clinometer', 'Kompas dan clinometer untuk survei', '${images.categories['compass-clinometer']}', NULL, true, 15);

-- Insert Products with auto-generated images
INSERT INTO products (
    name, slug, description, short_description, sku, price, compare_price, cost_price,
    category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight,
    dimensions, images, tags, meta_title, meta_description
) VALUES
-- GPS Handheld Products
('Garmin GPSMAP 66i', 'garmin-gpsmap-66i', 
'GPS handheld Garmin GPSMAP 66i dengan fitur satelit komunikasi 2-arah, navigasi presisi, dan pemetaan topografi. Dilengkapi dengan InReach satellite technology untuk komunikasi darurat di area terpencil. Tahan air IPX7 dengan layar 3 inci yang mudah dibaca di bawah sinar matahari. Memiliki baterai hingga 35 jam dalam mode GPS dan 200 jam dalam mode ekspedisi. Cocok untuk hiking, mountaineering, dan eksplorasi outdoor.', 
'GPS handheld dengan satelit komunikasi 2-arah dan pemetaan topografi', 
'GAR-GPSMAP-66I', 8999000, 9999000, 7500000, 
1, 1, true, true, true, 25, 0.23, 
'{"panjang": "6.2 cm", "lebar": "16.2 cm", "tinggi": "3.6 cm"}', 
'${JSON.stringify(images.products['garmin-gpsmap-66i'])}', 
'["GPS handheld", "InReach", "satelit komunikasi", "hiking", "outdoor", "IPX7", "topografi"]', 
'Garmin GPSMAP 66i - GPS Handheld dengan Satelit Komunikasi | Jual GPS Garmin Terbaik', 
'Beli Garmin GPSMAP 66i GPS handheld dengan satelit komunikasi 2-arah. Fitur InReach, pemetaan topografi, tahan air IPX7. Garansi resmi, harga terbaik di Indonesia.'),

('Garmin eTrex 32x', 'garmin-etrex-32x', 
'GPS handheld Garmin eTrex 32x dengan peta TopoActive preloaded dan slot microSD untuk peta tambahan. Memiliki layar TFT 2.2 inci dengan resolusi 240x320 piksel. Dilengkapi dengan kompas 3-axis dan barometer. Tahan air IPX7 dengan baterai AA yang dapat bertahan hingga 25 jam. Cocok untuk hiking, geocaching, dan aktivitas outdoor. Mendukung GLONASS dan GPS untuk akurasi posisi yang lebih baik.', 
'GPS handheld dengan peta TopoActive dan kompas 3-axis', 
'GAR-ETREX-32X', 3299000, 3599000, 2800000, 
1, 1, true, true, true, 45, 0.14, 
'{"panjang": "5.4 cm", "lebar": "10.3 cm", "tinggi": "3.3 cm"}', 
'${JSON.stringify(images.products['garmin-etrex-32x'])}', 
'["GPS handheld", "TopoActive", "kompas", "barometer", "hiking", "geocaching", "GLONASS"]', 
'Garmin eTrex 32x - GPS Handheld dengan Peta TopoActive | Harga Terbaik', 
'Jual Garmin eTrex 32x GPS handheld dengan peta TopoActive preloaded. Kompas 3-axis, barometer, tahan air IPX7. Cocok untuk hiking dan outdoor adventure.'),

('DJI Phantom 4 RTK', 'dji-phantom-4-rtk', 
'Drone survey DJI Phantom 4 RTK dengan sistem RTK terintegrasi dan akurasi centimeter-level. Dilengkapi dengan kamera 20MP dan gimbal 3-axis. Flight time hingga 30 menit dengan jangkauan 7km. Obstacle avoidance system yang canggih. Cocok untuk survey aerial, mapping, dan aplikasi photogrammetry yang membutuhkan akurasi tinggi.', 
'Drone survey dengan sistem RTK dan akurasi centimeter', 
'DJI-P4-RTK', 129900000, 139900000, 108000000, 
13, 1, true, true, true, 8, 1.4, 
'{"flight_time": "30 menit", "jangkauan": "7 km", "kamera": "20 MP"}', 
'${JSON.stringify(images.products['dji-phantom-4-rtk'])}', 
'["drone survey", "RTK terintegrasi", "akurasi centimeter", "kamera 20MP", "mapping", "photogrammetry"]', 
'DJI Phantom 4 RTK - Drone Survey dengan Sistem RTK dan Akurasi Centimeter', 
'Beli DJI Phantom 4 RTK drone survey dengan sistem RTK terintegrasi dan akurasi centimeter-level. Kamera 20MP, flight time 30 menit, cocok untuk mapping.');

-- Add product attributes
INSERT INTO product_attributes (product_id, name, value) VALUES
(1, 'Akurasi', '3 meter (95% typical)'),
(1, 'Satelit', 'GPS, GLONASS, Galileo, QZSS'),
(1, 'Layar', '3 inci, 240 x 400 piksel'),
(1, 'Baterai', 'Li-ion, 35 jam (mode GPS)'),
(1, 'Memori', '16 GB internal'),
(1, 'Konektivitas', 'Bluetooth, Wi-Fi, USB'),
(1, 'Sertifikasi', 'IPX7 (tahan air)'),

(2, 'Akurasi', '3 meter (95% typical)'),
(2, 'Satelit', 'GPS, GLONASS'),
(2, 'Layar', '2.2 inci, 240 x 320 piksel'),
(2, 'Baterai', '2 x AA, 25 jam'),
(2, 'Memori', '8 GB internal + microSD'),
(2, 'Sensor', 'Kompas 3-axis, Barometer'),
(2, 'Sertifikasi', 'IPX7 (tahan air)'),

(3, 'Flight Time', '30 menit'),
(3, 'Jangkauan', '7 km'),
(3, 'Kamera', '20 MP, 1" CMOS'),
(3, 'Gimbal', '3-axis mechanical'),
(3, 'RTK', 'Sistem RTK terintegrasi'),
(3, 'Akurasi', 'Centimeter-level'),
(3, 'Obstacle Avoidance', '5-direction detection');

-- Add product reviews
INSERT INTO product_reviews (product_id, user_id, rating, title, comment, is_verified, is_approved) VALUES
(1, 1, 5, 'GPS terbaik untuk hiking', 'Sangat puas dengan performa Garmin GPSMAP 66i. Fitur InReach sangat membantu saat hiking di area terpencil. Baterai tahan lama dan akurasi GPS sangat baik.', true, true),
(2, 2, 5, 'Value for money terbaik', 'Garmin eTrex 32x memberikan value yang sangat baik. Peta TopoActive sangat membantu untuk hiking. Baterai AA mudah diganti dan tahan lama.', true, true),
(3, 3, 5, 'Drone survey yang revolusioner', 'DJI Phantom 4 RTK mengubah cara kami melakukan survey. Akurasi centimeter-level dan kemudahan penggunaan sangat membantu produktivitas tim survey.', true, true);

-- Update featured products
UPDATE products SET is_featured = true WHERE id IN (1, 2, 3);

-- Final statistics
SELECT 
    'Categories' as type, COUNT(*) as count FROM categories
UNION ALL
SELECT 
    'Brands' as type, COUNT(*) as count FROM brands
UNION ALL
SELECT 
    'Products' as type, COUNT(*) as count FROM products
UNION ALL
SELECT 
    'Featured Products' as type, COUNT(*) as count FROM products WHERE is_featured = true;
`;

  const seedPath = path.join(DATABASE_DIR, 'seed_comprehensive_gps_with_images.sql');
  fs.writeFileSync(seedPath, seedContent, 'utf8');
  
  console.log(`✅ Created comprehensive seed file: ${seedPath}`);
  return seedPath;
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting GPS Store image generation and database update...');
    
    // Create comprehensive seed file with images
    const seedPath = await createComprehensiveSeedFile();
    
    console.log('📊 Seed file created successfully!');
    console.log(`📁 File location: ${seedPath}`);
    
    // Instructions for user
    console.log('\n📋 Next steps:');
    console.log('1. Review the generated seed file');
    console.log('2. Run the database import command:');
    console.log(`   cat ${seedPath} | docker compose exec -T postgres psql -U postgres -d gps_survey_store`);
    console.log('3. Restart the application to see the changes');
    
  } catch (error) {
    console.error('❌ Error generating images and updating database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { updateSeedFileWithImages, createComprehensiveSeedFile };
