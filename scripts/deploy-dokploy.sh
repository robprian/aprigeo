#!/bin/bash

# GPS Survey Store - Dokploy Deployment Script
echo "🚀 Deploying GPS Survey Store to Dokploy..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it first."
    echo "Run: cp .env.example .env"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
required_vars=("DATABASE_URL" "REDIS_URL" "NEXT_PUBLIC_MEILISEARCH_HOST" "NEXTAUTH_SECRET")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set."
        exit 1
    fi
done

echo "✅ Environment variables validated."

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf gps-survey-store-deploy.tar.gz \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.git \
    --exclude=data \
    --exclude=logs \
    --exclude="*.log" \
    .

echo "✅ Deployment package created: gps-survey-store-deploy.tar.gz"

echo ""
echo "📋 Deployment Instructions for Dokploy:"
echo "1. Login to your Dokploy Panel"
echo "2. Create New Project → Docker Compose"
echo "3. Upload the docker-compose.prod.yml file (rename to docker-compose.yml)"
echo "4. Set the following environment variables in Dokploy:"
echo ""
echo "   NODE_ENV=production"
echo "   PORT=8000"
echo "   DATABASE_URL=postgresql://postgres:GtcCg1mKmrmEfgJLwSqQNlnESslWmEySQWrNHAmAis@apriniageosat-postgres:5432/geosatsolusindo"
echo "   POSTGRES_DB=geosatsolusindo"
echo "   POSTGRES_USER=postgres"
echo "   POSTGRES_PASSWORD=GtcCg1mKmrmEfgJLwSqQNlnESslWmEySQWrNHAmAis"
echo "   REDIS_URL=redis://apriniageosat-redis:6379"
echo "   NEXT_PUBLIC_MEILISEARCH_HOST=http://apriniageosat-meilisearch:7700"
echo "   NEXT_PUBLIC_MEILISEARCH_API_KEY=GtcCg1mKmrmEfgJLwSqQN+lnESslWmEySQWrNHAmAis"
echo "   MEILI_MASTER_KEY=GtcCg1mKmrmEfgJLwSqQN+lnESslWmEySQWrNHAmAis"
echo "   NEXTAUTH_SECRET=DkM0Yfqiqb/splFsII6k3ggH884sWKkFuSfhR2oUNzs"
echo "   NEXTAUTH_URL=https://apriniageosat.co.id"
echo "   FORCE_HTTPS=true"
echo "   LOG_LEVEL=info"
echo "   NEXT_TELEMETRY_DISABLED=1"
echo ""
echo "5. Configure domain routing:"
echo "   - Domain: apriniageosat.co.id"
echo "   - Port: 8000"
echo "   - Enable SSL/HTTPS"
echo ""
echo "6. Deploy the project"
echo "7. Wait for all services to start (may take 3-5 minutes)"
echo "8. Test the deployment:"
echo "   - Frontend: https://apriniageosat.co.id"
echo "   - Admin: https://apriniageosat.co.id/admin"
echo "   - Health: https://apriniageosat.co.id/api/health"
echo ""
echo "🔧 Troubleshooting:"
echo "   - If 404 error persists, check Dokploy logs"
echo "   - Ensure all containers are running"
echo "   - Verify domain DNS points to Dokploy server"
echo "   - Check if port 8000 is accessible"
echo ""
echo "🎉 Ready for deployment!"