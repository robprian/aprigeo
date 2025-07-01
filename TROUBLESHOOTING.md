# Troubleshooting Guide - apriniageosat.co.id

## 404 Error on Production Domain

### Common Causes and Solutions

#### 1. Domain Configuration Issues
**Problem**: Domain not pointing to the correct server
**Solution**: 
- Check DNS records for apriniageosat.co.id
- Ensure A record points to your server IP
- Verify CNAME records if using subdomains

#### 2. Reverse Proxy Configuration
**Problem**: Nginx/Traefik not configured properly
**Solution**:
```bash
# Check if your reverse proxy is running
sudo systemctl status nginx
# or
docker ps | grep traefik

# Check reverse proxy logs
sudo tail -f /var/log/nginx/error.log
# or
docker logs traefik
```

#### 3. Docker Container Issues
**Problem**: Container not running or not accessible
**Solution**:
```bash
# Check if containers are running
docker ps

# Check container logs
docker logs apriniageosat_apriniageosat_1

# Check health status
curl http://localhost:8000/api/health
```

#### 4. Port Binding Issues
**Problem**: Port 8000 not accessible from outside
**Solution**:
```bash
# Check if port is listening
netstat -tlnp | grep 8000

# Check firewall rules
sudo ufw status
sudo ufw allow 8000
```

#### 5. SSL/HTTPS Issues
**Problem**: HTTPS not configured properly
**Solution**:
- Ensure SSL certificate is valid
- Check if Let's Encrypt is working
- Verify HTTPS redirect rules

### Quick Diagnostic Commands

```bash
# 1. Test local container
curl -I http://localhost:8000

# 2. Test health endpoint
curl -I http://localhost:8000/api/health

# 3. Check container status
docker ps | grep apriniageosat

# 4. Check container logs
docker logs --tail=50 apriniageosat_apriniageosat_1

# 5. Test from inside container
docker exec -it apriniageosat_apriniageosat_1 curl http://localhost:8000

# 6. Check DNS resolution
nslookup apriniageosat.co.id

# 7. Test direct IP access
curl -H "Host: apriniageosat.co.id" http://YOUR_SERVER_IP:8000
```

### Environment Variables Check

Ensure these environment variables are set correctly in production:

```bash
# Required for production
NEXTAUTH_URL=https://apriniageosat.co.id
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXT_PUBLIC_MEILISEARCH_HOST=https://apriniageosat.co.id:7700
```

### Dokploy Specific Issues

1. **Check Dokploy Application Status**
   - Login to Dokploy panel
   - Check if application is running
   - Review deployment logs

2. **Domain Configuration in Dokploy**
   - Ensure domain is properly configured
   - Check SSL certificate status
   - Verify port mapping

3. **Environment Variables**
   - Verify all required env vars are set
   - Check for typos in variable names
   - Ensure sensitive values are properly escaped

### Step-by-Step Debugging

1. **Verify Local Development Works**
   ```bash
   npm run dev:8000
   curl http://localhost:8000
   ```

2. **Test Docker Build Locally**
   ```bash
   docker build -t apriniageosat:test .
   docker run -p 8001:8000 apriniageosat:test
   curl http://localhost:8001
   ```

3. **Check Production Environment**
   ```bash
   # SSH to your server
   ssh user@your-server-ip
   
   # Check if application is running
   docker ps
   
   # Test internal connectivity
   curl http://localhost:8000
   ```

4. **Verify Domain Configuration**
   ```bash
   # Check DNS
   dig apriniageosat.co.id
   
   # Test HTTP response
   curl -I https://apriniageosat.co.id
   ```

### Contact Information

If issues persist, check:
- Server logs: `/var/log/`
- Docker logs: `docker logs <container_name>`
- Reverse proxy configuration
- DNS propagation status