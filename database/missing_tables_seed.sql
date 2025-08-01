-- Seed data for missing tables

-- Insert banners
INSERT INTO banners (title, subtitle, description, image_url, link_url, is_active, sort_order, created_at, updated_at)
VALUES 
  ('Welcome to ApriniaGeosat', 'Your trusted GPS and surveying equipment partner', 'Discover our wide range of professional surveying instruments and GPS devices', '/images/banner-1.jpg', '/shop', true, 1, NOW(), NOW()),
  ('Professional GPS Solutions', 'High-precision GPS and GNSS equipment', 'Find the perfect GPS solution for your surveying needs', '/images/banner-2.jpg', '/categories/gps', true, 2, NOW(), NOW()),
  ('Expert Support & Service', 'Professional installation and calibration services', 'Get expert support for all your surveying equipment', '/images/banner-3.jpg', '/contact', true, 3, NOW(), NOW());

-- Insert promotional banners
INSERT INTO promotional_banners (
  title, subtitle, description, primary_text, secondary_text, discount_text, 
  button_text, button_url, image_url, background_color, text_color, accent_color, 
  banner_type, is_active, display_order, created_at, updated_at
)
VALUES 
  (
    'New Year Sale', 
    'Up to 30% off on GPS equipment', 
    'Limited time offer on professional GPS and surveying instruments',
    'Professional GPS Equipment',
    'Save big on premium surveying tools',
    '30% OFF',
    'Shop Now',
    '/shop?sale=true',
    '/images/promo-gps.jpg',
    '#2563eb',
    '#ffffff',
    '#fbbf24',
    'hero',
    true,
    1,
    NOW(),
    NOW()
  ),
  (
    'Bundle Deals',
    'Complete surveying packages',
    'Get everything you need for your surveying projects',
    'Complete Solutions',
    'GPS + Software + Support',
    'BUNDLE',
    'View Packages',
    '/categories/bundles',
    '/images/promo-bundle.jpg',
    '#059669',
    '#ffffff',
    '#34d399',
    'promotion',
    true,
    2,
    NOW(),
    NOW()
  );

-- Insert store settings
INSERT INTO store_settings (setting_key, setting_value, setting_type, setting_group, description, is_active, created_at, updated_at)
VALUES 
  ('store_name', 'ApriniaGeosat Store', 'text', 'general', 'Store name displayed in header and footer', true, NOW(), NOW()),
  ('store_email', 'info@apriniageosat.com', 'email', 'general', 'Main store email address', true, NOW(), NOW()),
  ('store_phone', '+62-21-1234-5678', 'text', 'general', 'Main store phone number', true, NOW(), NOW()),
  ('store_address', 'Jakarta, Indonesia', 'text', 'general', 'Store physical address', true, NOW(), NOW()),
  ('currency', 'IDR', 'text', 'general', 'Default store currency', true, NOW(), NOW()),
  ('tax_rate', '11.00', 'decimal', 'general', 'Default tax rate percentage', true, NOW(), NOW()),
  ('shipping_fee', '50000.00', 'decimal', 'shipping', 'Standard shipping fee', true, NOW(), NOW()),
  ('free_shipping_threshold', '500000.00', 'decimal', 'shipping', 'Minimum order for free shipping', true, NOW(), NOW()),
  ('meta_title', 'ApriniaGeosat - Professional GPS & Surveying Equipment', 'text', 'seo', 'Default meta title for SEO', true, NOW(), NOW()),
  ('meta_description', 'Leading supplier of professional GPS and surveying equipment in Indonesia. Quality instruments, expert support, competitive prices.', 'text', 'seo', 'Default meta description for SEO', true, NOW(), NOW());

-- Update blog posts to add featured_image data
UPDATE blog_posts SET featured_image = image WHERE featured_image IS NULL AND image IS NOT NULL;
