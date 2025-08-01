-- Insert test customers with encrypted passwords
-- Password for both users is: "password123" (will be hashed with bcrypt)

-- First, let's insert the test customers
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, email_verified_at, is_active, created_at) VALUES
('zwolf.dev@gmail.com', '$2a$12$LQv3c1yqBwuZol7Ng5oQRu0K7a8aYRW8OMWLPwOlPX3pV8h2e6qE.', 'Zwolf', 'Developer', '+628123456789', 'customer', NOW(), true, NOW()),
('developer.aprinia@gmail.com', '$2a$12$LQv3c1yqBwuZol7Ng5oQRu0K7a8aYRW8OMWLPwOlPX3pV8h2e6qE.', 'Aprinia', 'Developer', '+628987654321', 'customer', NOW(), true, NOW());

-- Get the user IDs for the customers we just inserted
DO $$
DECLARE
    zwolf_user_id BIGINT;
    aprinia_user_id BIGINT;
    zwolf_address_id BIGINT;
    aprinia_address_id BIGINT;
    zwolf_order_id BIGINT;
    aprinia_order_id BIGINT;
BEGIN
    -- Get user IDs
    SELECT id INTO zwolf_user_id FROM users WHERE email = 'zwolf.dev@gmail.com';
    SELECT id INTO aprinia_user_id FROM users WHERE email = 'developer.aprinia@gmail.com';

    -- Create customer profiles
    INSERT INTO customer_profiles (user_id, company_name, total_orders, total_spent, created_at) VALUES
    (zwolf_user_id, 'Zwolf Development', 2, 3599800.00, NOW()),
    (aprinia_user_id, 'Aprinia Solutions', 1, 1599900.00, NOW());

    -- Create addresses for the customers
    INSERT INTO user_addresses (user_id, type, name, company, address_line_1, address_line_2, city, state, postal_code, country, phone, is_default, created_at) VALUES
    (zwolf_user_id, 'shipping', 'Zwolf Developer', 'Zwolf Development', 'Jl. Sudirman No. 123', 'Gedung Plaza Indonesia, Lt. 15', 'Jakarta Pusat', 'DKI Jakarta', '10220', 'Indonesia', '+628123456789', true, NOW()),
    (aprinia_user_id, 'shipping', 'Aprinia Developer', 'Aprinia Solutions', 'Jl. Thamrin No. 456', 'Menara BCA, Lt. 20', 'Jakarta Pusat', 'DKI Jakarta', '10230', 'Indonesia', '+628987654321', true, NOW());

    -- Get address IDs
    SELECT id INTO zwolf_address_id FROM user_addresses WHERE user_id = zwolf_user_id LIMIT 1;
    SELECT id INTO aprinia_address_id FROM user_addresses WHERE user_id = aprinia_user_id LIMIT 1;

    -- Create some test orders for Zwolf
    INSERT INTO orders (user_id, order_number, status, payment_status, subtotal, shipping_amount, tax_amount, total_amount, shipping_address_id, billing_address_id, created_at, updated_at) VALUES
    (zwolf_user_id, 'ORD-2024-001', 'delivered', 'paid', 2399850.00, 0.00, 192000.00, 2591850.00, zwolf_address_id, zwolf_address_id, '2024-01-15 10:30:00', '2024-01-18 14:30:00'),
    (zwolf_user_id, 'ORD-2024-002', 'shipped', 'paid', 799950.00, 0.00, 64000.00, 863950.00, zwolf_address_id, zwolf_address_id, '2024-01-20 15:45:00', '2024-01-22 09:15:00');

    -- Create test order for Aprinia
    INSERT INTO orders (user_id, order_number, status, payment_status, subtotal, shipping_amount, tax_amount, total_amount, shipping_address_id, billing_address_id, created_at, updated_at) VALUES
    (aprinia_user_id, 'ORD-2024-003', 'processing', 'paid', 1599900.00, 0.00, 128000.00, 1727900.00, aprinia_address_id, aprinia_address_id, '2024-01-25 11:20:00', '2024-01-25 11:20:00');

    -- Get order IDs
    SELECT id INTO zwolf_order_id FROM orders WHERE order_number = 'ORD-2024-001';
    INSERT INTO order_items (order_id, product_id, quantity, price, total, created_at) VALUES
    (zwolf_order_id, 1, 1, 1599900.00, 1599900.00, NOW()),
    (zwolf_order_id, 2, 1, 799950.00, 799950.00, NOW());

    SELECT id INTO zwolf_order_id FROM orders WHERE order_number = 'ORD-2024-002';
    INSERT INTO order_items (order_id, product_id, quantity, price, total, created_at) VALUES
    (zwolf_order_id, 3, 1, 799950.00, 799950.00, NOW());

    SELECT id INTO aprinia_order_id FROM orders WHERE order_number = 'ORD-2024-003';
    INSERT INTO order_items (order_id, product_id, quantity, price, total, created_at) VALUES
    (aprinia_order_id, 1, 1, 1599900.00, 1599900.00, NOW());

    -- Update customer profile stats
    UPDATE customer_profiles 
    SET total_orders = 2, 
        total_spent = 3455800.00, 
        last_order_date = '2024-01-22 09:15:00'
    WHERE user_id = zwolf_user_id;

    UPDATE customer_profiles 
    SET total_orders = 1, 
        total_spent = 1727900.00, 
        last_order_date = '2024-01-25 11:20:00'
    WHERE user_id = aprinia_user_id;

END $$;
