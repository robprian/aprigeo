# GPS Survey Store - All-in-One E-commerce Platform

Sebuah platform e-commerce lengkap untuk peralatan GPS dan surveying yang dibangun dengan Next.js 14, PostgreSQL, Redis, dan MeiliSearch.

## Fitur Utama

### Storefront (Customer Portal)
- **Katalog Produk**: Tampilan produk dengan filter dan pencarian
- **Kategori Dinamis**: Navigasi kategori yang responsif
- **Product Quick View**: Preview produk tanpa meninggalkan halaman
- **Shopping Cart**: Keranjang belanja dengan persistensi
- **Wishlist**: Daftar keinginan pengguna
- **Product Comparison**: Bandingkan produk side-by-side
- **Blog Integration**: Artikel dan berita terkini

### Admin Portal
- **Dashboard Analytics**: Statistik penjualan real-time
- **Product Management**: CRUD produk dengan atribut lengkap
- **Order Management**: Kelola pesanan dan status
- **Customer Management**: Data pelanggan dan grup
- **Content Management**: Kelola blog dan konten
- **Settings**: Konfigurasi sistem

### User Portal
- **Account Management**: Profil dan pengaturan akun
- **Order History**: Riwayat pembelian
- **Address Book**: Kelola alamat pengiriman
- **Wishlist Management**: Kelola daftar keinginan
- **Review System**: Ulasan dan rating produk

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, PostgreSQL
- **Cache**: Redis untuk caching dan session
- **Search**: MeiliSearch untuk pencarian produk
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Database ORM**: Native PostgreSQL queries

## Services Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App  │    │   PostgreSQL    │    │     Redis       │
│   (Port 3000)  │◄──►│   (Port 5432)   │    │   (Port 6379)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              ▲
         │                                              │
         ▼                                              │
┌─────────────────┐                                     │
│   MeiliSearch   │                                     │
│   (Port 7700)   │◄────────────────────────────────────┘
└─────────────────┘
```

## Quick Start dengan Dokploy

### Prasyarat
- Server dengan Dokploy Panel terinstall
- Docker dan Docker Compose
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd gps-survey-store
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env sesuai kebutuhan
```

### 3. Deploy via Dokploy Panel
1. Login ke Dokploy Panel
2. Create New Project → Docker Compose
3. Upload `docker-compose.yml`
4. Set Environment Variables dari `.env`
5. Deploy!

### 4. Verifikasi Deployment
```bash
# Health Check
curl http://your-domain/api/health

# Test Services
curl http://your-domain:3000        # Frontend
curl http://your-domain:3000/admin  # Admin Panel
curl http://your-domain:7700        # MeiliSearch
```

## Development Setup

### Local Development
```bash
# Install dependencies
npm install

# Setup database
docker-compose up postgres redis meilisearch -d

# Run development server
npm run dev
```

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/gps_survey_store
POSTGRES_DB=gps_survey_store
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# Redis
REDIS_URL=redis://localhost:6379

# MeiliSearch
NEXT_PUBLIC_MEILISEARCH_HOST=http://localhost:7700
NEXT_PUBLIC_MEILISEARCH_API_KEY=masterKey
MEILI_MASTER_KEY=masterKey

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Database Schema

### Core Tables
- **users**: User authentication dan profil
- **products**: Katalog produk dengan atribut
- **categories**: Hierarki kategori produk
- **orders**: Transaksi dan order management
- **blog_posts**: Content management system

### Features
- **JSONB Fields**: Untuk data fleksibel (images, attributes)
- **Full-text Search**: Integrasi dengan MeiliSearch
- **Audit Trails**: Timestamp tracking
- **Referential Integrity**: Foreign key constraints

## API Endpoints

### Public APIs
```
GET  /api/products          # List products dengan filter
GET  /api/categories        # List categories
GET  /api/blog             # Blog posts
GET  /api/health           # Health check
```

### Admin APIs
```
GET  /api/admin/stats      # Dashboard statistics
```

## UI Components

### Storefront Components
- `ProductCard`: Card produk dengan hover actions
- `Categories`: Carousel kategori responsif
- `BestSelling`: Produk terlaris dengan tabs
- `FeaturedProducts`: Produk unggulan
- `Blog`: Slider artikel blog

### Admin Components
- `DashboardStats`: Statistik real-time
- `ProductStats`: Analytics produk
- `SalesChart`: Grafik penjualan

## Data Flow

### Static → Dynamic Migration
Semua komponen telah diubah dari data statis ke dinamis:

1. **Products**: `useBestSellingProducts()`, `useFeaturedProducts()`
2. **Categories**: `useCategories()`
3. **Blog**: `useFeaturedBlogPosts()`
4. **Dashboard**: `useDashboardStats()`

### Caching Strategy
- **API Responses**: Redis cache dengan TTL
- **Database Queries**: Optimized dengan indexes
- **Static Assets**: CDN ready

## Responsive Design

- **Mobile First**: Optimized untuk mobile
- **Tablet Support**: Layout adaptif
- **Desktop**: Full feature experience
- **Touch Friendly**: Gesture support

## Security Features

- **Input Validation**: Zod schema validation
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Sanitized outputs
- **CSRF Protection**: Built-in Next.js protection

## Performance

- **Server-Side Rendering**: SEO optimized
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Multi-layer caching strategy

## Deployment Options

### Dokploy (Recommended)
- One-click deployment
- Auto-scaling
- Health monitoring
- Log aggregation

### Docker Compose
```bash
docker-compose up -d
```

## Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Panduan deployment lengkap

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Support

Untuk bantuan deployment atau troubleshooting:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Review logs: `docker logs <container_name>`
3. Health check: `curl /api/health`

---

**Built with ❤️ for professional surveying equipment industry**