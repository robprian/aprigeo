-- Create invoice_settings table
CREATE TABLE IF NOT EXISTS invoice_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    company_name VARCHAR(255) NOT NULL DEFAULT 'Aprinia Geosat',
    company_address TEXT NOT NULL DEFAULT 'Jl. Raya Survey No. 123, Jakarta',
    company_phone VARCHAR(50) NOT NULL DEFAULT '(+62) 21-1234-5678',
    company_email VARCHAR(255) NOT NULL DEFAULT 'info@apriniageosat.com',
    footer_text TEXT NOT NULL DEFAULT 'Thank you for choosing Aprinia Geosat!',
    footer_support_text TEXT NOT NULL DEFAULT 'For support or questions about this invoice, contact us at support@apriniageosat.com',
    logo_url VARCHAR(500) DEFAULT '/logo-aprinia-geosat.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO invoice_settings (id, company_name, company_address, company_phone, company_email, footer_text, footer_support_text, logo_url) 
VALUES (1, 'Aprinia Geosat', 'Jl. Raya Survey No. 123, Jakarta', '(+62) 21-1234-5678', 'info@apriniageosat.com', 'Thank you for choosing Aprinia Geosat!', 'For support or questions about this invoice, contact us at support@apriniageosat.com', '/logo-aprinia-geosat.png')
ON CONFLICT (id) DO NOTHING;
