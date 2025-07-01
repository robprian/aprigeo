#!/bin/bash

# Script untuk testing fix deployment
echo "🧪 Testing Deployment Fix"
echo "========================="

echo ""
echo "Current status:"
echo "✅ Port 8000 working: http://apriniageosat.co.id:8000"
echo "❌ Domain not working: http://apriniageosat.co.id"
echo ""

echo "Testing current endpoints..."

echo "1. Testing port 8000 (should work):"
if curl -f -m 10 http://apriniageosat.co.id:8000 >/dev/null 2>&1; then
    echo "✅ Port 8000 is working"
else
    echo "❌ Port 8000 is not working"
fi

echo ""
echo "2. Testing main domain (currently broken):"
if curl -f -m 10 http://apriniageosat.co.id >/dev/null 2>&1; then
    echo "✅ Main domain is working"
else
    echo "❌ Main domain returns 404 (expected)"
fi

echo ""
echo "3. Testing health endpoint on port 8000:"
if curl -f -m 10 http://apriniageosat.co.id:8000/api/health >/dev/null 2>&1; then
    echo "✅ Health endpoint working on port 8000"
    curl -s http://apriniageosat.co.id:8000/api/health | jq . 2>/dev/null || curl -s http://apriniageosat.co.id:8000/api/health
else
    echo "❌ Health endpoint not working on port 8000"
fi

echo ""
echo "🔧 SOLUTIONS TO TRY:"
echo "==================="
echo ""
echo "Solution 1: Use docker-compose.dokploy-fixed.yml"
echo "- Maps port 80 to container port 8000"
echo "- Should make domain accessible without :8000"
echo ""
echo "Solution 2: Use docker-compose.traefik.yml"
echo "- Uses proper Traefik labels"
echo "- Handles HTTPS redirect automatically"
echo ""
echo "Solution 3: Configure Dokploy Domain Settings"
echo "- In Dokploy dashboard, go to your project"
echo "- Add domain: apriniageosat.co.id"
echo "- Set target port: 8000"
echo "- Enable SSL if needed"
echo ""
echo "Solution 4: Check Dokploy Reverse Proxy"
echo "- Verify reverse proxy is enabled"
echo "- Check if there's a proxy configuration issue"
echo ""

echo "🚀 RECOMMENDED STEPS:"
echo "===================="
echo ""
echo "1. Try docker-compose.dokploy-fixed.yml first"
echo "2. If that doesn't work, check Dokploy domain configuration"
echo "3. Look at Dokploy logs for any proxy errors"
echo "4. Consider using Traefik labels if Dokploy uses Traefik"
echo ""

echo "📋 Files created for testing:"
echo "- docker-compose.dokploy-fixed.yml (port mapping fix)"
echo "- docker-compose.traefik.yml (Traefik labels fix)"
echo "- docker-compose.minimal.yml (minimal config)"
echo ""

echo "🎯 Expected result after fix:"
echo "- http://apriniageosat.co.id → should work"
echo "- https://apriniageosat.co.id → should work"
echo "- http://apriniageosat.co.id/api/health → should work"