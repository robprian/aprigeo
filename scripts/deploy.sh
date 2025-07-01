#!/bin/bash

# GPS Survey Store Deployment Script for EasyPanel

echo "🚀 Starting GPS Survey Store deployment preparation..."

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

echo "✅ Docker and Docker Compose are installed"

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t gps-survey-store:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully"
else
    echo "❌ Failed to build Docker image"
    exit 1
fi

# Test the container locally
echo "🧪 Testing container locally..."
docker run -d --name gps-test -p 8001:8000 gps-survey-store:latest

# Wait for container to start
sleep 10

# Check if container is running
if docker ps | grep -q gps-test; then
    echo "✅ Container is running successfully"
    
    # Test if the application responds
    if curl -f http://localhost:8001 > /dev/null 2>&1; then
        echo "✅ Application is responding"
    else
        echo "⚠️  Application might not be fully ready yet"
    fi
    
    # Clean up test container
    docker stop gps-test
    docker rm gps-test
else
    echo "❌ Container failed to start"
    exit 1
fi

echo "🎉 Deployment preparation completed successfully!"
echo ""
echo "📋 Next steps for EasyPanel deployment:"
echo "1. Push your code to GitHub repository"
echo "2. In EasyPanel, create a new project"
echo "3. Connect your GitHub repository"
echo "4. Use the provided easypanel.yml configuration"
echo "5. Set environment variables in EasyPanel dashboard"
echo "6. Deploy the application"
echo ""
echo "🔧 Required environment variables:"
echo "- NEXT_PUBLIC_MEILISEARCH_HOST"
echo "- NEXT_PUBLIC_MEILISEARCH_API_KEY"
echo "- MEILI_MASTER_KEY"
