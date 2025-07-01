#!/bin/bash

# Deployment Verification Script for apriniageosat.co.id
echo "🔍 Verifying apriniageosat.co.id deployment..."

DOMAIN="apriniageosat.co.id"
LOCAL_PORT="8000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "==========================================="
echo "🌐 Domain and DNS Checks"
echo "==========================================="

# Check DNS resolution
echo "Checking DNS resolution for $DOMAIN..."
if nslookup $DOMAIN > /dev/null 2>&1; then
    IP=$(nslookup $DOMAIN | grep -A1 "Name:" | tail -n1 | awk '{print $2}')
    print_status 0 "DNS resolution successful - IP: $IP"
else
    print_status 1 "DNS resolution failed"
fi

echo ""
echo "==========================================="
echo "🐳 Docker Container Checks"
echo "==========================================="

# Check if Docker is running
if docker ps > /dev/null 2>&1; then
    print_status 0 "Docker is running"
else
    print_status 1 "Docker is not running or not accessible"
    exit 1
fi

# Check if apriniageosat container is running
if docker ps | grep -q apriniageosat; then
    print_status 0 "Apriniageosat container is running"
    CONTAINER_ID=$(docker ps | grep apriniageosat | awk '{print $1}')
    echo "   Container ID: $CONTAINER_ID"
else
    print_status 1 "Apriniageosat container is not running"
    echo "   Available containers:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
fi

echo ""
echo "==========================================="
echo "🔌 Port and Connectivity Checks"
echo "==========================================="

# Check if port 8000 is listening locally
if netstat -tlnp 2>/dev/null | grep -q ":$LOCAL_PORT "; then
    print_status 0 "Port $LOCAL_PORT is listening locally"
else
    print_status 1 "Port $LOCAL_PORT is not listening locally"
fi

# Test local connectivity
echo "Testing local connectivity..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:$LOCAL_PORT | grep -q "200\|301\|302"; then
    print_status 0 "Local application responds"
else
    print_status 1 "Local application not responding"
fi

# Test health endpoint locally
echo "Testing health endpoint locally..."
HEALTH_STATUS=$(curl -s http://localhost:$LOCAL_PORT/api/health 2>/dev/null | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
if [ "$HEALTH_STATUS" = "healthy" ]; then
    print_status 0 "Health endpoint returns healthy status"
else
    print_status 1 "Health endpoint not healthy (status: $HEALTH_STATUS)"
fi

echo ""
echo "==========================================="
echo "🌍 External Domain Checks"
echo "==========================================="

# Test HTTPS connectivity
echo "Testing HTTPS connectivity to $DOMAIN..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN 2>/dev/null)
if [ "$HTTP_STATUS" = "200" ]; then
    print_status 0 "HTTPS connection successful (Status: $HTTP_STATUS)"
elif [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
    print_warning "HTTPS returns redirect (Status: $HTTP_STATUS)"
else
    print_status 1 "HTTPS connection failed (Status: $HTTP_STATUS)"
fi

# Test HTTP connectivity (fallback)
echo "Testing HTTP connectivity to $DOMAIN..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN 2>/dev/null)
if [ "$HTTP_STATUS" = "200" ]; then
    print_status 0 "HTTP connection successful (Status: $HTTP_STATUS)"
elif [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
    print_warning "HTTP returns redirect (Status: $HTTP_STATUS) - This is normal for HTTPS redirect"
else
    print_status 1 "HTTP connection failed (Status: $HTTP_STATUS)"
fi

# Test health endpoint externally
echo "Testing external health endpoint..."
EXTERNAL_HEALTH=$(curl -s https://$DOMAIN/api/health 2>/dev/null | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
if [ "$EXTERNAL_HEALTH" = "healthy" ]; then
    print_status 0 "External health endpoint returns healthy status"
else
    print_status 1 "External health endpoint not accessible or unhealthy"
fi

echo ""
echo "==========================================="
echo "📋 Summary and Recommendations"
echo "==========================================="

# Check SSL certificate
echo "Checking SSL certificate..."
if openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | grep -q "Verify return code: 0"; then
    print_status 0 "SSL certificate is valid"
else
    print_status 1 "SSL certificate issues detected"
fi

echo ""
echo "🔧 If you're seeing issues, try these commands:"
echo "1. Check container logs: docker logs \$(docker ps | grep apriniageosat | awk '{print \$1}')"
echo "2. Restart containers: docker-compose -f docker-compose.prod.yml restart"
echo "3. Check reverse proxy: sudo systemctl status nginx (or check Traefik)"
echo "4. Verify environment variables: docker exec \$(docker ps | grep apriniageosat | awk '{print \$1}') env | grep -E '(NEXTAUTH_URL|NODE_ENV)'"
echo ""
echo "📚 For more help, see TROUBLESHOOTING.md"