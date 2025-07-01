#!/bin/bash

# Troubleshooting script untuk deployment Dokploy
echo "🔍 Dokploy Deployment Troubleshooting Script"
echo "============================================="

echo ""
echo "1. 🏥 Checking health endpoint..."
if curl -f https://apriniageosat.co.id/api/health > /dev/null 2>&1; then
    echo "✅ Health endpoint is responding"
    curl -s https://apriniageosat.co.id/api/health | jq .
else
    echo "❌ Health endpoint is not responding"
    echo "   Trying HTTP instead of HTTPS..."
    if curl -f http://apriniageosat.co.id:8000/api/health > /dev/null 2>&1; then
        echo "✅ HTTP health endpoint is responding"
        curl -s http://apriniageosat.co.id:8000/api/health | jq .
    else
        echo "❌ HTTP health endpoint is also not responding"
    fi
fi

echo ""
echo "2. 🌐 Checking domain resolution..."
nslookup apriniageosat.co.id

echo ""
echo "3. 🔌 Checking port connectivity..."
echo "   Testing port 8000..."
if nc -z apriniageosat.co.id 8000; then
    echo "✅ Port 8000 is accessible"
else
    echo "❌ Port 8000 is not accessible"
fi

echo "   Testing port 80..."
if nc -z apriniageosat.co.id 80; then
    echo "✅ Port 80 is accessible"
else
    echo "❌ Port 80 is not accessible"
fi

echo "   Testing port 443..."
if nc -z apriniageosat.co.id 443; then
    echo "✅ Port 443 is accessible"
else
    echo "❌ Port 443 is not accessible"
fi

echo ""
echo "4. 📋 Common issues and solutions:"
echo ""
echo "   Issue: 404 Error"
echo "   Solutions:"
echo "   - Check if all containers are running in Dokploy"
echo "   - Verify environment variables are set correctly"
echo "   - Ensure domain points to correct server IP"
echo "   - Check if reverse proxy is configured properly"
echo ""
echo "   Issue: 502/503 Error"
echo "   Solutions:"
echo "   - Check container logs in Dokploy"
echo "   - Verify database connection"
echo "   - Ensure all services are healthy"
echo ""
echo "   Issue: SSL/HTTPS Error"
echo "   Solutions:"
echo "   - Check SSL certificate configuration"
echo "   - Verify domain ownership"
echo "   - Try accessing via HTTP first"
echo ""
echo "5. 🔧 Dokploy specific checks:"
echo "   - Login to Dokploy dashboard"
echo "   - Check project status and logs"
echo "   - Verify all services are running"
echo "   - Check environment variables"
echo "   - Review deployment logs"
echo ""
echo "6. 📞 Manual testing commands:"
echo "   curl -I https://apriniageosat.co.id"
echo "   curl -I http://apriniageosat.co.id:8000"
echo "   curl https://apriniageosat.co.id/api/health"
echo "   docker ps (if you have access to server)"
echo "   docker logs <container_name> (if you have access to server)"