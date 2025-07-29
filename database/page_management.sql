-- Page Management System
CREATE TABLE IF NOT EXISTS page_settings (
  id SERIAL PRIMARY KEY,
  page_slug VARCHAR(100) UNIQUE NOT NULL,
  page_name VARCHAR(200) NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  meta_title VARCHAR(200),
  meta_description TEXT,
  custom_content TEXT,
  page_type VARCHAR(50) DEFAULT 'static',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default pages
INSERT INTO page_settings (page_slug, page_name, is_visible, meta_title, meta_description, page_type) VALUES
('about', 'About Us', true, 'About Us - Fresh Quality Products', 'Learn more about our company and commitment to quality fresh products', 'static'),
('contact', 'Contact Us', true, 'Contact Us - Get in Touch', 'Contact our customer service team for any questions or support', 'static'),
('shop', 'Shop', true, 'Shop - Fresh Products Online', 'Browse our wide selection of fresh quality products', 'category'),
('faq', 'FAQ', true, 'Frequently Asked Questions', 'Find answers to common questions about our products and services', 'static'),
('privacy-policy', 'Privacy Policy', true, 'Privacy Policy', 'Our privacy policy and data protection information', 'legal'),
('terms-conditions', 'Terms & Conditions', true, 'Terms & Conditions', 'Terms and conditions for using our services', 'legal'),
('shipping-policy', 'Shipping Policy', true, 'Shipping Information', 'Information about our shipping policies and delivery', 'legal'),
('returns', 'Returns & Refunds', true, 'Returns & Refunds Policy', 'Our return and refund policy information', 'legal'),
('tracking', 'Track Order', true, 'Track Your Order', 'Track your order status and delivery information', 'service'),
('wishlist', 'Wishlist', true, 'My Wishlist', 'Save your favorite products for later', 'account'),
('compare', 'Compare Products', true, 'Compare Products', 'Compare features and prices of different products', 'service');

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_page_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER page_settings_updated_at
  BEFORE UPDATE ON page_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_page_settings_updated_at();

-- User profiles for enhanced account management
CREATE TABLE IF NOT EXISTS user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10),
  profile_image_url TEXT,
  bio TEXT,
  preferences JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{"email": true, "sms": false, "push": true}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User addresses table enhancement
CREATE TABLE IF NOT EXISTS user_addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  address_type VARCHAR(50) DEFAULT 'delivery', -- delivery, billing, both
  is_default BOOLEAN DEFAULT false,
  label VARCHAR(100), -- Home, Office, etc.
  recipient_name VARCHAR(200),
  phone VARCHAR(20),
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Indonesia',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update trigger for user profiles
CREATE OR REPLACE FUNCTION update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_profiles_updated_at();

-- Update trigger for user addresses
CREATE OR REPLACE FUNCTION update_user_addresses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_addresses_updated_at
  BEFORE UPDATE ON user_addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_user_addresses_updated_at();
