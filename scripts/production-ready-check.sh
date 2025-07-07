#!/bin/bash

# Production Deployment Verification Script
# Verifies that the GPS Survey Store is production-ready

echo "🚀 Production Deployment Verification for GPS Survey Store"
echo "========================================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

CHECKS_PASSED=0
CHECKS_FAILED=0

check_status() {
    local check_name="$1"
    local check_command="$2"
    local required="$3"
    
    echo -e "${BLUE}Checking: $check_name${NC}"
    
    if eval "$check_command" &> /dev/null; then
        echo -e "${GREEN}✓ $check_name: OK${NC}"
        ((CHECKS_PASSED++))
    else
        if [ "$required" = "required" ]; then
            echo -e "${RED}✗ $check_name: FAILED (REQUIRED)${NC}"
            ((CHECKS_FAILED++))
        else
            echo -e "${YELLOW}⚠ $check_name: WARNING (OPTIONAL)${NC}"
        fi
    fi
}

echo ""
echo "🔍 Environment Checks"
echo "===================="
check_status "Node.js installed" "node --version" "required"
check_status "npm installed" "npm --version" "required"
check_status "Docker installed" "docker --version" "required"
check_status "Docker Compose installed" "docker-compose --version" "required"

echo ""
echo "📁 File Structure Checks"
echo "======================="
check_status "package.json exists" "test -f package.json" "required"
check_status "next.config.mjs exists" "test -f next.config.mjs" "required"
check_status "docker-compose.yml exists" "test -f docker-compose.yml" "required"
check_status ".env file exists" "test -f .env" "required"
check_status "Database schemas exist" "test -f database/schema_postgres.sql" "required"
check_status "Seed scripts exist" "test -f scripts/seed-database.js" "required"

echo ""
echo "🐳 Docker Container Checks"
echo "========================="
check_status "PostgreSQL container running" "docker-compose ps postgres | grep -q 'Up'" "required"
check_status "Redis container running" "docker-compose ps redis | grep -q 'Up'" "required"
check_status "Meilisearch container running" "docker-compose ps meilisearch | grep -q 'Up'" "required"
check_status "App container running" "docker-compose ps gps-survey-store | grep -q 'Up'" "required"

echo ""
echo "🗄️ Database Checks"
echo "================="
check_status "Database connection" "docker-compose exec postgres pg_isready -U postgres" "required"
check_status "Database exists" "docker-compose exec postgres psql -U postgres -lqt | cut -d \\| -f 1 | grep -qw gps_survey_store" "required"
check_status "Products table has data" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT COUNT(*) FROM products' | grep -q '[1-9]'" "required"
check_status "Categories table has data" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT COUNT(*) FROM categories' | grep -q '[1-9]'" "required"
check_status "Brands table has data" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT COUNT(*) FROM brands' | grep -q '[1-9]'" "required"
check_status "Banners table has data" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT COUNT(*) FROM banners' | grep -q '[1-9]'" "required"

echo ""
echo "🌐 API Endpoint Checks"
echo "====================="
check_status "Products API responds" "curl -s http://localhost:8000/api/products | jq -e '.success == true'" "required"
check_status "Categories API responds" "curl -s http://localhost:8000/api/categories | jq -e '.success == true'" "required"
check_status "Brands API responds" "curl -s http://localhost:8000/api/brands | jq -e '.success == true'" "required"
check_status "Banners API responds" "curl -s http://localhost:8000/api/banners | jq -e '.success == true'" "required"
check_status "Search API responds" "curl -s 'http://localhost:8000/api/products?search=gps' | jq -e '.success == true'" "required"

echo ""
echo "🎨 Frontend Checks"
echo "=================="
check_status "Homepage loads" "curl -s http://localhost:8000/ | grep -q 'GPS'" "required"
check_status "Shop page loads" "curl -s http://localhost:8000/shop" "required"
check_status "Admin portal loads" "curl -s http://localhost:8000/admin" "required"
check_status "Banner management loads" "curl -s http://localhost:8000/admin/banners" "required"
check_status "Product pages load" "curl -s http://localhost:8000/product/garmin-gpsmap-64st-handheld-gps" "optional"

echo ""
echo "🔍 Search & Performance Checks"
echo "=============================="
check_status "Meilisearch health" "curl -s http://localhost:7700/health | jq -e '.status == \"available\"'" "required"
check_status "Redis connection" "docker-compose exec redis redis-cli ping | grep -q 'PONG'" "required"
check_status "Page load time < 3s" "curl -s -w '%{time_total}' -o /dev/null http://localhost:8000/ | awk '{print (\$1 < 3.0)}' | grep -q 1" "optional"

echo ""
echo "🖼️ Asset Checks"
echo "==============="
check_status "Banner images exist" "test -d public/images/banners && ls public/images/banners/*.png" "required"
check_status "Product images directory" "test -d public/images/products" "optional"
check_status "Category images directory" "test -d public/images/categories" "optional"
check_status "Brand images directory" "test -d public/images/brands" "optional"

echo ""
echo "🔐 Security Checks"
echo "=================="
check_status "Environment variables secured" "grep -q 'NEXTAUTH_SECRET' .env" "required"
check_status "Database password set" "grep -q 'POSTGRES_PASSWORD' .env" "required"
check_status "Meilisearch master key set" "grep -q 'MEILI_MASTER_KEY' .env" "required"

echo ""
echo "📊 Production Readiness Summary"
echo "==============================="
echo -e "${GREEN}Checks Passed: $CHECKS_PASSED${NC}"
echo -e "${RED}Checks Failed: $CHECKS_FAILED${NC}"
echo "Total Checks: $((CHECKS_PASSED + CHECKS_FAILED))"

if [ $CHECKS_FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 PRODUCTION READY! 🎉${NC}"
    echo "GPS Survey Store is ready for production deployment."
    echo ""
    echo "Quick Stats:"
    PRODUCT_COUNT=$(docker-compose exec postgres psql -U postgres -d gps_survey_store -t -c 'SELECT COUNT(*) FROM products' | xargs)
    CATEGORY_COUNT=$(docker-compose exec postgres psql -U postgres -d gps_survey_store -t -c 'SELECT COUNT(*) FROM categories' | xargs)
    BRAND_COUNT=$(docker-compose exec postgres psql -U postgres -d gps_survey_store -t -c 'SELECT COUNT(*) FROM brands' | xargs)
    BANNER_COUNT=$(docker-compose exec postgres psql -U postgres -d gps_survey_store -t -c 'SELECT COUNT(*) FROM banners' | xargs)
    
    echo "   📦 Products: $PRODUCT_COUNT"
    echo "   📂 Categories: $CATEGORY_COUNT"
    echo "   🏷️ Brands: $BRAND_COUNT"
    echo "   🖼️ Banners: $BANNER_COUNT"
    echo ""
    echo "Access URLs:"
    echo "   🌐 Storefront: http://localhost:8000"
    echo "   👨‍💼 Admin Portal: http://localhost:8000/admin"
    echo "   🔍 Search Engine: http://localhost:7700"
    echo ""
    exit 0
else
    echo ""
    echo -e "${RED}❌ NOT PRODUCTION READY ❌${NC}"
    echo "Please fix the failed checks before deploying to production."
    echo ""
    echo "Common fixes:"
    echo "1. docker-compose up -d"
    echo "2. npm run seed:comprehensive"
    echo "3. npm run banners:create"
    echo "4. Check .env file configuration"
    echo ""
    exit 1
fi
