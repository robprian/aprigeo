-- Add store_settings table for managing footer and store information
CREATE TABLE IF NOT EXISTS store_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(50) DEFAULT 'text', -- text, textarea, email, phone, url
  setting_group VARCHAR(50) DEFAULT 'general', -- general, contact, social, business
  description VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default store settings
INSERT INTO store_settings (setting_key, setting_value, setting_type, setting_group, description) VALUES
-- Company Info
('company_name', 'CV. Aprinia Geosat Solusindo', 'text', 'general', 'Company name displayed in footer'),
('company_description', 'CV. Aprinia Geosat Solusindo provides professional survey equipment, GPS tools, and mapping solutions for all your geospatial needs.', 'textarea', 'general', 'Company description in footer'),

-- Contact Information
('contact_address', 'Jl. Raya Pasar Minggu No.123, Jakarta Selatan, Indonesia', 'textarea', 'contact', 'Physical address displayed in footer'),
('contact_phone', '(+62) 21-1234-5678', 'phone', 'contact', 'Main phone number'),
('contact_email', 'info@apriniageosat.co.id', 'email', 'contact', 'Main email address'),
('business_hours', 'Mon-Fri: 8:00 AM - 5:00 PM', 'text', 'contact', 'Business operating hours'),

-- Social Media
('facebook_url', '#', 'url', 'social', 'Facebook page URL'),
('instagram_url', '#', 'url', 'social', 'Instagram page URL'),
('twitter_url', '#', 'url', 'social', 'Twitter page URL'),
('linkedin_url', '', 'url', 'social', 'LinkedIn page URL'),

-- Additional Business Info
('whatsapp_number', '+62-812-3456-7890', 'phone', 'contact', 'WhatsApp business number'),
('google_maps_url', '', 'url', 'contact', 'Google Maps location link')

ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  updated_at = CURRENT_TIMESTAMP;
