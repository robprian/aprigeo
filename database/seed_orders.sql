-- Create sample orders for testing
-- First, ensure we have the orders and order_items tables (they should exist from schema)

-- Insert sample orders
INSERT INTO orders (
    user_id, order_number, status, subtotal, tax_amount, shipping_amount, 
    total_amount, currency, payment_status, payment_method, shipping_method, created_at
) VALUES 
(1, 'ORD-2024-001', 'delivered', 239985000, 19200000, 0, 259185000, 'IDR', 'completed', 'Credit Card', 'Express Shipping', '2024-01-15 10:00:00'),
(1, 'ORD-2024-002', 'shipped', 434985000, 34800000, 0, 469785000, 'IDR', 'completed', 'Credit Card', 'Standard Shipping', '2024-01-20 14:30:00'),
(1, 'ORD-2024-003', 'processing', 38970000, 3120000, 225000, 42315000, 'IDR', 'pending', 'PayPal', 'Standard Shipping', '2024-01-25 09:15:00'),
(1, 'ORD-2024-004', 'cancelled', 13485000, 1080000, 225000, 14790000, 'IDR', 'refunded', 'Credit Card', 'Standard Shipping', '2024-01-10 16:45:00');

-- Get the order IDs for the inserted orders
-- Note: In production, you'd handle this differently, but for seed data this works

-- Insert order items (assuming we have products with IDs 1, 2, 4, 5)
-- For ORD-2024-001
INSERT INTO order_items (order_id, product_id, quantity, price, total)
SELECT o.id, 1, 1, 239985000, 239985000 
FROM orders o WHERE o.order_number = 'ORD-2024-001';

-- For ORD-2024-002  
INSERT INTO order_items (order_id, product_id, quantity, price, total)
SELECT o.id, 2, 1, 434985000, 434985000 
FROM orders o WHERE o.order_number = 'ORD-2024-002';

-- For ORD-2024-003 (2 items)
INSERT INTO order_items (order_id, product_id, quantity, price, total)
SELECT o.id, 4, 2, 19485000, 38970000 
FROM orders o WHERE o.order_number = 'ORD-2024-003';

-- For ORD-2024-004
INSERT INTO order_items (order_id, product_id, quantity, price, total)
SELECT o.id, 5, 1, 13485000, 13485000 
FROM orders o WHERE o.order_number = 'ORD-2024-004';

-- Insert shipping addresses
INSERT INTO order_addresses (order_id, type, first_name, last_name, address_line_1, city, state, postal_code, country, phone)
SELECT o.id, 'shipping', 'John', 'Doe', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 'Indonesia', '+62-21-5551234'
FROM orders o WHERE o.order_number = 'ORD-2024-001';

INSERT INTO order_addresses (order_id, type, first_name, last_name, address_line_1, city, state, postal_code, country, phone)
SELECT o.id, 'shipping', 'John', 'Doe', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 'Indonesia', '+62-21-5551234'
FROM orders o WHERE o.order_number = 'ORD-2024-002';

INSERT INTO order_addresses (order_id, type, first_name, last_name, address_line_1, city, state, postal_code, country, phone)
SELECT o.id, 'shipping', 'John', 'Doe', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 'Indonesia', '+62-21-5551234'
FROM orders o WHERE o.order_number = 'ORD-2024-003';

INSERT INTO order_addresses (order_id, type, first_name, last_name, address_line_1, city, state, postal_code, country, phone)
SELECT o.id, 'shipping', 'John', 'Doe', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 'Indonesia', '+62-21-5551234'
FROM orders o WHERE o.order_number = 'ORD-2024-004';
