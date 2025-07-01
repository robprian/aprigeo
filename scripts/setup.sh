#!/bin/bash

# GPS Survey Store - Setup Script
echo "🚀 Setting up GPS Survey Store..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your configuration."
else
    echo "✅ .env file already exists."
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p data/postgres
mkdir -p data/redis
mkdir -p data/meilisearch
mkdir -p logs

# Set permissions
chmod 755 data/postgres
chmod 755 data/redis
chmod 755 data/meilisearch
chmod 755 logs

echo "✅ Directories created and permissions set."

# Pull Docker images
echo "📦 Pulling Docker images..."
docker-compose pull

# Build the application
echo "🔨 Building application..."
docker-compose build

echo "🎉 Setup completed!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Run: docker-compose up -d"
echo "3. Visit: http://localhost:3000"
echo ""
echo "For deployment to Dokploy, see DEPLOYMENT.md"