-- GPS Store Database Seeding Script - Part 3
-- Additional products to complete 100+ product inventory

-- Tripod Products
INSERT INTO products (
    name, slug, description, short_description, sku, price, compare_price, cost_price,
    category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight,
    dimensions, images, tags, meta_title, meta_description
) VALUES
('Leica GST120-9 Carbon Tripod', 'leica-gst120-9-carbon-tripod', 
'Tripod carbon fiber Leica GST120-9 dengan tinggi 1.02m - 1.65m dan beban maksimal 20kg. Dilengkapi dengan leg locking system yang cepat dan reliable. Konstruksi carbon fiber yang ringan namun kuat. Head attachment 5/8" x 11 thread. Cocok untuk GPS, total station, dan aplikasi surveying yang membutuhkan stabilitas tinggi.', 
'Tripod carbon fiber dengan beban maksimal 20kg', 
'LEI-GST120-9-TRIPOD', 8999000, 9999000, 7200000, 
11, 3, true, true, true, 20, 2.8, 
'{"tinggi_min": "102 cm", "tinggi_max": "165 cm", "beban_max": "20 kg"}', 
'["/images/products/leica-gst120-9-1.jpg", "/images/products/leica-gst120-9-2.jpg"]', 
'["tripod", "carbon fiber", "beban 20kg", "leg locking", "GPS", "total station", "surveying"]', 
'Leica GST120-9 Carbon Tripod - Tripod Carbon Fiber untuk GPS dan Total Station', 
'Beli Leica GST120-9 Carbon Tripod dengan konstruksi carbon fiber dan beban maksimal 20kg. Leg locking system cepat, cocok untuk GPS dan total station.'),

('Topcon Aluminum Tripod', 'topcon-aluminum-tripod', 
'Tripod aluminum Topcon dengan tinggi 0.95m - 1.60m dan beban maksimal 15kg. Dilengkapi dengan leg locking system yang robust dan shoulder strap. Konstruksi aluminum yang tahan lama dan ekonomis. Head attachment 5/8" x 11 thread. Cocok untuk total station, theodolite, dan aplikasi surveying standar.', 
'Tripod aluminum dengan beban maksimal 15kg', 
'TOP-ALU-TRIPOD', 3999000, 4499000, 3200000, 
11, 4, true, false, true, 35, 4.2, 
'{"tinggi_min": "95 cm", "tinggi_max": "160 cm", "beban_max": "15 kg"}', 
'["/images/products/topcon-aluminum-1.jpg", "/images/products/topcon-aluminum-2.jpg"]', 
'["tripod", "aluminum", "beban 15kg", "robust", "total station", "theodolite", "surveying"]', 
'Topcon Aluminum Tripod - Tripod Aluminum untuk Total Station dan Theodolite', 
'Jual Topcon Aluminum Tripod dengan beban maksimal 15kg dan konstruksi tahan lama. Leg locking robust, cocok untuk total station dan theodolite.'),

('Sokkia Wooden Tripod', 'sokkia-wooden-tripod', 
'Tripod kayu Sokkia dengan tinggi 1.00m - 1.70m dan beban maksimal 25kg. Dilengkapi dengan leg locking system tradisional yang reliable. Konstruksi kayu berkualitas tinggi yang stabil dan tahan lama. Head attachment 5/8" x 11 thread. Cocok untuk instrumen survei berat dan aplikasi yang membutuhkan stabilitas maksimal.', 
'Tripod kayu dengan beban maksimal 25kg', 
'SOK-WOOD-TRIPOD', 2999000, 3499000, 2400000, 
11, 5, true, true, true, 25, 6.5, 
'{"tinggi_min": "100 cm", "tinggi_max": "170 cm", "beban_max": "25 kg"}', 
'["/images/products/sokkia-wooden-1.jpg", "/images/products/sokkia-wooden-2.jpg"]', 
'["tripod", "kayu", "beban 25kg", "stabilitas maksimal", "instrumen berat", "survei"]', 
'Sokkia Wooden Tripod - Tripod Kayu dengan Stabilitas Maksimal | Beban 25kg', 
'Beli Sokkia Wooden Tripod dengan konstruksi kayu berkualitas tinggi dan beban maksimal 25kg. Stabilitas maksimal untuk instrumen survei berat.'),

-- Aksesoris GPS Products
('Garmin Carrying Case', 'garmin-carrying-case', 
'Carrying case Garmin untuk GPS handheld dengan konstruksi nylon yang tahan lama. Dilengkapi dengan belt clip dan lanyard. Kompartemen tambahan untuk aksesori kecil. Tahan air dengan zipper waterproof. Cocok untuk melindungi GPS handheld dari benturan dan cuaca buruk.', 
'Carrying case nylon untuk GPS handheld', 
'GAR-CASE-001', 399000, 499000, 280000, 
12, 1, true, false, true, 50, 0.2, 
'{"panjang": "12 cm", "lebar": "8 cm", "tinggi": "4 cm"}', 
'["/images/products/garmin-case-1.jpg", "/images/products/garmin-case-2.jpg"]', 
'["carrying case", "nylon", "belt clip", "lanyard", "waterproof", "GPS handheld"]', 
'Garmin Carrying Case - Carrying Case Nylon untuk GPS Handheld | Tahan Air', 
'Beli Garmin Carrying Case dengan konstruksi nylon tahan lama dan zipper waterproof. Belt clip, lanyard, cocok untuk melindungi GPS handheld.'),

('Trimble External Antenna', 'trimble-external-antenna', 
'Antena eksternal Trimble dengan teknologi multi-frequency dan gain tinggi. Kabel 5m dengan konektor TNC. Dilengkapi dengan magnetic mount dan ground plane. Cocok untuk meningkatkan signal reception pada GNSS receiver di area dengan signal lemah atau obstructed sky view.', 
'Antena eksternal multi-frequency dengan gain tinggi', 
'TRI-ANT-EXT', 4999000, 5499000, 4000000, 
12, 2, true, true, true, 20, 1.5, 
'{"kabel": "5 m", "konektor": "TNC", "mount": "Magnetic"}', 
'["/images/products/trimble-antenna-1.jpg", "/images/products/trimble-antenna-2.jpg"]', 
'["antena eksternal", "multi-frequency", "gain tinggi", "magnetic mount", "GNSS receiver", "signal reception"]', 
'Trimble External Antenna - Antena Eksternal Multi-Frequency untuk GNSS', 
'Beli Trimble External Antenna dengan teknologi multi-frequency dan gain tinggi. Kabel 5m, magnetic mount, cocok untuk meningkatkan signal reception.'),

('Leica Battery Charger', 'leica-battery-charger', 
'Battery charger Leica dengan teknologi intelligent charging dan LED indicator. Kompatibel dengan berbagai tipe baterai Leica. Input 100-240V AC dengan output 12V DC. Dilengkapi dengan car adapter dan wall adapter. Cocok untuk charging baterai instrumen survei Leica di lapangan maupun di kantor.', 
'Battery charger dengan intelligent charging', 
'LEI-CHARGER-001', 1999000, 2299000, 1500000, 
12, 3, true, false, true, 30, 0.8, 
'{"input": "100-240V AC", "output": "12V DC", "adapter": "Car + Wall"}', 
'["/images/products/leica-charger-1.jpg", "/images/products/leica-charger-2.jpg"]', 
'["battery charger", "intelligent charging", "LED indicator", "car adapter", "wall adapter", "instrumen survei"]', 
'Leica Battery Charger - Battery Charger dengan Intelligent Charging', 
'Beli Leica Battery Charger dengan teknologi intelligent charging dan LED indicator. Car adapter, wall adapter, cocok untuk instrumen survei Leica.'),

-- Drone Survey Products
('DJI Phantom 4 RTK', 'dji-phantom-4-rtk', 
'Drone survey DJI Phantom 4 RTK dengan sistem RTK terintegrasi dan akurasi centimeter-level. Dilengkapi dengan kamera 20MP dan gimbal 3-axis. Flight time hingga 30 menit dengan jangkauan 7km. Obstacle avoidance system yang canggih. Cocok untuk survey aerial, mapping, dan aplikasi photogrammetry yang membutuhkan akurasi tinggi.', 
'Drone survey dengan sistem RTK dan akurasi centimeter', 
'DJI-P4-RTK', 129900000, 139900000, 108000000, 
13, 1, true, true, true, 8, 1.4, 
'{"flight_time": "30 menit", "jangkauan": "7 km", "kamera": "20 MP"}', 
'["/images/products/dji-phantom-4-rtk-1.jpg", "/images/products/dji-phantom-4-rtk-2.jpg"]', 
'["drone survey", "RTK terintegrasi", "akurasi centimeter", "kamera 20MP", "mapping", "photogrammetry"]', 
'DJI Phantom 4 RTK - Drone Survey dengan Sistem RTK dan Akurasi Centimeter', 
'Beli DJI Phantom 4 RTK drone survey dengan sistem RTK terintegrasi dan akurasi centimeter-level. Kamera 20MP, flight time 30 menit, cocok untuk mapping.'),

('Parrot Sequoia+ Multispectral Camera', 'parrot-sequoia-multispectral-camera', 
'Kamera multispektral Parrot Sequoia+ untuk drone survey dengan 4 spektral band dan 1 RGB sensor. Dilengkapi dengan sunshine sensor dan GPS. Resolusi 1.2MP untuk setiap spektral band. Cocok untuk precision agriculture, environmental monitoring, dan aplikasi remote sensing yang membutuhkan data multispektral.', 
'Kamera multispektral dengan 4 spektral band', 
'PAR-SEQUOIA-MS', 39900000, 44900000, 32000000, 
13, 6, true, true, true, 12, 0.7, 
'{"spektral_band": "4 + RGB", "resolusi": "1.2 MP", "sensor": "Sunshine + GPS"}', 
'["/images/products/parrot-sequoia-1.jpg", "/images/products/parrot-sequoia-2.jpg"]', 
'["kamera multispektral", "4 spektral band", "RGB sensor", "precision agriculture", "environmental monitoring", "remote sensing"]', 
'Parrot Sequoia+ Multispectral Camera - Kamera Multispektral untuk Drone Survey', 
'Beli Parrot Sequoia+ Multispectral Camera dengan 4 spektral band dan RGB sensor. Sunshine sensor, GPS, cocok untuk precision agriculture.'),

-- Ground Penetrating Radar Products
('GSSI UtilityScan Pro GPR', 'gssi-utilityscan-pro-gpr', 
'Ground Penetrating Radar GSSI UtilityScan Pro dengan frekuensi 400MHz dan penetrasi hingga 4 meter. Dilengkapi dengan layar touchscreen 7" dan GPS terintegrasi. Real-time display dengan automatic depth calculation. Cocok untuk utility locating, concrete inspection, dan aplikasi subsurface investigation.', 
'GPR dengan frekuensi 400MHz dan penetrasi 4 meter', 
'GSSI-UTIL-PRO', 189900000, 199900000, 155000000, 
14, 15, true, true, true, 5, 12.5, 
'{"frekuensi": "400 MHz", "penetrasi": "4 m", "layar": "7 inch touchscreen"}', 
'["/images/products/gssi-utilityscan-1.jpg", "/images/products/gssi-utilityscan-2.jpg"]', 
'["ground penetrating radar", "400MHz", "penetrasi 4m", "utility locating", "concrete inspection", "subsurface investigation"]', 
'GSSI UtilityScan Pro GPR - Ground Penetrating Radar dengan Frekuensi 400MHz', 
'Beli GSSI UtilityScan Pro GPR dengan frekuensi 400MHz dan penetrasi hingga 4 meter. Layar touchscreen 7", GPS terintegrasi, cocok untuk utility locating.'),

('Sensors & Software LMX200 GPR', 'sensors-software-lmx200-gpr', 
'Ground Penetrating Radar LMX200 dengan teknologi dual-frequency dan penetrasi hingga 6 meter. Dilengkapi dengan tablet controller dan advanced processing software. Real-time imaging dengan automatic gain control. Cocok untuk geological survey, environmental assessment, dan aplikasi geotechnical investigation.', 
'GPR dual-frequency dengan penetrasi 6 meter', 
'SS-LMX200-GPR', 249900000, 269900000, 205000000, 
14, 14, true, false, true, 3, 18.2, 
'{"frekuensi": "Dual-frequency", "penetrasi": "6 m", "controller": "Tablet"}', 
'["/images/products/sensors-lmx200-1.jpg", "/images/products/sensors-lmx200-2.jpg"]', 
'["ground penetrating radar", "dual-frequency", "penetrasi 6m", "geological survey", "environmental assessment", "geotechnical investigation"]', 
'Sensors & Software LMX200 GPR - GPR Dual-Frequency dengan Penetrasi 6 Meter', 
'Beli Sensors & Software LMX200 GPR dengan teknologi dual-frequency dan penetrasi hingga 6 meter. Tablet controller, cocok untuk geological survey.'),

-- Compass & Clinometer Products
('Suunto MC-2 Global Compass', 'suunto-mc-2-global-compass', 
'Kompas profesional Suunto MC-2 dengan teknologi global needle dan adjustable declination. Dilengkapi dengan clinometer terintegrasi dan luminous bezel. Akurasi ±0.5° dengan sighting mirror yang dapat dilipat. Tahan air dan shock resistant. Cocok untuk survei orientasi, navigasi, dan aplikasi outdoor professional.', 
'Kompas profesional dengan clinometer terintegrasi', 
'SUN-MC2-COMPASS', 2999000, 3299000, 2400000, 
15, 11, true, true, true, 30, 0.18, 
'{"akurasi": "±0.5°", "fitur": "Global needle, Clinometer, Sighting mirror"}', 
'["/images/products/suunto-mc-2-1.jpg", "/images/products/suunto-mc-2-2.jpg"]', 
'["kompas profesional", "global needle", "clinometer", "sighting mirror", "survei orientasi", "navigasi"]', 
'Suunto MC-2 Global Compass - Kompas Profesional dengan Clinometer Terintegrasi', 
'Beli Suunto MC-2 Global Compass dengan teknologi global needle dan clinometer terintegrasi. Akurasi ±0.5°, sighting mirror, cocok untuk survei orientasi.'),

('Brunton Geo Transit Compass', 'brunton-geo-transit-compass', 
'Kompas transit Brunton Geo dengan akurasi ±0.5° dan cast aluminum body. Dilengkapi dengan clinometer precision dan adjustable declination. Needle lock system dan dampening yang smooth. Cocok untuk geological survey, mining exploration, dan aplikasi professional surveying yang membutuhkan akurasi tinggi.', 
'Kompas transit dengan cast aluminum body', 
'BRU-GEO-TRANSIT', 8999000, 9999000, 7200000, 
15, 12, true, true, true, 15, 0.85, 
'{"akurasi": "±0.5°", "body": "Cast aluminum", "fitur": "Clinometer precision, Needle lock"}', 
'["/images/products/brunton-geo-1.jpg", "/images/products/brunton-geo-2.jpg"]', 
'["kompas transit", "cast aluminum", "clinometer precision", "geological survey", "mining exploration", "professional surveying"]', 
'Brunton Geo Transit Compass - Kompas Transit dengan Cast Aluminum Body', 
'Beli Brunton Geo Transit Compass dengan akurasi ±0.5° dan cast aluminum body. Clinometer precision, needle lock, cocok untuk geological survey.');

-- Add more GPS Handheld products to reach 100+ total
INSERT INTO products (
    name, slug, description, short_description, sku, price, compare_price, cost_price,
    category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight,
    dimensions, images, tags, meta_title, meta_description
) VALUES
('Garmin eTrex 22x', 'garmin-etrex-22x', 
'GPS handheld Garmin eTrex 22x dengan peta TopoActive preloaded dan layar TFT 2.2". Dilengkapi dengan kompas 3-axis dan barometer. Mendukung GPS dan GLONASS untuk akurasi yang lebih baik. Tahan air IPX7 dengan baterai AA hingga 25 jam. Cocok untuk hiking, geocaching, dan aktivitas outdoor dengan budget terbatas.', 
'GPS handheld dengan peta TopoActive dan sensor lengkap', 
'GAR-ETREX-22X', 2799000, 2999000, 2200000, 
1, 1, true, false, true, 40, 0.14, 
'{"panjang": "5.4 cm", "lebar": "10.3 cm", "tinggi": "3.3 cm"}', 
'["/images/products/garmin-etrex-22x-1.jpg", "/images/products/garmin-etrex-22x-2.jpg"]', 
'["GPS handheld", "TopoActive", "kompas", "barometer", "hiking", "geocaching", "budget"]', 
'Garmin eTrex 22x - GPS Handheld dengan Peta TopoActive | Harga Terjangkau', 
'Beli Garmin eTrex 22x GPS handheld dengan peta TopoActive preloaded dan sensor lengkap. Kompas 3-axis, barometer, IPX7, harga terjangkau.'),

('Garmin eTrex 10', 'garmin-etrex-10', 
'GPS handheld Garmin eTrex 10 dengan desain yang simple dan mudah digunakan. Layar monokrom 2.2" dengan resolusi 128x160 piksel. Mendukung GPS dan GLONASS dengan akurasi 3 meter. Tahan air IPX7 dengan baterai AA hingga 25 jam. Cocok untuk hiking basic, geocaching, dan aktivitas outdoor entry-level.', 
'GPS handheld entry-level dengan desain simple', 
'GAR-ETREX-10', 1899000, 2199000, 1500000, 
1, 1, true, false, true, 60, 0.14, 
'{"panjang": "5.4 cm", "lebar": "10.3 cm", "tinggi": "3.3 cm"}', 
'["/images/products/garmin-etrex-10-1.jpg", "/images/products/garmin-etrex-10-2.jpg"]', 
'["GPS handheld", "entry-level", "simple", "monokrom", "hiking", "geocaching", "basic"]', 
'Garmin eTrex 10 - GPS Handheld Entry-Level dengan Desain Simple', 
'Beli Garmin eTrex 10 GPS handheld entry-level dengan desain simple dan mudah digunakan. Layar monokrom, IPX7, cocok untuk hiking basic.'),

('Garmin Oregon 750', 'garmin-oregon-750', 
'GPS handheld Garmin Oregon 750 dengan layar touchscreen 3" dan kamera 8MP. Dilengkapi dengan kompas 3-axis, barometer, dan altimeter. Mendukung GPS, GLONASS, dan Galileo. Tahan air IPX7 dengan baterai AA hingga 16 jam. Cocok untuk outdoor photography, geocaching, dan aktivitas adventure yang membutuhkan dokumentasi.', 
'GPS handheld dengan touchscreen dan kamera 8MP', 
'GAR-OREGON-750', 7999000, 8999000, 6500000, 
1, 1, true, true, true, 25, 0.21, 
'{"panjang": "6.1 cm", "lebar": "11.4 cm", "tinggi": "3.3 cm"}', 
'["/images/products/garmin-oregon-750-1.jpg", "/images/products/garmin-oregon-750-2.jpg"]', 
'["GPS handheld", "touchscreen", "kamera 8MP", "kompas", "barometer", "outdoor photography", "geocaching"]', 
'Garmin Oregon 750 - GPS Handheld dengan Touchscreen dan Kamera 8MP', 
'Beli Garmin Oregon 750 GPS handheld dengan layar touchscreen 3" dan kamera 8MP. Kompas, barometer, altimeter, cocok untuk outdoor photography.'),

('Garmin Oregon 700', 'garmin-oregon-700', 
'GPS handheld Garmin Oregon 700 dengan layar touchscreen 3" dan dual battery system. Dilengkapi dengan kompas 3-axis, barometer, dan altimeter. Mendukung GPS, GLONASS, dan Galileo. Tahan air IPX7 dengan baterai AA atau Li-ion. Cocok untuk hiking, hunting, dan aktivitas outdoor yang membutuhkan navigasi presisi.', 
'GPS handheld dengan touchscreen dan dual battery', 
'GAR-OREGON-700', 6999000, 7999000, 5500000, 
1, 1, true, false, true, 30, 0.21, 
'{"panjang": "6.1 cm", "lebar": "11.4 cm", "tinggi": "3.3 cm"}', 
'["/images/products/garmin-oregon-700-1.jpg", "/images/products/garmin-oregon-700-2.jpg"]', 
'["GPS handheld", "touchscreen", "dual battery", "kompas", "barometer", "hiking", "hunting"]', 
'Garmin Oregon 700 - GPS Handheld dengan Touchscreen dan Dual Battery', 
'Beli Garmin Oregon 700 GPS handheld dengan layar touchscreen 3" dan dual battery system. Kompas, barometer, altimeter, cocok untuk hiking dan hunting.'),

('Magellan eXplorist 310', 'magellan-explorist-310', 
'GPS handheld Magellan eXplorist 310 dengan layar monokrom 2.2" dan design yang robust. Dilengkapi dengan electronic compass dan barometric altimeter. Mendukung GPS dan GLONASS. Tahan air IPX7 dengan baterai AA hingga 18 jam. Cocok untuk outdoor adventure, geocaching, dan aktivitas basic navigation.', 
'GPS handheld dengan electronic compass dan barometer', 
'MAG-EXPL-310', 2199000, 2499000, 1700000, 
1, 6, true, false, true, 45, 0.22, 
'{"panjang": "6.1 cm", "lebar": "11.4 cm", "tinggi": "3.0 cm"}', 
'["/images/products/magellan-explorist-310-1.jpg", "/images/products/magellan-explorist-310-2.jpg"]', 
'["GPS handheld", "monokrom", "electronic compass", "barometer", "outdoor adventure", "geocaching", "basic navigation"]', 
'Magellan eXplorist 310 - GPS Handheld dengan Electronic Compass dan Barometer', 
'Beli Magellan eXplorist 310 GPS handheld dengan layar monokrom dan design robust. Electronic compass, barometer, IPX7, cocok untuk outdoor adventure.');

-- Add more GNSS/GPS Surveying products
INSERT INTO products (
    name, slug, description, short_description, sku, price, compare_price, cost_price,
    category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight,
    dimensions, images, tags, meta_title, meta_description
) VALUES
('CHC X91+ GNSS Receiver', 'chc-x91-gnss-receiver', 
'GNSS receiver CHC X91+ dengan teknologi multi-constellation dan akurasi sub-centimeter. Mendukung GPS, GLONASS, Galileo, dan BeiDou. Dilengkapi dengan integrated radio dan Bluetooth connectivity. Baterai internal hingga 8 jam operasi. Cocok untuk survei kadaster, konstruksi, dan aplikasi mapping dengan harga kompetitif.', 
'GNSS receiver multi-constellation dengan akurasi sub-centimeter', 
'CHC-X91-GNSS', 119900000, 129900000, 95000000, 
2, 13, true, true, true, 10, 1.3, 
'{"diameter": "19.5 cm", "tinggi": "12.8 cm"}', 
'["/images/products/chc-x91-1.jpg", "/images/products/chc-x91-2.jpg"]', 
'["GNSS receiver", "multi-constellation", "sub-centimeter", "integrated radio", "survei kadaster", "konstruksi", "mapping"]', 
'CHC X91+ GNSS Receiver - GNSS Receiver Multi-Constellation dengan Akurasi Sub-Centimeter', 
'Beli CHC X91+ GNSS Receiver dengan teknologi multi-constellation dan akurasi sub-centimeter. Integrated radio, Bluetooth, harga kompetitif untuk survei kadaster.'),

('Stonex S900A GNSS Receiver', 'stonex-s900a-gnss-receiver', 
'GNSS receiver Stonex S900A dengan teknologi advanced RTK dan akurasi 8mm + 1ppm. Mendukung semua konstelasi satelit dengan 555 channels. Dilengkapi dengan internal radio dan WiFi connectivity. Baterai Li-ion hingga 10 jam operasi. Cocok untuk survei topografi, construction layout, dan aplikasi GIS dengan reliability tinggi.', 
'GNSS receiver dengan 555 channels dan internal radio', 
'STO-S900A-GNSS', 139900000, 149900000, 115000000, 
2, 14, true, false, true, 12, 1.4, 
'{"diameter": "20.1 cm", "tinggi": "13.5 cm"}', 
'["/images/products/stonex-s900a-1.jpg", "/images/products/stonex-s900a-2.jpg"]', 
'["GNSS receiver", "555 channels", "internal radio", "WiFi", "survei topografi", "construction layout", "GIS"]', 
'Stonex S900A GNSS Receiver - GNSS Receiver dengan 555 Channels dan Internal Radio', 
'Beli Stonex S900A GNSS Receiver dengan teknologi advanced RTK dan 555 channels. Internal radio, WiFi, cocok untuk survei topografi dan construction layout.'),

('UniStrong G970II GNSS Receiver', 'unistrong-g970ii-gnss-receiver', 
'GNSS receiver UniStrong G970II dengan teknologi dual-frequency dan akurasi 5mm + 1ppm. Mendukung GPS, GLONASS, BeiDou, dan Galileo. Dilengkapi dengan integrated UHF radio dan Bluetooth. Baterai internal hingga 12 jam operasi. Cocok untuk survei engineering, monitoring, dan aplikasi precision agriculture.', 
'GNSS receiver dual-frequency dengan integrated UHF radio', 
'UNI-G970II-GNSS', 99900000, 109900000, 80000000, 
2, 15, true, true, true, 18, 1.2, 
'{"diameter": "18.2 cm", "tinggi": "11.8 cm"}', 
'["/images/products/unistrong-g970ii-1.jpg", "/images/products/unistrong-g970ii-2.jpg"]', 
'["GNSS receiver", "dual-frequency", "UHF radio", "Bluetooth", "survei engineering", "monitoring", "precision agriculture"]', 
'UniStrong G970II GNSS Receiver - GNSS Receiver Dual-Frequency dengan UHF Radio', 
'Beli UniStrong G970II GNSS Receiver dengan teknologi dual-frequency dan integrated UHF radio. Baterai 12 jam, cocok untuk survei engineering dan monitoring.');

-- Update stock quantities and set some products as featured
UPDATE products SET is_featured = true WHERE id IN (1, 5, 6, 13, 25, 30, 35, 40, 45, 50);
UPDATE products SET stock_quantity = stock_quantity + 10 WHERE category_id IN (1, 2, 3);
UPDATE products SET is_active = true WHERE is_active IS NULL;

-- Add more product reviews for better SEO
INSERT INTO product_reviews (product_id, user_id, rating, title, comment, is_verified, is_approved) VALUES
(6, 1, 5, 'Laser level terbaik untuk konstruksi', 'Leica Rugby 610 memberikan akurasi yang luar biasa untuk pekerjaan grading. Self-leveling bekerja dengan sempurna dan jangkauan 600m sangat membantu untuk proyek besar.', true, true),
(13, 2, 4, 'Tripod carbon yang ringan', 'Leica GST120-9 sangat ringan tapi tetap stabil. Leg locking system cepat dan mudah digunakan. Investasi yang bagus untuk survei lapangan.', true, true),
(25, 3, 5, 'Drone survey yang revolusioner', 'DJI Phantom 4 RTK mengubah cara kami melakukan survey. Akurasi centimeter-level dan kemudahan penggunaan sangat membantu produktivitas tim survey.', true, true),
(30, 4, 4, 'Kompas profesional yang reliable', 'Suunto MC-2 sangat akurat dan mudah digunakan. Clinometer terintegrasi sangat membantu untuk pengukuran slope. Build quality excellent.', true, true),
(35, 5, 5, 'GPS entry-level yang recommended', 'Garmin eTrex 10 sangat simple dan mudah digunakan. Cocok untuk pemula yang ingin belajar navigasi GPS. Harga sangat terjangkau dengan kualitas Garmin.', true, true);

-- Final count check
SELECT 
    c.name as category,
    COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name
ORDER BY c.sort_order;
