-- Sample orders data for Indonesian ecommerce site
-- First create some users for orders

-- Insert sample users
INSERT INTO users (
    email, password_hash, first_name, last_name, phone, role, is_active
) VALUES 
('budi@example.com', '$2a$10$XVnB.Sj8QV5Q9bYpzGlQsezpzHcLB6zGQvqoLFHUOYTl3zJ2CjhFO', 'Budi', 'Santoso', '+62812345678', 'customer', true),
('siti@example.com', '$2a$10$XVnB.Sj8QV5Q9bYpzGlQsezpzHcLB6zGQvqoLFHUOYTl3zJ2CjhFO', 'Siti', 'Nurhaliza', '+62813456789', 'customer', true),
('agus@example.com', '$2a$10$XVnB.Sj8QV5Q9bYpzGlQsezpzHcLB6zGQvqoLFHUOYTl3zJ2CjhFO', 'Agus', 'Prasetyo', '+62814567890', 'customer', true);

-- Insert sample orders with Indonesian products and IDR amounts
INSERT INTO orders (
    user_id, order_number, status, 
    subtotal, tax_amount, shipping_amount, discount_amount, total_amount, 
    currency, payment_status, payment_method, shipping_method,
    created_at, updated_at
) VALUES 
(1, 'ORD-2024-001', 'delivered', 2399850.00, 192000.00, 0.00, 0.00, 2591850.00, 'IDR', 'paid', 'credit_card', 'standard_shipping', 
 '2024-01-15 10:30:00', '2024-01-15 10:30:00'),

(1, 'ORD-2024-002', 'shipped', 950000.00, 76000.00, 25000.00, 0.00, 1051000.00, 'IDR', 'paid', 'bank_transfer', 'express_shipping',
 '2024-01-20 14:15:00', '2024-01-20 14:15:00'),

(2, 'ORD-2024-003', 'processing', 1850000.00, 148000.00, 50000.00, 0.00, 2048000.00, 'IDR', 'paid', 'ewallet', 'standard_shipping',
 '2024-01-25 09:45:00', '2024-01-25 09:45:00');

-- Insert order items for each order (using correct column names: price, total)
INSERT INTO order_items (
    order_id, product_id, quantity, price, total
) VALUES 
-- Order 1 items (GPS devices)
(1, 1, 1, 1599900.00, 1599900.00), -- GPS Garmin eTrex 32x
(1, 2, 1, 799950.00, 799950.00),   -- GPS Garmin GPSMAP 64s

-- Order 2 items (Marine equipment)
(2, 6, 1, 950000.00, 950000.00),   -- GPS Garmin GPSMAP 78

-- Order 3 items (Survey equipment)  
(3, 10, 1, 1850000.00, 1850000.00); -- GPS Garmin Montana 700i

-- Insert shipping addresses for orders (without email column)
INSERT INTO order_addresses (
    order_id, type, first_name, last_name, phone,
    address_line_1, address_line_2, city, state, postal_code, country
) VALUES 
(1, 'shipping', 'Budi', 'Santoso', '+62812345678',
 'Jl. Sudirman No. 123', 'Gedung Plaza Indonesia', 'Jakarta Pusat', 'DKI Jakarta', '10220', 'Indonesia'),

(1, 'billing', 'Budi', 'Santoso', '+62812345678',
 'Jl. Sudirman No. 123', 'Gedung Plaza Indonesia', 'Jakarta Pusat', 'DKI Jakarta', '10220', 'Indonesia'),

(2, 'shipping', 'Siti', 'Nurhaliza', '+62813456789',
 'Jl. Malioboro No. 45', '', 'Yogyakarta', 'DI Yogyakarta', '55271', 'Indonesia'),

(2, 'billing', 'Siti', 'Nurhaliza', '+62813456789',
 'Jl. Malioboro No. 45', '', 'Yogyakarta', 'DI Yogyakarta', '55271', 'Indonesia'),

(3, 'shipping', 'Agus', 'Prasetyo', '+62814567890',
 'Jl. Asia Afrika No. 78', 'Kompleks Gedung Sate', 'Bandung', 'Jawa Barat', '40111', 'Indonesia'),

(3, 'billing', 'Agus', 'Prasetyo', '+62814567890',
 'Jl. Asia Afrika No. 78', 'Kompleks Gedung Sate', 'Bandung', 'Jawa Barat', '40111', 'Indonesia');
