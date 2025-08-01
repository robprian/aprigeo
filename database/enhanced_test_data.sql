-- Enhanced Test Data for existing schema
-- This adds more products, brands, categories to existing data

BEGIN;

-- Add more brands (avoiding conflicts)
INSERT INTO brands (name, slug, description, logo, website, is_active, created_at, updated_at) VALUES
('Leica Geosystems', 'leica-geosystems', 'Premium surveying instruments and geospatial solutions', '/images/category-dropdown-ref.png', 'https://leica-geosystems.com', true, NOW(), NOW()),
('Topcon', 'topcon', 'Precision positioning and surveying equipment manufacturer', '/images/desktop-header-ref.png', 'https://www.topcon.com', true, NOW(), NOW()),
('Sokkia', 'sokkia', 'Professional surveying instruments and optical equipment', '/images/mobile-header-ref.png', 'https://www.sokkia.com', true, NOW(), NOW()),
('Magellan', 'magellan', 'GPS navigation and mobile mapping solutions', '/images/product-card-hover-reference.png', 'https://www.magellangps.com', true, NOW(), NOW()),
('Hemisphere GNSS', 'hemisphere-gnss', 'GNSS positioning and guidance solutions', '/images/red-cabbage-main.png', 'https://www.hemispheregnss.com', true, NOW(), NOW()),
('CHC Navigation', 'chc-navigation', 'GNSS receivers and surveying solutions', '/images/reference-homepage.png', 'https://www.chcnav.com', true, NOW(), NOW()),
('DJI', 'dji', 'Professional drone technology for surveying and mapping', '/images/banner-slide-1.png', 'https://www.dji.com', true, NOW(), NOW()),
('Emlid', 'emlid', 'Affordable RTK and PPK solutions for surveying', '/images/browse-categories-final.png', 'https://emlid.com', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Add more categories (avoiding conflicts) 
INSERT INTO categories (name, slug, description, image, is_active, sort_order, meta_title, meta_description, created_at, updated_at) VALUES
('Mapping Software', 'mapping-software', 'GIS software and mapping applications for survey data processing', '/images/desktop-homepage-reference.png', true, 3, 'Mapping Software - GIS and Survey Applications', 'Professional mapping and GIS software for survey data analysis', NOW(), NOW()),
('Drones & UAV', 'drones-uav', 'Survey drones and unmanned aerial vehicles for aerial mapping', '/images/banner-slide-1.png', true, 4, 'Survey Drones - UAV for Aerial Mapping', 'Professional survey drones and UAV equipment for aerial mapping projects', NOW(), NOW()),
('Accessories', 'accessories', 'Batteries, cases, mounts, and other survey equipment accessories', '/images/product-card-hover-reference.png', true, 5, 'Survey Accessories - Equipment Parts & Tools', 'Essential accessories for GPS and survey equipment maintenance', NOW(), NOW()),
('GNSS Receivers', 'gnss-receivers', 'High-precision GNSS receivers for RTK and PPK surveying', '/images/browse-categories-refined.png', true, 6, 'GNSS Receivers - High Precision Positioning', 'Professional GNSS receivers for centimeter-accurate positioning', NOW(), NOW()),
('Theodolites', 'theodolites', 'Digital and optical theodolites for angular measurements', '/images/category-dropdown-ref.png', true, 7, 'Theodolites - Precision Angular Measurement', 'Professional theodolites for accurate angular surveying', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Add many more products
INSERT INTO products (name, slug, description, short_description, sku, price, sale_price, cost_price, stock_quantity, low_stock_threshold, weight, dimensions, category_id, brand_id, images, is_featured, is_active, meta_title, meta_description) VALUES
-- More GPS Equipment
('Garmin eTrex 32x', 'garmin-etrex-32x', 'Rugged handheld GPS with 2.2" color display, enhanced memory and resolution, and preloaded TopoActive maps.', 'Compact GPS with TopoActive maps', 'GAR-ETREX-32X', 199.99, 179.99, 120.00, 75, 15, 0.14, '5.4 x 10.3 x 3.3 cm', 1, 1, '{"/images/browse-categories-refined.png"}', true, true, 'Garmin eTrex 32x - Compact Handheld GPS', 'Rugged handheld GPS with color display and TopoActive maps'),
('Garmin GPSMAP 66i', 'garmin-gpsmap-66i', 'Premium handheld GPS with inReach satellite communication, 3" color display, and multi-GNSS support.', 'GPS with satellite messaging capability', 'GAR-GPSMAP-66I', 599.99, 549.99, 350.00, 25, 5, 0.24, '6.2 x 16.4 x 3.6 cm', 1, 1, '{"/images/category-dropdown-ref.png"}', true, true, 'Garmin GPSMAP 66i - GPS with Satellite Messaging', 'Premium handheld GPS with inReach satellite communication'),
('Magellan eXplorist 710', 'magellan-explorist-710', 'Rugged handheld GPS with 3" touchscreen, camera, and preloaded World Edition maps.', 'Touchscreen GPS with camera', 'MAG-EXP-710', 349.99, null, 210.00, 30, 8, 0.28, '6.9 x 13.2 x 3.3 cm', 1, 4, '{"/images/desktop-header-ref.png"}', false, true, 'Magellan eXplorist 710 - Touchscreen GPS', 'Rugged handheld GPS with touchscreen and camera functionality'),

-- Survey Equipment
('Leica Flexline TS07', 'leica-flexline-ts07', 'Manual total station with 2" angular accuracy, infinite drive system, and robust design for harsh conditions.', 'Manual total station with infinite drive', 'LEI-TS07-MAN', 8999.99, 8499.99, 5400.00, 8, 2, 4.8, '17 x 34 x 16 cm', 2, 3, '{"/images/product-card-hover-reference.png"}', true, true, 'Leica Flexline TS07 - Manual Total Station', 'Professional manual total station with infinite drive system'),
('Topcon GT-1005', 'topcon-gt-1005', 'Robotic total station with 5" angular accuracy, Windows CE operating system, and long-range EDM.', 'Windows CE robotic total station', 'TOP-GT-1005', 12499.99, null, 7500.00, 6, 2, 5.2, '18 x 36 x 17 cm', 2, 4, '{"/images/red-cabbage-main.png"}', false, true, 'Topcon GT-1005 - Robotic Total Station', 'Advanced robotic total station with Windows CE system'),
('Sokkia CX-105', 'sokkia-cx-105', 'Reflectorless total station with 5" accuracy, 350m non-prism range, and dual-axis compensator.', 'Reflectorless total station', 'SOK-CX-105', 6999.99, 6499.99, 4200.00, 10, 3, 4.5, '16 x 33 x 15 cm', 2, 5, '{"/images/reference-homepage.png"}', false, true, 'Sokkia CX-105 - Reflectorless Total Station', 'Professional reflectorless total station with dual-axis compensator'),

-- Mapping Software (using category_id based on what exists)
('Trimble Business Center', 'trimble-business-center', 'Complete office software for survey data processing, CAD drafting, and project management with cloud integration.', 'Complete survey office software', 'TRI-TBC-FULL', 2999.99, 2499.99, 1800.00, 999, 50, 0.1, 'Digital Download', 3, 2, '{"/images/desktop-homepage-reference.png"}', true, true, 'Trimble Business Center - Survey Office Software', 'Complete office software for survey data processing and CAD'),
('Leica Infinity', 'leica-infinity', 'Universal measurement office software for processing, analyzing, and adjusting measurement data from various instruments.', 'Universal measurement office software', 'LEI-INF-STD', 1899.99, 1699.99, 1140.00, 999, 50, 0.1, 'Digital Download', 3, 3, '{"/images/banner-slide-1.png"}', true, true, 'Leica Infinity - Measurement Office Software', 'Universal software for processing and analyzing measurement data'),
('Topcon MAGNET Field', 'topcon-magnet-field', 'Field data collection software with intuitive interface, real-time mapping, and seamless office integration.', 'Field data collection software', 'TOP-MAG-FIELD', 1299.99, null, 780.00, 999, 50, 0.1, 'Digital Download', 3, 4, '{"/images/browse-categories-final.png"}', false, true, 'Topcon MAGNET Field - Data Collection Software', 'Professional field data collection with real-time mapping'),

-- Drones & UAV (using category_id 4 if exists, otherwise 1)
('DJI Phantom 4 RTK', 'dji-phantom-4-rtk', 'Professional surveying drone with RTK positioning, 20MP camera, and centimeter-level accuracy for mapping applications.', 'RTK surveying drone with precision GPS', 'DJI-P4-RTK', 8999.99, 8499.99, 5400.00, 12, 3, 1.4, '35 x 35 x 23 cm', 1, 7, '{"/images/browse-categories-refined.png"}', true, true, 'DJI Phantom 4 RTK - Professional Survey Drone', 'RTK surveying drone with centimeter-level accuracy'),
('DJI Mavic 3 Enterprise', 'dji-mavic-3-enterprise', 'Compact professional drone with 4/3 CMOS camera, RTK positioning, and enterprise-grade reliability.', 'Compact professional survey drone', 'DJI-M3-ENT', 4999.99, 4499.99, 3000.00, 15, 3, 0.9, '22 x 15 x 8 cm', 1, 7, '{"/images/category-dropdown-ref.png"}', true, true, 'DJI Mavic 3 Enterprise - Compact Survey Drone', 'Professional compact drone for surveying and mapping'),

-- GNSS Receivers
('Trimble R12', 'trimble-r12', 'Multi-constellation GNSS receiver with integrated IMU, providing centimeter-level accuracy in challenging environments.', 'Professional GNSS receiver with IMU', 'TRI-R12-GNSS', 14999.99, 13999.99, 9000.00, 8, 2, 1.2, '13 x 13 x 7 cm', 1, 2, '{"/images/mobile-header-ref.png"}', true, true, 'Trimble R12 - Professional GNSS Receiver', 'Multi-constellation GNSS receiver with integrated IMU'),
('Leica GS18 T', 'leica-gs18-t', 'Tilt-compensated GNSS RTK rover with visual positioning, allowing measurements at any pole tilt up to 30°.', 'Tilt-compensated GNSS rover', 'LEI-GS18T-RTK', 16999.99, 15999.99, 10200.00, 6, 2, 1.1, '12 x 12 x 8 cm', 1, 3, '{"/images/product-card-hover-reference.png"}', true, true, 'Leica GS18 T - Tilt Compensated GNSS', 'Revolutionary tilt-compensated GNSS RTK rover'),
('Emlid Reach RS2+', 'emlid-reach-rs2-plus', 'Affordable multi-band RTK GNSS receiver with PPK capabilities and long battery life.', 'Affordable RTK GNSS receiver', 'EML-RS2-PLUS', 1899.99, 1699.99, 1140.00, 25, 5, 0.4, '9 x 9 x 4 cm', 1, 8, '{"/images/red-cabbage-main.png"}', false, true, 'Emlid Reach RS2+ - RTK GNSS Receiver', 'Affordable and accurate RTK GNSS receiver'),

-- Accessories
('Trimble TSC7 Controller', 'trimble-tsc7-controller', 'Rugged Android field controller with 7" display, integrated GPS, and all-day battery life for survey operations.', '7" Android field controller', 'TRI-TSC7-CTRL', 3499.99, 3199.99, 2100.00, 15, 3, 0.68, '20 x 12 x 4 cm', 2, 2, '{"/images/desktop-header-ref.png"}', true, true, 'Trimble TSC7 - Android Field Controller', 'Rugged 7-inch Android controller for field surveying'),
('Leica GEB371 Battery', 'leica-geb371-battery', 'Long-life lithium-ion battery for Leica total stations and GPS equipment with 8+ hour operation time.', 'Long-life lithium-ion battery', 'LEI-GEB371-BAT', 299.99, 269.99, 180.00, 50, 10, 0.4, '7 x 5 x 3 cm', 2, 3, '{"/images/mobile-header-ref.png"}', false, true, 'Leica GEB371 - Lithium-Ion Battery', 'Long-life battery for Leica surveying equipment'),
('Topcon Tribrach Set', 'topcon-tribrach-set', 'Precision tribrach with optical plummet, adjustable base, and weather-resistant construction.', 'Precision tribrach with optical plummet', 'TOP-TRI-SET', 899.99, 799.99, 540.00, 25, 5, 1.2, '12 x 12 x 8 cm', 2, 4, '{"/images/product-card-hover-reference.png"}', false, true, 'Topcon Tribrach Set - Precision Survey Mount', 'Professional tribrach with optical plummet for survey instruments'),
('Survey Prism Kit', 'survey-prism-kit', 'Complete prism kit with 62mm prism, adjustable pole, circular bubble, and carrying case.', 'Complete survey prism kit', 'GEN-PRISM-KIT', 199.99, 179.99, 120.00, 40, 8, 0.8, '40 x 15 x 15 cm', 2, 8, '{"/images/red-cabbage-main.png"}', false, true, 'Survey Prism Kit - Complete Reflector Set', 'Professional prism kit with adjustable pole and case')
ON CONFLICT (slug) DO NOTHING;

-- Add more blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author_name, category, tags, is_published, is_featured, meta_title, meta_description, published_at, created_at, updated_at) VALUES
('Latest GPS Technology Trends in 2025', 'gps-technology-trends-2025', 'The surveying industry continues to evolve with cutting-edge GPS technology. This year brings significant advancements in accuracy, connectivity, and user experience. From multi-constellation GNSS receivers to AI-powered processing, discover what is new in professional surveying equipment.', 'Discover the latest GPS technology trends shaping the surveying industry in 2025', '/images/banner-slide-1.png', 'John Smith', 'Technology', '{GPS,Technology,2025,Innovation}', true, true, 'GPS Technology Trends 2025 - Latest Surveying Innovations', 'Stay updated with the latest GPS technology trends in professional surveying', NOW() - INTERVAL '5 days', NOW(), NOW()),
('How to Choose the Right Total Station', 'choose-right-total-station', 'Selecting the perfect total station for your surveying needs requires careful consideration of accuracy requirements, project types, and budget constraints. This comprehensive guide covers manual vs robotic systems, angular accuracy specifications, and key features to evaluate.', 'Complete guide to selecting the ideal total station for your surveying projects', '/images/browse-categories-refined.png', 'Sarah Johnson', 'Equipment Guide', '{Total Station,Surveying,Equipment,Guide}', true, true, 'How to Choose the Right Total Station - Complete Guide', 'Expert guide to selecting the perfect total station for professional surveying', NOW() - INTERVAL '3 days', NOW(), NOW()),
('Drone Surveying: Advantages and Best Practices', 'drone-surveying-best-practices', 'UAV technology has revolutionized the surveying industry, offering unprecedented efficiency and accuracy for large-scale mapping projects. Learn about regulatory requirements, flight planning, and data processing workflows for professional drone surveying.', 'Learn about drone surveying advantages and professional best practices', '/images/category-dropdown-ref.png', 'Mike Chen', 'Drones', '{Drones,UAV,Surveying,Mapping,Technology}', true, false, 'Drone Surveying Best Practices - UAV Mapping Guide', 'Professional guide to drone surveying techniques and best practices', NOW() - INTERVAL '1 day', NOW(), NOW()),
('Maintenance Tips for Survey Equipment', 'survey-equipment-maintenance', 'Proper maintenance of your surveying equipment ensures accuracy, longevity, and reliable performance in the field. Follow these essential tips for cleaning, calibration, storage, and preventive maintenance to maximize your investment.', 'Essential maintenance tips to keep your survey equipment in optimal condition', '/images/desktop-header-ref.png', 'Emily Davis', 'Maintenance', '{Maintenance,Equipment,Tips,Surveying}', true, false, 'Survey Equipment Maintenance - Essential Care Tips', 'Keep your surveying equipment in optimal condition with these maintenance tips', NOW() - INTERVAL '7 days', NOW(), NOW()),
('Understanding GNSS vs GPS: What You Need to Know', 'gnss-vs-gps-explained', 'While GPS is widely known, GNSS represents a broader category of satellite navigation systems. Understanding the differences is crucial for modern surveying applications. Learn about constellation diversity, accuracy improvements, and when to use each system.', 'Clear explanation of the differences between GNSS and GPS for surveyors', '/images/mobile-header-ref.png', 'Robert Wilson', 'Technology', '{GNSS,GPS,Navigation,Technology,Education}', true, false, 'GNSS vs GPS Explained - Satellite Navigation Guide', 'Understand the key differences between GNSS and GPS for professional surveying', NOW() - INTERVAL '10 days', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Add more reviews for existing products
INSERT INTO reviews (product_id, user_id, rating, title, comment, is_active) VALUES
(1, 1, 5, 'Excellent GPS Device', 'Very accurate and easy to use. Perfect for our surveying projects. Battery lasts all day in the field.', true),
(1, 1, 4, 'Good Value for Money', 'Solid GPS unit with reliable performance. User interface could be more intuitive but overall satisfied.', true),
(2, 1, 5, 'Professional Grade Equipment', 'Outstanding accuracy and build quality. Essential for our high-precision surveying work. Worth every penny.', true),
(2, 1, 4, 'Reliable Total Station', 'Great instrument with consistent performance. Setup is straightforward and measurements are precise.', true),
(1, 1, 3, 'Decent GPS but Heavy', 'Works well for basic surveying tasks. A bit heavier than expected for extended field use.', true)
ON CONFLICT DO NOTHING;

COMMIT;

-- Show summary of data
SELECT 'Enhanced Data Import Complete' as status;
SELECT 'Categories: ' || COUNT(*) as count FROM categories;
SELECT 'Brands: ' || COUNT(*) as count FROM brands;  
SELECT 'Products: ' || COUNT(*) as count FROM products;
SELECT 'Blog Posts: ' || COUNT(*) as count FROM blog_posts;
SELECT 'Reviews: ' || COUNT(*) as count FROM reviews;
