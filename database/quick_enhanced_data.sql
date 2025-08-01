-- Quick Enhanced Test Data with correct IDs

BEGIN;

-- Add simple products using existing categories
INSERT INTO products (name, slug, description, short_description, sku, price, sale_price, cost_price, stock_quantity, low_stock_threshold, category_id, brand_id, images, is_featured, is_active, created_at, updated_at)
VALUES
-- Using category_id = 2 (GNSS Receivers) and brand_id = 1 (Garmin)  
('Garmin eTrex 32x', 'garmin-etrex-32x', 'Rugged handheld GPS with 2.2 inch color display and preloaded TopoActive maps', 'Compact GPS with TopoActive maps', 'GAR-ETREX-32X', 199.99, 179.99, 120.00, 75, 15, 2, 1, ARRAY['/images/browse-categories-refined.png'], true, true, NOW(), NOW()),

('Garmin GPSMAP 66i', 'garmin-gpsmap-66i', 'Premium handheld GPS with inReach satellite communication and 3 inch color display', 'GPS with satellite messaging', 'GAR-GPSMAP-66I', 599.99, 549.99, 350.00, 25, 5, 2, 1, ARRAY['/images/category-dropdown-ref.png'], true, true, NOW(), NOW()),

-- Using category_id = 3 (Total Stations) and brand_id = 2 (Trimble)
('Leica Flexline TS07', 'leica-flexline-ts07', 'Manual total station with 2 inch angular accuracy and infinite drive system', 'Manual total station with infinite drive', 'LEI-TS07-MAN', 8999.99, 8499.99, 5400.00, 8, 2, 3, 2, ARRAY['/images/product-card-hover-reference.png'], true, true, NOW(), NOW()),

('Topcon GT-1005', 'topcon-gt-1005', 'Robotic total station with 5 inch angular accuracy and Windows CE system', 'Windows CE robotic total station', 'TOP-GT-1005', 12499.99, NULL, 7500.00, 6, 2, 3, 2, ARRAY['/images/red-cabbage-main.png'], false, true, NOW(), NOW()),

-- Using category_id = 6 (GPS Handheld Devices)
('Magellan eXplorist 710', 'magellan-explorist-710', 'Rugged handheld GPS with 3 inch touchscreen and camera', 'Touchscreen GPS with camera', 'MAG-EXP-710', 349.99, NULL, 210.00, 30, 8, 6, 1, ARRAY['/images/desktop-header-ref.png'], false, true, NOW(), NOW()),

-- Using category_id = 7 (Drone Surveying Equipment)
('DJI Phantom 4 RTK', 'dji-phantom-4-rtk', 'Professional surveying drone with RTK positioning and 20MP camera', 'RTK surveying drone with precision GPS', 'DJI-P4-RTK', 8999.99, 8499.99, 5400.00, 12, 3, 7, 2, ARRAY['/images/browse-categories-refined.png'], true, true, NOW(), NOW()),

('DJI Mavic 3 Enterprise', 'dji-mavic-3-enterprise', 'Compact professional drone with 4/3 CMOS camera and RTK positioning', 'Compact professional survey drone', 'DJI-M3-ENT', 4999.99, 4499.99, 3000.00, 15, 3, 7, 2, ARRAY['/images/category-dropdown-ref.png'], true, true, NOW(), NOW()),

-- Using category_id = 2 (GNSS Receivers) 
('Trimble R12', 'trimble-r12', 'Multi-constellation GNSS receiver with integrated IMU for centimeter-level accuracy', 'Professional GNSS receiver with IMU', 'TRI-R12-GNSS', 14999.99, 13999.99, 9000.00, 8, 2, 2, 2, ARRAY['/images/mobile-header-ref.png'], true, true, NOW(), NOW()),

('Emlid Reach RS2+', 'emlid-reach-rs2-plus', 'Affordable multi-band RTK GNSS receiver with PPK capabilities', 'Affordable RTK GNSS receiver', 'EML-RS2-PLUS', 1899.99, 1699.99, 1140.00, 25, 5, 2, 1, ARRAY['/images/red-cabbage-main.png'], false, true, NOW(), NOW()),

-- Accessories using category_id = 3 (Total Stations)
('Survey Prism Kit', 'survey-prism-kit', 'Complete prism kit with 62mm prism, adjustable pole and carrying case', 'Complete survey prism kit', 'GEN-PRISM-KIT', 199.99, 179.99, 120.00, 40, 8, 3, 2, ARRAY['/images/red-cabbage-main.png'], false, true, NOW(), NOW()),

('Leica GEB371 Battery', 'leica-geb371-battery', 'Long-life lithium-ion battery for Leica equipment with 8+ hour operation', 'Long-life lithium-ion battery', 'LEI-GEB371-BAT', 299.99, 269.99, 180.00, 50, 10, 3, 2, ARRAY['/images/mobile-header-ref.png'], false, true, NOW(), NOW()),

('Topcon Tribrach Set', 'topcon-tribrach-set', 'Precision tribrach with optical plummet and weather-resistant construction', 'Precision tribrach with optical plummet', 'TOP-TRI-SET', 899.99, 799.99, 540.00, 25, 5, 3, 2, ARRAY['/images/product-card-hover-reference.png'], false, true, NOW(), NOW())

ON CONFLICT (slug) DO NOTHING;

-- Add simple blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, status, published_at, created_at, updated_at)
VALUES
('Latest GPS Technology Trends in 2025', 'gps-technology-trends-2025', 'Discover the latest GPS technology trends in professional surveying', 'The surveying industry continues to evolve with cutting-edge GPS technology. Multi-constellation GNSS receivers and AI-powered processing are revolutionizing accuracy.', '/images/banner-slide-1.png', 'published', NOW() - INTERVAL '5 days', NOW(), NOW()),

('How to Choose the Right Total Station', 'choose-right-total-station', 'Complete guide to selecting the ideal total station', 'Selecting the perfect total station requires considering accuracy requirements, project types, and budget constraints. This guide covers all essential factors.', '/images/browse-categories-refined.png', 'published', NOW() - INTERVAL '3 days', NOW(), NOW()),

('Drone Surveying Best Practices', 'drone-surveying-best-practices', 'Learn professional drone surveying techniques', 'UAV technology offers unprecedented efficiency for large-scale mapping. Learn regulatory requirements, flight planning, and data processing workflows.', '/images/category-dropdown-ref.png', 'published', NOW() - INTERVAL '1 day', NOW(), NOW())

ON CONFLICT (slug) DO NOTHING;

-- Add simple reviews
INSERT INTO reviews (product_id, user_id, rating, title, comment, is_active, created_at, updated_at)
SELECT p.id, 1, 5, 'Excellent Product', 'Outstanding quality and performance. Highly recommended for professional surveying work.', true, NOW() - INTERVAL '3 days', NOW()
FROM products p 
WHERE p.id > 2
LIMIT 8;

COMMIT;

-- Show final summary
SELECT 'Enhanced Data Import Complete' as status;
SELECT 'Categories: ' || COUNT(*) as count FROM categories;
SELECT 'Brands: ' || COUNT(*) as count FROM brands;  
SELECT 'Products: ' || COUNT(*) as count FROM products;
SELECT 'Blog Posts: ' || COUNT(*) as count FROM blog_posts;
SELECT 'Reviews: ' || COUNT(*) as count FROM reviews;
