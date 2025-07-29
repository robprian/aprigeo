-- Enhanced seed data with 30+ GPS products - FIXED VERSION
-- Clear existing data first  
TRUNCATE TABLE products, categories, brands RESTART IDENTITY CASCADE;

-- Insert Categories with SEO slugs
INSERT INTO categories (name, slug, description, is_active, sort_order) VALUES
('GNSS Receivers', 'gnss-receivers-professional-surveying', 'High-precision GNSS receivers for professional surveying and mapping applications', true, 1),
('Total Stations', 'total-stations-precision-measurement', 'Electronic total stations for accurate distance and angle measurements', true, 2),
('Theodolites', 'theodolites-angle-measurement', 'Precision theodolites for angular measurements in surveying and construction', true, 3),
('Laser Levels', 'laser-levels-construction-grade', 'Professional laser levels for construction and surveying applications', true, 4),
('GPS Handheld Devices', 'gps-handheld-navigation-devices', 'Portable GPS devices for field navigation and data collection', true, 5),
('Drone Surveying Equipment', 'drone-surveying-mapping-equipment', 'UAV systems and accessories for aerial surveying and mapping', true, 6),
('Survey Software', 'survey-software-data-processing', 'Professional software solutions for survey data processing and CAD', true, 7),
('Measuring Tapes & Tools', 'measuring-tapes-surveying-tools', 'Traditional measuring instruments and surveying accessories', true, 8),
('Safety Equipment', 'safety-equipment-field-surveying', 'Safety gear and protective equipment for field surveying work', true, 9),
('Tripods & Accessories', 'tripods-survey-accessories', 'Professional tripods, prisms, and surveying accessories', true, 10);

-- Insert Brands with SEO slugs  
INSERT INTO brands (name, slug, description, is_active) VALUES
('Trimble', 'trimble-precision-positioning-technology', 'Leading provider of advanced positioning solutions and geospatial technology', true),
('Leica Geosystems', 'leica-geosystems-measurement-solutions', 'Premium measurement and surveying solutions for professionals worldwide', true),
('Topcon', 'topcon-positioning-systems-technology', 'Innovative positioning technology and solutions for construction and surveying', true),
('Sokkia', 'sokkia-professional-surveying-equipment', 'Professional surveying instruments and measurement solutions', true),
('Spectra Precision', 'spectra-precision-construction-lasers', 'Construction and surveying laser systems and positioning technology', true),
('Garmin', 'garmin-gps-navigation-technology', 'Leading GPS technology and navigation solutions for professionals', true),
('DJI', 'dji-drone-aerial-imaging-systems', 'Professional drone systems for aerial surveying and mapping applications', true),
('Nikon', 'nikon-surveying-optical-instruments', 'Precision optical instruments and surveying equipment', true),
('Pentax', 'pentax-precision-surveying-instruments', 'High-quality surveying instruments and measurement solutions', true),
('South Surveying', 'south-surveying-gnss-solutions', 'Professional GNSS and surveying solutions for global markets', true),
('CHC Navigation', 'chc-navigation-precision-positioning', 'Advanced GNSS and positioning technology solutions', true),
('Carlson Software', 'carlson-software-survey-solutions', 'Professional surveying and civil engineering software solutions', true);

-- Insert 30+ Products with realistic data
INSERT INTO products (name, slug, description, sku, price, compare_price, category_id, brand_id, is_active, is_featured, in_stock, stock_quantity, images, tags, meta_title, meta_description) VALUES

-- GNSS Receivers (Category 1)
('Trimble R12i GNSS Receiver', 'trimble-r12i-gnss-receiver-professional-surveying', 'Professional GNSS receiver with integrated IMU technology for high-precision surveying and mapping applications. Features advanced tilt compensation and multi-constellation tracking.', 'TRM-R12I-001', 15999.00, 17999.00, 1, 1, true, true, true, 5, '["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"]', '["gnss", "surveying", "trimble", "precision", "gps"]', 'Trimble R12i GNSS Receiver - Professional Surveying Equipment', 'High-precision GNSS receiver with IMU technology for professional surveying. 3mm accuracy with tilt compensation up to 30 degrees.'),

('Leica GS18 T GNSS RTK Rover', 'leica-gs18-t-gnss-rtk-rover-tilt-compensation', 'Revolutionary GNSS RTK rover with visual positioning technology and tilt compensation. Perfect for challenging surveying environments with superior accuracy.', 'LCA-GS18T-001', 18999.00, 21999.00, 1, 2, true, true, true, 3, '["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"]', '["leica", "gnss", "rtk", "tilt", "visual-positioning"]', 'Leica GS18 T GNSS RTK Rover - Tilt Compensation Technology', 'Revolutionary GNSS rover with 60° tilt compensation and visual positioning technology for superior surveying accuracy.'),

('Topcon HiPer VR GNSS Receiver', 'topcon-hiper-vr-gnss-receiver-virtual-reference', 'Advanced GNSS receiver with Virtual Reference Station technology. Ideal for high-productivity surveying with network RTK capabilities.', 'TPC-HIPERVR-001', 12999.00, 14999.00, 1, 3, true, false, true, 8, '["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"]', '["topcon", "gnss", "vrs", "network-rtk"]', 'Topcon HiPer VR GNSS Receiver - Virtual Reference Technology', 'Advanced GNSS receiver with VRS technology for high-productivity surveying and network RTK applications.'),

('Sokkia GRX3 GNSS Receiver', 'sokkia-grx3-gnss-receiver-multi-constellation', 'Reliable GNSS receiver with multi-constellation tracking and exceptional signal processing. Built for demanding surveying applications.', 'SOK-GRX3-001', 9999.00, 11999.00, 1, 4, true, false, true, 12, '["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"]', '["sokkia", "gnss", "multi-constellation", "reliable"]', 'Sokkia GRX3 GNSS Receiver - Multi-Constellation Tracking', 'Reliable GNSS receiver with multi-constellation tracking for demanding surveying applications. 3mm precision accuracy.'),

('CHC P5E GNSS RTK System', 'chc-p5e-gnss-rtk-system-professional-surveying', 'Professional GNSS RTK system with advanced signal processing and long-range RTK capabilities. Excellent value for professional surveying.', 'CHC-P5E-001', 7999.00, 9999.00, 1, 11, true, false, true, 6, '["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"]', '["chc", "gnss", "rtk", "professional", "value"]', 'CHC P5E GNSS RTK System - Professional Surveying', 'Professional GNSS RTK system with advanced signal processing and 60km baseline capability for surveying applications.'),

('South Galaxy G1 GNSS Receiver', 'south-galaxy-g1-gnss-receiver-plus-technology', 'Advanced GNSS receiver with Galaxy PLUS technology for enhanced signal tracking in challenging environments.', 'STH-G1-001', 8999.00, 10999.00, 1, 10, true, false, true, 4, '["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"]', '["south", "galaxy", "gnss", "plus-technology"]', 'South Galaxy G1 GNSS Receiver - PLUS Technology', 'Advanced GNSS receiver with Galaxy PLUS technology for enhanced signal tracking in challenging environments.'),

-- Total Stations (Category 2)
('Leica TS16 Total Station', 'leica-ts16-total-station-robotic-atr-plus', 'Premium robotic total station with ATR PLUS technology and PowerSearch. Revolutionary measurement technology for maximum productivity.', 'LCA-TS16-001', 28999.00, 32999.00, 2, 2, true, true, true, 2, '["https://images.unsplash.com/photo-1581094289206-c0ddd9e21b0e?w=400"]', '["leica", "total-station", "robotic", "atr-plus"]', 'Leica TS16 Total Station - Robotic ATR PLUS Technology', 'Premium robotic total station with ATR PLUS and PowerSearch technology for maximum surveying productivity.'),

('Topcon GT-1200 Robotic Total Station', 'topcon-gt-1200-robotic-total-station-ultrasonic', 'Advanced robotic total station with ultrasonic communication and automatic tracking. Perfect for one-person surveying operations.', 'TPC-GT1200-001', 32999.00, 35999.00, 2, 3, true, true, true, 1, '["https://images.unsplash.com/photo-1581094289206-c0ddd9e21b0e?w=400"]', '["topcon", "robotic", "total-station", "ultrasonic"]', 'Topcon GT-1200 Robotic Total Station - Ultrasonic Communication', 'Advanced robotic total station with ultrasonic communication for efficient one-person surveying operations.'),

('Trimble S9 Total Station', 'trimble-s9-total-station-hp-edr-technology', 'High-precision total station with HP EDM technology and MagDrive servo motors. Exceptional accuracy for demanding measurements.', 'TRM-S9-001', 25999.00, 28999.00, 2, 1, true, false, true, 4, '["https://images.unsplash.com/photo-1581094289206-c0ddd9e21b0e?w=400"]', '["trimble", "total-station", "hp-edr", "magdrive"]', 'Trimble S9 Total Station - HP EDR Technology', 'High-precision total station with HP EDM technology and MagDrive servo motors for exceptional accuracy.'),

('Sokkia iX-1003 Robotic Total Station', 'sokkia-ix-1003-robotic-total-station-hybrid', 'Innovative hybrid positioning system combining total station and GNSS technology. Ultimate flexibility for any surveying project.', 'SOK-IX1003-001', 19999.00, 22999.00, 2, 4, true, false, true, 6, '["https://images.unsplash.com/photo-1581094289206-c0ddd9e21b0e?w=400"]', '["sokkia", "robotic", "hybrid", "gnss-integration"]', 'Sokkia iX-1003 Robotic Total Station - Hybrid Positioning', 'Innovative hybrid positioning system combining total station and GNSS technology for ultimate surveying flexibility.'),

('Nikon XF Total Station', 'nikon-xf-total-station-hybrid-imaging-technology', 'Innovative total station with hybrid imaging technology combining optical and digital measurement methods for enhanced productivity.', 'NKN-XF-001', 22999.00, 25999.00, 2, 8, true, false, true, 3, '["https://images.unsplash.com/photo-1581094289206-c0ddd9e21b0e?w=400"]', '["nikon", "total-station", "hybrid", "imaging"]', 'Nikon XF Total Station - Hybrid Imaging Technology', 'Innovative total station with hybrid imaging technology for enhanced productivity in surveying applications.'),

-- Theodolites (Category 3)
('Pentax ETH-520 Electronic Theodolite', 'pentax-eth-520-electronic-theodolite-precision', 'Precision electronic theodolite with dual-axis compensation and superior optics. Ideal for construction and surveying applications.', 'PNX-ETH520-001', 3999.00, 4499.00, 3, 9, true, false, true, 15, '["https://images.unsplash.com/photo-1621261361075-816a81202d41?w=400"]', '["pentax", "theodolite", "electronic", "precision"]', 'Pentax ETH-520 Electronic Theodolite - Precision Measurement', 'Precision electronic theodolite with dual-axis compensation for construction and surveying applications.'),

('Nikon NE-20SC Theodolite', 'nikon-ne-20sc-theodolite-superior-optics', 'Professional theodolite with superior Nikon optics and rugged construction. Reliable performance in harsh field conditions.', 'NKN-NE20SC-001', 2999.00, 3499.00, 3, 8, true, false, true, 20, '["https://images.unsplash.com/photo-1621261361075-816a81202d41?w=400"]', '["nikon", "theodolite", "optics", "rugged"]', 'Nikon NE-20SC Theodolite - Superior Optics', 'Professional theodolite with superior Nikon optics and rugged construction for reliable field performance.'),

-- Laser Levels (Category 4)
('Spectra Precision GL722 Dual Grade Laser', 'spectra-precision-gl722-dual-grade-laser-level', 'Professional dual grade laser for construction applications. Automatic leveling with exceptional accuracy and range.', 'SPC-GL722-001', 4999.00, 5999.00, 4, 5, true, true, true, 10, '["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400"]', '["spectra", "laser-level", "dual-grade", "construction"]', 'Spectra Precision GL722 Dual Grade Laser Level', 'Professional dual grade laser for construction with automatic leveling and 600m working range.'),

('Leica Rugby 640 Laser Level', 'leica-rugby-640-laser-level-outdoor-construction', 'Rugged outdoor laser level for construction and grading applications. Superior visibility and reliability in demanding conditions.', 'LCA-RG640-001', 2999.00, 3499.00, 4, 2, true, false, true, 18, '["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400"]', '["leica", "rugby", "laser-level", "outdoor"]', 'Leica Rugby 640 Laser Level - Outdoor Construction', 'Rugged outdoor laser level for construction with superior visibility and 640m range capability.'),

-- GPS Handheld Devices (Category 5)
('Garmin Montana 700i Handheld GPS', 'garmin-montana-700i-handheld-gps-inreach', 'Advanced handheld GPS with inReach satellite communication. Perfect for remote surveying and emergency communication.', 'GAR-MT700I-001', 799.00, 899.00, 5, 6, true, true, true, 25, '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"]', '["garmin", "handheld", "gps", "inreach", "satellite"]', 'Garmin Montana 700i Handheld GPS - inReach Satellite', 'Advanced handheld GPS with inReach satellite communication for remote surveying and emergency situations.'),

('Trimble TDC7 Data Collector', 'trimble-tdc7-data-collector-android-surveying', 'Professional Android data collector designed for surveying and GIS applications. Rugged design with all-day battery life.', 'TRM-TDC7-001', 3999.00, 4499.00, 5, 1, true, false, true, 8, '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"]', '["trimble", "data-collector", "android", "surveying"]', 'Trimble TDC7 Data Collector - Android Surveying', 'Professional Android data collector designed for surveying with rugged design and all-day battery life.'),

('Trimble Geo 7X Handheld', 'trimble-geo-7x-handheld-gis-data-collector', 'Professional GIS data collector with integrated camera and high-accuracy GPS. Perfect for field data collection and mapping.', 'TRM-GEO7X-001', 4999.00, 5999.00, 5, 1, true, false, true, 5, '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"]', '["trimble", "geo7x", "gis", "data-collector", "handheld"]', 'Trimble Geo 7X Handheld - GIS Data Collector', 'Professional GIS data collector with integrated camera and high-accuracy GPS for field data collection.'),

-- Drone Surveying Equipment (Category 6)
('DJI Phantom 4 RTK Drone', 'dji-phantom-4-rtk-drone-surveying-mapping', 'Professional surveying and mapping drone with RTK GNSS for centimeter-level accuracy. Perfect for aerial data collection.', 'DJI-P4RTK-001', 8999.00, 9999.00, 6, 7, true, true, true, 3, '["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400"]', '["dji", "phantom", "rtk", "drone", "surveying", "mapping"]', 'DJI Phantom 4 RTK Drone - Surveying & Mapping', 'Professional surveying drone with RTK GNSS for centimeter-level accuracy in aerial data collection.'),

('DJI Matrice 300 RTK Survey', 'dji-matrice-300-rtk-survey-enterprise-drone', 'Enterprise-grade surveying drone with advanced flight intelligence and payload flexibility. Ultimate solution for professional mapping.', 'DJI-M300RTK-001', 15999.00, 17999.00, 6, 7, true, true, true, 2, '["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400"]', '["dji", "matrice", "enterprise", "rtk", "professional"]', 'DJI Matrice 300 RTK Survey - Enterprise Drone', 'Enterprise-grade surveying drone with advanced flight intelligence for professional mapping applications.'),

-- Survey Software (Category 7)
('Carlson SurvCE Data Collection Software', 'carlson-survce-data-collection-software-field', 'Comprehensive field data collection software for total stations and GNSS receivers. Industry-standard surveying solution.', 'CRL-SURVCE-001', 1999.00, 2499.00, 7, 12, true, false, true, 50, '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"]', '["carlson", "survce", "software", "data-collection"]', 'Carlson SurvCE Data Collection Software - Field Surveying', 'Comprehensive field data collection software supporting 400+ instruments for professional surveying.'),

('Trimble Access Field Software', 'trimble-access-field-software-surveying-solution', 'Professional field software for Trimble surveying instruments. Streamlined workflows for maximum productivity.', 'TRM-ACCESS-001', 2499.00, 2999.00, 7, 1, true, true, true, 30, '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"]', '["trimble", "access", "field-software", "surveying"]', 'Trimble Access Field Software - Surveying Solution', 'Professional field software for Trimble instruments with integrated workflows and real-time QA/QC.'),

-- Measuring Tapes & Tools (Category 8)
('Leica Disto X4 Laser Rangefinder', 'leica-disto-x4-laser-rangefinder-outdoor', 'Professional laser distance meter with Bluetooth and outdoor measurement capability. Perfect for construction and surveying.', 'LCA-DISTOX4-001', 899.00, 999.00, 8, 2, true, false, true, 30, '["https://images.unsplash.com/photo-1609205801107-4a2dc63b7777?w=400"]', '["leica", "disto", "laser", "rangefinder", "bluetooth"]', 'Leica Disto X4 Laser Rangefinder - Outdoor Measurement', 'Professional laser distance meter with Bluetooth connectivity for outdoor construction and surveying applications.'),

('Professional Fiberglass Measuring Tape 100m', 'professional-fiberglass-measuring-tape-100m-metric', 'Heavy-duty fiberglass measuring tape for long-distance surveying measurements. Accurate and durable for field use.', 'PRO-TAPE100-001', 199.00, 249.00, 8, 11, true, false, true, 45, '["https://images.unsplash.com/photo-1609205801107-4a2dc63b7777?w=400"]', '["measuring-tape", "fiberglass", "100m", "surveying"]', 'Professional Fiberglass Measuring Tape 100m - Surveying Grade', 'Heavy-duty fiberglass measuring tape for accurate long-distance surveying measurements up to 100 meters.'),

-- Safety Equipment (Category 9)
('Hi-Vis Surveyor Safety Vest Class 2', 'hi-vis-surveyor-safety-vest-class-2-ansi', 'ANSI Class 2 high-visibility safety vest designed specifically for surveying professionals. Multiple pockets for equipment.', 'SAF-VEST-CL2-001', 89.00, 119.00, 9, 11, true, false, true, 100, '["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"]', '["safety-vest", "hi-vis", "surveyor", "ansi-class-2"]', 'Hi-Vis Surveyor Safety Vest Class 2 - ANSI Compliant', 'ANSI Class 2 high-visibility safety vest designed for surveying professionals with specialized tool pockets.'),

('Professional Hard Hat with Chinstrap', 'professional-hard-hat-chinstrap-surveying-safety', 'ANSI Z89.1 certified hard hat with adjustable chinstrap for surveying and construction safety. Lightweight yet durable protection.', 'SAF-HHAT-001', 45.00, 59.00, 9, 11, true, false, true, 80, '["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"]', '["hard-hat", "safety", "ansi", "surveying", "construction"]', 'Professional Hard Hat with Chinstrap - ANSI Certified', 'ANSI Z89.1 certified hard hat with adjustable chinstrap for surveying and construction safety applications.'),

-- Tripods & Accessories (Category 10)
('Heavy Duty Aluminum Survey Tripod', 'heavy-duty-aluminum-survey-tripod-professional', 'Professional-grade aluminum tripod for total stations and GNSS equipment. Adjustable height with quick-release leg locks.', 'TRP-ALU-HD-001', 399.00, 499.00, 10, 11, true, false, true, 25, '["https://images.unsplash.com/photo-1609205801107-4a2dc63b7777?w=400"]', '["tripod", "aluminum", "survey", "professional", "heavy-duty"]', 'Heavy Duty Aluminum Survey Tripod - Professional Grade', 'Professional aluminum tripod for total stations and GNSS equipment with quick-release leg locks and 8kg capacity.'),

('Leica GZR3 360° Reflector Prism', 'leica-gzr3-360-degree-reflector-prism-surveying', 'High-precision 360° reflector prism for total station measurements. Superior accuracy and durability for professional surveying.', 'LCA-GZR3-001', 899.00, 1099.00, 10, 2, true, true, true, 15, '["https://images.unsplash.com/photo-1609205801107-4a2dc63b7777?w=400"]', '["leica", "prism", "reflector", "360-degree", "surveying"]', 'Leica GZR3 360° Reflector Prism - Surveying Precision', 'High-precision 360° reflector prism for total station measurements with superior accuracy up to 3500m range.'),

('Carbon Fiber Survey Pole 2m', 'carbon-fiber-survey-pole-2m-telescopic-lightweight', 'Lightweight carbon fiber survey pole with telescopic design. Perfect for GNSS surveying and prism mounting applications.', 'POL-CF-2M-001', 299.00, 349.00, 10, 11, true, false, true, 35, '["https://images.unsplash.com/photo-1609205801107-4a2dc63b7777?w=400"]', '["survey-pole", "carbon-fiber", "telescopic", "lightweight"]', 'Carbon Fiber Survey Pole 2m - Telescopic Lightweight', 'Lightweight carbon fiber survey pole with telescopic design for GNSS surveying and prism mounting applications.'),

-- Additional Premium Products
('Trimble SX10 Scanning Total Station', 'trimble-sx10-scanning-total-station-3d-imaging', 'Revolutionary scanning total station combining high-speed 3D scanning with traditional surveying. Game-changing technology for comprehensive data capture.', 'TRM-SX10-001', 89999.00, 99999.00, 2, 1, true, true, true, 1, '["https://images.unsplash.com/photo-1581094289206-c0ddd9e21b0e?w=400"]', '["trimble", "sx10", "scanning", "3d", "imaging"]', 'Trimble SX10 Scanning Total Station - 3D Imaging Technology', 'Revolutionary scanning total station with high-speed 3D scanning and traditional surveying capabilities for comprehensive data capture.'),

('Leica RTC360 3D Laser Scanner', 'leica-rtc360-3d-laser-scanner-high-speed-imaging', 'High-speed 3D laser scanner for reality capture and BIM applications. Ultra-fast scanning with automated target recognition and HDR imaging.', 'LCA-RTC360-001', 129999.00, 149999.00, 6, 2, true, true, true, 1, '["https://images.unsplash.com/photo-1581094289206-c0ddd9e21b0e?w=400"]', '["leica", "rtc360", "3d-scanner", "reality-capture", "bim"]', 'Leica RTC360 3D Laser Scanner - Reality Capture Technology', 'High-speed 3D laser scanner for reality capture and BIM with automated target recognition and HDR imaging capabilities.');

-- Update sequence to continue from where it left off
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
SELECT setval('brands_id_seq', (SELECT MAX(id) FROM brands));
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
