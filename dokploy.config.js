module.exports = {
  // Application configuration
  name: 'gps-survey-store',
  type: 'compose',
  
  // Docker Compose configuration
  compose: {
    file: 'docker-compose.yml',
    services: {
      'gps-survey-store': {
        build: {
          context: '.',
          dockerfile: 'Dockerfile'
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
        depends_on: ['postgres', 'redis', 'meilisearch']
      },
      postgres: {
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
      redis: {
        image: 'redis:7-alpine',
        ports: ['6379:6379'],
        volumes: ['redis_data:/data']
      },
      meilisearch: {
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
  
  // Environment variables
  env: {
    // Database
    DATABASE_URL: 'postgresql://postgres:password@postgres:5432/gps_survey_store',
    POSTGRES_DB: 'gps_survey_store',
    POSTGRES_USER: 'postgres',
    POSTGRES_PASSWORD: 'password',
    
    // Redis
    REDIS_URL: 'redis://redis:6379',
    
    // MeiliSearch
    NEXT_PUBLIC_MEILISEARCH_HOST: 'http://meilisearch:7700',
    NEXT_PUBLIC_MEILISEARCH_API_KEY: 'masterKey',
    MEILI_MASTER_KEY: 'masterKey',
    
    // NextAuth
    NEXTAUTH_SECRET: 'your-secret-key-here',
    NEXTAUTH_URL: 'http://localhost:8000'
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