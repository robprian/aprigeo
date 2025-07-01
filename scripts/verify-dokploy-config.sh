#!/bin/bash

# Script untuk memverifikasi konfigurasi Dokploy
echo "🔍 Verifying Dokploy Configuration"
echo "=================================="

echo ""
echo "1. 📋 Checking required files..."

# Check if required files exist
files=("docker-compose.prod.yml" "dokploy.config.js" ".env.production" "Dockerfile")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""
echo "2. 🔧 Checking environment variables in .env.production..."

# Check if required environment variables are set in .env.production
required_vars=(
    "NODE_ENV"
    "PORT"
    "DATABASE_URL"
    "POSTGRES_DB"
    "POSTGRES_USER"
    "POSTGRES_PASSWORD"
    "REDIS_URL"
    "NEXT_PUBLIC_MEILISEARCH_HOST"
    "NEXT_PUBLIC_MEILISEARCH_API_KEY"
    "MEILI_MASTER_KEY"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
)

if [ -f ".env.production" ]; then
    for var in "${required_vars[@]}"; do
        if grep -q "^$var=" .env.production; then
            echo "✅ $var is set"
        else
            echo "❌ $var is missing"
        fi
    done
else
    echo "❌ .env.production file not found"
fi

echo ""
echo "3. 🐳 Checking Docker Compose configuration..."

# Check docker-compose.prod.yml
if [ -f "docker-compose.prod.yml" ]; then
    echo "✅ docker-compose.prod.yml exists"
    
    # Check if service names are correct
    services=("apriniageosat" "apriniageosat-postgres" "apriniageosat-redis" "apriniageosat-meilisearch")
    for service in "${services[@]}"; do
        if grep -q "^  $service:" docker-compose.prod.yml; then
            echo "✅ Service $service is defined"
        else
            echo "❌ Service $service is missing"
        fi
    done
else
    echo "❌ docker-compose.prod.yml not found"
fi

echo ""
echo "4. 🏗️ Checking Dockerfile..."

if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile exists"
    
    # Check if Dockerfile has required stages
    if grep -q "FROM.*AS runner" Dockerfile; then
        echo "✅ Dockerfile has runner stage"
    else
        echo "❌ Dockerfile missing runner stage"
    fi
    
    if grep -q "EXPOSE 8000" Dockerfile; then
        echo "✅ Dockerfile exposes port 8000"
    else
        echo "❌ Dockerfile doesn't expose port 8000"
    fi
else
    echo "❌ Dockerfile not found"
fi

echo ""
echo "5. 📝 Environment Variables Summary for Dokploy:"
echo "================================================"
echo ""
echo "Copy these to your Dokploy environment variables:"
echo ""

if [ -f ".env.production" ]; then
    while IFS= read -r line; do
        # Skip comments and empty lines
        if [[ ! "$line" =~ ^#.*$ ]] && [[ ! -z "$line" ]]; then
            echo "   $line"
        fi
    done < .env.production
else
    echo "❌ Cannot read .env.production"
fi

echo ""
echo "6. 🚀 Next Steps:"
echo "================"
echo ""
echo "1. Copy docker-compose.prod.yml to your Dokploy project"
echo "2. Set all environment variables in Dokploy dashboard"
echo "3. Configure domain: apriniageosat.co.id"
echo "4. Enable SSL/HTTPS"
echo "5. Deploy the project"
echo "6. Monitor logs for any issues"
echo ""
echo "🔗 Test URLs after deployment:"
echo "   - https://apriniageosat.co.id"
echo "   - https://apriniageosat.co.id/api/health"
echo "   - https://apriniageosat.co.id/admin"