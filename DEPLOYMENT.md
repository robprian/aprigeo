# Deployment Guide untuk GPS Survey Store
## Domain: apriniageosat.co.id

## Prasyarat

1. **Dokploy Panel** sudah terinstall di server
2. **Docker** dan **Docker Compose** tersedia
3. **Git** untuk clone repository
4. **Domain apriniageosat.co.id** sudah dikonfigurasi DNS ke server

## Langkah-langkah Deployment

### 1. Persiapan Repository

```bash
# Clone repository
git clone <repository-url>
cd gps-survey-store

# Copy environment variables
cp .env.example .env
```

### 2. Konfigurasi Environment Variables

Edit file `.env` dan sesuaikan dengan environment Anda:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@postgres:5432/gps_survey_store
POSTGRES_DB=gps_survey_store
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password

# Redis Configuration
REDIS_URL=redis://redis:6379

# MeiliSearch Configuration
NEXT_PUBLIC_MEILISEARCH_HOST=http://your-domain:7700
NEXT_PUBLIC_MEILISEARCH_API_KEY=your_meilisearch_key
MEILI_MASTER_KEY=your_meilisearch_master_key
MEILI_ENV=production

# NextAuth Configuration
NEXTAUTH_SECRET=your-very-secure-secret-key
NEXTAUTH_URL=http://your-domain.com

# Application Configuration
NODE_ENV=production
```

### 3. Deploy menggunakan Dokploy

#### Melalui Dokploy Web Interface:

1. **Login ke Dokploy Panel**
2. **Buat Project Baru**
   - Pilih "Docker Compose"
   - Upload atau paste `docker-compose.yml`
3. **Set Environment Variables**
   - Masukkan semua environment variables dari `.env`
4. **Deploy**
   - Klik "Deploy" untuk memulai deployment

#### Melalui CLI (jika tersedia):

```bash
# Deploy menggunakan Dokploy CLI
dokploy deploy --config dokploy.config.js
```

### 4. Verifikasi Deployment

1. **Health Check**
   ```bash
   curl http://your-domain/api/health
   ```

2. **Check Services**
   - **Frontend**: `http://your-domain:3000`
   - **Admin Panel**: `http://your-domain:3000/admin`
   - **MeiliSearch**: `http://your-domain:7700`
   - **Database**: Port 5432 (internal)
   - **Redis**: Port 6379 (internal)

### 5. Post-Deployment Setup

1. **Akses Admin Panel**
   - URL: `http://your-domain:3000/admin`
   - Login dengan credentials default (lihat seed data)

2. **Setup MeiliSearch Index**
   ```bash
   # Akses container MeiliSearch
   docker exec -it <meilisearch_container> /bin/sh
   
   # Atau setup melalui API
   curl -X POST 'http://your-domain:7700/indexes' \
   -H 'Authorization: Bearer your_meilisearch_key' \
   -H 'Content-Type: application/json' \
   --data-binary '{
     "uid": "products",
     "primaryKey": "id"
   }'
   ```

## Struktur Services

### 1. **gps-survey-store** (Main Application)
- **Port**: 3000
- **Type**: Next.js Application
- **Features**: 
  - Storefront
  - Admin Portal
  - User Portal
  - API Layer

### 2. **postgres** (Database)
- **Port**: 5432
- **Type**: PostgreSQL 15
- **Features**:
  - Auto-initialization dengan schema.sql
  - Seed data untuk testing

### 3. **redis** (Cache & Sessions)
- **Port**: 6379
- **Type**: Redis 7
- **Features**:
  - API Response Caching
  - Session Storage

### 4. **meilisearch** (Search Engine)
- **Port**: 7700
- **Type**: MeiliSearch v1.5
- **Features**:
  - Product Search
  - Full-text Search
  - Faceted Search

## Monitoring & Maintenance

### 1. Logs
```bash
# View application logs
docker logs <container_name>

# Follow logs
docker logs -f <container_name>
```

### 2. Database Backup
```bash
# Backup database
docker exec <postgres_container> pg_dump -U postgres gps_survey_store > backup.sql

# Restore database
docker exec -i <postgres_container> psql -U postgres gps_survey_store < backup.sql
```

### 3. Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

## Troubleshooting

### 1. Database Connection Issues
- Check environment variables
- Verify PostgreSQL container is running
- Check network connectivity

### 2. MeiliSearch Issues
- Verify master key configuration
- Check index creation
- Monitor search performance

### 3. Performance Issues
- Monitor Redis cache hit rates
- Check database query performance
- Review application logs

## Security Considerations

1. **Change Default Passwords**
   - PostgreSQL password
   - MeiliSearch master key
   - NextAuth secret

2. **Network Security**
   - Use internal Docker networks
   - Expose only necessary ports
   - Configure firewall rules

3. **SSL/TLS**
   - Setup reverse proxy (Nginx/Traefik)
   - Configure SSL certificates
   - Redirect HTTP to HTTPS

## Scaling

### Horizontal Scaling
- Multiple application instances
- Load balancer configuration
- Shared database and cache

### Vertical Scaling
- Increase container resources
- Database optimization
- Cache optimization

## Support

Untuk bantuan deployment atau troubleshooting, silakan:
1. Check logs untuk error messages
2. Verify environment variables
3. Test individual services
4. Contact support team