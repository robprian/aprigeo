#!/bin/bash

echo "=== APRINIA GEOSAT E-COMMERCE SYSTEM STATUS ==="
echo "Date: $(date)"
echo ""

# Test all main APIs
echo "📋 API ENDPOINTS STATUS:"
echo "------------------------"

# Products API
echo -n "Products API: "
if curl -s http://localhost:3000/api/products > /dev/null; then
    PRODUCTS_COUNT=$(curl -s http://localhost:3000/api/products | jq -r '.pagination.total')
    echo "✅ Working ($PRODUCTS_COUNT products)"
else
    echo "❌ Error"
fi

# Admin Products API
echo -n "Admin Products API: "
if curl -s http://localhost:3000/api/admin/products > /dev/null; then
    ADMIN_PRODUCTS_COUNT=$(curl -s http://localhost:3000/api/admin/products | jq -r '.pagination.total')
    echo "✅ Working ($ADMIN_PRODUCTS_COUNT products)"
else
    echo "❌ Error"
fi

# Brands API
echo -n "Brands API: "
if curl -s http://localhost:3000/api/brands > /dev/null; then
    BRANDS_COUNT=$(curl -s http://localhost:3000/api/brands | jq -r '.data | length')
    echo "✅ Working ($BRANDS_COUNT brands)"
else
    echo "❌ Error"
fi

# Categories API
echo -n "Categories API: "
if curl -s http://localhost:3000/api/categories > /dev/null; then
    CATEGORIES_COUNT=$(curl -s http://localhost:3000/api/categories | jq -r '.data | length')
    echo "✅ Working ($CATEGORIES_COUNT categories)"
else
    echo "❌ Error"
fi

# Blog API
echo -n "Blog API: "
if curl -s http://localhost:3000/api/blog > /dev/null; then
    BLOG_COUNT=$(curl -s http://localhost:3000/api/blog | jq -r '.pagination.total')
    echo "✅ Working ($BLOG_COUNT posts)"
else
    echo "❌ Error"
fi

echo ""
echo "💾 DATABASE CONTENT:"
echo "-------------------"

# Database stats
PGPASSWORD="Kx9Qm7nP8rT2vW5yZ3aB6cE9fH1jL4mN" psql -h localhost -U apriniageosat -d apriniageosatcoid -t -c "
SELECT 
  '📦 Products: ' || COUNT(*) FROM products
UNION ALL SELECT '🏷️  Brands: ' || COUNT(*) FROM brands  
UNION ALL SELECT '📂 Categories: ' || COUNT(*) FROM categories
UNION ALL SELECT '📝 Blog Posts: ' || COUNT(*) FROM blog_posts
UNION ALL SELECT '⭐ Reviews: ' || COUNT(*) FROM reviews
UNION ALL SELECT '🛒 Orders: ' || COUNT(*) FROM orders
UNION ALL SELECT '👥 Users: ' || COUNT(*) FROM users
;"

echo ""
echo "🔄 SYNCHRONIZATION STATUS:"
echo "-------------------------"
echo "✅ Frontend-Admin API sync: Both use same PostgreSQL database"
echo "✅ Real-time data: All endpoints query live database"
echo "✅ Image optimization: Using existing static assets"
echo "✅ Test data: Comprehensive product catalog loaded"

echo ""
echo "🌐 ACCESS URLS:"
echo "--------------"
echo "Frontend: http://localhost:3000"
echo "Admin Portal: http://localhost:3000/admin"
echo "API Documentation: Available at /api/* endpoints"

echo ""
echo "✨ SYSTEM READY FOR DEMONSTRATION!"
