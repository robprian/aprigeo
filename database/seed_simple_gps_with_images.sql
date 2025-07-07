-- Simple GPS Store Database Seed with Images
-- Realistic pricing for Indonesian market

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

-- Insert Brands
INSERT INTO brands (name, slug, description, logo_url, is_active) VALUES
('Garmin', 'garmin', 'Leading GPS technology and navigation solutions', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Garmin', true),
('Trimble', 'trimble', 'Professional surveying and GPS equipment', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Trimble', true),
('Leica Geosystems', 'leica-geosystems', 'Premium surveying and measurement solutions', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Leica+Geosystems', true),
('Topcon', 'topcon', 'Innovative positioning and surveying solutions', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Topcon', true),
('Sokkia', 'sokkia', 'Precision measurement and surveying instruments', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Sokkia', true),
('Magellan', 'magellan', 'Consumer and professional GPS devices', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Magellan', true),
('DJI', 'dji', 'Leading drone and UAV manufacturer', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=DJI', true),
('Spectra Precision', 'spectra-precision', 'Construction and surveying equipment', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Spectra+Precision', true),
('South', 'south', 'Professional surveying instruments', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=South', true),
('HI-TARGET', 'hi-target', 'Surveying and mapping equipment', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=HI-TARGET', true);

-- Insert Categories
INSERT INTO categories (name, slug, description, image_url, parent_id, is_active, sort_order) VALUES
('GPS Handheld', 'gps-handheld', 'GPS genggam untuk outdoor, hiking, dan navigasi personal', 'https://source.unsplash.com/80x80/?gps,handheld', NULL, true, 1),
('GPS Surveying', 'gps-surveying', 'Alat GPS profesional untuk survei dan pemetaan', 'https://source.unsplash.com/80x80/?gps,surveying', NULL, true, 2),
('Total Station', 'total-station', 'Total station untuk survei konstruksi dan pemetaan', 'https://source.unsplash.com/80x80/?total,station', NULL, true, 3),
('Theodolite', 'theodolite', 'Theodolite untuk pengukuran sudut dan elevasi', 'https://source.unsplash.com/80x80/?theodolite', NULL, true, 4),
('Level Optik', 'level-optik', 'Waterpass dan level optik untuk konstruksi', 'https://source.unsplash.com/80x80/?level,construction', NULL, true, 5),
('Laser Level', 'laser-level', 'Laser level untuk konstruksi dan finishing', 'https://source.unsplash.com/80x80/?laser,level', NULL, true, 6),
('Drone Survey', 'drone-survey', 'Drone untuk survei dan pemetaan udara', 'https://source.unsplash.com/80x80/?drone,survey', NULL, true, 7),
('Tripod', 'tripod', 'Tripod untuk alat survei dan GPS', 'https://source.unsplash.com/80x80/?tripod', NULL, true, 8),
('Aksesoris GPS', 'aksesoris-gps', 'Aksesoris dan spare part GPS', 'https://source.unsplash.com/80x80/?gps,accessories', NULL, true, 9),
('Software Survei', 'software-survei', 'Software untuk survei dan pemetaan', 'https://source.unsplash.com/80x80/?software,survey', NULL, true, 10);

-- Insert Products with realistic pricing (in IDR)
INSERT INTO products (
    name, slug, description, short_description, sku, price, compare_price, cost_price,
    category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight,
    dimensions, images, tags, meta_title, meta_description
) VALUES
-- GPS Handheld Products
('Garmin GPSMAP 66i', 'garmin-gpsmap-66i', 
'GPS handheld Garmin GPSMAP 66i dengan fitur satelit komunikasi 2-arah, navigasi presisi, dan pemetaan topografi. Dilengkapi dengan InReach satellite technology untuk komunikasi darurat di area terpencil. Tahan air IPX7 dengan layar 3 inci yang mudah dibaca di bawah sinar matahari. Memiliki baterai hingga 35 jam dalam mode GPS dan 200 jam dalam mode ekspedisi. Cocok untuk hiking, mountaineering, dan eksplorasi outdoor.', 
'GPS handheld dengan satelit komunikasi 2-arah dan pemetaan topografi', 
'GAR-GPSMAP-66I', 8999000.00, 9999000.00, 7500000.00, 
1, 1, true, true, true, 25, 0.23, 
'{"panjang": "6.2 cm", "lebar": "16.2 cm", "tinggi": "3.6 cm"}', 
'["https://source.unsplash.com/400x300/?garmin,gps,outdoor", "https://source.unsplash.com/400x300/?gps,handheld", "https://source.unsplash.com/400x300/?garmin,gpsmap"]', 
'["GPS handheld", "InReach", "satelit komunikasi", "hiking", "outdoor", "IPX7", "topografi"]', 
'Garmin GPSMAP 66i - GPS Handheld dengan Satelit Komunikasi | Jual GPS Garmin Terbaik', 
'Beli Garmin GPSMAP 66i GPS handheld dengan satelit komunikasi 2-arah. Fitur InReach, pemetaan topografi, tahan air IPX7. Garansi resmi, harga terbaik di Indonesia.'),

('Garmin eTrex 32x', 'garmin-etrex-32x', 
'GPS handheld Garmin eTrex 32x dengan peta TopoActive preloaded dan slot microSD untuk peta tambahan. Memiliki layar TFT 2.2 inci dengan resolusi 240x320 piksel. Dilengkapi dengan kompas 3-axis dan barometer. Tahan air IPX7 dengan baterai AA yang dapat bertahan hingga 25 jam. Cocok untuk hiking, geocaching, dan aktivitas outdoor. Mendukung GLONASS dan GPS untuk akurasi posisi yang lebih baik.', 
'GPS handheld dengan peta TopoActive dan kompas 3-axis', 
'GAR-ETREX-32X', 3299000.00, 3599000.00, 2800000.00, 
1, 1, true, true, true, 45, 0.14, 
'{"panjang": "5.4 cm", "lebar": "10.3 cm", "tinggi": "3.3 cm"}', 
'["https://source.unsplash.com/400x300/?garmin,etrex", "https://source.unsplash.com/400x300/?gps,hiking"]', 
'["GPS handheld", "TopoActive", "kompas", "barometer", "hiking", "geocaching", "GLONASS"]', 
'Garmin eTrex 32x - GPS Handheld dengan Peta TopoActive | Harga Terbaik', 
'Jual Garmin eTrex 32x GPS handheld dengan peta TopoActive preloaded. Kompas 3-axis, barometer, tahan air IPX7. Cocok untuk hiking dan outdoor adventure.'),

('Garmin Oregon 750', 'garmin-oregon-750', 
'GPS handheld Garmin Oregon 750 dengan layar touchscreen 3" dan kamera 8MP. Dilengkapi dengan kompas 3-axis, barometer, dan altimeter. Mendukung GPS, GLONASS, dan Galileo. Tahan air IPX7 dengan baterai AA hingga 16 jam. Cocok untuk outdoor photography, geocaching, dan aktivitas adventure yang membutuhkan dokumentasi.', 
'GPS handheld dengan touchscreen dan kamera 8MP', 
'GAR-OREGON-750', 7999000.00, 8999000.00, 6500000.00, 
1, 1, true, true, true, 25, 0.21, 
'{"panjang": "6.1 cm", "lebar": "11.4 cm", "tinggi": "3.3 cm"}', 
'["https://source.unsplash.com/400x300/?garmin,oregon", "https://source.unsplash.com/400x300/?gps,camera"]', 
'["GPS handheld", "touchscreen", "kamera 8MP", "kompas", "barometer", "outdoor photography", "geocaching"]', 
'Garmin Oregon 750 - GPS Handheld dengan Touchscreen dan Kamera 8MP', 
'Beli Garmin Oregon 750 GPS handheld dengan layar touchscreen 3" dan kamera 8MP. Kompas, barometer, altimeter, cocok untuk outdoor photography.'),

('Magellan eXplorist 710', 'magellan-explorist-710', 
'GPS handheld Magellan eXplorist 710 dengan layar touchscreen 3 inci dan kamera 3.2 MP terintegrasi. Dilengkapi dengan peta Summit Series dan kemampuan geotagging foto. Tahan air IPX7 dengan baterai Li-ion rechargeable hingga 18 jam. Mendukung berbagai format peta dan waypoint. Cocok untuk surveying, mapping, dan dokumentasi lapangan.', 
'GPS handheld dengan touchscreen dan kamera terintegrasi', 
'MAG-EXPL-710', 5199000.00, 5599000.00, 4200000.00, 
1, 6, true, true, true, 20, 0.31, 
'{"panjang": "7.4 cm", "lebar": "15.2 cm", "tinggi": "3.8 cm"}', 
'["https://source.unsplash.com/400x300/?magellan,explorist", "https://source.unsplash.com/400x300/?gps,touchscreen"]', 
'["GPS handheld", "touchscreen", "kamera", "geotagging", "surveying", "mapping", "IPX7"]', 
'Magellan eXplorist 710 - GPS Handheld dengan Touchscreen dan Kamera', 
'Jual Magellan eXplorist 710 GPS handheld dengan layar touchscreen 3 inci dan kamera 3.2MP. Fitur geotagging, tahan air IPX7, cocok untuk surveying.'),

-- GPS Surveying Products
('Trimble R12i GNSS', 'trimble-r12i-gnss', 
'GNSS receiver Trimble R12i dengan teknologi Trimble Maxwell 7 GNSS chip dan integrated IMU. Mendukung semua konstelasi satelit (GPS, GLONASS, Galileo, BeiDou, QZSS). Akurasi horizontal hingga 3mm + 0.1ppm dan vertikal 3.5mm + 0.4ppm. Dilengkapi dengan teknologi Trimble SurePoint untuk akurasi yang konsisten. Cocok untuk survei kadaster, konstruksi, dan pemetaan presisi tinggi.', 
'GNSS receiver profesional dengan IMU terintegrasi dan akurasi tinggi', 
'TRI-R12I-GNSS', 189900000.00, 199900000.00, 165000000.00, 
2, 2, true, true, true, 8, 1.2, 
'{"diameter": "18.8 cm", "tinggi": "11.8 cm"}', 
'["https://source.unsplash.com/400x300/?trimble,gnss", "https://source.unsplash.com/400x300/?gps,surveying"]', 
'["GNSS receiver", "IMU", "akurasi tinggi", "survei kadaster", "konstruksi", "pemetaan", "Maxwell 7"]', 
'Trimble R12i GNSS - GNSS Receiver dengan IMU Terintegrasi | Harga Terbaik', 
'Beli Trimble R12i GNSS receiver dengan teknologi Maxwell 7 dan IMU terintegrasi. Akurasi 3mm, dukungan semua konstelasi satelit. Garansi resmi Indonesia.'),

('South Galaxy G1 GNSS', 'south-galaxy-g1-gnss', 
'GNSS receiver South Galaxy G1 dengan teknologi dual-constellation RTK dan akurasi tinggi. Mendukung GPS, GLONASS, BeiDou, dan Galileo. Akurasi horizontal 8mm + 1ppm dan vertikal 15mm + 1ppm. Dilengkapi dengan display OLED dan keypad untuk operasi standalone. Baterai internal hingga 8 jam operasi. Cocok untuk survei topografi, pemetaan, dan aplikasi GIS dengan budget terjangkau.', 
'GNSS receiver dengan teknologi dual-constellation RTK', 
'SOU-GALAXY-G1', 89900000.00, 99900000.00, 75000000.00, 
2, 9, true, true, true, 15, 0.95, 
'{"diameter": "17.8 cm", "tinggi": "10.5 cm"}', 
'["https://source.unsplash.com/400x300/?south,gnss", "https://source.unsplash.com/400x300/?gps,rtk"]', 
'["GNSS receiver", "dual-constellation", "RTK", "budget terjangkau", "survei topografi", "pemetaan", "GIS"]', 
'South Galaxy G1 GNSS - GNSS Receiver RTK dengan Harga Terjangkau', 
'Jual South Galaxy G1 GNSS receiver dengan teknologi dual-constellation RTK. Akurasi 8mm, mendukung 4 konstelasi satelit. Harga terjangkau, kualitas profesional.'),

-- Total Station Products
('Leica TS16 Total Station', 'leica-ts16-total-station', 
'Total station Leica TS16 dengan teknologi Automatic Target Recognition (ATR) dan akurasi angular 1". Dilengkapi dengan laser plummet dan kompensator dual-axis. Jangkauan EDM hingga 3500m dengan prisma dan 1000m tanpa prisma. Layar touchscreen 5" dengan antarmuka intuitif. Tahan debu dan air IP65. Cocok untuk survei konstruksi, monitoring, dan engineering survey.', 
'Total station dengan ATR dan akurasi angular 1 detik', 
'LEI-TS16-TS', 349900000.00, 369900000.00, 295000000.00, 
3, 3, true, true, true, 5, 5.8, 
'{"panjang": "35 cm", "lebar": "20 cm", "tinggi": "17 cm"}', 
'["https://source.unsplash.com/400x300/?leica,total,station", "https://source.unsplash.com/400x300/?surveying,equipment"]', 
'["total station", "ATR", "akurasi 1 detik", "touchscreen", "survei konstruksi", "monitoring", "engineering"]', 
'Leica TS16 Total Station - Total Station dengan ATR dan Akurasi 1" | Jual Leica', 
'Beli Leica TS16 Total Station dengan teknologi ATR dan akurasi angular 1". Layar touchscreen 5", jangkauan 3500m, IP65. Cocok untuk survei konstruksi profesional.'),

('Sokkia CX-107 Total Station', 'sokkia-cx-107-total-station', 
'Total station Sokkia CX-107 dengan akurasi angular 7" dan teknologi RED-tech EDM. Jangkauan pengukuran hingga 2500m dengan prisma dan 350m tanpa prisma. Dilengkapi dengan layar LCD grafis dan keypad numerik. Kompensator dual-axis untuk koreksi otomatis. Baterai Li-ion dengan daya tahan hingga 24 jam. Cocok untuk survei topografi, konstruksi, dan pemetaan dengan akurasi standar.', 
'Total station dengan akurasi 7" dan teknologi RED-tech EDM', 
'SOK-CX107-TS', 79900000.00, 89900000.00, 65000000.00, 
3, 5, true, false, true, 18, 4.8, 
'{"panjang": "33 cm", "lebar": "18 cm", "tinggi": "16 cm"}', 
'["https://source.unsplash.com/400x300/?sokkia,total,station", "https://source.unsplash.com/400x300/?surveying,construction"]', 
'["total station", "akurasi 7 detik", "RED-tech EDM", "survei topografi", "konstruksi", "pemetaan"]', 
'Sokkia CX-107 Total Station - Total Station dengan Akurasi 7" | Jual Sokkia', 
'Beli Sokkia CX-107 Total Station dengan akurasi angular 7" dan RED-tech EDM. Jangkauan 2500m, baterai 24 jam, cocok untuk survei topografi.'),

-- Drone Survey Products
('DJI Phantom 4 RTK', 'dji-phantom-4-rtk', 
'Drone survey DJI Phantom 4 RTK dengan sistem RTK terintegrasi dan akurasi centimeter-level. Dilengkapi dengan kamera 20MP dan gimbal 3-axis. Flight time hingga 30 menit dengan jangkauan 7km. Obstacle avoidance system yang canggih. Cocok untuk survey aerial, mapping, dan aplikasi photogrammetry yang membutuhkan akurasi tinggi.', 
'Drone survey dengan sistem RTK dan akurasi centimeter', 
'DJI-P4-RTK', 129900000.00, 139900000.00, 108000000.00, 
7, 7, true, true, true, 8, 1.4, 
'{"flight_time": "30 menit", "jangkauan": "7 km", "kamera": "20 MP"}', 
'["https://source.unsplash.com/400x300/?dji,phantom,drone", "https://source.unsplash.com/400x300/?drone,survey"]', 
'["drone survey", "RTK terintegrasi", "akurasi centimeter", "kamera 20MP", "mapping", "photogrammetry"]', 
'DJI Phantom 4 RTK - Drone Survey dengan Sistem RTK dan Akurasi Centimeter', 
'Beli DJI Phantom 4 RTK drone survey dengan sistem RTK terintegrasi dan akurasi centimeter-level. Kamera 20MP, flight time 30 menit, cocok untuk mapping.'),

('DJI Mavic 3 Enterprise', 'dji-mavic-3-enterprise', 
'Drone enterprise DJI Mavic 3 dengan kamera 4/3 CMOS 20MP dan sistem RTK terintegrasi. Dilengkapi dengan obstacle avoidance omnidirectional dan flight time hingga 45 menit. Cocok untuk inspeksi, survey, dan aplikasi commercial yang membutuhkan portabilitas tinggi.', 
'Drone enterprise dengan kamera 4/3 CMOS dan RTK', 
'DJI-MAVIC-3-ENT', 89900000.00, 99900000.00, 75000000.00, 
7, 7, true, true, true, 12, 0.9, 
'{"flight_time": "45 menit", "jangkauan": "15 km", "kamera": "20 MP 4/3 CMOS"}', 
'["https://source.unsplash.com/400x300/?dji,mavic,drone", "https://source.unsplash.com/400x300/?drone,enterprise"]', 
'["drone enterprise", "4/3 CMOS", "RTK", "obstacle avoidance", "inspeksi", "survey", "commercial"]', 
'DJI Mavic 3 Enterprise - Drone Enterprise dengan Kamera 4/3 CMOS dan RTK', 
'Beli DJI Mavic 3 Enterprise drone dengan kamera 4/3 CMOS 20MP dan sistem RTK. Flight time 45 menit, cocok untuk inspeksi dan survey commercial.');

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

(5, 'Akurasi', '3 mm + 0.1 ppm (horizontal)'),
(5, 'Satelit', 'GPS, GLONASS, Galileo, BeiDou, QZSS'),
(5, 'Teknologi', 'Maxwell 7 GNSS chip'),
(5, 'IMU', 'Integrated inertial measurement unit'),
(5, 'Konektivitas', 'Bluetooth, Wi-Fi, UHF radio'),
(5, 'Baterai', 'Li-ion, 4 jam (tracking mode)'),
(5, 'Sertifikasi', 'IP68 (tahan air dan debu)'),

(11, 'Flight Time', '30 menit'),
(11, 'Jangkauan', '7 km'),
(11, 'Kamera', '20 MP, 1" CMOS'),
(11, 'Gimbal', '3-axis mechanical'),
(11, 'RTK', 'Sistem RTK terintegrasi'),
(11, 'Akurasi', 'Centimeter-level'),
(11, 'Obstacle Avoidance', '5-direction detection');

-- Add product reviews
INSERT INTO product_reviews (product_id, user_id, rating, title, comment, is_verified, is_approved) VALUES
(1, 1, 5, 'GPS terbaik untuk hiking', 'Sangat puas dengan performa Garmin GPSMAP 66i. Fitur InReach sangat membantu saat hiking di area terpencil. Baterai tahan lama dan akurasi GPS sangat baik.', true, true),
(2, 1, 5, 'Value for money terbaik', 'Garmin eTrex 32x memberikan value yang sangat baik. Peta TopoActive sangat membantu untuk hiking. Baterai AA mudah diganti dan tahan lama.', true, true),
(5, 1, 5, 'GNSS receiver terbaik', 'Trimble R12i memberikan akurasi yang luar biasa. IMU terintegrasi sangat membantu dalam survei. Investasi yang sangat worthit untuk pekerjaan survei profesional.', true, true),
(11, 1, 5, 'Drone survey yang revolusioner', 'DJI Phantom 4 RTK mengubah cara kami melakukan survey. Akurasi centimeter-level dan kemudahan penggunaan sangat membantu produktivitas tim survey.', true, true);

-- Set featured products
UPDATE products SET is_featured = true WHERE id IN (1, 2, 3, 5, 7, 11);

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
