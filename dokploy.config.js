module.exports = {
  // Application configuration
  name: 'apriniageosat',
  type: 'compose',
  
  // Docker Compose configuration
  compose: {
    file: 'docker-compose.prod.yml',
    services: {
      'apriniageosat': {
        build: {
          context: '.',
          dockerfile: 'Dockerfile',
          target: 'runner'
        },
        environment: {
          NODE_ENV: 'production',
          DATABASE_URL: '${DATABASE_URL}',
          REDIS_URL: '${REDIS_URL}',
          NEXT_PUBLIC_MEILISEARCH_HOST: '${NEXT_PUBLIC_MEILISEARCH_HOST}',
          NEXT_PUBLIC_MEILISEARCH_API_KEY: '${NEXT_PUBLIC_MEILISEARCH_API_KEY}',
          NEXTAUTH_SECRET: '${NEXTAUTH_SECRET}',
          NEXTAUTH_URL: '${NEXTAUTH_URL}'
        },
        ports: ['8000:8000'],
        depends_on: ['apriniageosat-postgres', 'apriniageosat-redis', 'apriniageosat-meilisearch'],
        labels: [
          'traefik.enable=true',
          'traefik.http.routers.apriniageosat.rule=Host(`apriniageosat.co.id`)',
          'traefik.http.routers.apriniageosat.entrypoints=websecure',
          'traefik.http.routers.apriniageosat.tls.certresolver=letsencrypt',
          'traefik.http.services.apriniageosat.loadbalancer.server.port=8000'
        ]
      },
      'apriniageosat-postgres': {
        image: 'postgres:15-alpine',
        environment: {
          POSTGRES_DB: '${POSTGRES_DB}',
          POSTGRES_USER: '${POSTGRES_USER}',
          POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}'
        },
        ports: ['5432:5432'],
        volumes: [
          'postgres_data:/var/lib/postgresql/data',
          './database/schema.sql:/docker-entrypoint-initdb.d/01-schema.sql',
          './database/seed.sql:/docker-entrypoint-initdb.d/02-seed.sql'
        ]
      },
      'apriniageosat-redis': {
        image: 'redis:7-alpine',
        ports: ['6379:6379'],
        volumes: ['redis_data:/data']
      },
      'apriniageosat-meilisearch': {
        image: 'getmeili/meilisearch:v1.5',
        environment: {
          MEILI_MASTER_KEY: '${MEILI_MASTER_KEY}',
          MEILI_ENV: 'production'
        },
        ports: ['7700:7700'],
        volumes: ['meilisearch_data:/meili_data']
      }
    },
    volumes: {
      postgres_data: {},
      redis_data: {},
      meilisearch_data: {}
    }
  },
  
  // Environment variables - akan dibaca dari Dokploy environment
  env: {
    // Application
    NODE_ENV: '${NODE_ENV}',
    PORT: '${PORT}',
    
    // Database
    DATABASE_URL: '${DATABASE_URL}',
    POSTGRES_DB: '${POSTGRES_DB}',
    POSTGRES_USER: '${POSTGRES_USER}',
    POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}',
    
    // Redis
    REDIS_URL: '${REDIS_URL}',
    
    // MeiliSearch
    NEXT_PUBLIC_MEILISEARCH_HOST: '${NEXT_PUBLIC_MEILISEARCH_HOST}',
    NEXT_PUBLIC_MEILISEARCH_API_KEY: '${NEXT_PUBLIC_MEILISEARCH_API_KEY}',
    MEILI_MASTER_KEY: '${MEILI_MASTER_KEY}',
    
    // NextAuth
    NEXTAUTH_SECRET: '${NEXTAUTH_SECRET}',
    NEXTAUTH_URL: '${NEXTAUTH_URL}',
    
    // Additional
    FORCE_HTTPS: '${FORCE_HTTPS}',
    LOG_LEVEL: '${LOG_LEVEL}',
    NEXT_TELEMETRY_DISABLED: '${NEXT_TELEMETRY_DISABLED}'
  },
  
  // Health checks
  healthCheck: {
    path: '/api/health',
    interval: 30,
    timeout: 10,
    retries: 3
  },
  
  // Deployment settings
  deployment: {
    strategy: 'rolling',
    maxUnavailable: 1,
    maxSurge: 1
  }
}