-- Add promotional_banners table for managing the two specific banners
CREATE TABLE IF NOT EXISTS promotional_banners (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  primary_text VARCHAR(255),
  secondary_text VARCHAR(255),
  discount_text VARCHAR(100),
  button_text VARCHAR(100) DEFAULT 'Shop now',
  button_url VARCHAR(255) DEFAULT '/shop',
  image_url VARCHAR(255),
  background_color VARCHAR(100) DEFAULT 'bg-gray-50',
  text_color VARCHAR(100) DEFAULT 'text-gray-900',
  accent_color VARCHAR(100) DEFAULT 'text-green-600',
  banner_type VARCHAR(50) DEFAULT 'promotional', -- promotional, discount, featured
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert the two specific banners requested
INSERT INTO promotional_banners (
  title, subtitle, description, primary_text, secondary_text, discount_text, 
  button_text, button_url, background_color, text_color, accent_color, 
  banner_type, display_order, is_active
) VALUES
(
  'GET EXTRA 50% OFF',
  'Fresh',
  'Everyday',
  'Fresh',
  'Everyday',
  'GET EXTRA 50% OFF',
  'Shop now',
  '/shop',
  'bg-yellow-50',
  'text-gray-900',
  'text-red-500',
  'discount',
  1,
  true
),
(
  'HOT THIS WEEK',
  'Fresh vegetable',
  '& Fruit basket',
  'Fresh vegetable',
  '& Fruit basket',
  'Fresh Packed to order',
  'Shop now',
  '/shop/fresh',
  'bg-green-50',
  'text-gray-900',
  'text-green-600',
  'featured',
  2,
  true
),
(
  'Fresh food',
  'Premium Quality',
  'Delivered Fresh Daily',
  'Fresh food',
  'Premium Quality',
  'Delivered Fresh Daily',
  'Order Now',
  '/shop/fresh-food',
  'bg-blue-50',
  'text-gray-900',
  'text-blue-600',
  'promotional',
  3,
  true
)

ON CONFLICT DO NOTHING;
