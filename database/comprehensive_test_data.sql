-- Comprehensive Test Data for GPS & Survey Equipment Store
-- Compatible with existing schema

-- Clear existing data
TRUNCATE TABLE order_items, order_addresses, orders, reviews, products, 
              categories, brands, blog_posts, customer_profiles, customer_groups, 
              users RESTART IDENTITY CASCADE;

-- Insert Customer Groups
INSERT INTO customer_groups (name, description, discount_percentage, minimum_order_amount, created_at, updated_at) VALUES
('Retail', 'Customer umum dan individu', 0.00, 0.00, NOW(), NOW()),
('Kontraktor', 'Kontraktor konstruksi dan surveyor', 5.00, 50000.00, NOW(), NOW()),
('BUMN/BUMD', 'Badan Usaha Milik Negara dan Daerah', 8.00, 100000.00, NOW(), NOW()),
('Universitas', 'Institusi pendidikan dan penelitian', 10.00, 30000.00, NOW(), NOW()),
('Reseller', 'Mitra penjualan dan distributor', 15.00, 200000.00, NOW(), NOW());

-- Insert Categories with proper updated_at
INSERT INTO categories (name, slug, description, is_active, sort_order, created_at, updated_at) VALUES
('GNSS Receivers', 'gnss-receivers-professional-surveying', 'High-precision GNSS receivers for professional surveying and mapping applications', true, 1, NOW(), NOW()),
('Total Stations', 'total-stations-precision-measurement', 'Electronic total stations for accurate distance and angle measurements', true, 2, NOW(), NOW()),
('Theodolites', 'theodolites-angle-measurement', 'Precision theodolites for angular measurements in surveying and construction', true, 3, NOW(), NOW()),
('Laser Levels', 'laser-levels-construction-grade', 'Professional laser levels for construction and surveying applications', true, 4, NOW(), NOW()),
('GPS Handheld Devices', 'gps-handheld-navigation-devices', 'Portable GPS devices for field navigation and data collection', true, 5, NOW(), NOW()),
('Drone Surveying Equipment', 'drone-surveying-mapping-equipment', 'UAV systems and accessories for aerial surveying and mapping', true, 6, NOW(), NOW()),
('Marine Equipment', 'marine-navigation-equipment', 'GPS and navigation equipment for marine applications', true, 7, NOW(), NOW()),
('GIS Software', 'gis-software-mapping-solutions', 'Geographic Information System software and solutions', true, 8, NOW(), NOW());

-- Insert Brands with proper updated_at
INSERT INTO brands (name, slug, description, is_active, created_at, updated_at) VALUES
('Trimble', 'trimble-precision-positioning-technology', 'Leading provider of advanced positioning solutions and geospatial technology', true, NOW(), NOW()),
('Leica Geosystems', 'leica-geosystems-surveying-instruments', 'Premium surveying and measurement instruments manufacturer', true, NOW(), NOW()),
('Topcon', 'topcon-positioning-systems', 'Global leader in positioning and measurement technology', true, NOW(), NOW()),
('Garmin', 'garmin-gps-navigation-technology', 'Consumer and professional GPS navigation technology', true, NOW(), NOW()),
('Sokkia', 'sokkia-surveying-instruments', 'Professional surveying instruments and solutions', true, NOW(), NOW()),
('Spectra Precision', 'spectra-precision-positioning-solutions', 'Construction and surveying positioning solutions', true, NOW(), NOW()),
('Hemisphere GNSS', 'hemisphere-gnss-positioning-technology', 'High-precision GNSS and positioning technology', true, NOW(), NOW()),
('DJI', 'dji-drone-technology', 'Leading drone and aerial imaging technology', true, NOW(), NOW()),
('Emlid', 'emlid-drone-mapping-solutions', 'Affordable drone mapping and surveying solutions', true, NOW(), NOW()),
('Magellan', 'magellan-navigation-systems', 'Professional navigation and GPS systems', true, NOW(), NOW());

-- Insert Products with sale_price instead of compare_price
INSERT INTO products (name, slug, description, short_description, sku, price, sale_price, cost_price, category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight, dimensions, images, tags, meta_title, meta_description, created_at, updated_at) VALUES

-- GNSS Receivers (Category 1)
('Trimble R12i GNSS Receiver', 'trimble-r12i-gnss-receiver-professional', 'High-precision multi-constellation GNSS receiver with integrated IMU technology for centimeter-level accuracy in challenging environments', 'Professional GNSS receiver with IMU technology', 'TRI-R12I-001', 45999.99, 43999.99, 38000.00, 1, 1, true, true, true, 5, '2.1 kg', '185x108x160mm', ARRAY['/images/trimble-r12i-1.jpg', '/images/trimble-r12i-2.jpg'], ARRAY['GNSS', 'RTK', 'IMU', 'Professional'], 'Trimble R12i GNSS Receiver - Professional Surveying Equipment', 'High-precision GNSS receiver with IMU technology for professional surveying and mapping applications', NOW(), NOW()),

('Leica GS18 T GNSS Rover', 'leica-gs18-t-gnss-rover-tilt-compensation', 'Revolutionary GNSS rover with tilt compensation technology, eliminating the need to level the pole for maximum productivity', 'GNSS rover with tilt compensation technology', 'LEI-GS18T-001', 52999.99, 49999.99, 42000.00, 1, 2, true, true, true, 3, '1.85 kg', '178x98x152mm', ARRAY['/images/leica-gs18t-1.jpg', '/images/leica-gs18t-2.jpg'], ARRAY['GNSS', 'Tilt', 'RTK', 'Rover'], 'Leica GS18 T GNSS Rover - Tilt Compensation Technology', 'Revolutionary GNSS rover with tilt compensation for maximum surveying productivity', NOW(), NOW()),

('Topcon HiPer VR GNSS Receiver', 'topcon-hiper-vr-gnss-receiver-visual-reality', 'Advanced GNSS receiver with augmented reality display and universal tracking technology for all satellite constellations', 'GNSS receiver with augmented reality display', 'TOP-HIPERVR-001', 38999.99, 36999.99, 32000.00, 1, 3, true, true, true, 7, '1.9 kg', '170x170x95mm', ARRAY['/images/topcon-hipervr-1.jpg', '/images/topcon-hipervr-2.jpg'], ARRAY['GNSS', 'AR', 'RTK', 'Universal'], 'Topcon HiPer VR GNSS Receiver - Augmented Reality Surveying', 'Advanced GNSS receiver with AR display for next-generation surveying', NOW(), NOW()),

-- Total Stations (Category 2)
('Leica TS16 Robotic Total Station', 'leica-ts16-robotic-total-station-automatic', 'Self-learning robotic total station with automatic target recognition and intelligent tracking for maximum efficiency', 'Self-learning robotic total station', 'LEI-TS16-001', 89999.99, 84999.99, 72000.00, 2, 2, true, true, true, 2, '5.7 kg', '230x180x360mm', ARRAY['/images/leica-ts16-1.jpg', '/images/leica-ts16-2.jpg'], ARRAY['Robotic', 'ATR', 'Total Station', 'Automatic'], 'Leica TS16 Robotic Total Station - Automatic Target Recognition', 'Self-learning robotic total station with ATR for maximum surveying efficiency', NOW(), NOW()),

('Trimble S9 HP Robotic Total Station', 'trimble-s9-hp-robotic-total-station-high-precision', 'High-precision robotic total station with advanced DR Plus technology and MagDrive servo technology', 'High-precision robotic total station', 'TRI-S9HP-001', 94999.99, 89999.99, 78000.00, 2, 1, true, true, true, 2, '5.9 kg', '238x185x375mm', ARRAY['/images/trimble-s9hp-1.jpg', '/images/trimble-s9hp-2.jpg'], ARRAY['Robotic', 'High Precision', 'MagDrive', 'DR Plus'], 'Trimble S9 HP Robotic Total Station - High Precision Surveying', 'High-precision robotic total station with advanced DR Plus technology', NOW(), NOW()),

('Topcon GT-1004 Robotic Total Station', 'topcon-gt-1004-robotic-total-station-hybrid', 'Hybrid positioning robotic total station combining optical and GNSS measurements in a single instrument', 'Hybrid positioning robotic total station', 'TOP-GT1004-001', 79999.99, 74999.99, 65000.00, 2, 3, true, false, true, 4, '5.5 kg', '225x175x355mm', ARRAY['/images/topcon-gt1004-1.jpg', '/images/topcon-gt1004-2.jpg'], ARRAY['Robotic', 'Hybrid', 'GNSS', 'Optical'], 'Topcon GT-1004 Robotic Total Station - Hybrid Positioning', 'Hybrid robotic total station combining optical and GNSS measurements', NOW(), NOW()),

-- Handheld GPS (Category 5)
('Garmin GPSMAP 66sr', 'garmin-gpsmap-66sr-handheld-gps-satellite', 'Rugged handheld GPS with multi-band GNSS support and inReach satellite technology for global communication', 'Rugged handheld GPS with satellite communication', 'GAR-66SR-001', 799.99, 749.99, 600.00, 5, 4, true, true, true, 25, '230g', '62x160x36mm', ARRAY['/images/garmin-66sr-1.jpg', '/images/garmin-66sr-2.jpg'], ARRAY['Handheld', 'Satellite', 'inReach', 'Multi-band'], 'Garmin GPSMAP 66sr - Satellite Communicator GPS', 'Rugged handheld GPS with satellite communication and multi-band GNSS', NOW(), NOW()),

('Trimble Juno 3B Handheld', 'trimble-juno-3b-handheld-gis-collector', 'Professional handheld GPS for GIS data collection with Windows Mobile and integrated camera', 'Professional handheld GPS for GIS data collection', 'TRI-JUNO3B-001', 1299.99, 1199.99, 950.00, 5, 1, true, false, true, 15, '340g', '79x168x40mm', ARRAY['/images/trimble-juno3b-1.jpg', '/images/trimble-juno3b-2.jpg'], ARRAY['Handheld', 'GIS', 'Data Collection', 'Windows'], 'Trimble Juno 3B Handheld - GIS Data Collection', 'Professional handheld GPS for GIS data collection with integrated camera', NOW(), NOW()),

-- Drone Equipment (Category 6)
('DJI Phantom 4 RTK', 'dji-phantom-4-rtk-drone-surveying-mapping', 'Professional mapping drone with RTK positioning module for centimeter-level accuracy without ground control points', 'Professional mapping drone with RTK positioning', 'DJI-P4RTK-001', 6999.99, 6499.99, 5500.00, 6, 8, true, true, true, 8, '1.391 kg', '350x350x190mm', ARRAY['/images/dji-p4rtk-1.jpg', '/images/dji-p4rtk-2.jpg'], ARRAY['Drone', 'RTK', 'Mapping', 'Surveying'], 'DJI Phantom 4 RTK - Professional Mapping Drone', 'Professional mapping drone with RTK for centimeter-level accuracy', NOW(), NOW()),

('DJI Matrice 300 RTK', 'dji-matrice-300-rtk-enterprise-drone-platform', 'Enterprise drone platform with advanced intelligence features and up to 55 minutes flight time', 'Enterprise drone platform with AI features', 'DJI-M300RTK-001', 13999.99, 12999.99, 11000.00, 6, 8, true, true, true, 3, '3.6 kg', '810x670x430mm', ARRAY['/images/dji-m300rtk-1.jpg', '/images/dji-m300rtk-2.jpg'], ARRAY['Enterprise', 'AI', 'Long Flight', 'Professional'], 'DJI Matrice 300 RTK - Enterprise Drone Platform', 'Enterprise drone platform with advanced AI and long flight time', NOW(), NOW()),

-- Laser Levels (Category 4)
('Leica Lino L6R-1 Laser Level', 'leica-lino-l6r-1-laser-level-rotary', 'Professional rotary laser level with Li-ion battery and remote control for construction applications', 'Professional rotary laser level with remote', 'LEI-L6R1-001', 2999.99, 2799.99, 2200.00, 4, 2, true, false, true, 12, '1.8 kg', '220x220x245mm', ARRAY['/images/leica-l6r1-1.jpg', '/images/leica-l6r1-2.jpg'], ARRAY['Laser Level', 'Rotary', 'Construction', 'Remote'], 'Leica Lino L6R-1 Laser Level - Professional Construction', 'Professional rotary laser level with Li-ion battery for construction', NOW(), NOW()),

('Spectra Precision LL500', 'spectra-precision-ll500-laser-level-dual-grade', 'Dual grade laser level with automatic leveling and grade matching for construction and site work', 'Dual grade laser level with automatic leveling', 'SPE-LL500-001', 3499.99, 3299.99, 2700.00, 4, 6, true, false, true, 8, '2.1 kg', '240x240x280mm', ARRAY['/images/spectra-ll500-1.jpg', '/images/spectra-ll500-2.jpg'], ARRAY['Dual Grade', 'Auto Level', 'Construction', 'Site Work'], 'Spectra Precision LL500 - Dual Grade Laser Level', 'Dual grade laser level with automatic leveling for construction work', NOW(), NOW()),

-- Theodolites (Category 3)
('Sokkia DT940 Digital Theodolite', 'sokkia-dt940-digital-theodolite-precision', 'High-precision digital theodolite with dual-axis compensation and large backlit display', 'High-precision digital theodolite', 'SOK-DT940-001', 4999.99, 4699.99, 3800.00, 3, 5, true, false, true, 6, '4.2 kg', '165x160x320mm', ARRAY['/images/sokkia-dt940-1.jpg', '/images/sokkia-dt940-2.jpg'], ARRAY['Digital', 'Theodolite', 'Precision', 'Dual Axis'], 'Sokkia DT940 Digital Theodolite - High Precision Surveying', 'High-precision digital theodolite with dual-axis compensation', NOW(), NOW()),

('Topcon DT-209 Theodolite', 'topcon-dt-209-theodolite-optical-precision', 'Professional optical theodolite with absolute encoders and waterproof design for field work', 'Professional optical theodolite', 'TOP-DT209-001', 3999.99, 3799.99, 3100.00, 3, 3, true, false, true, 10, '3.8 kg', '155x155x305mm', ARRAY['/images/topcon-dt209-1.jpg', '/images/topcon-dt209-2.jpg'], ARRAY['Optical', 'Encoders', 'Waterproof', 'Field Work'], 'Topcon DT-209 Theodolite - Professional Optical Surveying', 'Professional optical theodolite with absolute encoders and waterproof design', NOW(), NOW()),

-- Marine Equipment (Category 7)
('Garmin GPSMAP 8424 MFD', 'garmin-gpsmap-8424-marine-chartplotter-display', 'Professional marine chartplotter with 24-inch display and advanced sonar capabilities', 'Professional marine chartplotter display', 'GAR-8424MFD-001', 8999.99, 8499.99, 7200.00, 7, 4, true, false, true, 4, '4.5 kg', '600x380x85mm', ARRAY['/images/garmin-8424-1.jpg', '/images/garmin-8424-2.jpg'], ARRAY['Marine', 'Chartplotter', 'Sonar', 'Display'], 'Garmin GPSMAP 8424 MFD - Professional Marine Display', 'Professional marine chartplotter with 24-inch display and sonar', NOW(), NOW()),

('Hemisphere Vector VS330', 'hemisphere-vector-vs330-marine-gnss-compass', 'Marine GNSS compass with dual antenna design for precise heading and positioning', 'Marine GNSS compass with dual antenna', 'HEM-VS330-001', 5999.99, 5699.99, 4800.00, 7, 7, true, false, true, 6, '1.2 kg', '140x110x45mm', ARRAY['/images/hemisphere-vs330-1.jpg', '/images/hemisphere-vs330-2.jpg'], ARRAY['Marine', 'GNSS', 'Compass', 'Dual Antenna'], 'Hemisphere Vector VS330 - Marine GNSS Compass', 'Marine GNSS compass with dual antenna for precise heading', NOW(), NOW());

-- Insert Users
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, email_verified_at, is_active, created_at, updated_at) VALUES
('admin@apriniageosat.co.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'System', '021-5551234', 'admin', NOW(), true, NOW(), NOW()),
('surveyor@company.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ahmad', 'Wijaya', '08123456789', 'customer', NOW(), true, NOW(), NOW()),
('contractor@bumn.co.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Budi', 'Santoso', '08234567890', 'customer', NOW(), true, NOW(), NOW()),
('professor@univ.ac.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Siti', 'Nurhaliza', '08345678901', 'customer', NOW(), true, NOW(), NOW()),
('reseller@geotech.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Indra', 'Kusuma', '08456789012', 'customer', NOW(), true, NOW(), NOW());

-- Insert Customer Profiles
INSERT INTO customer_profiles (user_id, company_name, tax_id, customer_group_id, total_orders, total_spent, created_at, updated_at) VALUES
(2, 'CV. Surveyor Mandiri', '12.345.678.9-012.000', 2, 3, 125000.00, NOW(), NOW()),
(3, 'PT. Konstruksi Nusantara', '98.765.432.1-098.000', 3, 5, 450000.00, NOW(), NOW()),
(4, 'Universitas Indonesia - Fakultas Teknik', '11.222.333.4-456.000', 4, 2, 89000.00, NOW(), NOW()),
(5, 'PT. Geo Tech Solutions', '55.666.777.8-999.000', 5, 8, 850000.00, NOW(), NOW());

-- Insert Blog Posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, featured_image, is_published, published_at, meta_title, meta_description, created_at, updated_at) VALUES
('Panduan Memilih Total Station yang Tepat untuk Proyek Konstruksi', 'panduan-memilih-total-station-proyek-konstruksi', 'Tips dan panduan lengkap memilih total station yang sesuai dengan kebutuhan proyek konstruksi Anda', 'Total station merupakan instrumen penting dalam proyek konstruksi dan surveying. Artikel ini akan membahas berbagai faktor yang perlu dipertimbangkan...', 'Tim Editorial', 'Surveying', ARRAY['total station', 'konstruksi', 'surveying', 'panduan'], '/images/blog/total-station-guide.jpg', true, NOW(), 'Panduan Memilih Total Station - Tips Surveying Profesional', 'Tips lengkap memilih total station yang tepat untuk proyek konstruksi dan surveying', NOW(), NOW()),

('Teknologi GNSS Terbaru: RTK vs PPP untuk Surveying Presisi Tinggi', 'teknologi-gnss-rtk-vs-ppp-surveying-presisi', 'Perbandingan teknologi RTK dan PPP dalam aplikasi surveying presisi tinggi', 'Dalam dunia surveying modern, teknologi GNSS telah mengalami perkembangan pesat. Dua teknologi yang paling menonjol adalah RTK dan PPP...', 'Dr. Ahmad Surveyor', 'Technology', ARRAY['GNSS', 'RTK', 'PPP', 'presisi'], '/images/blog/gnss-technology.jpg', true, NOW(), 'Teknologi GNSS: RTK vs PPP untuk Surveying Presisi', 'Perbandingan lengkap teknologi RTK dan PPP dalam aplikasi surveying profesional', NOW(), NOW()),

('Cara Kalibrasi dan Maintenance GPS Handheld untuk Akurasi Optimal', 'kalibrasi-maintenance-gps-handheld-akurasi-optimal', 'Panduan praktis kalibrasi dan perawatan GPS handheld untuk menjaga akurasi pengukuran', 'GPS handheld merupakan alat yang sangat berguna untuk navigasi dan pengukuran di lapangan. Untuk memastikan akurasi optimal...', 'Teknis Support', 'Maintenance', ARRAY['GPS', 'kalibrasi', 'maintenance', 'akurasi'], '/images/blog/gps-maintenance.jpg', true, NOW(), 'Kalibrasi GPS Handheld - Panduan Maintenance Profesional', 'Panduan lengkap kalibrasi dan maintenance GPS handheld untuk akurasi optimal', NOW(), NOW()),

('Drone Surveying: Revolusi Teknologi Pemetaan Udara di Indonesia', 'drone-surveying-revolusi-teknologi-pemetaan-udara', 'Bagaimana teknologi drone mengubah cara kita melakukan pemetaan dan surveying di Indonesia', 'Teknologi drone telah merevolusi industri surveying dan pemetaan. Di Indonesia, penggunaan drone untuk aplikasi komersial...', 'Pilot Professional', 'Drone Technology', ARRAY['drone', 'pemetaan', 'surveying', 'teknologi'], '/images/blog/drone-surveying.jpg', true, NOW(), 'Drone Surveying - Revolusi Pemetaan Udara Indonesia', 'Teknologi drone mengubah cara surveying dan pemetaan di Indonesia', NOW(), NOW()),

('Standar Ketelitian Surveying Sesuai SNI untuk Proyek Infrastruktur', 'standar-ketelitian-surveying-sni-proyek-infrastruktur', 'Panduan standar ketelitian surveying sesuai SNI yang harus dipenuhi dalam proyek infrastruktur', 'Dalam proyek infrastruktur, ketelitian surveying harus memenuhi standar yang ditetapkan oleh SNI (Standar Nasional Indonesia)...', 'Surveyor Profesional', 'Standards', ARRAY['SNI', 'standar', 'ketelitian', 'infrastruktur'], '/images/blog/sni-standards.jpg', true, NOW(), 'Standar Ketelitian Surveying SNI - Panduan Infrastruktur', 'Panduan standar ketelitian surveying sesuai SNI untuk proyek infrastruktur', NOW(), NOW());

-- Insert Product Reviews
INSERT INTO reviews (user_id, product_id, rating, title, comment, is_active, created_at, updated_at) VALUES
(2, 1, 5, 'Excellent GNSS Receiver', 'Trimble R12i sangat akurat dan mudah digunakan. IMU technology sangat membantu di area yang sulit.', true, NOW(), NOW()),
(3, 2, 5, 'Game Changer for Surveying', 'Leica GS18 T dengan tilt compensation benar-benar mengubah cara kerja kami. Produktivitas meningkat signifikan.', true, NOW(), NOW()),
(4, 3, 4, 'Good Value for Money', 'Topcon HiPer VR memberikan value yang baik dengan teknologi AR yang menarik.', true, NOW(), NOW()),
(2, 4, 5, 'Outstanding Robotic Total Station', 'Leica TS16 dengan ATR bekerja sempurna. Self-learning feature sangat impressive.', true, NOW(), NOW()),
(5, 5, 5, 'High Precision as Expected', 'Trimble S9 HP memberikan presisi tinggi yang diharapkan. MagDrive technology smooth sekali.', true, NOW(), NOW()),
(3, 9, 4, 'Great for Field Work', 'Garmin 66sr perfect untuk field work. inReach satellite communication sangat berguna di area terpencil.', true, NOW(), NOW()),
(4, 11, 5, 'Professional Mapping Drone', 'DJI Phantom 4 RTK sangat akurat untuk mapping. RTK positioning eliminasi kebutuhan GCP.', true, NOW(), NOW()),
(5, 12, 5, 'Enterprise Grade Drone', 'DJI Matrice 300 RTK sangat robust untuk professional work. AI features sangat membantu.', true, NOW(), NOW());

-- Reset sequences
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
SELECT setval('brands_id_seq', (SELECT MAX(id) FROM brands));
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('blog_posts_id_seq', (SELECT MAX(id) FROM blog_posts));
SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));
