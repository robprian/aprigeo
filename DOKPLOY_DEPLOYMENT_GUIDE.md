# Panduan Deployment Dokploy untuk apriniageosat.co.id

## 🎯 Ringkasan Masalah
- Deployment berhasil dan running di port 8000
- URL https://apriniageosat.co.id mengembalikan error 404
- Kemungkinan masalah: konfigurasi proxy, environment variables, atau service names

## 🔧 Solusi yang Diterapkan

### 1. Perbaikan Konfigurasi Environment Variables
- Updated semua environment variables sesuai dengan yang sudah di-set di Dokploy
- Menggunakan service names dengan prefix `apriniageosat-`
- Konsistensi antara `docker-compose.prod.yml` dan `dokploy.config.js`

### 2. Service Names yang Benar
```yaml
services:
  apriniageosat:                    # Main application
  apriniageosat-postgres:           # Database
  apriniageosat-redis:              # Cache
  apriniageosat-meilisearch:        # Search engine
```

### 3. Environment Variables yang Harus Di-Set di Dokploy

```bash
# Application
NODE_ENV=production
PORT=8000

# Database Configuration
DATABASE_URL=postgresql://postgres:GtcCg1mKmrmEfgJLwSqQNlnESslWmEySQWrNHAmAis@apriniageosat-postgres:5432/geosatsolusindo
POSTGRES_DB=geosatsolusindo
POSTGRES_USER=postgres
POSTGRES_PASSWORD=GtcCg1mKmrmEfgJLwSqQNlnESslWmEySQWrNHAmAis

# Redis Configuration
REDIS_URL=redis://apriniageosat-redis:6379

# MeiliSearch Configuration
NEXT_PUBLIC_MEILISEARCH_HOST=http://apriniageosat-meilisearch:7700
NEXT_PUBLIC_MEILISEARCH_API_KEY=GtcCg1mKmrmEfgJLwSqQN+lnESslWmEySQWrNHAmAis
MEILI_MASTER_KEY=GtcCg1mKmrmEfgJLwSqQN+lnESslWmEySQWrNHAmAis

# NextAuth Configuration
NEXTAUTH_SECRET=DkM0Yfqiqb/splFsII6k3ggH884sWKkFuSfhR2oUNzs
NEXTAUTH_URL=https://apriniageosat.co.id

# Additional Configuration
FORCE_HTTPS=true
LOG_LEVEL=info
NEXT_TELEMETRY_DISABLED=1
```

## 🚀 Langkah-langkah Deployment

### 1. Persiapan File
```bash
# Jalankan script verifikasi
./scripts/verify-dokploy-config.sh

# Pastikan semua file sudah benar
ls -la docker-compose.prod.yml dokploy.config.js .env.production
```

### 2. Upload ke Dokploy
1. Login ke Dokploy Panel
2. Create New Project → Docker Compose
3. Upload file `docker-compose.prod.yml` (rename menjadi `docker-compose.yml`)
4. Set semua environment variables di atas

### 3. Konfigurasi Domain
1. Domain: `apriniageosat.co.id`
2. Port: `8000`
3. Enable SSL/HTTPS
4. Pastikan DNS sudah pointing ke server Dokploy

### 4. Deploy dan Monitor
1. Deploy project
2. Monitor logs untuk memastikan semua service running
3. Tunggu 3-5 menit untuk semua service siap

## 🔍 Troubleshooting

### Jika masih 404:
```bash
# Test manual
curl -I https://apriniageosat.co.id
curl -I http://apriniageosat.co.id:8000
curl https://apriniageosat.co.id/api/health

# Jalankan script troubleshooting
./scripts/troubleshoot-dokploy.sh
```

### Check di Dokploy Dashboard:
1. Pastikan semua containers running (hijau)
2. Check logs untuk error messages
3. Verify environment variables sudah ter-set
4. Pastikan domain configuration benar

### Common Issues:
1. **Service tidak bisa connect**: Check service names di environment variables
2. **Database connection failed**: Verify DATABASE_URL dan credentials
3. **404 pada domain**: Check domain routing dan SSL configuration
4. **502/503 errors**: Check container health dan logs

## 🧪 Testing Setelah Deployment

```bash
# Test endpoints
curl https://apriniageosat.co.id                    # Homepage
curl https://apriniageosat.co.id/api/health         # Health check
curl https://apriniageosat.co.id/admin              # Admin panel

# Check response headers
curl -I https://apriniageosat.co.id
```

## 📝 Files yang Sudah Diperbaiki

1. `dokploy.config.js` - Updated environment variables dan service names
2. `docker-compose.prod.yml` - Konsistensi service names dan environment
3. `.env.production` - Environment variables yang benar
4. `scripts/deploy-dokploy.sh` - Updated deployment instructions
5. `scripts/verify-dokploy-config.sh` - Script verifikasi konfigurasi
6. `scripts/troubleshoot-dokploy.sh` - Script troubleshooting

## 🎯 Expected Result

Setelah deployment berhasil:
- ✅ https://apriniageosat.co.id → Homepage loaded
- ✅ https://apriniageosat.co.id/api/health → {"status":"healthy"}
- ✅ https://apriniageosat.co.id/admin → Admin dashboard
- ✅ All services running and connected

## 📞 Support

Jika masih ada masalah:
1. Check Dokploy logs
2. Verify DNS configuration
3. Ensure all environment variables are set correctly
4. Contact Dokploy support if needed