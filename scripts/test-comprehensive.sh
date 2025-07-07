#!/bin/bash

# Comprehensive Test Script for GPS Survey Store
# This script tests all major functionality of the store

echo "🧪 Starting comprehensive GPS Survey Store tests..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    echo -e "${YELLOW}Testing: $test_name${NC}"
    
    if eval "$test_command" &> /dev/null; then
        echo -e "${GREEN}✓ $test_name: PASSED${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ $test_name: FAILED${NC}"
        ((TESTS_FAILED++))
    fi
}

# Test 1: Check if Docker containers are running
echo "🐳 Testing Docker containers..."
run_test "PostgreSQL container" "docker-compose exec postgres pg_isready -U postgres"
run_test "Redis container" "docker-compose exec redis redis-cli ping"
run_test "Meilisearch container" "curl -s http://localhost:7700/health"

# Test 2: Check database connection and data
echo "🗄️ Testing database..."
run_test "Database connection" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT 1'"
run_test "Products table exists" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT COUNT(*) FROM products'"
run_test "Categories table exists" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT COUNT(*) FROM categories'"
run_test "Brands table exists" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT COUNT(*) FROM brands'"
run_test "Banners table exists" "docker-compose exec postgres psql -U postgres -d gps_survey_store -c 'SELECT COUNT(*) FROM banners'"

# Test 3: Check API endpoints
echo "🌐 Testing API endpoints..."
run_test "Products API" "curl -s http://localhost:8000/api/products | jq '.success'"
run_test "Categories API" "curl -s http://localhost:8000/api/categories | jq '.success'"
run_test "Brands API" "curl -s http://localhost:8000/api/brands | jq '.success'"
run_test "Banners API" "curl -s http://localhost:8000/api/banners | jq '.success'"

# Test 4: Check frontend pages
echo "🎨 Testing frontend pages..."
run_test "Homepage" "curl -s http://localhost:8000/ | grep -q 'GPS Survey Store'"
run_test "Shop page" "curl -s http://localhost:8000/shop | grep -q 'GPS'"
run_test "Admin page" "curl -s http://localhost:8000/admin | grep -q 'Admin'"
run_test "Admin banners page" "curl -s http://localhost:8000/admin/banners | grep -q 'Banner'"

# Test 5: Check banner images
echo "🖼️ Testing banner images..."
run_test "Banner images directory" "ls public/images/banners/"
run_test "Hero banner image" "test -f public/images/banners/gps-terbaru-2025.png"
run_test "Mobile banner image" "test -f public/images/banners/gps-terbaru-2025-mobile.png"

# Test 6: Check Meilisearch
echo "🔍 Testing Meilisearch..."
run_test "Meilisearch health" "curl -s http://localhost:7700/health | jq '.status' | grep -q 'available'"
run_test "Meilisearch indexes" "curl -s http://localhost:7700/indexes"

# Test 7: Check environment variables
echo "⚙️ Testing environment variables..."
run_test "Database URL set" "test -n '$DATABASE_URL'"
run_test "Redis URL set" "test -n '$REDIS_URL'"
run_test "Meilisearch host set" "test -n '$NEXT_PUBLIC_MEILISEARCH_HOST'"

# Test 8: Test specific functionalities
echo "🔧 Testing specific functionalities..."

# Test product search
run_test "Product search" "curl -s 'http://localhost:8000/api/products?search=gps' | jq '.data | length' | grep -q '[0-9]'"

# Test banner analytics
run_test "Banner analytics API" "curl -s http://localhost:8000/api/banners/analytics | jq '.success'"

# Test category filtering
run_test "Category filtering" "curl -s 'http://localhost:8000/api/products?category=1' | jq '.success'"

# Test brand filtering
run_test "Brand filtering" "curl -s 'http://localhost:8000/api/products?brand=1' | jq '.success'"

# Test 9: Check file permissions and structure
echo "📁 Testing file structure..."
run_test "Package.json exists" "test -f package.json"
run_test "Next.config.mjs exists" "test -f next.config.mjs"
run_test "Docker-compose.yml exists" "test -f docker-compose.yml"
run_test "Database directory exists" "test -d database"
run_test "Scripts directory exists" "test -d scripts"

# Test 10: Check if seeding scripts work
echo "🌱 Testing seeding scripts..."
run_test "Seed database script exists" "test -f scripts/seed-database.js"
run_test "Seed simple script exists" "test -f scripts/seed-simple.js"
run_test "Seed comprehensive script exists" "test -f scripts/seed-comprehensive.js"

# Summary
echo ""
echo "📊 Test Results Summary:"
echo "========================"
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! GPS Survey Store is working correctly.${NC}"
    exit 0
else
    echo -e "${RED}💥 Some tests failed. Please check the issues above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "1. Make sure Docker containers are running: docker-compose up -d"
    echo "2. Check if the application is built: npm run build"
    echo "3. Verify database is seeded: npm run seed"
    echo "4. Check environment variables in .env file"
    exit 1
fi
