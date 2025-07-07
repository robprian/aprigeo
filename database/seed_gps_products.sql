-- GPS Store Database Seeding Script
-- Comprehensive data for GPS and Survey Equipment Store

-- Clear existing data
DELETE FROM product_attributes;
DELETE FROM product_reviews;
DELETE FROM products;
DELETE FROM brands;
DELETE FROM categories;

-- Insert GPS-related Brands
INSERT INTO brands (name, slug, description, logo_url, is_active) VALUES
('Garmin', 'garmin', 'Leading GPS technology and navigation solutions', '/images/brands/garmin.png', true),
('Trimble', 'trimble', 'Professional surveying and GPS equipment', '/images/brands/trimble.png', true),
('Leica Geosystems', 'leica-geosystems', 'Premium surveying and measurement solutions', '/images/brands/leica.png', true),
('Topcon', 'topcon', 'Innovative positioning and surveying solutions', '/images/brands/topcon.png', true),
('Sokkia', 'sokkia', 'Precision measurement and surveying instruments', '/images/brands/sokkia.png', true),
('Magellan', 'magellan', 'Consumer and professional GPS devices', '/images/brands/magellan.png', true),
('TomTom', 'tomtom', 'Navigation and location technology', '/images/brands/tomtom.png', true),
('Hemisphere GNSS', 'hemisphere-gnss', 'High-precision GNSS solutions', '/images/brands/hemisphere.png', true),
('Spectra Precision', 'spectra-precision', 'Construction and surveying equipment', '/images/brands/spectra.png', true),
('Carlson', 'carlson', 'Surveying software and hardware solutions', '/images/brands/carlson.png', true),
('South', 'south', 'Professional surveying instruments', '/images/brands/south.png', true),
('HI-TARGET', 'hi-target', 'Surveying and mapping equipment', '/images/brands/hitarget.png', true),
('CHC Navigation', 'chc-navigation', 'GNSS and surveying solutions', '/images/brands/chc.png', true),
('Stonex', 'stonex', 'High-tech surveying instruments', '/images/brands/stonex.png', true),
('UniStrong', 'unistrong', 'GNSS and surveying equipment', '/images/brands/unistrong.png', true);

-- Insert GPS-related Categories with SEO optimization
INSERT INTO categories (name, slug, description, image_url, parent_id, is_active, sort_order) VALUES
('GPS Handheld', 'gps-handheld', 'GPS genggam untuk outdoor, hiking, dan navigasi personal', '/images/categories/gps-handheld.png', NULL, true, 1),
('GPS Surveying', 'gps-surveying', 'Alat GPS profesional untuk survei dan pemetaan', '/images/categories/gps-surveying.png', NULL, true, 2),
('Total Station', 'total-station', 'Total station untuk survei konstruksi dan pemetaan', '/images/categories/total-station.png', NULL, true, 3),
('Theodolite', 'theodolite', 'Theodolite untuk pengukuran sudut dan elevasi', '/images/categories/theodolite.png', NULL, true, 4),
('Level Optik', 'level-optik', 'Waterpass dan level optik untuk konstruksi', '/images/categories/level-optik.png', NULL, true, 5),
('Laser Level', 'laser-level', 'Laser level untuk konstruksi dan finishing', '/images/categories/laser-level.png', NULL, true, 6),
('Ranging Pole', 'ranging-pole', 'Rambu ukur dan ranging pole untuk survei', '/images/categories/ranging-pole.png', NULL, true, 7),
('Prisma Reflektor', 'prisma-reflektor', 'Prisma dan reflektor untuk total station', '/images/categories/prisma-reflektor.png', NULL, true, 8),
('GPS Mapping', 'gps-mapping', 'GPS untuk pemetaan dan GIS', '/images/categories/gps-mapping.png', NULL, true, 9),
('Software Survei', 'software-survei', 'Software untuk survei dan pemetaan', '/images/categories/software-survei.png', NULL, true, 10),
('Tripod', 'tripod', 'Tripod untuk alat survei dan GPS', '/images/categories/tripod.png', NULL, true, 11),
('Aksesoris GPS', 'aksesoris-gps', 'Aksesoris dan spare part GPS', '/images/categories/aksesoris-gps.png', NULL, true, 12),
('Drone Survey', 'drone-survey', 'Drone untuk survei dan pemetaan udara', '/images/categories/drone-survey.png', NULL, true, 13),
('Ground Penetrating Radar', 'ground-penetrating-radar', 'GPR untuk survei bawah tanah', '/images/categories/gpr.png', NULL, true, 14),
('Compass & Clinometer', 'compass-clinometer', 'Kompas dan clinometer untuk survei', '/images/categories/compass.png', NULL, true, 15);

-- Insert comprehensive GPS products with SEO optimization
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
'["/images/products/garmin-gpsmap-66i-1.jpg", "/images/products/garmin-gpsmap-66i-2.jpg", "/images/products/garmin-gpsmap-66i-3.jpg"]', 
'["GPS handheld", "InReach", "satelit komunikasi", "hiking", "outdoor", "IPX7", "topografi"]', 
'Garmin GPSMAP 66i - GPS Handheld dengan Satelit Komunikasi | Jual GPS Garmin Terbaik', 
'Beli Garmin GPSMAP 66i GPS handheld dengan satelit komunikasi 2-arah. Fitur InReach, pemetaan topografi, tahan air IPX7. Garansi resmi, harga terbaik di Indonesia.'),

('Garmin eTrex 32x', 'garmin-etrex-32x', 
'GPS handheld Garmin eTrex 32x dengan peta TopoActive preloaded dan slot microSD untuk peta tambahan. Memiliki layar TFT 2.2 inci dengan resolusi 240x320 piksel. Dilengkapi dengan kompas 3-axis dan barometer. Tahan air IPX7 dengan baterai AA yang dapat bertahan hingga 25 jam. Cocok untuk hiking, geocaching, dan aktivitas outdoor. Mendukung GLONASS dan GPS untuk akurasi posisi yang lebih baik.', 
'GPS handheld dengan peta TopoActive dan kompas 3-axis', 
'GAR-ETREX-32X', 3299000, 3599000, 2800000, 
1, 1, true, true, true, 45, 0.14, 
'{"panjang": "5.4 cm", "lebar": "10.3 cm", "tinggi": "3.3 cm"}', 
'["/images/products/garmin-etrex-32x-1.jpg", "/images/products/garmin-etrex-32x-2.jpg"]', 
'["GPS handheld", "TopoActive", "kompas", "barometer", "hiking", "geocaching", "GLONASS"]', 
'Garmin eTrex 32x - GPS Handheld dengan Peta TopoActive | Harga Terbaik', 
'Jual Garmin eTrex 32x GPS handheld dengan peta TopoActive preloaded. Kompas 3-axis, barometer, tahan air IPX7. Cocok untuk hiking dan outdoor adventure.'),

('Garmin GPSMAP 64sx', 'garmin-gpsmap-64sx', 
'GPS handheld Garmin GPSMAP 64sx dengan multi-GNSS support (GPS, GLONASS, Galileo). Dilengkapi dengan peta TopoActive dan slot microSD untuk ekspansi peta. Layar TFT 2.6 inci dengan resolusi 160x240 piksel. Memiliki kompas 3-axis, barometer, dan altimeter. Tahan air IPX7 dengan baterai AA hingga 16 jam. Cocok untuk berbagai aktivitas outdoor dan professional use.', 
'GPS handheld multi-GNSS dengan peta TopoActive dan sensor lengkap', 
'GAR-GPSMAP-64SX', 4599000, 4899000, 3800000, 
1, 1, true, false, true, 35, 0.23, 
'{"panjang": "6.1 cm", "lebar": "16.0 cm", "tinggi": "3.6 cm"}', 
'["/images/products/garmin-gpsmap-64sx-1.jpg", "/images/products/garmin-gpsmap-64sx-2.jpg"]', 
'["GPS handheld", "multi-GNSS", "Galileo", "kompas", "barometer", "altimeter", "outdoor"]', 
'Garmin GPSMAP 64sx - GPS Handheld Multi-GNSS dengan Sensor Lengkap', 
'Beli Garmin GPSMAP 64sx GPS handheld dengan dukungan multi-GNSS. Peta TopoActive, kompas, barometer, altimeter. Ideal untuk outdoor dan professional.'),

('Magellan eXplorist 710', 'magellan-explorist-710', 
'GPS handheld Magellan eXplorist 710 dengan layar touchscreen 3 inci dan kamera 3.2 MP terintegrasi. Dilengkapi dengan peta Summit Series dan kemampuan geotagging foto. Tahan air IPX7 dengan baterai Li-ion rechargeable hingga 18 jam. Mendukung berbagai format peta dan waypoint. Cocok untuk surveying, mapping, dan dokumentasi lapangan.', 
'GPS handheld dengan touchscreen dan kamera terintegrasi', 
'MAG-EXPL-710', 5199000, 5599000, 4200000, 
1, 6, true, true, true, 20, 0.31, 
'{"panjang": "7.4 cm", "lebar": "15.2 cm", "tinggi": "3.8 cm"}', 
'["/images/products/magellan-explorist-710-1.jpg", "/images/products/magellan-explorist-710-2.jpg"]', 
'["GPS handheld", "touchscreen", "kamera", "geotagging", "surveying", "mapping", "IPX7"]', 
'Magellan eXplorist 710 - GPS Handheld dengan Touchscreen dan Kamera', 
'Jual Magellan eXplorist 710 GPS handheld dengan layar touchscreen 3 inci dan kamera 3.2MP. Fitur geotagging, tahan air IPX7, cocok untuk surveying.'),

-- GPS Surveying Products
('Trimble R12i GNSS', 'trimble-r12i-gnss', 
'GNSS receiver Trimble R12i dengan teknologi Trimble Maxwell 7 GNSS chip dan integrated IMU. Mendukung semua konstelasi satelit (GPS, GLONASS, Galileo, BeiDou, QZSS). Akurasi horizontal hingga 3mm + 0.1ppm dan vertikal 3.5mm + 0.4ppm. Dilengkapi dengan teknologi Trimble SurePoint untuk akurasi yang konsisten. Cocok untuk survei kadaster, konstruksi, dan pemetaan presisi tinggi.', 
'GNSS receiver profesional dengan IMU terintegrasi dan akurasi tinggi', 
'TRI-R12I-GNSS', 189900000, 199900000, 165000000, 
2, 2, true, true, true, 8, 1.2, 
'{"diameter": "18.8 cm", "tinggi": "11.8 cm"}', 
'["/images/products/trimble-r12i-1.jpg", "/images/products/trimble-r12i-2.jpg", "/images/products/trimble-r12i-3.jpg"]', 
'["GNSS receiver", "IMU", "akurasi tinggi", "survei kadaster", "konstruksi", "pemetaan", "Maxwell 7"]', 
'Trimble R12i GNSS - GNSS Receiver dengan IMU Terintegrasi | Harga Terbaik', 
'Beli Trimble R12i GNSS receiver dengan teknologi Maxwell 7 dan IMU terintegrasi. Akurasi 3mm, dukungan semua konstelasi satelit. Garansi resmi Indonesia.'),

('Leica GS18 I GNSS', 'leica-gs18-i-gnss', 
'GNSS receiver Leica GS18 I dengan teknologi RTK tilt compensation dan visual positioning. Dilengkapi dengan IMU dan kamera untuk pengukuran yang lebih mudah dan akurat. Mendukung semua konstelasi satelit dengan akurasi horizontal 5mm + 0.5ppm. Fitur tilt compensation memungkinkan pengukuran tanpa perlu menegakkan pole. Cocok untuk survei topografi, konstruksi, dan aplikasi GIS.', 
'GNSS receiver dengan tilt compensation dan visual positioning', 
'LEI-GS18-I', 179900000, 189900000, 155000000, 
2, 3, true, true, true, 6, 1.4, 
'{"diameter": "20.2 cm", "tinggi": "16.3 cm"}', 
'["/images/products/leica-gs18-i-1.jpg", "/images/products/leica-gs18-i-2.jpg", "/images/products/leica-gs18-i-3.jpg"]', 
'["GNSS receiver", "tilt compensation", "visual positioning", "RTK", "survei topografi", "konstruksi", "GIS"]', 
'Leica GS18 I GNSS - GNSS Receiver dengan Tilt Compensation | Jual Leica', 
'Jual Leica GS18 I GNSS receiver dengan teknologi tilt compensation dan visual positioning. Akurasi 5mm, pengukuran tanpa perlu menegakkan pole.'),

('Topcon HiPer VR GNSS', 'topcon-hiper-vr-gnss', 
'GNSS receiver Topcon HiPer VR dengan teknologi Fence Antenna dan Universal Tracking Channels. Mendukung semua konstelasi satelit dengan 226 channels. Akurasi horizontal 3mm + 0.5ppm dan vertikal 5mm + 0.5ppm. Dilengkapi dengan Bluetooth dan WiFi untuk konektivitas yang fleksibel. Baterai internal hingga 5.5 jam operasi. Cocok untuk survei kadaster, konstruksi, dan monitoring deformasi.', 
'GNSS receiver dengan Fence Antenna dan Universal Tracking', 
'TOP-HIPER-VR', 159900000, 169900000, 135000000, 
2, 4, true, false, true, 12, 1.1, 
'{"diameter": "18.6 cm", "tinggi": "11.2 cm"}', 
'["/images/products/topcon-hiper-vr-1.jpg", "/images/products/topcon-hiper-vr-2.jpg"]', 
'["GNSS receiver", "Fence Antenna", "Universal Tracking", "226 channels", "survei kadaster", "konstruksi", "monitoring"]', 
'Topcon HiPer VR GNSS - GNSS Receiver dengan Fence Antenna Technology', 
'Beli Topcon HiPer VR GNSS receiver dengan teknologi Fence Antenna dan 226 channels. Akurasi 3mm, Bluetooth, WiFi. Cocok untuk survei profesional.'),

('South Galaxy G1 GNSS', 'south-galaxy-g1-gnss', 
'GNSS receiver South Galaxy G1 dengan teknologi dual-constellation RTK dan akurasi tinggi. Mendukung GPS, GLONASS, BeiDou, dan Galileo. Akurasi horizontal 8mm + 1ppm dan vertikal 15mm + 1ppm. Dilengkapi dengan display OLED dan keypad untuk operasi standalone. Baterai internal hingga 8 jam operasi. Cocok untuk survei topografi, pemetaan, dan aplikasi GIS dengan budget terjangkau.', 
'GNSS receiver dengan teknologi dual-constellation RTK', 
'SOU-GALAXY-G1', 89900000, 99900000, 75000000, 
2, 11, true, true, true, 15, 0.95, 
'{"diameter": "17.8 cm", "tinggi": "10.5 cm"}', 
'["/images/products/south-galaxy-g1-1.jpg", "/images/products/south-galaxy-g1-2.jpg"]', 
'["GNSS receiver", "dual-constellation", "RTK", "budget terjangkau", "survei topografi", "pemetaan", "GIS"]', 
'South Galaxy G1 GNSS - GNSS Receiver RTK dengan Harga Terjangkau', 
'Jual South Galaxy G1 GNSS receiver dengan teknologi dual-constellation RTK. Akurasi 8mm, mendukung 4 konstelasi satelit. Harga terjangkau, kualitas profesional.'),

-- Total Station Products
('Leica TS16 Total Station', 'leica-ts16-total-station', 
'Total station Leica TS16 dengan teknologi Automatic Target Recognition (ATR) dan akurasi angular 1". Dilengkapi dengan laser plummet dan kompensator dual-axis. Jangkauan EDM hingga 3500m dengan prisma dan 1000m tanpa prisma. Layar touchscreen 5" dengan antarmuka intuitif. Tahan debu dan air IP65. Cocok untuk survei konstruksi, monitoring, dan engineering survey.', 
'Total station dengan ATR dan akurasi angular 1 detik', 
'LEI-TS16-TS', 349900000, 369900000, 295000000, 
3, 3, true, true, true, 5, 5.8, 
'{"panjang": "35 cm", "lebar": "20 cm", "tinggi": "17 cm"}', 
'["/images/products/leica-ts16-1.jpg", "/images/products/leica-ts16-2.jpg", "/images/products/leica-ts16-3.jpg"]', 
'["total station", "ATR", "akurasi 1 detik", "touchscreen", "survei konstruksi", "monitoring", "engineering"]', 
'Leica TS16 Total Station - Total Station dengan ATR dan Akurasi 1" | Jual Leica', 
'Beli Leica TS16 Total Station dengan teknologi ATR dan akurasi angular 1". Layar touchscreen 5", jangkauan 3500m, IP65. Cocok untuk survei konstruksi profesional.'),

('Topcon GT-1200 Robotic', 'topcon-gt-1200-robotic', 
'Total station robotik Topcon GT-1200 dengan teknologi Autolock dan akurasi angular 1". Dilengkapi dengan sistem servo motor untuk tracking otomatis. Jangkauan EDM hingga 3000m dengan prisma dan 800m tanpa prisma. Layar LCD dual-face dengan backlight. Kompensator dual-axis untuk akurasi yang konsisten. Cocok untuk survei konstruksi, monitoring struktur, dan aplikasi engineering yang membutuhkan efisiensi tinggi.', 
'Total station robotik dengan teknologi Autolock dan tracking otomatis', 
'TOP-GT1200-ROB', 289900000, 309900000, 245000000, 
3, 4, true, true, true, 8, 6.2, 
'{"panjang": "38 cm", "lebar": "22 cm", "tinggi": "18 cm"}', 
'["/images/products/topcon-gt-1200-1.jpg", "/images/products/topcon-gt-1200-2.jpg"]', 
'["total station robotik", "Autolock", "tracking otomatis", "survei konstruksi", "monitoring struktur", "engineering"]', 
'Topcon GT-1200 Robotic - Total Station Robotik dengan Autolock | Harga Terbaik', 
'Jual Topcon GT-1200 Robotic Total Station dengan teknologi Autolock dan tracking otomatis. Akurasi 1", jangkauan 3000m, cocok untuk survei konstruksi.'),

('Sokkia CX-107 Total Station', 'sokkia-cx-107-total-station', 
'Total station Sokkia CX-107 dengan akurasi angular 7" dan teknologi RED-tech EDM. Jangkauan pengukuran hingga 2500m dengan prisma dan 350m tanpa prisma. Dilengkapi dengan layar LCD grafis dan keypad numerik. Kompensator dual-axis untuk koreksi otomatis. Baterai Li-ion dengan daya tahan hingga 24 jam. Cocok untuk survei topografi, konstruksi, dan pemetaan dengan akurasi standar.', 
'Total station dengan akurasi 7" dan teknologi RED-tech EDM', 
'SOK-CX107-TS', 79900000, 89900000, 65000000, 
3, 5, true, false, true, 18, 4.8, 
'{"panjang": "33 cm", "lebar": "18 cm", "tinggi": "16 cm"}', 
'["/images/products/sokkia-cx-107-1.jpg", "/images/products/sokkia-cx-107-2.jpg"]', 
'["total station", "akurasi 7 detik", "RED-tech EDM", "survei topografi", "konstruksi", "pemetaan"]', 
'Sokkia CX-107 Total Station - Total Station dengan Akurasi 7" | Jual Sokkia', 
'Beli Sokkia CX-107 Total Station dengan akurasi angular 7" dan RED-tech EDM. Jangkauan 2500m, baterai 24 jam, cocok untuk survei topografi.'),

('HI-TARGET ZTS-360R Total Station', 'hi-target-zts-360r-total-station', 
'Total station HI-TARGET ZTS-360R dengan akurasi angular 2" dan teknologi reflectorless EDM. Jangkauan pengukuran hingga 3000m dengan prisma dan 600m tanpa prisma. Dilengkapi dengan layar LCD dual-face dan illuminated keypad. Kompensator dual-axis dengan sensitivitas 3". Baterai Li-ion dengan daya tahan hingga 20 jam. Cocok untuk survei konstruksi, monitoring, dan aplikasi engineering dengan harga kompetitif.', 
'Total station dengan akurasi 2" dan reflectorless EDM', 
'HIT-ZTS360R-TS', 129900000, 139900000, 105000000, 
3, 12, true, true, true, 12, 5.2, 
'{"panjang": "34 cm", "lebar": "19 cm", "tinggi": "17 cm"}', 
'["/images/products/hi-target-zts-360r-1.jpg", "/images/products/hi-target-zts-360r-2.jpg"]', 
'["total station", "akurasi 2 detik", "reflectorless EDM", "survei konstruksi", "monitoring", "engineering"]', 
'HI-TARGET ZTS-360R Total Station - Total Station dengan Akurasi 2" | Harga Kompetitif', 
'Jual HI-TARGET ZTS-360R Total Station dengan akurasi angular 2" dan reflectorless EDM. Jangkauan 3000m, baterai 20 jam, harga kompetitif.'),

-- Theodolite Products
('Leica TM50 Theodolite', 'leica-tm50-theodolite', 
'Theodolite monitoring Leica TM50 dengan akurasi angular 0.5" dan teknologi Automatic Target Recognition (ATR). Dilengkapi dengan sistem servo motor untuk tracking otomatis dan kompensator dual-axis. Jangkauan pengukuran hingga 3000m dengan target khusus. Layar touchscreen 5" dengan antarmuka intuitif. Tahan debu dan air IP65. Cocok untuk monitoring deformasi, survei geodetik, dan aplikasi engineering presisi tinggi.', 
'Theodolite monitoring dengan akurasi 0.5" dan ATR', 
'LEI-TM50-THEO', 459900000, 479900000, 385000000, 
4, 3, true, true, true, 3, 6.8, 
'{"panjang": "36 cm", "lebar": "21 cm", "tinggi": "19 cm"}', 
'["/images/products/leica-tm50-1.jpg", "/images/products/leica-tm50-2.jpg", "/images/products/leica-tm50-3.jpg"]', 
'["theodolite monitoring", "akurasi 0.5 detik", "ATR", "tracking otomatis", "monitoring deformasi", "survei geodetik"]', 
'Leica TM50 Theodolite - Theodolite Monitoring dengan Akurasi 0.5" | Jual Leica', 
'Beli Leica TM50 Theodolite monitoring dengan akurasi angular 0.5" dan ATR. Tracking otomatis, IP65, cocok untuk monitoring deformasi dan survei geodetik.'),

('Topcon DT-209 Theodolite', 'topcon-dt-209-theodolite', 
'Theodolite optik Topcon DT-209 dengan akurasi angular 9" dan teknologi Absolute Encoding. Dilengkapi dengan teropong 30x magnification dan resolusi display 1". Kompensator dual-axis dengan sensitivitas 3" per 2mm. Baterai AA dengan daya tahan hingga 100 jam. Tahan debu dan air IP54. Cocok untuk survei topografi, konstruksi, dan aplikasi engineering dengan akurasi standar.', 
'Theodolite optik dengan akurasi 9" dan Absolute Encoding', 
'TOP-DT209-THEO', 24900000, 27900000, 20000000, 
4, 4, true, false, true, 25, 3.8, 
'{"panjang": "30 cm", "lebar": "16 cm", "tinggi": "15 cm"}', 
'["/images/products/topcon-dt-209-1.jpg", "/images/products/topcon-dt-209-2.jpg"]', 
'["theodolite optik", "akurasi 9 detik", "Absolute Encoding", "30x magnification", "survei topografi", "konstruksi"]', 
'Topcon DT-209 Theodolite - Theodolite Optik dengan Akurasi 9" | Harga Terbaik', 
'Jual Topcon DT-209 Theodolite optik dengan akurasi angular 9" dan Absolute Encoding. Magnification 30x, baterai 100 jam, cocok untuk survei topografi.'),

('South ET-02 Electronic Theodolite', 'south-et-02-electronic-theodolite', 
'Theodolite elektronik South ET-02 dengan akurasi angular 2" dan display LCD dual-face. Dilengkapi dengan teropong 30x magnification dan illuminated reticle. Kompensator dual-axis dengan sensitivitas 1" per 2mm. Baterai Li-ion dengan daya tahan hingga 35 jam. Memory internal untuk 10,000 titik pengukuran. Cocok untuk survei konstruksi, monitoring, dan aplikasi engineering dengan akurasi tinggi.', 
'Theodolite elektronik dengan akurasi 2" dan memory internal', 
'SOU-ET02-THEO', 39900000, 44900000, 32000000, 
4, 11, true, true, true, 20, 4.2, 
'{"panjang": "32 cm", "lebar": "17 cm", "tinggi": "16 cm"}', 
'["/images/products/south-et-02-1.jpg", "/images/products/south-et-02-2.jpg"]', 
'["theodolite elektronik", "akurasi 2 detik", "LCD dual-face", "30x magnification", "survei konstruksi", "monitoring"]', 
'South ET-02 Electronic Theodolite - Theodolite Elektronik dengan Akurasi 2"', 
'Beli South ET-02 Electronic Theodolite dengan akurasi angular 2" dan LCD dual-face. Magnification 30x, memory 10,000 titik, cocok untuk survei konstruksi.');

-- Continue with more products...
-- Due to length constraints, I'll provide a script to generate the remaining products
