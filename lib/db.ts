import { Pool } from 'pg'
import Redis from 'ioredis'

// PostgreSQL connection - initialize immediately if DATABASE_URL is available
let pool: Pool | null = null

// Function to initialize database connection at runtime
export function initializeDatabase() {
  if (!pool && process.env.DATABASE_URL) {
    try {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 10000,
        max: 10, // Maximum number of clients in the pool
        min: 2,  // Minimum number of clients in the pool
      })

      // Test the connection
      pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err)
      })

      console.log('Database pool initialized successfully')
    } catch (error) {
      console.error('Database initialization failed:', error)
      pool = null
    }
  }
  return pool
}

// Initialize database connection immediately
if (process.env.DATABASE_URL) {
  initializeDatabase()
}

// Redis connection - only create if REDIS_URL is available or in development
let redis: Redis | null = null

// Function to initialize Redis connection at runtime
export function initializeRedis() {
  if (!redis && (process.env.REDIS_URL || process.env.NODE_ENV === 'development')) {
    try {
      redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        connectTimeout: 5000,
      })
    } catch (error) {
      console.warn('Redis connection failed:', error)
      redis = null
    }
  }
  return redis
}

export { pool, redis }

// Database helper functions
export async function query(text: string, params?: any[]) {
  const dbPool = pool || initializeDatabase()
  if (!dbPool) {
    throw new Error('Database connection not available')
  }
  const client = await dbPool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

// Cache helper functions
export async function getCache(key: string) {
  const redisClient = redis || initializeRedis()
  if (!redisClient) {
    return null
  }
  try {
    const cached = await redisClient.get(key)
    return cached ? JSON.parse(cached) : null
  } catch (error) {
    console.error('Cache get error:', error)
    return null
  }
}

export async function setCache(key: string, value: any, ttl: number = 3600) {
  const redisClient = redis || initializeRedis()
  if (!redisClient) {
    return
  }
  try {
    await redisClient.setex(key, ttl, JSON.stringify(value))
  } catch (error) {
    console.error('Cache set error:', error)
  }
}

export async function deleteCache(key: string) {
  const redisClient = redis || initializeRedis()
  if (!redisClient) {
    return
  }
  try {
    await redisClient.del(key)
  } catch (error) {
    console.error('Cache delete error:', error)
  }
}