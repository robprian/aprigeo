-- Corrected Products and Additional Data for Enhanced SEO

-- Insert Admin User first
INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified_at, is_active) VALUES
('admin@geotech-store.com', '$2b$10$example_hash_here', 'Admin', 'User', 'admin', NOW(), true);

-- Insert Products with correct category and brand IDs
INSERT INTO products (name, slug, description, short_description, sku, price, compare_price, cost_price, category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight, dimensions, images, tags, meta_title, meta_description) VALUES
-- GPS Devices (category_id: 18)
('Trimble R12i GNSS Receiver', 'trimble-r12i-gnss-receiver-professional-surveying', 'Professional GNSS receiver with advanced tilt compensation technology for high-precision surveying. Features multi-constellation GNSS support, ProPoint GNSS technology, and industry-leading accuracy. Perfect for cadastral surveying, construction layout, and topographic mapping.', 'Professional GNSS receiver with tilt compensation', 'TBL-R12I-001', 15999.00, 17999.00, 12000.00, 18, 11, true, true, true, 5, 2.5, '{"length": 20, "width": 15, "height": 10}', '["gnss", "gps", "surveying", "professional", "tilt-compensation"]', 'Trimble R12i GNSS Receiver - Professional Surveying Equipment', 'High-precision GNSS receiver with tilt compensation technology for professional surveying applications'),

('Leica GS18 T GNSS RTK Rover', 'leica-gs18-t-gnss-rtk-rover-tilt-compensation', 'Revolutionary GNSS RTK rover with tilt compensation that allows measurement of any point without having to hold the pole upright. Features Visual Positioning technology and immune to magnetic disturbances.', 'GNSS RTK rover with revolutionary tilt compensation', 'LCA-GS18T-001', 18999.00, 21999.00, 14500.00, 18, 12, true, true, true, 3, 1.8, '{"length": 18, "width": 18, "height": 8}', '["gnss", "rtk", "tilt-compensation", "visual-positioning"]', 'Leica GS18 T GNSS RTK Rover - Revolutionary Tilt Compensation', 'GNSS RTK rover with innovative tilt compensation technology for efficient surveying'),

('Topcon HiPer VR GNSS Receiver', 'topcon-hiper-vr-gnss-receiver-virtual-reference', 'Advanced GNSS receiver with Virtual Reference Station technology. Supports all current and future satellite constellations with 226 channels of tracking capability.', 'Advanced GNSS receiver with VRS technology', 'TPC-HIPERVR-001', 12999.00, NULL, 9800.00, 18, 13, true, false, true, 7, 2.2, '{"length": 19, "width": 19, "height": 9}', '["gnss", "vrs", "226-channels", "satellite-tracking"]', 'Topcon HiPer VR GNSS Receiver - Virtual Reference Station', 'Advanced GNSS receiver with VRS technology and 226-channel tracking capability'),

('Sokkia GRX3 GNSS Receiver', 'sokkia-grx3-gnss-receiver-compact-rtk', 'Compact and lightweight GNSS receiver with advanced tracking technology. Features universal tracking channels, RTK positioning, and Bluetooth connectivity for seamless data transfer and field efficiency.', 'Compact GNSS receiver with RTK and Bluetooth', 'SKA-GRX3-001', 9999.00, NULL, 7500.00, 18, 14, true, false, true, 8, 1.8, '{"length": 18, "width": 12, "height": 8}', '["gnss", "gps", "rtk", "compact", "bluetooth"]', 'Sokkia GRX3 GNSS Receiver - Compact Surveying Solution', 'Lightweight GNSS receiver with advanced tracking and RTK positioning capabilities'),

('Garmin Montana 700i Handheld GPS', 'garmin-montana-700i-handheld-gps-inreach', 'Rugged handheld GPS with built-in inReach satellite communication. Features 5-inch color touchscreen, preloaded TopoActive maps, and two-way satellite messaging for remote communication.', 'Rugged handheld GPS with satellite communication', 'GRM-MT700I-001', 699.00, 799.00, 520.00, 18, 18, true, false, true, 20, 0.4, '{"length": 16, "width": 7, "height": 4}', '["handheld-gps", "satellite-communication", "inreach", "rugged"]', 'Garmin Montana 700i Handheld GPS with inReach', 'Rugged handheld GPS with built-in satellite communication and mapping'),

-- Total Stations (category_id: 19)
('Leica TS16 Total Station', 'leica-ts16-total-station-robotic-atr-plus', 'High-precision robotic total station with automatic target recognition for efficient surveying. Features AutoHeight technology, ATRplus, and self-learning capabilities for maximum productivity in any lighting conditions.', 'High-precision robotic total station', 'LCA-TS16-001', 28999.00, NULL, 22000.00, 19, 12, true, true, true, 3, 5.2, '{"length": 35, "width": 25, "height": 30}', '["total-station", "robotic", "atr-plus", "autoheight"]', 'Leica TS16 Total Station - Robotic Surveying Instrument', 'Professional robotic total station with ATRplus and AutoHeight technology'),

('Topcon GT-1200 Robotic Total Station', 'topcon-gt-1200-robotic-total-station-ultrasonic', 'Advanced robotic total station with ultra-powerful UltraSonic motors for precise positioning. Features UltraTrac technology and TSshield security for reliable operation in any environment.', 'Advanced robotic total station with UltraSonic motors', 'TPC-GT1200-001', 32999.00, 35999.00, 25000.00, 19, 13, true, true, true, 2, 5.8, '{"length": 38, "width": 28, "height": 32}', '["total-station", "robotic", "ultrasonic", "ultratrac"]', 'Topcon GT-1200 Robotic Total Station - Advanced Surveying', 'Ultra-precise robotic total station with UltraSonic motors and UltraTrac technology'),

('Trimble S9 Total Station', 'trimble-s9-total-station-precision-surveying', 'High-performance total station with advanced EDM technology and precise angle measurements. Features MagDrive technology and FineLock automatic target lock for superior accuracy.', 'High-performance total station with MagDrive', 'TBL-S9-001', 24999.00, 27999.00, 19000.00, 19, 11, true, false, true, 4, 4.8, '{"length": 33, "width": 24, "height": 28}', '["total-station", "magdrive", "finelock", "edm"]', 'Trimble S9 Total Station - High-Performance Surveying', 'Advanced total station with MagDrive technology and FineLock automatic target lock'),

-- Laser Levels (category_id: 20)
('Spectra Precision GL722 Dual Grade Laser', 'spectra-precision-gl722-dual-grade-laser-level', 'Professional-grade dual grade laser level with automatic leveling and grade matching capabilities. Perfect for excavation, concrete work, and site preparation with exceptional accuracy.', 'Dual grade laser level with automatic leveling', 'SPC-GL722-001', 3299.00, 3599.00, 2400.00, 20, 15, true, false, true, 12, 3.2, '{"length": 28, "width": 18, "height": 15}', '["laser-level", "dual-grade", "automatic-leveling", "excavation"]', 'Spectra Precision GL722 Dual Grade Laser Level', 'Professional dual grade laser level for excavation and construction work'),

('Leica Rugby 880 Laser Level', 'leica-rugby-880-laser-level-construction', 'Rugged rotating laser level designed for demanding construction environments. Features automatic leveling, long-range visibility, and superior drop protection for reliable performance.', 'Rugged rotating laser level for construction', 'LCA-RUGBY880-001', 2899.00, NULL, 2100.00, 20, 12, true, false, true, 8, 2.8, '{"length": 25, "width": 16, "height": 14}', '["laser-level", "rotating", "construction", "drop-protection"]', 'Leica Rugby 880 Laser Level - Construction Grade', 'Rugged rotating laser level with superior drop protection for construction'),

-- Satellite Phones (category_id: 21)
('Iridium 9575 Extreme Satellite Phone', 'iridium-9575-extreme-satellite-phone-global', 'Most rugged satellite phone with global coverage for communication in extreme environments. Features GPS positioning, SOS emergency button, and military-grade durability for the harshest conditions.', 'Rugged global satellite phone with GPS and SOS', 'IRD-9575-001', 1299.00, NULL, 900.00, 21, 16, true, false, true, 15, 0.3, '{"length": 15, "width": 6, "height": 3}', '["satellite-phone", "global-coverage", "gps", "sos", "rugged"]', 'Iridium 9575 Extreme Satellite Phone - Global Communication', 'Rugged satellite phone with global coverage and GPS positioning for extreme environments'),

-- Drones (category_id: 22)
('DJI Phantom 4 RTK', 'dji-phantom-4-rtk-drone-surveying-mapping', 'Professional surveying drone with RTK positioning system for centimeter-level accuracy. Perfect for aerial mapping, photogrammetry, and surveying applications with integrated high-resolution camera.', 'Professional RTK drone for surveying and mapping', 'DJI-P4RTK-001', 8999.00, 9999.00, 6800.00, 22, 17, true, true, true, 6, 1.4, '{"length": 35, "width": 35, "height": 20}', '["drone", "rtk", "surveying", "mapping", "photogrammetry"]', 'DJI Phantom 4 RTK - Professional Surveying Drone', 'RTK-enabled drone for centimeter-accurate aerial surveying and mapping'),

-- Theodolites (category_id: 23)
('Pentax ETH-520 Electronic Theodolite', 'pentax-eth-520-electronic-theodolite-precision', 'High-precision electronic theodolite with dual-axis compensator for accurate angle measurements. Features large LCD display, long battery life, and robust construction for demanding field conditions.', 'Electronic theodolite with dual-axis compensator', 'PTX-ETH520-001', 4999.00, 5499.00, 3800.00, 23, 19, true, false, true, 10, 4.5, '{"length": 30, "width": 22, "height": 25}', '["theodolite", "electronic", "dual-axis", "compensator"]', 'Pentax ETH-520 Electronic Theodolite - Precision Angles', 'High-precision electronic theodolite with dual-axis compensator for accurate measurements'),

-- Rangefinders (category_id: 24)
('Leica Disto X4 Laser Rangefinder', 'leica-disto-x4-laser-rangefinder-outdoor', 'Professional outdoor laser rangefinder with 4x zoom camera and point-to-point measurement capability. Features Bluetooth connectivity, IP65 rating, and exceptional range for outdoor applications.', 'Outdoor laser rangefinder with 4x zoom camera', 'LCA-DISTOX4-001', 899.00, 999.00, 650.00, 24, 12, true, false, true, 15, 0.3, '{"length": 16, "width": 6, "height": 3}', '["rangefinder", "laser", "outdoor", "bluetooth", "zoom-camera"]', 'Leica Disto X4 Laser Rangefinder - Outdoor Precision', 'Professional outdoor laser rangefinder with 4x zoom camera and Bluetooth'),

-- Field Accessories (category_id: 26)
('Seco Heavy Duty Aluminum Tripod', 'seco-heavy-duty-aluminum-tripod-surveying', 'Professional heavy-duty aluminum tripod for surveying instruments. Features quick-clamp leg locks, adjustable legs, and stable platform for precise instrument mounting and operation.', 'Heavy-duty aluminum tripod for surveying', 'SEC-HDTRIPOD-001', 299.00, 349.00, 220.00, 26, 11, true, false, true, 25, 3.8, '{"length": 110, "width": 15, "height": 15}', '["tripod", "aluminum", "heavy-duty", "surveying", "quick-clamp"]', 'Seco Heavy Duty Aluminum Tripod - Professional Surveying', 'Professional heavy-duty aluminum tripod with quick-clamp legs for surveying instruments'),

('Trimble TSC7 Data Collector', 'trimble-tsc7-data-collector-android-surveying', 'Advanced data collector with Android operating system for field surveying applications. Features 7-inch touchscreen, rugged design, and integrated Trimble Access software for comprehensive data management.', 'Android data collector with 7-inch touchscreen', 'TBL-TSC7-001', 4999.00, NULL, 3800.00, 26, 11, true, true, true, 12, 0.8, '{"length": 20, "width": 12, "height": 3}', '["data-collector", "android", "touchscreen", "trimble-access"]', 'Trimble TSC7 Data Collector - Android Surveying Controller', 'Advanced Android data collector with 7-inch touchscreen for field surveying');

-- Insert Product Attributes for the new products
INSERT INTO product_attributes (product_id, name, value) VALUES
-- Get the last inserted product IDs and add attributes
((SELECT currval('products_id_seq') - 17), 'Accuracy', 'Sub-centimeter RTK'),
((SELECT currval('products_id_seq') - 17), 'Channels', '440+ tracking channels'),
((SELECT currval('products_id_seq') - 17), 'Battery Life', '8+ hours continuous'),
((SELECT currval('products_id_seq') - 17), 'Tilt Compensation', 'ProPoint technology'),

((SELECT currval('products_id_seq') - 16), 'Accuracy', '8mm H + 15mm V RTK'),
((SELECT currval('products_id_seq') - 16), 'Tilt Range', '60° all directions'),
((SELECT currval('products_id_seq') - 16), 'Immune Technology', 'Magnetic disturbance immune'),

((SELECT currval('products_id_seq') - 15), 'Channels', '226 universal tracking'),
((SELECT currval('products_id_seq') - 15), 'Accuracy', '10mm + 1ppm RTK'),
((SELECT currval('products_id_seq') - 15), 'Technology', 'Virtual Reference Station'),

((SELECT currval('products_id_seq') - 8), 'Angle Accuracy', '1" (0.3 mgon)'),
((SELECT currval('products_id_seq') - 8), 'Distance Accuracy', '1mm + 1.5ppm'),
((SELECT currval('products_id_seq') - 8), 'Range', '3500m with reflector'),

((SELECT currval('products_id_seq') - 7), 'Angle Accuracy', '1" (0.3 mgon)'),
((SELECT currval('products_id_seq') - 7), 'Distance Accuracy', '2mm + 2ppm'),
((SELECT currval('products_id_seq') - 7), 'Range', '5000m with reflector'),

((SELECT currval('products_id_seq') - 6), 'RTK Accuracy', '1cm+1ppm horizontally'),
((SELECT currval('products_id_seq') - 6), 'Camera Resolution', '20MP 1-inch CMOS'),
((SELECT currval('products_id_seq') - 6), 'Flight Time', '30 minutes');

-- Insert Sample Orders for Dashboard Stats
INSERT INTO orders (user_id, order_number, status, total_amount, subtotal, currency, created_at) VALUES
(1, 'ORD-2024-001', 'completed', 15999.00, 15999.00, 'USD', NOW() - INTERVAL '1 day'),
(1, 'ORD-2024-002', 'completed', 28999.00, 28999.00, 'USD', NOW() - INTERVAL '2 days'),
(1, 'ORD-2024-003', 'pending', 32999.00, 32999.00, 'USD', NOW() - INTERVAL '3 days'),
(1, 'ORD-2024-004', 'completed', 1299.00, 1299.00, 'USD', NOW() - INTERVAL '5 days'),
(1, 'ORD-2024-005', 'completed', 9999.00, 9999.00, 'USD', NOW() - INTERVAL '7 days'),
(1, 'ORD-2024-006', 'completed', 8999.00, 8999.00, 'USD', NOW() - INTERVAL '10 days'),
(1, 'ORD-2024-007', 'shipped', 4999.00, 4999.00, 'USD', NOW() - INTERVAL '12 days'),
(1, 'ORD-2024-008', 'completed', 699.00, 699.00, 'USD', NOW() - INTERVAL '15 days');

-- Insert Order Items (using relative product IDs)
INSERT INTO order_items (order_id, product_id, quantity, price, total) VALUES
(1, (SELECT currval('products_id_seq') - 17), 1, 15999.00, 15999.00),
(2, (SELECT currval('products_id_seq') - 12), 1, 28999.00, 28999.00),
(3, (SELECT currval('products_id_seq') - 11), 1, 32999.00, 32999.00),
(4, (SELECT currval('products_id_seq') - 6), 1, 1299.00, 1299.00),
(5, (SELECT currval('products_id_seq') - 14), 1, 9999.00, 9999.00),
(6, (SELECT currval('products_id_seq') - 6), 1, 8999.00, 8999.00),
(7, (SELECT currval('products_id_seq') - 0), 1, 4999.00, 4999.00),
(8, (SELECT currval('products_id_seq') - 13), 1, 699.00, 699.00);

-- Insert Blog Posts with SEO-friendly slugs
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author_id, status, published_at) VALUES
('Top 10 GPS Devices for Professional Surveying in 2024', 'top-10-gps-devices-professional-surveying-2024', 'Comprehensive guide to the best GPS devices for professional surveying work. We review the latest GNSS receivers from Trimble, Leica, Topcon, and other leading manufacturers with detailed specifications, real-world testing, and expert recommendations...', 'Discover the top GPS devices trusted by professional surveyors worldwide in 2024', '/placeholder.svg?height=300&width=500&text=GPS+Devices', 1, 'published', NOW() - INTERVAL '2 days'),

('Understanding GNSS Technology in Modern Surveying Applications', 'understanding-gnss-technology-modern-surveying-applications', 'Deep dive into GNSS technology and its applications in surveying. Learn about RTK, PPK, and the latest advances in satellite positioning technology including multi-constellation tracking, tilt compensation, and precision techniques...', 'Learn about the latest GNSS technology and how it revolutionizes modern surveying', '/placeholder.svg?height=300&width=500&text=GNSS+Technology', 1, 'published', NOW() - INTERVAL '5 days'),

('Best Practices for Total Station Setup and Calibration', 'best-practices-total-station-setup-calibration', 'Essential tips for proper total station setup and calibration. Master the fundamentals of robotic total stations, learn about automatic target recognition, and improve your surveying efficiency with professional techniques...', 'Master the art of total station setup with these professional tips and techniques', '/placeholder.svg?height=300&width=500&text=Total+Station', 1, 'published', NOW() - INTERVAL '10 days'),

('How to Choose the Right Laser Level for Construction Projects', 'how-choose-right-laser-level-construction-projects', 'Complete guide to selecting the perfect laser level for your construction needs. Compare rotating lasers, line lasers, and grade lasers with expert recommendations for different applications...', 'Expert advice on choosing the right laser level for your construction projects', '/placeholder.svg?height=300&width=500&text=Laser+Level', 1, 'published', NOW() - INTERVAL '15 days'),

('Drone Surveying: Complete Guide to UAV Mapping and Photogrammetry', 'drone-surveying-complete-guide-uav-mapping-photogrammetry', 'Comprehensive guide to drone surveying, UAV mapping, and photogrammetry techniques. Learn about RTK drones, flight planning, data processing, and professional workflows for aerial surveying projects...', 'Master drone surveying with this complete guide to UAV mapping and photogrammetry', '/placeholder.svg?height=300&width=500&text=Drone+Surveying', 1, 'published', NOW() - INTERVAL '20 days');
