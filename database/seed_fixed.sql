-- Fixed Comprehensive Seed Data for GPS & Survey Equipment Store
-- CV. Aprinia Geosat Solusindo

-- Clear existing data
TRUNCATE TABLE order_items, order_addresses, orders, product_reviews, products, 
              categories, brands, addresses, customer_profiles, customer_groups, 
              users, blog_posts, system_settings RESTART IDENTITY CASCADE;

-- Insert Customer Groups
INSERT INTO customer_groups (name, description, discount_percentage, minimum_order_amount) VALUES
('Retail', 'Customer umum dan individu', 0.00, 0.00),
('Kontraktor', 'Kontraktor konstruksi dan surveyor', 5.00, 50000.00),
('BUMN/BUMD', 'Badan Usaha Milik Negara dan Daerah', 8.00, 100000.00),
('Universitas', 'Institusi pendidikan dan penelitian', 10.00, 30000.00),
('Reseller', 'Mitra penjualan dan distributor', 15.00, 200000.00);

-- Insert Users (Admin, Customers, etc.)
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, email_verified_at) VALUES
('admin@apriniageosat.co.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'System', '021-5551234', 'admin', NOW()),
('manager@apriniageosat.co.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Budi', 'Santoso', '021-5551235', 'manager', NOW()),

-- Customers - Various Indonesian Names and Companies
('ahmad.wijaya@surveyorindo.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ahmad', 'Wijaya', '081234567890', 'customer', NOW()),
('siti.rahayu@ptjayakarta.co.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Siti', 'Rahayu', '081234567891', 'customer', NOW()),
('dedi.kurniawan@geomapping.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dedi', 'Kurniawan', '081234567892', 'customer', NOW()),
('indira.sari@univgadjah.ac.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Indira', 'Sari', '081234567893', 'customer', NOW()),
('bambang.purnomo@waskita.co.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Bambang', 'Purnomo', '081234567894', 'customer', NOW()),
('maya.lestari@topografi.net', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Maya', 'Lestari', '081234567895', 'customer', NOW()),
('rio.firmansyah@ptadhi.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Rio', 'Firmansyah', '081234567896', 'customer', NOW()),
('dewi.kartika@geodesi.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dewi', 'Kartika', '081234567897', 'customer', NOW()),
('agus.setiawan@hutama.co.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Agus', 'Setiawan', '081234567898', 'customer', NOW()),
('lina.fitriani@survey.co.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lina', 'Fitriani', '081234567899', 'customer', NOW()),
('hendi.pratama@kontraktor.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Hendi', 'Pratama', '081234567800', 'customer', NOW()),
('nuri.handayani@itb.ac.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Nuri', 'Handayani', '081234567801', 'customer', NOW()),
('fadli.rahman@pertamina.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Fadli', 'Rahman', '081234567802', 'customer', NOW()),
('rini.susanti@surveyor.net', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Rini', 'Susanti', '081234567803', 'customer', NOW()),
('eko.prasetyo@geospasial.id', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Eko', 'Prasetyo', '081234567804', 'customer', NOW());

-- Insert Customer Profiles with Indonesian Companies
INSERT INTO customer_profiles (user_id, customer_group_id, company_name, tax_id, gender, total_orders, total_spent) VALUES
(3, 2, 'PT. Surveyor Indonesia Persero', '01.001.123.456.789', 'male', 15, 125000.00),
(4, 3, 'PT. Jaya Karya Persero Tbk', '01.002.234.567.890', 'female', 8, 85000.00),
(5, 2, 'CV. Geo Mapping Indonesia', '31.123.345.678.901', 'male', 12, 95000.00),
(6, 4, 'Universitas Gadjah Mada', '00.001.456.789.012', 'female', 6, 45000.00),
(7, 3, 'PT. Waskita Karya Persero Tbk', '01.003.567.890.123', 'male', 20, 180000.00),
(8, 2, 'CV. Topografi Nusantara', '31.234.678.901.234', 'female', 9, 65000.00),
(9, 2, 'PT. Adhi Karya Persero Tbk', '01.004.789.012.345', 'male', 11, 88000.00),
(10, 1, 'CV. Geodesi Pratama', '31.345.789.012.456', 'female', 4, 25000.00),
(11, 3, 'PT. Hutama Karya Persero', '01.005.890.123.456', 'male', 18, 155000.00),
(12, 2, 'PT. Survey Konstruksi Indonesia', '21.456.901.234.567', 'female', 7, 52000.00),
(13, 2, 'CV. Kontraktor Sejahtera', '31.567.012.345.678', 'male', 13, 98000.00),
(14, 4, 'Institut Teknologi Bandung', '00.002.678.123.789', 'female', 5, 35000.00),
(15, 3, 'PT. Pertamina Persero', '01.006.789.234.890', 'male', 25, 250000.00),
(16, 1, 'Surveyor Mandiri', '32.678.345.456.789', 'female', 3, 18000.00),
(17, 2, 'PT. Geospasial Teknologi', '21.789.456.567.890', 'male', 10, 75000.00);

-- Insert Brands (GPS and Survey Equipment Brands)
INSERT INTO brands (name, slug, description, logo_url, is_active) VALUES
('Trimble', 'trimble', 'Leading GPS and positioning technology', '/images/brands/trimble.png', true),
('Leica Geosystems', 'leica-geosystems', 'Swiss precision measurement instruments', '/images/brands/leica.png', true),
('Topcon', 'topcon', 'Japanese surveying and positioning equipment', '/images/brands/topcon.png', true),
('Sokkia', 'sokkia', 'Professional surveying instruments', '/images/brands/sokkia.png', true),
('Garmin', 'garmin', 'GPS navigation and outdoor equipment', '/images/brands/garmin.png', true),
('Spectra Precision', 'spectra-precision', 'Survey and construction positioning', '/images/brands/spectra.png', true),
('Stonex', 'stonex', 'Italian GNSS and surveying solutions', '/images/brands/stonex.png', true),
('Hi-Target', 'hi-target', 'Chinese GNSS and surveying equipment', '/images/brands/hitarget.png', true),
('South', 'south', 'Professional surveying instruments', '/images/brands/south.png', true),
('CHC Navigation', 'chc-navigation', 'GNSS receivers and solutions', '/images/brands/chc.png', true);

-- Insert Categories
INSERT INTO categories (name, description, slug, parent_id, is_active) VALUES
('GPS & GNSS', 'Global Positioning dan navigasi satelit', 'gps-gnss', NULL, true),
('Theodolite', 'Alat ukur sudut horizontal dan vertikal', 'theodolite', NULL, true),
('Total Station', 'Electronic Distance Measurement dan angle measurement', 'total-station', NULL, true),
('Level', 'Alat pengukur ketinggian dan leveling', 'level', NULL, true),
('Drone Survey', 'Unmanned Aerial Vehicle untuk surveying', 'drone-survey', NULL, true),
('Software', 'Software surveying dan mapping', 'software', NULL, true),
('Aksesoris', 'Aksesoris dan spare parts alat survey', 'aksesoris', NULL, true),

-- GPS Subcategories
('Handheld GPS', 'GPS genggam untuk navigasi', 'handheld-gps', 1, true),
('RTK GPS', 'Real Time Kinematic GPS untuk presisi tinggi', 'rtk-gps', 1, true),
('GNSS Base Station', 'Base station untuk RTK correction', 'gnss-base-station', 1, true),
('GPS Mapping', 'GPS untuk pemetaan dan GIS', 'gps-mapping', 1, true),

-- Total Station Subcategories  
('Manual Total Station', 'Total station manual', 'manual-total-station', 3, true),
('Motorized Total Station', 'Total station bermotor', 'motorized-total-station', 3, true),
('Robotic Total Station', 'Total station robotik', 'robotic-total-station', 3, true),

-- Level Subcategories
('Auto Level', 'Automatic level', 'auto-level', 4, true),
('Digital Level', 'Level digital dengan tampilan elektronik', 'digital-level', 4, true),
('Laser Level', 'Level dengan teknologi laser', 'laser-level', 4, true);

-- Insert Products (GPS & Survey Equipment) with proper decimal formatting
INSERT INTO products (name, description, slug, sku, price, compare_price, category_id, brand_id, stock_quantity, is_active, is_featured, weight, dimensions, images) VALUES

-- Trimble GPS Products
('Trimble R12i GNSS Receiver', 'Receiver GNSS terbaru dengan teknologi Trimble 360 dan IMU terintegrasi untuk akurasi maksimal dalam surveying dan mapping', 'trimble-r12i-gnss-receiver', 'TRM-R12I-001', 175000.00, 185000.00, 9, 1, 5, true, true, 2.8, '{"length": "18.5cm", "width": "18.5cm", "height": "11.2cm"}', '["/images/products/trimble-r12i-1.jpg", "/images/products/trimble-r12i-2.jpg"]'),
('Trimble R10 Model 2 GNSS', 'GNSS receiver compact dengan teknologi terkini untuk RTK surveying dan pemetaan presisi tinggi', 'trimble-r10-model-2-gnss', 'TRM-R10M2-001', 148000.00, 155000.00, 9, 1, 8, true, true, 2.1, '{"length": "17.8cm", "width": "17.8cm", "height": "10.5cm"}', '["/images/products/trimble-r10-1.jpg"]'),
('Trimble TSC7 Controller', 'Controller Android powerful dengan layar 7 inci untuk aplikasi surveying field', 'trimble-tsc7-controller', 'TRM-TSC7-001', 45000.00, NULL, 6, 1, 12, true, false, 0.8, '{"length": "21.3cm", "width": "13.2cm", "height": "3.8cm"}', '["/images/products/trimble-tsc7-1.jpg"]'),
('Trimble S9 Total Station', 'Total station robotic dengan presisi 1 detik dan teknologi VISION untuk tracking otomatis', 'trimble-s9-total-station', 'TRM-S9-001', 305000.00, 320000.00, 13, 1, 3, true, true, 5.2, '{"length": "35cm", "width": "25cm", "height": "18cm"}', '["/images/products/trimble-s9-1.jpg", "/images/products/trimble-s9-2.jpg"]'),

-- Leica Products  
('Leica GS18 T GNSS RTK Rover', 'GNSS RTK rover dengan teknologi tilt compensation untuk pengukuran tanpa leveling', 'leica-gs18-t-gnss-rtk-rover', 'LCA-GS18T-001', 185000.00, 195000.00, 9, 2, 6, true, true, 2.9, '{"length": "19.2cm", "width": "19.2cm", "height": "11.8cm"}', '["/images/products/leica-gs18t-1.jpg"]'),
('Leica TS16 Total Station', 'Total station dengan teknologi image assisted surveying dan self-learning target lock', 'leica-ts16-total-station', 'LCA-TS16-001', 270000.00, 285000.00, 12, 2, 4, true, true, 5.8, '{"length": "38cm", "width": "26cm", "height": "19cm"}', '["/images/products/leica-ts16-1.jpg"]'),
('Leica NA532 Auto Level', 'Automatic level dengan kompensator magnetik dan akurasi 2.0mm per km', 'leica-na532-auto-level', 'LCA-NA532-001', 8200.00, 8500.00, 14, 2, 15, true, false, 1.8, '{"length": "32cm", "width": "16cm", "height": "15cm"}', '["/images/products/leica-na532-1.jpg"]'),
('Leica CS20 Field Controller', 'Controller ruggedized dengan Windows CE untuk aplikasi surveying', 'leica-cs20-field-controller', 'LCA-CS20-001', 25000.00, NULL, 6, 2, 8, true, false, 0.6, '{"length": "18.5cm", "width": "9.8cm", "height": "4.2cm"}', '["/images/products/leica-cs20-1.jpg"]'),

-- Topcon Products
('Topcon HiPer VR GNSS', 'GNSS receiver dengan teknologi visual tracking dan RTK performance', 'topcon-hiper-vr-gnss', 'TPC-HIPERVR-001', 158000.00, 165000.00, 9, 3, 7, true, true, 2.5, '{"length": "18.8cm", "width": "18.8cm", "height": "10.8cm"}', '["/images/products/topcon-hiper-vr-1.jpg"]'),
('Topcon GT-1200 Total Station', 'Total station robotic dengan laser pointer dan reflectorless EDM hingga 1000m', 'topcon-gt-1200-total-station', 'TPC-GT1200-001', 168000.00, 175000.00, 13, 3, 5, true, false, 4.9, '{"length": "34cm", "width": "24cm", "height": "17cm"}', '["/images/products/topcon-gt1200-1.jpg"]'),
('Topcon DL-502 Digital Level', 'Digital level dengan barcode staff dan akurasi 0.6mm per km', 'topcon-dl-502-digital-level', 'TPC-DL502-001', 17800.00, 18500.00, 15, 3, 10, true, false, 2.2, '{"length": "35cm", "width": "17cm", "height": "16cm"}', '["/images/products/topcon-dl502-1.jpg"]'),

-- Sokkia Products
('Sokkia GRX3 GNSS Receiver', 'Multi-constellation GNSS receiver dengan teknologi iSurvey untuk RTK surveying', 'sokkia-grx3-gnss-receiver', 'SKA-GRX3-001', 138000.00, 145000.00, 9, 4, 9, true, true, 2.3, '{"length": "17.5cm", "width": "17.5cm", "height": "10.2cm"}', '["/images/products/sokkia-grx3-1.jpg"]'),
('Sokkia iX-1200 Robotic Total Station', 'Total station robotic dengan X-technology untuk tracking dan pengukuran otomatis', 'sokkia-ix-1200-robotic-total-station', 'SKA-IX1200-001', 235000.00, 245000.00, 13, 4, 4, true, true, 5.1, '{"length": "36cm", "width": "25cm", "height": "18cm"}', '["/images/products/sokkia-ix1200-1.jpg"]'),
('Sokkia B40 Auto Level', 'Automatic level dengan kompensator magnet dan akurasi 1.5mm per km', 'sokkia-b40-auto-level', 'SKA-B40-001', 6200.00, 6500.00, 14, 4, 18, true, false, 1.6, '{"length": "30cm", "width": "15cm", "height": "14cm"}', '["/images/products/sokkia-b40-1.jpg"]'),

-- Garmin Products
('Garmin GPSMAP 66i', 'Handheld GPS dengan satelit komunikasi inReach dan peta TopoActive', 'garmin-gpsmap-66i', 'GRM-66I-001', 8200.00, 8500.00, 8, 5, 25, true, false, 0.23, '{"length": "6.1cm", "width": "16.4cm", "height": "3.6cm"}', '["/images/products/garmin-66i-1.jpg"]'),
('Garmin eTrex 32x', 'Handheld GPS ruggedized dengan kompas 3-axis dan altimeter barometrik', 'garmin-etrex-32x', 'GRM-ETX32X-001', 3500.00, NULL, 8, 5, 35, true, false, 0.14, '{"length": "5.4cm", "width": "10.3cm", "height": "3.3cm"}', '["/images/products/garmin-etrex32x-1.jpg"]'),
('Garmin Montana 750i', 'GPS handheld premium dengan layar 5 inci dan komunikasi satelit inReach', 'garmin-montana-750i', 'GRM-MT750I-001', 11800.00, 12500.00, 8, 5, 15, true, true, 0.37, '{"length": "7.2cm", "width": "14.4cm", "height": "3.6cm"}', '["/images/products/garmin-montana750i-1.jpg"]'),

-- Spectra Precision Products
('Spectra SP90m GNSS Receiver', 'GNSS receiver dengan teknologi Z-Blade dan komunikasi UHF terintegrasi', 'spectra-sp90m-gnss-receiver', 'SPC-SP90M-001', 118000.00, 125000.00, 9, 6, 8, true, false, 2.1, '{"length": "17.2cm", "width": "17.2cm", "height": "9.8cm"}', '["/images/products/spectra-sp90m-1.jpg"]'),
('Spectra Focus 35 Total Station', 'Total station robotic dengan teknologi FineLock dan EDM reflectorless', 'spectra-focus-35-total-station', 'SPC-F35-001', 185000.00, 195000.00, 13, 6, 3, true, true, 5.3, '{"length": "37cm", "width": "26cm", "height": "19cm"}', '["/images/products/spectra-focus35-1.jpg"]'),

-- Stonex Products  
('Stonex S900A GNSS RTK', 'GNSS RTK receiver dengan IMU tilt compensation dan komunikasi 4G', 'stonex-s900a-gnss-rtk', 'STX-S900A-001', 89000.00, 95000.00, 9, 7, 12, true, false, 2.0, '{"length": "16.8cm", "width": "16.8cm", "height": "9.5cm"}', '["/images/products/stonex-s900a-1.jpg"]'),
('Stonex R1 Plus Total Station', 'Total station entry level dengan Windows CE dan unlimited reflectorless range', 'stonex-r1-plus-total-station', 'STX-R1PLUS-001', 42000.00, 45000.00, 12, 7, 8, true, false, 4.2, '{"length": "32cm", "width": "22cm", "height": "16cm"}', '["/images/products/stonex-r1plus-1.jpg"]'),

-- Hi-Target Products
('Hi-Target V200 GNSS RTK', 'GNSS RTK receiver ekonomis dengan performa tinggi untuk surveying profesional', 'hi-target-v200-gnss-rtk', 'HIT-V200-001', 58000.00, 65000.00, 9, 8, 15, true, false, 1.8, '{"length": "16.2cm", "width": "16.2cm", "height": "8.8cm"}', '["/images/products/hitarget-v200-1.jpg"]'),
('Hi-Target ZTS-360R Total Station', 'Total station robotic dengan teknologi China dan harga kompetitif', 'hi-target-zts-360r-total-station', 'HIT-ZTS360R-001', 78000.00, 85000.00, 13, 8, 6, true, false, 4.5, '{"length": "33cm", "width": "23cm", "height": "17cm"}', '["/images/products/hitarget-zts360r-1.jpg"]'),

-- South Products
('South Galaxy G1 Plus GNSS', 'GNSS receiver dengan teknologi RTK dan komunikasi radio internal', 'south-galaxy-g1-plus-gnss', 'STH-G1PLUS-001', 68000.00, 75000.00, 9, 9, 10, true, false, 1.9, '{"length": "16.5cm", "width": "16.5cm", "height": "9.2cm"}', '["/images/products/south-g1plus-1.jpg"]'),
('South NTS-350R Total Station', 'Total station robotic entry level dengan performa handal', 'south-nts-350r-total-station', 'STH-NTS350R-001', 88000.00, 95000.00, 13, 9, 5, true, false, 4.6, '{"length": "34cm", "width": "24cm", "height": "17cm"}', '["/images/products/south-nts350r-1.jpg"]'),

-- CHC Navigation Products
('CHC X91+ GNSS RTK', 'GNSS RTK receiver dengan teknologi terbaru dan akurasi centimeter', 'chc-x91-plus-gnss-rtk', 'CHC-X91PLUS-001', 78000.00, 85000.00, 9, 10, 8, true, false, 2.0, '{"length": "16.8cm", "width": "16.8cm", "height": "9.0cm"}', '["/images/products/chc-x91plus-1.jpg"]'),

-- Aksesoris dan Software
('Tripod Carbon Fiber Heavy Duty', 'Tripod carbon fiber untuk total station dan GNSS dengan kualitas premium', 'tripod-carbon-fiber-heavy-duty', 'ACC-TPCF-001', 3200.00, 3500.00, 7, NULL, 25, true, false, 2.2, '{"length": "165cm"}', '["/images/products/tripod-carbon-1.jpg"]'),
('Prism Set dengan Target', 'Set prisma survey lengkap dengan target dan tilting adaptor', 'prism-set-dengan-target', 'ACC-PRISM-001', 2500.00, NULL, 7, NULL, 30, true, false, 1.5, '{"length": "20cm", "width": "15cm", "height": "10cm"}', '["/images/products/prism-set-1.jpg"]'),
('Survey Staff Fiberglass 5m', 'Rambu ukur fiberglass 5 meter dengan gradasi E-type', 'survey-staff-fiberglass-5m', 'ACC-STAFF5M-001', 1200.00, NULL, 7, NULL, 40, true, false, 2.8, '{"length": "500cm"}', '["/images/products/survey-staff-1.jpg"]'),
('Total Station Battery Pack', 'Battery pack lithium ion untuk total station berbagai merk', 'total-station-battery-pack', 'ACC-BATTERY-001', 780.00, 850.00, 7, NULL, 50, true, false, 0.3, '{"length": "12cm", "width": "8cm", "height": "5cm"}', '["/images/products/battery-pack-1.jpg"]'),
('GNSS Antenna Cable 5m', 'Kabel antena GNSS berkualitas tinggi dengan connector TNC', 'gnss-antenna-cable-5m', 'ACC-CABLE5M-001', 450.00, NULL, 7, NULL, 45, true, false, 0.8, '{"length": "500cm"}', '["/images/products/antenna-cable-1.jpg"]'),

-- Software Products
('Trimble Business Center', 'Software surveying dan engineering terlengkap untuk office processing', 'trimble-business-center', 'SW-TBC-001', 23000.00, 25000.00, 6, 1, 5, true, true, 0.1, '{"format": "Digital Download"}', '["/images/products/tbc-software-1.jpg"]'),
('Leica Infinity Software', 'Software office untuk processing data surveying dan koordinat transformation', 'leica-infinity-software', 'SW-INFINITY-001', 16500.00, 18000.00, 6, 2, 8, true, false, 0.1, '{"format": "Digital Download"}', '["/images/products/infinity-software-1.jpg"]'),
('TopSURV Software', 'Software field untuk controller Topcon dengan fitur lengkap surveying', 'topsurv-software', 'SW-TOPSURV-001', 12000.00, NULL, 6, 3, 10, true, false, 0.1, '{"format": "Digital Download"}', '["/images/products/topsurv-software-1.jpg"]'),

-- Drone Survey Products
('DJI Phantom 4 RTK', 'Drone surveying dengan GPS RTK untuk pemetaan presisi centimeter', 'dji-phantom-4-rtk', 'DRN-P4RTK-001', 78000.00, 85000.00, 5, NULL, 4, true, true, 1.4, '{"length": "35cm", "width": "35cm", "height": "20cm"}', '["/images/products/dji-p4rtk-1.jpg", "/images/products/dji-p4rtk-2.jpg"]'),
('DJI Matrice 300 RTK', 'Drone enterprise untuk surveying dan mapping dengan payload multiple', 'dji-matrice-300-rtk', 'DRN-M300RTK-001', 175000.00, 185000.00, 5, NULL, 2, true, true, 3.6, '{"length": "81cm", "width": "67cm", "height": "43cm"}', '["/images/products/dji-m300rtk-1.jpg"]');

-- Insert Product Reviews
INSERT INTO product_reviews (product_id, user_id, rating, title, comment) VALUES
(1, 3, 5, 'Luar biasa akurat!', 'Trimble R12i sangat akurat untuk pekerjaan RTK. IMU terintegrasi memudahkan pengukuran di medan sulit. Sangat direkomendasikan untuk surveyor profesional.'),
(1, 7, 5, 'Investasi terbaik untuk perusahaan', 'Setelah menggunakan 6 bulan, R12i terbukti menghemat waktu dan meningkatkan akurasi pekerjaan survey kami. ROI sangat baik.'),
(2, 4, 4, 'Reliable dan user-friendly', 'R10 Model 2 mudah dioperasikan dan sangat stabil. Cocok untuk berbagai jenis pekerjaan survey.'),
(5, 8, 5, 'Tilt compensation game changer', 'GS18 T dengan tilt compensation mengubah cara kerja kami. Tidak perlu lagi leveling yang rumit.'),
(6, 11, 4, 'TS16 sangat canggih', 'Image assisted surveying membantu identifikasi target dengan mudah. Harga memang premium tapi sebanding dengan fiturnya.'),
(9, 5, 4, 'HiPer VR value for money', 'Untuk harga segmentnya, HiPer VR memberikan performa yang sangat baik. Visual tracking bekerja dengan sempurna.'),
(12, 6, 5, 'Sokkia GRX3 handal', 'Sudah 2 tahun menggunakan GRX3, tidak pernah mengecewakan. Koneksi RTK selalu stabil.'),
(15, 12, 4, 'Garmin 66i untuk eksplorasi', 'Fitur inReach sangat membantu saat survey di area remote. Battery life juga excellent.'),
(19, 9, 5, 'Spectra Focus 35 precision tinggi', 'Akurasi pengukuran sangat tinggi. Ideal untuk pekerjaan engineering survey yang membutuhkan presisi.'),
(23, 15, 4, 'Hi-Target value terbaik', 'Untuk budget terbatas, Hi-Target V200 memberikan hasil yang memuaskan. Cocok untuk kontraktor kecil.'),
(28, 13, 5, 'Tripod carbon sangat ringan', 'Tripod carbon fiber ini mengubah pengalaman survey. Sangat ringan tapi tetap stabil dan kuat.'),
(33, 10, 4, 'TBC software powerful', 'Trimble Business Center memiliki fitur sangat lengkap untuk office processing. Learning curve agak steep tapi worth it.'),
(36, 16, 5, 'DJI P4 RTK amazing', 'Drone ini menghasilkan peta dengan akurasi luar biasa. Sangat membantu untuk pekerjaan volume calculation.');

-- Insert Addresses for customers
INSERT INTO addresses (user_id, type, first_name, last_name, company, address_line_1, address_line_2, city, state, postal_code, country, phone, is_default) VALUES
(3, 'billing', 'Ahmad', 'Wijaya', 'PT. Surveyor Indonesia', 'Jl. Gatot Subroto No. 58', 'Gedung Surveyor Indonesia Lt. 5', 'Jakarta Selatan', 'DKI Jakarta', '12950', 'Indonesia', '081234567890', true),
(4, 'billing', 'Siti', 'Rahayu', 'PT. Jaya Karya Persero', 'Jl. MT Haryono Kav. 13', 'Tower Jaya Karya Lt. 8', 'Jakarta Timur', 'DKI Jakarta', '13630', 'Indonesia', '081234567891', true),
(5, 'billing', 'Dedi', 'Kurniawan', 'CV. Geo Mapping Indonesia', 'Jl. Raya Bogor KM 26', 'Ruko Cibubur Square No. 15', 'Depok', 'Jawa Barat', '16454', 'Indonesia', '081234567892', true),
(6, 'billing', 'Indira', 'Sari', 'Universitas Gadjah Mada', 'Jl. Bulaksumur', 'Fakultas Geografi', 'Yogyakarta', 'DI Yogyakarta', '55281', 'Indonesia', '081234567893', true),
(7, 'billing', 'Bambang', 'Purnomo', 'PT. Waskita Karya', 'Jl. MT Haryono Kav. 10', 'Gedung Waskita Lt. 12', 'Jakarta Timur', 'DKI Jakarta', '13340', 'Indonesia', '081234567894', true),
(8, 'billing', 'Maya', 'Lestari', 'CV. Topografi Nusantara', 'Jl. Ahmad Yani No. 105', 'Ruko Yani Plaza Blok B15', 'Bandung', 'Jawa Barat', '40243', 'Indonesia', '081234567895', true),
(9, 'billing', 'Rio', 'Firmansyah', 'PT. Adhi Karya', 'Jl. Jend. Gatot Subroto Kav. 74', 'Gedung Adhi Graha Lt. 9', 'Jakarta Selatan', 'DKI Jakarta', '12870', 'Indonesia', '081234567896', true),
(11, 'billing', 'Agus', 'Setiawan', 'PT. Hutama Karya', 'Jl. Letjen TB Simatupang No. 1', 'Gedung Hutama Karya Lt. 7', 'Jakarta Selatan', 'DKI Jakarta', '12560', 'Indonesia', '081234567898', true),
(13, 'billing', 'Hendi', 'Pratama', 'CV. Kontraktor Sejahtera', 'Jl. Soekarno Hatta No. 280', 'Komplek Ruko Bandung Trade Center', 'Bandung', 'Jawa Barat', '40286', 'Indonesia', '081234567800', true),
(15, 'billing', 'Fadli', 'Rahman', 'PT. Pertamina', 'Jl. Medan Merdeka Timur No. 1A', 'Gedung Pertamina Lt. 15', 'Jakarta Pusat', 'DKI Jakarta', '10110', 'Indonesia', '081234567802', true);

-- Insert Orders with realistic Indonesian scenarios
INSERT INTO orders (user_id, order_number, status, subtotal, tax_amount, shipping_amount, total_amount, payment_status, currency, notes, created_at) VALUES
(3, 'ORD-2024-0001', 'completed', 175000.00, 17500.00, 500.00, 193000.00, 'paid', 'IDR', 'Pengadaan GNSS untuk proyek pemetaan topografi Jalan Tol Jakarta-Surabaya', '2024-01-15 08:30:00'),
(4, 'ORD-2024-0002', 'completed', 270000.00, 27000.00, 0.00, 297000.00, 'paid', 'IDR', 'Total Station untuk proyek konstruksi gedung perkantoran di Kuningan', '2024-01-20 10:15:00'),
(7, 'ORD-2024-0003', 'completed', 185000.00, 18500.00, 300.00, 203800.00, 'paid', 'IDR', 'Upgrade equipment untuk proyek infrastruktur jalan raya', '2024-02-05 14:20:00'),
(11, 'ORD-2024-0004', 'completed', 158000.00, 15800.00, 400.00, 174200.00, 'paid', 'IDR', 'GNSS RTK untuk proyek pembangunan jembatan layang', '2024-02-18 09:45:00'),
(5, 'ORD-2024-0005', 'completed', 42000.00, 4200.00, 250.00, 46450.00, 'paid', 'IDR', 'Total Station entry level untuk ekspansi bisnis survey', '2024-03-02 11:30:00'),
(15, 'ORD-2024-0006', 'completed', 235000.00, 23500.00, 0.00, 258500.00, 'paid', 'IDR', 'Peralatan survey untuk eksplorasi migas wilayah Kalimantan', '2024-03-15 13:10:00'),
(6, 'ORD-2024-0007', 'completed', 35000.00, 3500.00, 200.00, 38700.00, 'paid', 'IDR', 'Pembelian untuk laboratorium geodesi dan survey', '2024-04-01 15:45:00'),
(9, 'ORD-2024-0008', 'delivered', 185000.00, 18500.00, 350.00, 203850.00, 'paid', 'IDR', 'Equipment untuk proyek pembangunan bandara baru', '2024-04-20 08:00:00'),
(8, 'ORD-2024-0009', 'shipped', 68000.00, 6800.00, 300.00, 75100.00, 'paid', 'IDR', 'GNSS untuk pemetaan perkebunan kelapa sawit', '2024-05-05 16:20:00'),
(13, 'ORD-2024-0010', 'processing', 88000.00, 8800.00, 275.00, 97075.00, 'paid', 'IDR', 'Total Station untuk proyek perumahan cluster premium', '2024-05-18 12:30:00'),
(12, 'ORD-2024-0011', 'completed', 25800.00, 2580.00, 150.00, 28530.00, 'paid', 'IDR', 'Aksesoris dan spare parts untuk maintenance equipment', '2024-06-02 10:15:00'),
(10, 'ORD-2024-0012', 'pending', 78000.00, 7800.00, 320.00, 86120.00, 'pending', 'IDR', 'GNSS untuk survey batas wilayah administrasi', '2024-06-15 14:45:00'),
(14, 'ORD-2024-0013', 'completed', 16500.00, 1650.00, 100.00, 18250.00, 'paid', 'IDR', 'Software lisensi untuk penelitian mahasiswa teknik geodesi', '2024-07-01 09:20:00'),
(16, 'ORD-2024-0014', 'completed', 11800.00, 1180.00, 75.00, 13055.00, 'paid', 'IDR', 'Handheld GPS untuk survey toponimi daerah terpencil', '2024-07-10 11:40:00'),
(17, 'ORD-2024-0015', 'shipped', 175000.00, 17500.00, 450.00, 192950.00, 'paid', 'IDR', 'Drone RTK untuk pemetaan area pertambangan batubara', '2024-07-20 13:55:00');

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, price, total) VALUES
-- Order 1 (Ahmad Wijaya - Trimble R12i)
(1, 1, 1, 175000.00, 175000.00),

-- Order 2 (Siti Rahayu - Leica TS16)  
(2, 6, 1, 270000.00, 270000.00),

-- Order 3 (Bambang Purnomo - Leica GS18 T)
(3, 5, 1, 185000.00, 185000.00),

-- Order 4 (Agus Setiawan - Topcon HiPer VR)
(4, 9, 1, 158000.00, 158000.00),

-- Order 5 (Dedi Kurniawan - Stonex R1 Plus)
(5, 22, 1, 42000.00, 42000.00),

-- Order 6 (Fadli Rahman - Sokkia iX-1200)
(6, 13, 1, 235000.00, 235000.00),

-- Order 7 (Indira Sari - Software + Accessories)
(7, 33, 1, 23000.00, 23000.00),
(7, 30, 2, 6000.00, 12000.00),

-- Order 8 (Rio Firmansyah - Spectra Focus 35)
(8, 19, 1, 185000.00, 185000.00),

-- Order 9 (Maya Lestari - South Galaxy G1 Plus)
(9, 25, 1, 68000.00, 68000.00),

-- Order 10 (Hendi Pratama - South NTS-350R)
(10, 26, 1, 88000.00, 88000.00),

-- Order 11 (Lina Fitriani - Accessories Mix)
(11, 28, 2, 3200.00, 6400.00),
(11, 29, 3, 2500.00, 7500.00),
(11, 30, 5, 1200.00, 6000.00),
(11, 31, 7, 780.00, 5460.00),
(11, 32, 1, 450.00, 450.00),

-- Order 12 (Dewi Kartika - CHC X91+)
(12, 27, 1, 78000.00, 78000.00),

-- Order 13 (Nuri Handayani - Leica Infinity)
(13, 34, 1, 16500.00, 16500.00),

-- Order 14 (Rini Susanti - Garmin Montana 750i)
(14, 17, 1, 11800.00, 11800.00),

-- Order 15 (Eko Prasetyo - DJI Matrice 300 RTK)
(15, 37, 1, 175000.00, 175000.00);

-- Insert Order Addresses
INSERT INTO order_addresses (order_id, type, first_name, last_name, company, address_line_1, address_line_2, city, state, postal_code, country, phone) VALUES
(1, 'billing', 'Ahmad', 'Wijaya', 'PT. Surveyor Indonesia', 'Jl. Gatot Subroto No. 58', 'Gedung Surveyor Indonesia Lt. 5', 'Jakarta Selatan', 'DKI Jakarta', '12950', 'Indonesia', '081234567890'),
(1, 'shipping', 'Ahmad', 'Wijaya', 'PT. Surveyor Indonesia', 'Jl. Gatot Subroto No. 58', 'Gudang Peralatan Survey', 'Jakarta Selatan', 'DKI Jakarta', '12950', 'Indonesia', '081234567890'),
(2, 'billing', 'Siti', 'Rahayu', 'PT. Jaya Karya Persero', 'Jl. MT Haryono Kav. 13', 'Tower Jaya Karya Lt. 8', 'Jakarta Timur', 'DKI Jakarta', '13630', 'Indonesia', '081234567891'),
(3, 'billing', 'Bambang', 'Purnomo', 'PT. Waskita Karya', 'Jl. MT Haryono Kav. 10', 'Gedung Waskita Lt. 12', 'Jakarta Timur', 'DKI Jakarta', '13340', 'Indonesia', '081234567894'),
(4, 'billing', 'Agus', 'Setiawan', 'PT. Hutama Karya', 'Jl. Letjen TB Simatupang No. 1', 'Gedung Hutama Karya Lt. 7', 'Jakarta Selatan', 'DKI Jakarta', '12560', 'Indonesia', '081234567898'),
(5, 'billing', 'Dedi', 'Kurniawan', 'CV. Geo Mapping Indonesia', 'Jl. Raya Bogor KM 26', 'Ruko Cibubur Square No. 15', 'Depok', 'Jawa Barat', '16454', 'Indonesia', '081234567892'),
(6, 'billing', 'Fadli', 'Rahman', 'PT. Pertamina', 'Jl. Medan Merdeka Timur No. 1A', 'Gedung Pertamina Lt. 15', 'Jakarta Pusat', 'DKI Jakarta', '10110', 'Indonesia', '081234567802'),
(7, 'billing', 'Indira', 'Sari', 'Universitas Gadjah Mada', 'Jl. Bulaksumur', 'Fakultas Geografi', 'Yogyakarta', 'DI Yogyakarta', '55281', 'Indonesia', '081234567893'),
(8, 'billing', 'Rio', 'Firmansyah', 'PT. Adhi Karya', 'Jl. Jend. Gatot Subroto Kav. 74', 'Gedung Adhi Graha Lt. 9', 'Jakarta Selatan', 'DKI Jakarta', '12870', 'Indonesia', '081234567896'),
(9, 'billing', 'Maya', 'Lestari', 'CV. Topografi Nusantara', 'Jl. Ahmad Yani No. 105', 'Ruko Yani Plaza Blok B15', 'Bandung', 'Jawa Barat', '40243', 'Indonesia', '081234567895');

-- Insert Blog Posts
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author_id, status, published_at) VALUES
('Panduan Memilih GPS RTK Terbaik untuk Survey Profesional', 'panduan-memilih-gps-rtk-terbaik-survey-profesional', 
'GPS RTK (Real Time Kinematic) adalah teknologi yang sangat penting dalam dunia surveying modern. Dengan akurasi centimeter, GPS RTK memungkinkan surveyor melakukan pengukuran dengan presisi tinggi yang diperlukan dalam berbagai proyek konstruksi dan pemetaan...', 
'Tips komprehensif memilih GPS RTK yang tepat untuk kebutuhan survey profesional, mulai dari budget hingga fitur yang dibutuhkan.',
'/images/blog/gps-rtk-guide.jpg', 2, 'published', '2024-06-01 10:00:00'),

('Teknologi Terbaru dalam Total Station Robotic', 'teknologi-terbaru-total-station-robotic',
'Perkembangan teknologi total station robotic telah mengubah cara kerja surveyor di lapangan. Dengan kemampuan tracking otomatis dan kontrol jarak jauh, total station robotic meningkatkan efisiensi dan akurasi pekerjaan survey secara signifikan...',
'Mengenal fitur-fitur terbaru dalam total station robotic dan bagaimana teknologi ini dapat meningkatkan produktivitas survey.',
'/images/blog/total-station-robotic.jpg', 2, 'published', '2024-06-15 14:30:00'),

('Drone untuk Pemetaan: Revolusi dalam Survey Topografi', 'drone-untuk-pemetaan-revolusi-survey-topografi',
'Penggunaan drone dalam pemetaan telah merevolusi industri survey topografi. Dengan kemampuan mengakses area yang sulit dijangkau dan menghasilkan data dengan cepat, drone survey menjadi pilihan utama untuk berbagai jenis proyek...',
'Bagaimana drone mengubah cara kita melakukan survey topografi dan keuntungan yang ditawarkan teknologi ini.',
'/images/blog/drone-survey.jpg', 1, 'published', '2024-07-01 09:15:00'),

('Tips Maintenance Alat Survey untuk Performa Optimal', 'tips-maintenance-alat-survey-performa-optimal',
'Perawatan rutin alat survey sangat penting untuk menjaga akurasi dan memperpanjang umur equipment. Berikut adalah panduan lengkap maintenance yang harus dilakukan untuk berbagai jenis alat survey...',
'Panduan praktis merawat alat survey agar tetap akurat dan awet, menghemat biaya operasional jangka panjang.',
'/images/blog/maintenance-survey.jpg', 2, 'published', '2024-07-15 11:45:00'),

('Mengintegrasikan GIS dengan Data Survey untuk Analisis Spatial', 'mengintegrasikan-gis-data-survey-analisis-spatial',
'Integrasi antara teknologi GIS (Geographic Information System) dengan data survey membuka peluang analisis spatial yang lebih mendalam. Artikel ini membahas cara mengoptimalkan workflow dari data collection hingga spatial analysis...',
'Memahami integrasi GIS dan survey data untuk menghasilkan analisis spatial yang komprehensif dan actionable insights.',
'/images/blog/gis-integration.jpg', 1, 'published', '2024-07-20 16:20:00');

-- Insert System Settings
INSERT INTO system_settings (key, value, description) VALUES
('store_name', 'CV. Aprinia Geosat Solusindo', 'Nama lengkap toko'),
('store_description', 'Spesialis Peralatan GPS, Survey, dan Pemetaan Profesional', 'Deskripsi toko'),
('store_address', 'Jl. Raya Bogor KM 21, Cibinong, Bogor 16911', 'Alamat toko fisik'),
('store_phone', '021-8765-4321', 'Nomor telepon toko'),
('store_email', 'info@apriniageosat.co.id', 'Email kontak toko'),
('store_website', 'https://apriniageosat.co.id', 'Website toko'),
('currency', 'IDR', 'Mata uang yang digunakan'),
('tax_rate', '10', 'Persentase pajak (%)'),
('shipping_zones', 'Jakarta,Bogor,Depok,Tangerang,Bekasi', 'Zona pengiriman available'),
('min_order_free_shipping', '50000', 'Minimum order untuk gratis ongkir (IDR)'),
('business_hours', 'Senin-Jumat: 08:00-17:00, Sabtu: 08:00-14:00', 'Jam operasional'),
('social_facebook', 'https://facebook.com/apriniageosat', 'Link Facebook'),
('social_instagram', 'https://instagram.com/apriniageosat', 'Link Instagram'),
('social_youtube', 'https://youtube.com/apriniageosat', 'Link YouTube'),
('bank_bca', '1234567890 - CV. Aprinia Geosat Solusindo', 'Rekening Bank BCA'),
('bank_mandiri', '0987654321 - CV. Aprinia Geosat Solusindo', 'Rekening Bank Mandiri'),
('bank_bni', '5555666677 - CV. Aprinia Geosat Solusindo', 'Rekening Bank BNI');
