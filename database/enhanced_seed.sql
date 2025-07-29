-- Enhanced Seed Data for GeoTech Store (GPS & Survey Equipment) with SEO-friendly slugs

-- Clear existing data
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE product_attributes CASCADE;
TRUNCATE TABLE product_reviews CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE blog_posts CASCADE;
TRUNCATE TABLE brands CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE customer_groups CASCADE;
TRUNCATE TABLE users CASCADE;

-- Insert Categories with SEO-friendly slugs
INSERT INTO categories (name, slug, description, image_url, is_active, sort_order) VALUES
('GPS Devices', 'gps-devices-professional-surveying', 'Professional GPS and GNSS receivers for surveying and mapping', '/placeholder.svg?height=80&width=80&text=📡', true, 1),
('Total Stations', 'total-stations-robotic-electronic', 'High-precision total stations for surveying and construction', '/placeholder.svg?height=80&width=80&text=🔭', true, 2),
('Laser Levels', 'laser-levels-self-leveling-construction', 'Professional laser levels for construction and surveying', '/placeholder.svg?height=80&width=80&text=📏', true, 3),
('Satellite Phones', 'satellite-phones-iridium-globalstar', 'Reliable satellite communication devices for remote areas', '/placeholder.svg?height=80&width=80&text=📱', true, 4),
('Drones & UAVs', 'drones-uavs-aerial-surveying-mapping', 'Professional drones for aerial surveying and mapping', '/placeholder.svg?height=80&width=80&text=🚁', true, 5),
('Theodolites', 'theodolites-precision-angle-measurement', 'Precision theodolites for angle measurement', '/placeholder.svg?height=80&width=80&text=🔍', true, 6),
('Rangefinders', 'laser-rangefinders-distance-measurement', 'Laser rangefinders for distance measurement', '/placeholder.svg?height=80&width=80&text=📊', true, 7),
('GIS Software', 'gis-software-mapping-analysis', 'Geographic Information System software solutions', '/placeholder.svg?height=80&width=80&text=💻', true, 8),
('Field Accessories', 'field-accessories-surveying-equipment', 'Essential accessories for field work', '/placeholder.svg?height=80&width=80&text=🧰', true, 9),
('Radio Equipment', 'radio-equipment-communication-devices', 'Professional radio communication equipment', '/placeholder.svg?height=80&width=80&text=📻', true, 10);

-- Insert Brands with SEO-friendly slugs
INSERT INTO brands (name, slug, description, logo_url, is_active) VALUES
('Trimble', 'trimble-precision-positioning-solutions', 'Leading provider of advanced positioning solutions', '/placeholder.svg?height=60&width=120&text=Trimble', true),
('Leica Geosystems', 'leica-geosystems-surveying-measurement', 'Premium surveying and measurement solutions', '/placeholder.svg?height=60&width=120&text=Leica', true),
('Topcon', 'topcon-positioning-measurement-technology', 'Innovative positioning and measurement technology', '/placeholder.svg?height=60&width=120&text=Topcon', true),
('Sokkia', 'sokkia-professional-surveying-instruments', 'Professional surveying instruments and solutions', '/placeholder.svg?height=60&width=120&text=Sokkia', true),
('Spectra Precision', 'spectra-precision-measurement-tools', 'Precision measurement and positioning tools', '/placeholder.svg?height=60&width=120&text=Spectra', true),
('Iridium', 'iridium-satellite-communication', 'Global satellite communication solutions', '/placeholder.svg?height=60&width=120&text=Iridium', true),
('DJI', 'dji-professional-drones-uavs', 'Professional drones and aerial imaging solutions', '/placeholder.svg?height=60&width=120&text=DJI', true),
('Garmin', 'garmin-gps-navigation-devices', 'GPS navigation and outdoor devices', '/placeholder.svg?height=60&width=120&text=Garmin', true),
('Pentax', 'pentax-surveying-instruments', 'Professional surveying and measuring instruments', '/placeholder.svg?height=60&width=120&text=Pentax', true),
('Nikon', 'nikon-optical-surveying-equipment', 'Optical and electronic surveying equipment', '/placeholder.svg?height=60&width=120&text=Nikon', true);

-- Insert Enhanced Products with SEO-friendly slugs
INSERT INTO products (name, slug, description, short_description, sku, price, compare_price, cost_price, category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight, dimensions, images, tags, meta_title, meta_description) VALUES
-- GPS Devices
('Trimble R12i GNSS Receiver', 'trimble-r12i-gnss-receiver-professional-surveying', 'Professional GNSS receiver with advanced tilt compensation technology for high-precision surveying. Features multi-constellation GNSS support, ProPoint GNSS technology, and industry-leading accuracy. Perfect for cadastral surveying, construction layout, and topographic mapping.', 'Professional GNSS receiver with tilt compensation', 'TBL-R12I-001', 15999.00, 17999.00, 12000.00, 1, 1, true, true, true, 5, 2.5, '{"length": 20, "width": 15, "height": 10}', '["placeholder.svg?height=400&width=400&text=Trimble+R12i", "placeholder.svg?height=400&width=400&text=GNSS+Receiver"]', '["gnss", "gps", "surveying", "professional", "tilt-compensation"]', 'Trimble R12i GNSS Receiver - Professional Surveying Equipment', 'High-precision GNSS receiver with tilt compensation technology for professional surveying applications'),

('Leica GS18 T GNSS RTK Rover', 'leica-gs18-t-gnss-rtk-rover-tilt-compensation', 'Revolutionary GNSS RTK rover with tilt compensation that allows measurement of any point without having to hold the pole upright. Features Visual Positioning technology and immune to magnetic disturbances.', 'GNSS RTK rover with revolutionary tilt compensation', 'LCA-GS18T-001', 18999.00, 21999.00, 14500.00, 1, 2, true, true, true, 3, 1.8, '{"length": 18, "width": 18, "height": 8}', '["placeholder.svg?height=400&width=400&text=Leica+GS18T", "placeholder.svg?height=400&width=400&text=RTK+Rover"]', '["gnss", "rtk", "tilt-compensation", "visual-positioning"]', 'Leica GS18 T GNSS RTK Rover - Revolutionary Tilt Compensation', 'GNSS RTK rover with innovative tilt compensation technology for efficient surveying'),

('Topcon HiPer VR GNSS Receiver', 'topcon-hiper-vr-gnss-receiver-virtual-reference', 'Advanced GNSS receiver with Virtual Reference Station technology. Supports all current and future satellite constellations with 226 channels of tracking capability.', 'Advanced GNSS receiver with VRS technology', 'TPC-HIPERVR-001', 12999.00, NULL, 9800.00, 1, 3, true, false, true, 7, 2.2, '{"length": 19, "width": 19, "height": 9}', '["placeholder.svg?height=400&width=400&text=Topcon+HiPer", "placeholder.svg?height=400&width=400&text=VR+GNSS"]', '["gnss", "vrs", "226-channels", "satellite-tracking"]', 'Topcon HiPer VR GNSS Receiver - Virtual Reference Station', 'Advanced GNSS receiver with VRS technology and 226-channel tracking capability'),

-- Total Stations
('Leica TS16 Total Station', 'leica-ts16-total-station-robotic-atr-plus', 'High-precision robotic total station with automatic target recognition for efficient surveying. Features AutoHeight technology, ATRplus, and self-learning capabilities for maximum productivity in any lighting conditions.', 'High-precision robotic total station', 'LCA-TS16-001', 28999.00, NULL, 22000.00, 2, 2, true, true, true, 3, 5.2, '{"length": 35, "width": 25, "height": 30}', '["placeholder.svg?height=400&width=400&text=Leica+TS16", "placeholder.svg?height=400&width=400&text=Total+Station"]', '["total-station", "robotic", "atr-plus", "autoheight"]', 'Leica TS16 Total Station - Robotic Surveying Instrument', 'Professional robotic total station with ATRplus and AutoHeight technology'),

('Topcon GT-1200 Robotic Total Station', 'topcon-gt-1200-robotic-total-station-ultrasonic', 'Advanced robotic total station with ultra-powerful UltraSonic motors for precise positioning. Features UltraTrac technology and TSshield security for reliable operation in any environment.', 'Advanced robotic total station with UltraSonic motors', 'TPC-GT1200-001', 32999.00, 35999.00, 25000.00, 2, 3, true, true, true, 2, 5.8, '{"length": 38, "width": 28, "height": 32}', '["placeholder.svg?height=400&width=400&text=Topcon+GT1200", "placeholder.svg?height=400&width=400&text=Robotic"]', '["total-station", "robotic", "ultrasonic", "ultratrac"]', 'Topcon GT-1200 Robotic Total Station - Advanced Surveying', 'Ultra-precise robotic total station with UltraSonic motors and UltraTrac technology'),

('Trimble S9 Total Station', 'trimble-s9-total-station-precision-surveying', 'High-performance total station with advanced EDM technology and precise angle measurements. Features MagDrive technology and FineLock automatic target lock for superior accuracy.', 'High-performance total station with MagDrive', 'TBL-S9-001', 24999.00, 27999.00, 19000.00, 2, 1, true, false, true, 4, 4.8, '{"length": 33, "width": 24, "height": 28}', '["placeholder.svg?height=400&width=400&text=Trimble+S9", "placeholder.svg?height=400&width=400&text=Total+Station"]', '["total-station", "magdrive", "finelock", "edm"]', 'Trimble S9 Total Station - High-Performance Surveying', 'Advanced total station with MagDrive technology and FineLock automatic target lock'),

-- Laser Levels
('Spectra Precision GL722 Dual Grade Laser', 'spectra-precision-gl722-dual-grade-laser-level', 'Professional-grade dual grade laser level with automatic leveling and grade matching capabilities. Perfect for excavation, concrete work, and site preparation with exceptional accuracy.', 'Dual grade laser level with automatic leveling', 'SPC-GL722-001', 3299.00, 3599.00, 2400.00, 3, 5, true, false, true, 12, 3.2, '{"length": 28, "width": 18, "height": 15}', '["placeholder.svg?height=400&width=400&text=Spectra+GL722", "placeholder.svg?height=400&width=400&text=Laser+Level"]', '["laser-level", "dual-grade", "automatic-leveling", "excavation"]', 'Spectra Precision GL722 Dual Grade Laser Level', 'Professional dual grade laser level for excavation and construction work'),

('Leica Rugby 880 Laser Level', 'leica-rugby-880-laser-level-construction', 'Rugged rotating laser level designed for demanding construction environments. Features automatic leveling, long-range visibility, and superior drop protection for reliable performance.', 'Rugged rotating laser level for construction', 'LCA-RUGBY880-001', 2899.00, NULL, 2100.00, 3, 2, true, false, true, 8, 2.8, '{"length": 25, "width": 16, "height": 14}', '["placeholder.svg?height=400&width=400&text=Leica+Rugby", "placeholder.svg?height=400&width=400&text=880+Laser"]', '["laser-level", "rotating", "construction", "drop-protection"]', 'Leica Rugby 880 Laser Level - Construction Grade', 'Rugged rotating laser level with superior drop protection for construction'),

-- Satellite Phones
('Iridium 9575 Extreme Satellite Phone', 'iridium-9575-extreme-satellite-phone-global', 'Most rugged satellite phone with global coverage for communication in extreme environments. Features GPS positioning, SOS emergency button, and military-grade durability for the harshest conditions.', 'Rugged global satellite phone with GPS and SOS', 'IRD-9575-001', 1299.00, NULL, 900.00, 4, 6, true, false, true, 15, 0.3, '{"length": 15, "width": 6, "height": 3}', '["placeholder.svg?height=400&width=400&text=Iridium+9575", "placeholder.svg?height=400&width=400&text=Satellite+Phone"]', '["satellite-phone", "global-coverage", "gps", "sos", "rugged"]', 'Iridium 9575 Extreme Satellite Phone - Global Communication', 'Rugged satellite phone with global coverage and GPS positioning for extreme environments'),

-- Drones
('DJI Phantom 4 RTK', 'dji-phantom-4-rtk-drone-surveying-mapping', 'Professional surveying drone with RTK positioning system for centimeter-level accuracy. Perfect for aerial mapping, photogrammetry, and surveying applications with integrated high-resolution camera.', 'Professional RTK drone for surveying and mapping', 'DJI-P4RTK-001', 8999.00, 9999.00, 6800.00, 5, 7, true, true, true, 6, 1.4, '{"length": 35, "width": 35, "height": 20}', '["placeholder.svg?height=400&width=400&text=DJI+Phantom", "placeholder.svg?height=400&width=400&text=4+RTK"]', '["drone", "rtk", "surveying", "mapping", "photogrammetry"]', 'DJI Phantom 4 RTK - Professional Surveying Drone', 'RTK-enabled drone for centimeter-accurate aerial surveying and mapping'),

-- More GPS Devices
('Sokkia GRX3 GNSS Receiver', 'sokkia-grx3-gnss-receiver-compact-rtk', 'Compact and lightweight GNSS receiver with advanced tracking technology. Features universal tracking channels, RTK positioning, and Bluetooth connectivity for seamless data transfer and field efficiency.', 'Compact GNSS receiver with RTK and Bluetooth', 'SKA-GRX3-001', 9999.00, NULL, 7500.00, 1, 4, true, false, true, 8, 1.8, '{"length": 18, "width": 12, "height": 8}', '["placeholder.svg?height=400&width=400&text=Sokkia+GRX3", "placeholder.svg?height=400&width=400&text=GNSS+Receiver"]', '["gnss", "gps", "rtk", "compact", "bluetooth"]', 'Sokkia GRX3 GNSS Receiver - Compact Surveying Solution', 'Lightweight GNSS receiver with advanced tracking and RTK positioning capabilities'),

('Garmin Montana 700i Handheld GPS', 'garmin-montana-700i-handheld-gps-inreach', 'Rugged handheld GPS with built-in inReach satellite communication. Features 5-inch color touchscreen, preloaded TopoActive maps, and two-way satellite messaging for remote communication.', 'Rugged handheld GPS with satellite communication', 'GRM-MT700I-001', 699.00, 799.00, 520.00, 1, 8, true, false, true, 20, 0.4, '{"length": 16, "width": 7, "height": 4}', '["placeholder.svg?height=400&width=400&text=Garmin+Montana", "placeholder.svg?height=400&width=400&text=700i+GPS"]', '["handheld-gps", "satellite-communication", "inreach", "rugged"]', 'Garmin Montana 700i Handheld GPS with inReach', 'Rugged handheld GPS with built-in satellite communication and mapping'),

-- Theodolites
('Pentax ETH-520 Electronic Theodolite', 'pentax-eth-520-electronic-theodolite-precision', 'High-precision electronic theodolite with dual-axis compensator for accurate angle measurements. Features large LCD display, long battery life, and robust construction for demanding field conditions.', 'Electronic theodolite with dual-axis compensator', 'PTX-ETH520-001', 4999.00, 5499.00, 3800.00, 6, 9, true, false, true, 10, 4.5, '{"length": 30, "width": 22, "height": 25}', '["placeholder.svg?height=400&width=400&text=Pentax+ETH520", "placeholder.svg?height=400&width=400&text=Theodolite"]', '["theodolite", "electronic", "dual-axis", "compensator"]', 'Pentax ETH-520 Electronic Theodolite - Precision Angles', 'High-precision electronic theodolite with dual-axis compensator for accurate measurements'),

-- Rangefinders
('Leica Disto X4 Laser Rangefinder', 'leica-disto-x4-laser-rangefinder-outdoor', 'Professional outdoor laser rangefinder with 4x zoom camera and point-to-point measurement capability. Features Bluetooth connectivity, IP65 rating, and exceptional range for outdoor applications.', 'Outdoor laser rangefinder with 4x zoom camera', 'LCA-DISTOX4-001', 899.00, 999.00, 650.00, 7, 2, true, false, true, 15, 0.3, '{"length": 16, "width": 6, "height": 3}', '["placeholder.svg?height=400&width=400&text=Leica+Disto", "placeholder.svg?height=400&width=400&text=X4+Rangefinder"]', '["rangefinder", "laser", "outdoor", "bluetooth", "zoom-camera"]', 'Leica Disto X4 Laser Rangefinder - Outdoor Precision', 'Professional outdoor laser rangefinder with 4x zoom camera and Bluetooth'),

-- Field Accessories
('Seco Heavy Duty Aluminum Tripod', 'seco-heavy-duty-aluminum-tripod-surveying', 'Professional heavy-duty aluminum tripod for surveying instruments. Features quick-clamp leg locks, adjustable legs, and stable platform for precise instrument mounting and operation.', 'Heavy-duty aluminum tripod for surveying', 'SEC-HDTRIPOD-001', 299.00, 349.00, 220.00, 9, 1, true, false, true, 25, 3.8, '{"length": 110, "width": 15, "height": 15}', '["placeholder.svg?height=400&width=400&text=Seco+Tripod", "placeholder.svg?height=400&width=400&text=Heavy+Duty"]', '["tripod", "aluminum", "heavy-duty", "surveying", "quick-clamp"]', 'Seco Heavy Duty Aluminum Tripod - Professional Surveying', 'Professional heavy-duty aluminum tripod with quick-clamp legs for surveying instruments'),

('Trimble TSC7 Data Collector', 'trimble-tsc7-data-collector-android-surveying', 'Advanced data collector with Android operating system for field surveying applications. Features 7-inch touchscreen, rugged design, and integrated Trimble Access software for comprehensive data management.', 'Android data collector with 7-inch touchscreen', 'TBL-TSC7-001', 4999.00, NULL, 3800.00, 9, 1, true, true, true, 12, 0.8, '{"length": 20, "width": 12, "height": 3}', '["placeholder.svg?height=400&width=400&text=Trimble+TSC7", "placeholder.svg?height=400&width=400&text=Data+Collector"]', '["data-collector", "android", "touchscreen", "trimble-access"]', 'Trimble TSC7 Data Collector - Android Surveying Controller', 'Advanced Android data collector with 7-inch touchscreen for field surveying'),

-- Radio Equipment
('Icom IC-F3230DT Digital Radio', 'icom-ic-f3230dt-digital-radio-construction', 'Professional digital two-way radio for construction and surveying teams. Features IDAS digital technology, long battery life, and rugged construction for reliable team communication.', 'Digital two-way radio for construction teams', 'ICM-F3230DT-001', 399.00, 449.00, 300.00, 10, 1, true, false, true, 18, 0.4, '{"length": 12, "width": 6, "height": 4}', '["placeholder.svg?height=400&width=400&text=Icom+F3230DT", "placeholder.svg?height=400&width=400&text=Digital+Radio"]', '["radio", "digital", "two-way", "construction", "idas"]', 'Icom IC-F3230DT Digital Radio - Construction Communication', 'Professional digital two-way radio with IDAS technology for construction teams');

-- Insert Product Attributes
INSERT INTO product_attributes (product_id, name, value) VALUES
-- Trimble R12i
(1, 'Accuracy', 'Sub-centimeter RTK'),
(1, 'Channels', '440+ tracking channels'),
(1, 'Battery Life', '8+ hours continuous'),
(1, 'Tilt Compensation', 'ProPoint technology'),
(1, 'Constellations', 'GPS, GLONASS, Galileo, BeiDou'),

-- Leica GS18 T
(2, 'Accuracy', '8mm H + 15mm V RTK'),
(2, 'Tilt Range', '60° all directions'),
(2, 'Immune Technology', 'Magnetic disturbance immune'),
(2, 'Visual Positioning', 'Integrated camera'),
(2, 'Connectivity', 'Bluetooth, WiFi, Radio'),

-- Topcon HiPer VR
(3, 'Channels', '226 universal tracking'),
(3, 'Accuracy', '10mm + 1ppm RTK'),
(3, 'Technology', 'Virtual Reference Station'),
(3, 'Battery Life', '10+ hours'),
(3, 'Operating Temp', '-40°C to +65°C'),

-- Leica TS16
(4, 'Angle Accuracy', '1" (0.3 mgon)'),
(4, 'Distance Accuracy', '1mm + 1.5ppm'),
(4, 'Range', '3500m with reflector'),
(4, 'ATR Technology', 'ATRplus with PowerSearch'),
(4, 'AutoHeight', 'Automatic height measurement'),

-- Topcon GT-1200
(5, 'Angle Accuracy', '1" (0.3 mgon)'),
(5, 'Distance Accuracy', '2mm + 2ppm'),
(5, 'Range', '5000m with reflector'),
(5, 'UltraSonic Motors', 'High-speed tracking'),
(5, 'UltraTrac Technology', 'Advanced target tracking'),

-- Trimble S9
(6, 'Angle Accuracy', '1" (0.3 mgon)'),
(6, 'Distance Accuracy', '1mm + 1ppm'),
(6, 'MagDrive Technology', 'Magnetic drive system'),
(6, 'FineLock', 'Automatic target lock'),
(6, 'Range', '5000m reflectorless'),

-- Spectra GL722
(7, 'Accuracy', '±1 arc second'),
(7, 'Range', '800m diameter'),
(7, 'Grade Range', '±15%'),
(7, 'Self-Leveling', '±6° automatic'),
(7, 'Beam Type', 'Dual grade laser'),

-- Leica Rugby 880
(8, 'Accuracy', '±10 arc seconds'),
(8, 'Range', '500m with detector'),
(8, 'Drop Protection', '1m onto concrete'),
(8, 'Water Rating', 'IP67'),
(8, 'Rotation Speed', '600 rpm'),

-- Iridium 9575
(9, 'Coverage', '100% global including poles'),
(9, 'Battery Life', '30 hours standby'),
(9, 'GPS Capability', 'Integrated GPS'),
(9, 'Emergency SOS', 'One-touch SOS'),
(9, 'Operating Temp', '-10°C to +55°C'),

-- DJI Phantom 4 RTK
(10, 'RTK Accuracy', '1cm+1ppm horizontally'),
(10, 'Camera Resolution', '20MP 1-inch CMOS'),
(10, 'Flight Time', '30 minutes'),
(10, 'Max Speed', '58 km/h'),
(10, 'RTK Module', 'Built-in D-RTK 2.0');

-- Insert Customer Groups
INSERT INTO customer_groups (name, description, discount_percentage, minimum_order_amount) VALUES
('Retail', 'Individual customers and small businesses', 0.00, 0.00),
('Professional', 'Professional surveyors and contractors', 5.00, 1000.00),
('Enterprise', 'Large companies and government agencies', 10.00, 5000.00),
('Educational', 'Schools and universities', 15.00, 500.00);

-- Insert Admin User
INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified_at, is_active) VALUES
('admin@geotech-store.com', '$2b$10$example_hash_here', 'Admin', 'User', 'admin', NOW(), true);

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

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, price, total) VALUES
(1, 1, 1, 15999.00, 15999.00),
(2, 4, 1, 28999.00, 28999.00),
(3, 5, 1, 32999.00, 32999.00),
(4, 9, 1, 1299.00, 1299.00),
(5, 11, 1, 9999.00, 9999.00),
(6, 10, 1, 8999.00, 8999.00),
(7, 16, 1, 4999.00, 4999.00),
(8, 12, 1, 699.00, 699.00);

-- Insert Blog Posts with SEO-friendly slugs
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author_id, status, published_at) VALUES
('Top 10 GPS Devices for Professional Surveying in 2024', 'top-10-gps-devices-professional-surveying-2024', 'Comprehensive guide to the best GPS devices for professional surveying work. We review the latest GNSS receivers from Trimble, Leica, Topcon, and other leading manufacturers...', 'Discover the top GPS devices trusted by professional surveyors worldwide in 2024', '/placeholder.svg?height=300&width=500&text=GPS+Devices', 1, 'published', NOW() - INTERVAL '2 days'),

('Understanding GNSS Technology in Modern Surveying Applications', 'understanding-gnss-technology-modern-surveying-applications', 'Deep dive into GNSS technology and its applications in surveying. Learn about RTK, PPK, and the latest advances in satellite positioning technology...', 'Learn about the latest GNSS technology and how it revolutionizes modern surveying', '/placeholder.svg?height=300&width=500&text=GNSS+Technology', 1, 'published', NOW() - INTERVAL '5 days'),

('Best Practices for Total Station Setup and Calibration', 'best-practices-total-station-setup-calibration', 'Essential tips for proper total station setup and calibration. Master the fundamentals of robotic total stations and improve your surveying efficiency...', 'Master the art of total station setup with these professional tips and techniques', '/placeholder.svg?height=300&width=500&text=Total+Station', 1, 'published', NOW() - INTERVAL '10 days'),

('How to Choose the Right Laser Level for Construction Projects', 'how-choose-right-laser-level-construction-projects', 'Complete guide to selecting the perfect laser level for your construction needs. Compare rotating lasers, line lasers, and grade lasers...', 'Expert advice on choosing the right laser level for your construction projects', '/placeholder.svg?height=300&width=500&text=Laser+Level', 1, 'published', NOW() - INTERVAL '15 days'),

('Drone Surveying: Complete Guide to UAV Mapping and Photogrammetry', 'drone-surveying-complete-guide-uav-mapping-photogrammetry', 'Comprehensive guide to drone surveying, UAV mapping, and photogrammetry techniques. Learn about RTK drones, flight planning, and data processing...', 'Master drone surveying with this complete guide to UAV mapping and photogrammetry', '/placeholder.svg?height=300&width=500&text=Drone+Surveying', 1, 'published', NOW() - INTERVAL '20 days');

-- Update product ratings and reviews count
UPDATE products SET rating = 4.8, reviews = 23 WHERE id = 1;
UPDATE products SET rating = 4.9, reviews = 18 WHERE id = 2;
UPDATE products SET rating = 4.7, reviews = 31 WHERE id = 4;
UPDATE products SET rating = 4.6, reviews = 12 WHERE id = 5;
UPDATE products SET rating = 4.8, reviews = 27 WHERE id = 10;
UPDATE products SET rating = 4.5, reviews = 15 WHERE id = 11;
UPDATE products SET rating = 4.7, reviews = 8 WHERE id = 16;
