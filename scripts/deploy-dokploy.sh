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
echo "3. Upload the docker-compose.yml file"
echo "4. Set the following environment variables:"
echo ""
echo "   DATABASE_URL=$DATABASE_URL"
echo "   POSTGRES_DB=$POSTGRES_DB"
echo "   POSTGRES_USER=$POSTGRES_USER"
echo "   POSTGRES_PASSWORD=$POSTGRES_PASSWORD"
echo "   REDIS_URL=$REDIS_URL"
echo "   NEXT_PUBLIC_MEILISEARCH_HOST=$NEXT_PUBLIC_MEILISEARCH_HOST"
echo "   NEXT_PUBLIC_MEILISEARCH_API_KEY=$NEXT_PUBLIC_MEILISEARCH_API_KEY"
echo "   MEILI_MASTER_KEY=$MEILI_MASTER_KEY"
echo "   NEXTAUTH_SECRET=$NEXTAUTH_SECRET"
echo "   NEXTAUTH_URL=$NEXTAUTH_URL"
echo ""
echo "5. Deploy the project"
echo "6. Wait for all services to start"
echo "7. Test the deployment:"
echo "   - Frontend: http://your-domain:8000"
echo "   - Admin: http://your-domain:8000/admin"
echo "   - Health: http://your-domain:8000/api/health"
echo ""
echo "🎉 Ready for deployment!"