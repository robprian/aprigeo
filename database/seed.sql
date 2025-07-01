-- Seed Data for GeoTech Store (GPS & Survey Equipment)

-- Insert Categories
INSERT INTO categories (name, slug, description, image_url, is_active, sort_order) VALUES
('GPS Devices', 'gps-devices', 'Professional GPS and GNSS receivers for surveying and mapping', '/placeholder.svg?height=80&width=80&text=📡', true, 1),
('Total Stations', 'total-stations', 'High-precision total stations for surveying and construction', '/placeholder.svg?height=80&width=80&text=🔭', true, 2),
('Laser Levels', 'laser-levels', 'Professional laser levels for construction and surveying', '/placeholder.svg?height=80&width=80&text=📏', true, 3),
('Satellite Phones', 'satellite-phones', 'Reliable satellite communication devices for remote areas', '/placeholder.svg?height=80&width=80&text=📱', true, 4),
('Drones & UAVs', 'drones-uavs', 'Professional drones for aerial surveying and mapping', '/placeholder.svg?height=80&width=80&text=🚁', true, 5),
('Theodolites', 'theodolites', 'Precision theodolites for angle measurement', '/placeholder.svg?height=80&width=80&text=🔍', true, 6),
('Rangefinders', 'rangefinders', 'Laser rangefinders for distance measurement', '/placeholder.svg?height=80&width=80&text=📊', true, 7),
('GIS Software', 'gis-software', 'Geographic Information System software solutions', '/placeholder.svg?height=80&width=80&text=💻', true, 8),
('Field Accessories', 'field-accessories', 'Essential accessories for field work', '/placeholder.svg?height=80&width=80&text=🧰', true, 9),
('Radio Equipment', 'radio-equipment', 'Professional radio communication equipment', '/placeholder.svg?height=80&width=80&text=📻', true, 10);

-- Insert Brands
INSERT INTO brands (name, slug, description, logo_url, is_active) VALUES
('Trimble', 'trimble', 'Leading provider of advanced positioning solutions', '/placeholder.svg?height=60&width=120&text=Trimble', true),
('Leica Geosystems', 'leica-geosystems', 'Premium surveying and measurement solutions', '/placeholder.svg?height=60&width=120&text=Leica', true),
('Topcon', 'topcon', 'Innovative positioning and measurement technology', '/placeholder.svg?height=60&width=120&text=Topcon', true),
('Sokkia', 'sokkia', 'Professional surveying instruments and solutions', '/placeholder.svg?height=60&width=120&text=Sokkia', true),
('Spectra Precision', 'spectra-precision', 'Precision measurement and positioning tools', '/placeholder.svg?height=60&width=120&text=Spectra', true),
('Iridium', 'iridium', 'Global satellite communication solutions', '/placeholder.svg?height=60&width=120&text=Iridium', true);

-- Insert Products
INSERT INTO products (name, slug, description, short_description, sku, price, compare_price, cost_price, category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, weight, dimensions, images, tags, meta_title, meta_description) VALUES
('Trimble R12i GNSS', 'trimble-r12i-gnss', 'Professional GNSS receiver with advanced tilt compensation technology for high-precision surveying. Features multi-constellation GNSS support, ProPoint GNSS technology, and industry-leading accuracy.', 'Professional GNSS receiver with tilt compensation', 'TBL-R12I-01', 15999.00, 17999.00, 12000.00, 1, 1, true, true, true, 5, 2.5, '{"length": 20, "width": 15, "height": 10}', '["placeholder.svg?height=400&width=400", "placeholder.svg?height=400&width=400"]', '["gnss", "gps", "surveying", "professional"]', 'Trimble R12i GNSS Receiver - Professional Surveying Equipment', 'High-precision GNSS receiver with tilt compensation technology for professional surveying applications'),

('Leica TS16 Total Station', 'leica-ts16-total-station', 'High-precision robotic total station with automatic target recognition for efficient surveying. Features AutoHeight technology, ATRplus, and self-learning capabilities for maximum productivity.', 'High-precision robotic total station', 'LCA-TS16-01', 28999.00, NULL, 22000.00, 2, 2, true, true, true, 3, 5.2, '{"length": 35, "width": 25, "height": 30}', '["placeholder.svg?height=400&width=400", "placeholder.svg?height=400&width=400"]', '["total-station", "robotic", "surveying", "precision"]', 'Leica TS16 Total Station - Robotic Surveying Instrument', 'Professional robotic total station with automatic target recognition and high precision measurements'),

('Topcon GT-1200 Robotic', 'topcon-gt-1200-robotic', 'Advanced robotic total station with ultra-powerful UltraSonic motors for precise positioning. Features UltraTrac technology and TSshield security for reliable operation in any environment.', 'Advanced robotic total station', 'TPC-GT1200-01', 32999.00, 35999.00, 25000.00, 2, 3, true, true, true, 2, 5.8, '{"length": 38, "width": 28, "height": 32}', '["placeholder.svg?height=400&width=400", "placeholder.svg?height=400&width=400"]', '["total-station", "robotic", "ultrasonic", "precision"]', 'Topcon GT-1200 Robotic Total Station - Advanced Surveying', 'Ultra-precise robotic total station with UltraSonic motors and advanced tracking technology'),

('Iridium 9575 Satellite Phone', 'iridium-9575-satellite-phone', 'Reliable satellite phone with global coverage for communication in remote areas. Features GPS positioning, SOS emergency button, and rugged design for extreme conditions.', 'Global satellite phone with GPS', 'IRD-9575-01', 1299.00, NULL, 900.00, 4, 6, true, false, true, 15, 0.3, '{"length": 15, "width": 6, "height": 3}', '["placeholder.svg?height=400&width=400", "placeholder.svg?height=400&width=400"]', '["satellite", "phone", "communication", "gps"]', 'Iridium 9575 Satellite Phone - Global Communication', 'Reliable satellite phone with global coverage and GPS positioning for remote communication'),

('Spectra Precision Laser Level', 'spectra-precision-laser-level', 'Professional-grade laser level with self-leveling capability for construction and surveying. Features horizontal and vertical beams, IP67 water resistance, and long battery life.', 'Self-leveling laser level', 'SPC-LL-01', 899.00, 999.00, 650.00, 3, 5, true, false, false, 0, 1.2, '{"length": 25, "width": 15, "height": 12}', '["placeholder.svg?height=400&width=400", "placeholder.svg?height=400&width=400"]', '["laser", "level", "construction", "surveying"]', 'Spectra Precision Laser Level - Professional Construction Tool', 'Self-leveling laser level with horizontal and vertical beams for precision construction work'),

('Sokkia GRX3 GNSS Receiver', 'sokkia-grx3-gnss-receiver', 'Compact and lightweight GNSS receiver with advanced tracking technology. Features universal tracking channels, RTK positioning, and Bluetooth connectivity for seamless data transfer.', 'Compact GNSS receiver with RTK', 'SKA-GRX3-01', 9999.00, NULL, 7500.00, 1, 4, true, false, true, 8, 1.8, '{"length": 18, "width": 12, "height": 8}', '["placeholder.svg?height=400&width=400", "placeholder.svg?height=400&width=400"]', '["gnss", "gps", "rtk", "compact"]', 'Sokkia GRX3 GNSS Receiver - Compact Surveying Solution', 'Lightweight GNSS receiver with advanced tracking and RTK positioning capabilities');

-- Insert Product Attributes
INSERT INTO product_attributes (product_id, name, value) VALUES
(1, 'Accuracy', 'Sub-centimeter'),
(1, 'Channels', '440'),
(1, 'Battery Life', '8+ hours'),
(1, 'Tilt Compensation', 'Yes'),
(2, 'Accuracy', '1" angular, 1mm + 1.5ppm distance'),
(2, 'Range', '3500m'),
(2, 'Automatic Target Recognition', 'Yes'),
(2, 'Servo Drive', 'Yes'),
(3, 'Accuracy', '1" angular, 2mm + 2ppm distance'),
(3, 'Range', '5000m'),
(3, 'UltraSonic Motors', 'Yes'),
(3, 'Tracking Speed', '30°/sec'),
(4, 'Coverage', 'Global'),
(4, 'Battery Life', '30 hours standby'),
(4, 'GPS', 'Yes'),
(4, 'Emergency SOS', 'Yes'),
(5, 'Accuracy', '±1mm at 30m'),
(5, 'Range', '300m diameter'),
(5, 'Self-Leveling', 'Yes'),
(5, 'Water Resistance', 'IP67'),
(6, 'Channels', '226'),
(6, 'RTK Accuracy', '8mm + 1ppm horizontal'),
(6, 'Connectivity', 'Bluetooth, WiFi'),
(6, 'Battery Life', '12+ hours');

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
(1, 'ORD-2024-005', 'completed', 9999.00, 9999.00, 'USD', NOW() - INTERVAL '7 days');

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, price, total) VALUES
(1, 1, 1, 15999.00, 15999.00),
(2, 2, 1, 28999.00, 28999.00),
(3, 3, 1, 32999.00, 32999.00),
(4, 4, 1, 1299.00, 1299.00),
(5, 6, 1, 9999.00, 9999.00);

-- Insert Blog Posts
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author_id, status, published_at) VALUES
('Top 10 GPS Devices for Professional Surveying', 'top-10-gps-devices-professional-surveying', 'Comprehensive guide to the best GPS devices for professional surveying work...', 'Discover the top GPS devices trusted by professional surveyors worldwide', '/placeholder.svg?height=300&width=500', 1, 'published', NOW() - INTERVAL '2 days'),
('Understanding GNSS Technology in Modern Surveying', 'understanding-gnss-technology-modern-surveying', 'Deep dive into GNSS technology and its applications in surveying...', 'Learn about the latest GNSS technology and how it revolutionizes surveying', '/placeholder.svg?height=300&width=500', 1, 'published', NOW() - INTERVAL '5 days'),
('Best Practices for Total Station Setup', 'best-practices-total-station-setup', 'Essential tips for proper total station setup and calibration...', 'Master the art of total station setup with these professional tips', '/placeholder.svg?height=300&width=500', 1, 'published', NOW() - INTERVAL '10 days');