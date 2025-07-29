-- Create products table if not exists
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(15,2) NOT NULL DEFAULT 0,
    category_id INTEGER,
    brand_id INTEGER,
    image_url VARCHAR(500),
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table if not exists
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create brands table if not exists
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES 
('GPS & GNSS Equipment', 'gps-gnss-equipment'),
('Survey Instruments', 'survey-instruments'),
('Mapping Software', 'mapping-software'),
('Accessories', 'accessories')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample brands
INSERT INTO brands (name, slug) VALUES 
('Trimble', 'trimble'),
('Topcon', 'topcon'),
('Nikon', 'nikon'),
('Garmin', 'garmin'),
('Leica', 'leica'),
('Sokkia', 'sokkia')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products for testing
INSERT INTO products (name, slug, sku, description, price, category_id, brand_id, image_url, in_stock) VALUES 
('GPS Trimble R10 GNSS Receiver', 'gps-trimble-r10-gnss-receiver', 'TRM-R10-001', 'High-precision GPS receiver for professional surveying with multi-constellation support', 15000000, 1, 1, '/images/products/trimble-r10.jpg', true),
('Total Station Topcon GT-1005', 'total-station-topcon-gt-1005', 'TOP-GT1005', 'Advanced total station with 5-second accuracy and Windows CE platform', 8500000, 2, 2, '/images/products/topcon-gt1005.jpg', true),
('Theodolite Nikon NE-102', 'theodolite-nikon-ne-102', 'NIK-NE102', 'Professional electronic theodolite for precise angle measurements', 3200000, 2, 3, '/images/products/nikon-ne102.jpg', true),
('GPS Handheld Garmin eTrex 32x', 'gps-handheld-garmin-etrex-32x', 'GAR-ETX32X', 'Rugged handheld GPS with 3-axis compass and barometric altimeter', 2800000, 1, 4, '/images/products/garmin-etrex32x.jpg', true),
('Leica FlexLine TS07 Total Station', 'leica-flexline-ts07-total-station', 'LEI-TS07', 'Ultra-modern total station with PowerSearch technology', 12500000, 2, 5, '/images/products/leica-ts07.jpg', true),
('Trimble SPS985 GNSS Smart Antenna', 'trimble-sps985-gnss-smart-antenna', 'TRM-SPS985', 'All-in-one GNSS smart antenna with integrated receiver', 18500000, 1, 1, '/images/products/trimble-sps985.jpg', true),
('Sokkia CX-105 Total Station', 'sokkia-cx-105-total-station', 'SOK-CX105', 'Reflectorless total station with dual-axis compensator', 6800000, 2, 6, '/images/products/sokkia-cx105.jpg', true),
('GPS Trimble Catalyst DA2 Receiver', 'gps-trimble-catalyst-da2-receiver', 'TRM-CAT-DA2', 'Software-defined GNSS receiver for smartphones and tablets', 4500000, 1, 1, '/images/products/trimble-catalyst.jpg', true),
('Topcon HiPer HR GNSS Receiver', 'topcon-hiper-hr-gnss-receiver', 'TOP-HIPERHR', 'High-performance RTK GNSS receiver with UHF radio', 14200000, 1, 2, '/images/products/topcon-hiper.jpg', true),
('Nikon DTM-322+ Total Station', 'nikon-dtm-322-total-station', 'NIK-DTM322', 'Entry-level electronic total station with laser plummet', 5600000, 2, 3, '/images/products/nikon-dtm322.jpg', true)
ON CONFLICT (slug) DO NOTHING;
