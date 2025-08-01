-- Simple Enhanced Test Data for existing schema

BEGIN;

-- Add more brands (only if they don't exist)
INSERT INTO brands (name, slug, description, logo, website, is_active, created_at, updated_at) 
SELECT * FROM (VALUES
    ('Leica Geosystems', 'leica-geosystems', 'Premium surveying instruments and geospatial solutions', '/images/category-dropdown-ref.png', 'https://leica-geosystems.com', true, NOW(), NOW()),
    ('Topcon', 'topcon', 'Precision positioning and surveying equipment manufacturer', '/images/desktop-header-ref.png', 'https://www.topcon.com', true, NOW(), NOW()),
    ('Sokkia', 'sokkia', 'Professional surveying instruments and optical equipment', '/images/mobile-header-ref.png', 'https://www.sokkia.com', true, NOW(), NOW()),
    ('Magellan', 'magellan', 'GPS navigation and mobile mapping solutions', '/images/product-card-hover-reference.png', 'https://www.magellangps.com', true, NOW(), NOW()),
    ('DJI', 'dji', 'Professional drone technology for surveying and mapping', '/images/banner-slide-1.png', 'https://www.dji.com', true, NOW(), NOW()),
    ('Emlid', 'emlid', 'Affordable RTK and PPK solutions for surveying', '/images/browse-categories-final.png', 'https://emlid.com', true, NOW(), NOW())
) AS v(name, slug, description, logo, website, is_active, created_at, updated_at)
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE brands.slug = v.slug);

-- Add more categories (only if they don't exist)
INSERT INTO categories (name, slug, description, image, is_active, sort_order, created_at, updated_at)
SELECT * FROM (VALUES
    ('Mapping Software', 'mapping-software', 'GIS software and mapping applications for survey data processing', '/images/desktop-homepage-reference.png', true, 3, NOW(), NOW()),
    ('Drones & UAV', 'drones-uav', 'Survey drones and unmanned aerial vehicles for aerial mapping', '/images/banner-slide-1.png', true, 4, NOW(), NOW()),
    ('Accessories', 'accessories', 'Batteries, cases, mounts, and other survey equipment accessories', '/images/product-card-hover-reference.png', true, 5, NOW(), NOW()),
    ('GNSS Receivers', 'gnss-receivers', 'High-precision GNSS receivers for RTK and PPK surveying', '/images/browse-categories-refined.png', true, 6, NOW(), NOW())
) AS v(name, slug, description, image, is_active, sort_order, created_at, updated_at)
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE categories.slug = v.slug);

-- Add many more products using existing category and brand IDs
INSERT INTO products (name, slug, description, short_description, sku, price, sale_price, cost_price, stock_quantity, low_stock_threshold, weight, dimensions, category_id, brand_id, images, is_featured, is_active, created_at, updated_at)
SELECT * FROM (VALUES
    -- More GPS Equipment (category_id = 1)
    ('Garmin eTrex 32x', 'garmin-etrex-32x', 'Rugged handheld GPS with 2.2 inch color display, enhanced memory and resolution, and preloaded TopoActive maps.', 'Compact GPS with TopoActive maps', 'GAR-ETREX-32X', 199.99, 179.99, 120.00, 75, 15, 0.14, '5.4 x 10.3 x 3.3 cm', 1, 1, ARRAY['/images/browse-categories-refined.png'], true, true, NOW(), NOW()),
    ('Garmin GPSMAP 66i', 'garmin-gpsmap-66i', 'Premium handheld GPS with inReach satellite communication, 3 inch color display, and multi-GNSS support.', 'GPS with satellite messaging capability', 'GAR-GPSMAP-66I', 599.99, 549.99, 350.00, 25, 5, 0.24, '6.2 x 16.4 x 3.6 cm', 1, 1, ARRAY['/images/category-dropdown-ref.png'], true, true, NOW(), NOW()),
    ('Magellan eXplorist 710', 'magellan-explorist-710', 'Rugged handheld GPS with 3 inch touchscreen, camera, and preloaded World Edition maps.', 'Touchscreen GPS with camera', 'MAG-EXP-710', 349.99, NULL, 210.00, 30, 8, 0.28, '6.9 x 13.2 x 3.3 cm', 1, (SELECT id FROM brands WHERE slug = 'magellan'), ARRAY['/images/desktop-header-ref.png'], false, true, NOW(), NOW()),
    
    -- More Survey Equipment (category_id = 2) 
    ('Leica Flexline TS07', 'leica-flexline-ts07', 'Manual total station with 2 inch angular accuracy, infinite drive system, and robust design for harsh conditions.', 'Manual total station with infinite drive', 'LEI-TS07-MAN', 8999.99, 8499.99, 5400.00, 8, 2, 4.8, '17 x 34 x 16 cm', 2, (SELECT id FROM brands WHERE slug = 'leica-geosystems'), ARRAY['/images/product-card-hover-reference.png'], true, true, NOW(), NOW()),
    ('Topcon GT-1005', 'topcon-gt-1005', 'Robotic total station with 5 inch angular accuracy, Windows CE operating system, and long-range EDM.', 'Windows CE robotic total station', 'TOP-GT-1005', 12499.99, NULL, 7500.00, 6, 2, 5.2, '18 x 36 x 17 cm', 2, (SELECT id FROM brands WHERE slug = 'topcon'), ARRAY['/images/red-cabbage-main.png'], false, true, NOW(), NOW()),
    ('Sokkia CX-105', 'sokkia-cx-105', 'Reflectorless total station with 5 inch accuracy, 350m non-prism range, and dual-axis compensator.', 'Reflectorless total station', 'SOK-CX-105', 6999.99, 6499.99, 4200.00, 10, 3, 4.5, '16 x 33 x 15 cm', 2, (SELECT id FROM brands WHERE slug = 'sokkia'), ARRAY['/images/reference-homepage.png'], false, true, NOW(), NOW()),
    
    -- Drones (using GPS category for now)
    ('DJI Phantom 4 RTK', 'dji-phantom-4-rtk', 'Professional surveying drone with RTK positioning, 20MP camera, and centimeter-level accuracy for mapping applications.', 'RTK surveying drone with precision GPS', 'DJI-P4-RTK', 8999.99, 8499.99, 5400.00, 12, 3, 1.4, '35 x 35 x 23 cm', 1, (SELECT id FROM brands WHERE slug = 'dji'), ARRAY['/images/browse-categories-refined.png'], true, true, NOW(), NOW()),
    ('DJI Mavic 3 Enterprise', 'dji-mavic-3-enterprise', 'Compact professional drone with 4/3 CMOS camera, RTK positioning, and enterprise-grade reliability.', 'Compact professional survey drone', 'DJI-M3-ENT', 4999.99, 4499.99, 3000.00, 15, 3, 0.9, '22 x 15 x 8 cm', 1, (SELECT id FROM brands WHERE slug = 'dji'), ARRAY['/images/category-dropdown-ref.png'], true, true, NOW(), NOW()),
    
    -- GNSS Receivers
    ('Trimble R12', 'trimble-r12', 'Multi-constellation GNSS receiver with integrated IMU, providing centimeter-level accuracy in challenging environments.', 'Professional GNSS receiver with IMU', 'TRI-R12-GNSS', 14999.99, 13999.99, 9000.00, 8, 2, 1.2, '13 x 13 x 7 cm', 1, 2, ARRAY['/images/mobile-header-ref.png'], true, true, NOW(), NOW()),
    ('Leica GS18 T', 'leica-gs18-t', 'Tilt-compensated GNSS RTK rover with visual positioning, allowing measurements at any pole tilt up to 30 degrees.', 'Tilt-compensated GNSS rover', 'LEI-GS18T-RTK', 16999.99, 15999.99, 10200.00, 6, 2, 1.1, '12 x 12 x 8 cm', 1, (SELECT id FROM brands WHERE slug = 'leica-geosystems'), ARRAY['/images/product-card-hover-reference.png'], true, true, NOW(), NOW()),
    ('Emlid Reach RS2+', 'emlid-reach-rs2-plus', 'Affordable multi-band RTK GNSS receiver with PPK capabilities and long battery life.', 'Affordable RTK GNSS receiver', 'EML-RS2-PLUS', 1899.99, 1699.99, 1140.00, 25, 5, 0.4, '9 x 9 x 4 cm', 1, (SELECT id FROM brands WHERE slug = 'emlid'), ARRAY['/images/red-cabbage-main.png'], false, true, NOW(), NOW()),
    
    -- Accessories
    ('Survey Prism Kit', 'survey-prism-kit', 'Complete prism kit with 62mm prism, adjustable pole, circular bubble, and carrying case.', 'Complete survey prism kit', 'GEN-PRISM-KIT', 199.99, 179.99, 120.00, 40, 8, 0.8, '40 x 15 x 15 cm', 2, 2, ARRAY['/images/red-cabbage-main.png'], false, true, NOW(), NOW()),
    ('Leica GEB371 Battery', 'leica-geb371-battery', 'Long-life lithium-ion battery for Leica total stations and GPS equipment with 8+ hour operation time.', 'Long-life lithium-ion battery', 'LEI-GEB371-BAT', 299.99, 269.99, 180.00, 50, 10, 0.4, '7 x 5 x 3 cm', 2, (SELECT id FROM brands WHERE slug = 'leica-geosystems'), ARRAY['/images/mobile-header-ref.png'], false, true, NOW(), NOW()),
    ('Topcon Tribrach Set', 'topcon-tribrach-set', 'Precision tribrach with optical plummet, adjustable base, and weather-resistant construction.', 'Precision tribrach with optical plummet', 'TOP-TRI-SET', 899.99, 799.99, 540.00, 25, 5, 1.2, '12 x 12 x 8 cm', 2, (SELECT id FROM brands WHERE slug = 'topcon'), ARRAY['/images/product-card-hover-reference.png'], false, true, NOW(), NOW())
) AS v(name, slug, description, short_description, sku, price, sale_price, cost_price, stock_quantity, low_stock_threshold, weight, dimensions, category_id, brand_id, images, is_featured, is_active, created_at, updated_at)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.slug = v.slug);

-- Add blog posts with correct schema
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, status, published_at, created_at, updated_at)
SELECT * FROM (VALUES
    ('Latest GPS Technology Trends in 2025', 'gps-technology-trends-2025', 'Discover the latest GPS technology trends shaping the surveying industry in 2025', 'The surveying industry continues to evolve with cutting-edge GPS technology. This year brings significant advancements in accuracy, connectivity, and user experience. From multi-constellation GNSS receivers to AI-powered processing, discover what is new in professional surveying equipment.', '/images/banner-slide-1.png', 'published', NOW() - INTERVAL '5 days', NOW(), NOW()),
    ('How to Choose the Right Total Station', 'choose-right-total-station', 'Complete guide to selecting the ideal total station for your surveying projects', 'Selecting the perfect total station for your surveying needs requires careful consideration of accuracy requirements, project types, and budget constraints. This comprehensive guide covers manual vs robotic systems, angular accuracy specifications, and key features to evaluate.', '/images/browse-categories-refined.png', 'published', NOW() - INTERVAL '3 days', NOW(), NOW()),
    ('Drone Surveying: Advantages and Best Practices', 'drone-surveying-best-practices', 'Learn about drone surveying advantages and professional best practices', 'UAV technology has revolutionized the surveying industry, offering unprecedented efficiency and accuracy for large-scale mapping projects. Learn about regulatory requirements, flight planning, and data processing workflows for professional drone surveying.', '/images/category-dropdown-ref.png', 'published', NOW() - INTERVAL '1 day', NOW(), NOW()),
    ('Understanding GNSS vs GPS: What You Need to Know', 'gnss-vs-gps-explained', 'Clear explanation of the differences between GNSS and GPS for surveyors', 'While GPS is widely known, GNSS represents a broader category of satellite navigation systems. Understanding the differences is crucial for modern surveying applications. Learn about constellation diversity, accuracy improvements, and when to use each system.', '/images/mobile-header-ref.png', 'published', NOW() - INTERVAL '10 days', NOW(), NOW())
) AS v(title, slug, excerpt, content, featured_image, status, published_at, created_at, updated_at)
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE blog_posts.slug = v.slug);

-- Add reviews for new products
INSERT INTO reviews (product_id, user_id, rating, title, comment, is_active, created_at, updated_at)
SELECT p.id, 1, 
       (4 + (EXTRACT(epoch FROM NOW()) / 1000000)::int % 2),  -- 4 or 5 rating
       'Excellent Product',
       'Very satisfied with the quality and performance. Highly recommended for professional use.',
       true, 
       NOW() - INTERVAL '5 days', 
       NOW()
FROM products p 
WHERE p.id > 2  -- Only for new products
LIMIT 5;

COMMIT;

-- Show summary
SELECT 'Enhanced Data Import Complete' as status;
SELECT 'Categories: ' || COUNT(*) as count FROM categories;
SELECT 'Brands: ' || COUNT(*) as count FROM brands;  
SELECT 'Products: ' || COUNT(*) as count FROM products;
SELECT 'Blog Posts: ' || COUNT(*) as count FROM blog_posts;
SELECT 'Reviews: ' || COUNT(*) as count FROM reviews;
