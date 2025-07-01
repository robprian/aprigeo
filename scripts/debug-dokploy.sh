#!/bin/bash

# Script debugging untuk masalah deployment Dokploy
echo "🔍 Debugging Dokploy Deployment Issues"
echo "======================================"

echo ""
echo "1. 🌐 Testing domain accessibility..."

# Test different protocols and ports
echo "Testing HTTPS (443):"
if curl -I -m 10 https://apriniageosat.co.id 2>/dev/null; then
    echo "✅ HTTPS accessible"
    curl -I https://apriniageosat.co.id 2>/dev/null | head -5
else
    echo "❌ HTTPS not accessible"
fi

echo ""
echo "Testing HTTP (80):"
if curl -I -m 10 http://apriniageosat.co.id 2>/dev/null; then
    echo "✅ HTTP accessible"
    curl -I http://apriniageosat.co.id 2>/dev/null | head -5
else
    echo "❌ HTTP not accessible"
fi

echo ""
echo "Testing direct port 8000:"
if curl -I -m 10 http://apriniageosat.co.id:8000 2>/dev/null; then
    echo "✅ Port 8000 accessible"
    curl -I http://apriniageosat.co.id:8000 2>/dev/null | head -5
else
    echo "❌ Port 8000 not accessible"
fi

echo ""
echo "2. 🔍 DNS Resolution check..."
echo "DNS A record for apriniageosat.co.id:"
nslookup apriniageosat.co.id 2>/dev/null || echo "❌ DNS resolution failed"

echo ""
echo "3. 🔌 Port connectivity check..."
ports=(80 443 8000)
for port in "${ports[@]}"; do
    echo "Testing port $port:"
    if timeout 5 bash -c "</dev/tcp/apriniageosat.co.id/$port" 2>/dev/null; then
        echo "✅ Port $port is open"
    else
        echo "❌ Port $port is closed or filtered"
    fi
done

echo ""
echo "4. 🏥 Health endpoint testing..."
endpoints=(
    "https://apriniageosat.co.id/api/health"
    "http://apriniageosat.co.id/api/health"
    "http://apriniageosat.co.id:8000/api/health"
)

for endpoint in "${endpoints[@]}"; do
    echo "Testing: $endpoint"
    if curl -f -m 10 "$endpoint" 2>/dev/null; then
        echo "✅ Health endpoint responding"
        curl -s "$endpoint" 2>/dev/null | jq . 2>/dev/null || curl -s "$endpoint" 2>/dev/null
    else
        echo "❌ Health endpoint not responding"
    fi
    echo ""
done

echo ""
echo "5. 📋 Common Dokploy Issues & Solutions:"
echo "======================================="
echo ""
echo "Issue 1: Container not starting"
echo "Solutions:"
echo "- Check Dokploy logs for build errors"
echo "- Verify all environment variables are set"
echo "- Try using docker-compose.minimal.yml"
echo ""
echo "Issue 2: Domain not routing"
echo "Solutions:"
echo "- Check domain configuration in Dokploy"
echo "- Verify DNS points to correct server IP"
echo "- Check if reverse proxy is configured"
echo ""
echo "Issue 3: Port not accessible"
echo "Solutions:"
echo "- Check firewall settings"
echo "- Verify port mapping in Dokploy"
echo "- Try accessing via server IP directly"
echo ""
echo "Issue 4: SSL/HTTPS issues"
echo "Solutions:"
echo "- Check SSL certificate status"
echo "- Try HTTP first, then enable HTTPS"
echo "- Verify domain ownership"
echo ""

echo "6. 🔧 Recommended Actions:"
echo "========================="
echo ""
echo "1. Try the minimal docker-compose:"
echo "   - Use docker-compose.minimal.yml in Dokploy"
echo "   - Remove complex health checks and dependencies"
echo ""
echo "2. Check Dokploy dashboard:"
echo "   - Verify all containers are running (green status)"
echo "   - Check logs for any error messages"
echo "   - Ensure environment variables are set"
echo ""
echo "3. Test with server IP:"
echo "   - Get your server IP from Dokploy"
echo "   - Try: http://YOUR_SERVER_IP:8000"
echo ""
echo "4. Simplify configuration:"
echo "   - Remove Traefik labels if not needed"
echo "   - Use basic port mapping"
echo "   - Test with single container first"
echo ""

echo "7. 📞 Manual commands to run in Dokploy server:"
echo "==============================================="
echo ""
echo "# Check running containers"
echo "docker ps"
echo ""
echo "# Check container logs"
echo "docker logs <container_name>"
echo ""
echo "# Check if app is responding inside container"
echo "docker exec <container_name> curl http://localhost:8000"
echo ""
echo "# Check environment variables"
echo "docker exec <container_name> env | grep -E '(DATABASE|REDIS|NEXTAUTH)'"