-- Update product prices to Indonesian Rupiah (IDR) format
-- Conversion rate: 1 USD = 15,000 IDR (approximate)

UPDATE products SET 
  price = price * 15000,
  compare_price = compare_price * 15000,
  cost_price = cost_price * 15000
WHERE price < 100000; -- Only update products that haven't been converted yet

-- Specific updates for Indonesian products with proper IDR pricing
UPDATE products SET 
  price = 283500000,  -- ~$18,900 * 15,000
  compare_price = 315000000,  -- ~$21,000 * 15,000  
  cost_price = 217500000   -- ~$14,500 * 15,000
WHERE sku = 'TRM-R10M2-IDN-001';

UPDATE products SET 
  price = 337500000,  -- ~$22,500 * 15,000
  compare_price = 375000000,  -- ~$25,000 * 15,000
  cost_price = 262500000   -- ~$17,500 * 15,000
WHERE sku = 'LCA-GS16UM-IDN-001';

UPDATE products SET 
  price = 247500000,  -- ~$16,500 * 15,000
  compare_price = 277500000,  -- ~$18,500 * 15,000
  cost_price = 187500000   -- ~$12,500 * 15,000
WHERE sku = 'TPC-HIPERSR-IDN-001';

UPDATE products SET 
  price = 675000000,  -- ~$45,000 * 15,000
  compare_price = 750000000,  -- ~$50,000 * 15,000
  cost_price = 525000000   -- ~$35,000 * 15,000
WHERE sku = 'LCA-TS16P-IDN-001';

UPDATE products SET 
  price = 630000000,  -- ~$42,000 * 15,000
  compare_price = 705000000,  -- ~$47,000 * 15,000
  cost_price = 480000000   -- ~$32,000 * 15,000
WHERE sku = 'TPC-GT1200-IDN-001';

UPDATE products SET 
  price = 975000000,  -- ~$65,000 * 15,000
  compare_price = 1080000000,  -- ~$72,000 * 15,000
  cost_price = 750000000   -- ~$50,000 * 15,000
WHERE sku = 'TRM-S9HP-IDN-001';

UPDATE products SET 
  price = 67500000,  -- ~$4,500 * 15,000
  compare_price = 78000000,  -- ~$5,200 * 15,000
  cost_price = 52500000   -- ~$3,500 * 15,000
WHERE sku = 'LCA-RUG880-IDN-001';

UPDATE products SET 
  price = 57000000,  -- ~$3,800 * 15,000
  compare_price = 63000000,  -- ~$4,200 * 15,000
  cost_price = 42000000   -- ~$2,800 * 15,000
WHERE sku = 'TPC-RLH5A-IDN-001';

UPDATE products SET 
  price = 42000000,  -- ~$2,800 * 15,000
  compare_price = 48000000,  -- ~$3,200 * 15,000
  cost_price = 33000000   -- ~$2,200 * 15,000
WHERE sku = 'LCA-BLD500-IDN-001';

UPDATE products SET 
  price = 142500000,  -- ~$9,500 * 15,000
  compare_price = 165000000,  -- ~$11,000 * 15,000
  cost_price = 112500000   -- ~$7,500 * 15,000
WHERE sku = 'HIT-V200-IDN-001';

UPDATE products SET 
  price = 187500000,  -- ~$12,500 * 15,000
  compare_price = 210000000,  -- ~$14,000 * 15,000
  cost_price = 142500000   -- ~$9,500 * 15,000
WHERE sku = 'STH-G1PLUS-IDN-001';

UPDATE products SET 
  price = 27750000,  -- ~$1,850 * 15,000
  compare_price = 31500000,  -- ~$2,100 * 15,000
  cost_price = 21000000   -- ~$1,400 * 15,000
WHERE sku = 'LCA-DISTOX4-IDN-001';

COMMIT;
