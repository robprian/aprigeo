# GPS Survey Store - Scripts Documentation

This document provides an overview of all available scripts in the GPS Survey Store project.

## 🚀 Quick Start Scripts

### Setup & Installation
```bash
npm run setup                 # Initial project setup
npm install                   # Install dependencies
npm run build                 # Build the application
```

### Development
```bash
npm run dev                   # Start development server (port 3000)
npm run dev:8000             # Start development server (port 8000)
npm start                    # Start production server (port 3000)
npm start:8000               # Start production server (port 8000)
```

## 🗄️ Database Scripts

### Seeding Scripts
```bash
npm run seed                 # Main database seeding (all tables)
npm run seed:simple          # Simple seeding (basic products)
npm run seed:comprehensive   # Comprehensive seeding (full catalog)
npm run seed:additional      # Add more products to existing data
```

### Database Operations
```bash
# Using Docker Compose
docker-compose exec postgres psql -U postgres -d gps_survey_store

# Reset database
docker-compose down -v
docker-compose up -d
npm run seed:comprehensive
```

## 🖼️ Asset Generation Scripts

### Banner Management
```bash
npm run banners:create       # Generate banner images
node scripts/create-banner-images.js  # Direct execution
```

### Image Scraping
```bash
node scripts/auto-image-scraper.js     # Auto-scrape product images
node scripts/generate-images-and-seed.ts  # Generate and seed images
```

## 🧪 Testing & Verification Scripts

### Comprehensive Testing
```bash
npm run test:comprehensive   # Run all tests
npm run prod:check          # Production readiness check
./scripts/test-comprehensive.sh  # Direct shell execution
```

### Individual Script Tests
```bash
# Test database connection
docker-compose exec postgres pg_isready -U postgres

# Test API endpoints
curl http://localhost:8000/api/products
curl http://localhost:8000/api/categories
curl http://localhost:8000/api/brands
curl http://localhost:8000/api/banners

# Test frontend
curl http://localhost:8000/
curl http://localhost:8000/admin
```

## 🐳 Docker Scripts

### Container Management
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart gps-survey-store
```

### Database Management
```bash
# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d gps_survey_store

# Access Redis
docker-compose exec redis redis-cli

# Backup database
docker-compose exec postgres pg_dump -U postgres gps_survey_store > backup.sql
```

## 🔧 Deployment Scripts

### Local Development
```bash
./scripts/start-port-8000.sh    # Start on port 8000
./scripts/setup.sh              # Initial setup
```

### Production Deployment
```bash
./scripts/production-ready-check.sh  # Pre-deployment check
./scripts/deploy.sh                 # Deploy to production
./scripts/verify-deployment.sh      # Verify deployment
```

### Dokploy Deployment
```bash
./scripts/deploy-dokploy.sh         # Deploy to Dokploy
./scripts/verify-dokploy-config.sh  # Verify Dokploy config
./scripts/troubleshoot-dokploy.sh   # Troubleshoot Dokploy
```

## 📊 Data Management Scripts

### Product Management
```bash
# Add GPS products
node scripts/additional-products.js

# Seed specific product categories
node scripts/seed-simple.js        # Basic GPS products
node scripts/seed-comprehensive.js # Full product catalog
```

### Content Management
```bash
# Generate banner content
node scripts/create-banner-images.js

# Scrape product images
node scripts/auto-image-scraper.js

# Seed blog content
# (Included in comprehensive seeding)
```

## 🔍 Search & Performance Scripts

### Meilisearch Management
```bash
# Check Meilisearch health
curl http://localhost:7700/health

# View search indexes
curl http://localhost:7700/indexes

# Reset search index
curl -X DELETE http://localhost:7700/indexes/products
```

### Performance Testing
```bash
# Load test homepage
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8000/

# Test API performance
time curl -s http://localhost:8000/api/products > /dev/null
```

## 🚨 Troubleshooting Scripts

### Debug Scripts
```bash
./scripts/debug-dokploy.sh          # Debug Dokploy deployment
./scripts/troubleshoot-dokploy.sh   # Troubleshoot Dokploy issues
./scripts/test-fix.sh               # Test and fix common issues
```

### Log Analysis
```bash
# View application logs
docker-compose logs -f gps-survey-store

# View database logs
docker-compose logs -f postgres

# View search logs
docker-compose logs -f meilisearch
```

## 📝 File Structure

```
scripts/
├── additional-products.js          # Add more products
├── auto-image-scraper.js          # Auto-scrape images
├── create-banner-images.js        # Generate banner images
├── debug-dokploy.sh               # Debug Dokploy
├── deploy-dokploy.sh              # Deploy to Dokploy
├── deploy-fixed.sh                # Fixed deployment script
├── deploy.sh                      # Main deployment script
├── generate-images-and-seed.ts    # Generate and seed images
├── production-ready-check.sh      # Production readiness check
├── seed-comprehensive.js          # Comprehensive seeding
├── seed-database.js               # Main database seeding
├── seed-simple.js                 # Simple seeding
├── setup.sh                       # Initial setup
├── start-port-8000.sh            # Start on port 8000
├── test-comprehensive.sh          # Comprehensive testing
├── test-fix.sh                    # Test and fix issues
├── troubleshoot-dokploy.sh       # Troubleshoot Dokploy
├── verify-deployment.sh           # Verify deployment
└── verify-dokploy-config.sh      # Verify Dokploy config
```

## 🎯 Common Usage Patterns

### Initial Setup
1. `npm run setup` - Initial project setup
2. `docker-compose up -d` - Start services
3. `npm run seed:comprehensive` - Seed database
4. `npm run banners:create` - Generate banners
5. `npm run dev:8000` - Start development

### Production Deployment
1. `npm run prod:check` - Check production readiness
2. `npm run build` - Build application
3. `docker-compose -f docker-compose.prod.yml up -d` - Deploy
4. `npm run test:comprehensive` - Verify deployment

### Adding New Products
1. Edit `scripts/additional-products.js`
2. `npm run seed:additional` - Add products
3. `node scripts/auto-image-scraper.js` - Scrape images
4. Restart application

### Banner Management
1. `npm run banners:create` - Generate new banners
2. Update database with new banner URLs
3. Test in admin portal at `/admin/banners`

## 🔗 Related Documentation

- [DEPLOYMENT.md](../DEPLOYMENT.md) - Deployment guide
- [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) - Troubleshooting guide
- [README.md](../README.md) - Project overview
- [DOKPLOY_DEPLOYMENT_GUIDE.md](../DOKPLOY_DEPLOYMENT_GUIDE.md) - Dokploy deployment
