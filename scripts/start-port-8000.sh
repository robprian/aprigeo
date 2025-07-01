#!/bin/bash

# Script untuk menjalankan aplikasi di port 8000
echo "🚀 Starting GPS Survey Store on port 8000..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .next exists
if [ ! -d ".next" ]; then
    echo "🔨 Building application..."
    npm run build
fi

# Start the application on port 8000
echo "✅ Starting application on port 8000..."
echo "🌐 Application will be available at: http://localhost:8000"
echo "🔧 Admin panel: http://localhost:8000/admin"
echo "❤️  Health check: http://localhost:8000/api/health"
echo ""
echo "Press Ctrl+C to stop the application"

npm run start:8000