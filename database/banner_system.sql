-- Banner Management System for GPS Store
-- Add banner table to existing database

-- Create banner table
CREATE TABLE IF NOT EXISTS banners (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    mobile_image_url VARCHAR(500),
    button_text VARCHAR(100),
    button_url VARCHAR(500),
    background_color VARCHAR(20) DEFAULT '#ffffff',
    text_color VARCHAR(20) DEFAULT '#000000',
    position VARCHAR(50) DEFAULT 'hero', -- 'hero', 'banner', 'sidebar', 'footer'
    size VARCHAR(50) DEFAULT 'large', -- 'small', 'medium', 'large', 'full'
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NULL,
    click_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    target_audience VARCHAR(100), -- 'all', 'mobile', 'desktop', 'new_visitors', 'returning_visitors'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample banners for GPS store
INSERT INTO banners (title, subtitle, description, image_url, mobile_image_url, button_text, button_url, background_color, text_color, position, size, display_order, is_active) VALUES
('GPS Terbaru 2025', 'Dapatkan Navigasi Presisi Tinggi', 'Koleksi GPS handheld dan surveying terlengkap dengan teknologi terdepan. Garansi resmi dan harga terbaik di Indonesia.', 'https://source.unsplash.com/1200x400/?gps,technology', 'https://source.unsplash.com/800x600/?gps,handheld', 'Lihat Produk', '/shop?category=gps-handheld', '#1e40af', '#ffffff', 'hero', 'large', 1, true),

('Promo Total Station', 'Diskon Hingga 30%', 'Total station Leica, Topcon, dan Sokkia dengan diskon besar-besaran. Cocok untuk survei konstruksi dan pemetaan profesional.', 'https://source.unsplash.com/1200x400/?surveying,construction', 'https://source.unsplash.com/800x600/?surveying,equipment', 'Beli Sekarang', '/shop?category=total-station', '#dc2626', '#ffffff', 'hero', 'large', 2, true),

('Drone Survey RTK', 'Teknologi Mapping Udara', 'DJI Phantom 4 RTK dan drone survey profesional lainnya. Akurasi centimeter untuk pemetaan dan survei aerial.', 'https://source.unsplash.com/1200x400/?drone,aerial', 'https://source.unsplash.com/800x600/?drone,mapping', 'Pelajari Lebih', '/shop?category=drone-survey', '#059669', '#ffffff', 'hero', 'large', 3, true),

('Gratis Konsultasi', 'Solusi Survei Terbaik', 'Tim ahli kami siap membantu memilih peralatan survei yang sesuai dengan kebutuhan proyek Anda.', 'https://source.unsplash.com/600x300/?consultation,expert', 'https://source.unsplash.com/400x400/?consultation,help', 'Hubungi Kami', '/contact', '#7c3aed', '#ffffff', 'banner', 'medium', 4, true),

('Pelatihan GPS', 'Kursus Survei & Pemetaan', 'Ikuti pelatihan profesional penggunaan GPS dan alat survei. Sertifikat resmi dan praktek langsung di lapangan.', 'https://source.unsplash.com/600x300/?training,education', 'https://source.unsplash.com/400x400/?training,course', 'Daftar Sekarang', '/training', '#ea580c', '#ffffff', 'banner', 'medium', 5, true),

('Layanan Kalibrasi', 'Akurasi Terjamin', 'Layanan kalibrasi dan service untuk semua merk alat survei. Dikerjakan oleh teknisi berpengalaman dan bersertifikat.', 'https://source.unsplash.com/400x200/?calibration,service', 'https://source.unsplash.com/300x300/?calibration,repair', 'Info Layanan', '/services', '#0891b2', '#ffffff', 'sidebar', 'small', 6, true),

('Garansi Resmi', 'Jaminan Kualitas', 'Semua produk bergaransi resmi dengan layanan after-sales terbaik. Spare part tersedia dan service center di seluruh Indonesia.', 'https://source.unsplash.com/400x200/?warranty,guarantee', 'https://source.unsplash.com/300x300/?warranty,service', 'Pelajari', '/warranty', '#16a34a', '#ffffff', 'sidebar', 'small', 7, true);

-- Create banner analytics table
CREATE TABLE IF NOT EXISTS banner_analytics (
    id BIGSERIAL PRIMARY KEY,
    banner_id BIGINT NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'view', 'click', 'conversion'
    user_agent TEXT,
    ip_address VARCHAR(45),
    referrer TEXT,
    device_type VARCHAR(50), -- 'mobile', 'desktop', 'tablet'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (banner_id) REFERENCES banners(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_banners_active ON banners(is_active);
CREATE INDEX idx_banners_position ON banners(position);
CREATE INDEX idx_banners_display_order ON banners(display_order);
CREATE INDEX idx_banners_dates ON banners(start_date, end_date);
CREATE INDEX idx_banner_analytics_banner_id ON banner_analytics(banner_id);
CREATE INDEX idx_banner_analytics_event_type ON banner_analytics(event_type);
CREATE INDEX idx_banner_analytics_created_at ON banner_analytics(created_at);
