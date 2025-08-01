-- Add test customers and orders

-- Create customer profiles for the customers (users already created above)
INSERT INTO customer_profiles (user_id, company_name, created_at, updated_at) VALUES
(2, 'ABC Surveying Inc.', NOW(), NOW()),
(3, 'Precision Mapping LLC', NOW(), NOW()),
(4, 'GeoTech Solutions', NOW(), NOW());

-- Add some test orders
INSERT INTO orders (user_id, order_number, status, subtotal, total, shipping_address, billing_address, created_at, updated_at) VALUES
(2, 'ORD-2025-001', 'delivered', 15599.98, 15599.98, '{"street": "123 Main St", "city": "Denver", "state": "CO", "zip": "80202", "country": "USA"}', '{"street": "123 Main St", "city": "Denver", "state": "CO", "zip": "80202", "country": "USA"}', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days'),
(3, 'ORD-2025-002', 'shipped', 9199.98, 9199.98, '{"street": "456 Oak Ave", "city": "Austin", "state": "TX", "zip": "73301", "country": "USA"}', '{"street": "456 Oak Ave", "city": "Austin", "state": "TX", "zip": "73301", "country": "USA"}', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'),
(4, 'ORD-2025-003', 'processing', 2799.97, 2799.97, '{"street": "789 Pine Rd", "city": "Seattle", "state": "WA", "zip": "98101", "country": "USA"}', '{"street": "789 Pine Rd", "city": "Seattle", "state": "WA", "zip": "98101", "country": "USA"}', NOW() - INTERVAL '1 day', NOW()),
(2, 'ORD-2025-004', 'pending', 599.99, 599.99, '{"street": "123 Main St", "city": "Denver", "state": "CO", "zip": "80202", "country": "USA"}', '{"street": "123 Main St", "city": "Denver", "state": "CO", "zip": "80202", "country": "USA"}', NOW(), NOW());

-- Add order items
INSERT INTO order_items (order_id, product_id, quantity, price, total) VALUES
-- Order 1: Trimble R12 + Garmin eTrex 32x
(1, 32, 1, 14999.99, 14999.99),
(1, 30, 1, 599.99, 599.99),

-- Order 2: DJI Phantom 4 RTK + Survey Prism Kit
(2, 38, 1, 8999.99, 8999.99),
(2, 40, 1, 199.99, 199.99),

-- Order 3: Emlid Reach RS2+ + Garmin GPSMAP 66i + Leica Battery
(3, 33, 1, 1899.99, 1899.99),
(3, 31, 1, 599.99, 599.99),
(3, 41, 1, 299.99, 299.99),

-- Order 4: Garmin GPSMAP 66i
(4, 31, 1, 599.99, 599.99);
