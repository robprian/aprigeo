import { Pool } from 'pg'
import Redis from 'ioredis'

// PostgreSQL connection - only create if DATABASE_URL is available and not during build
let pool: Pool | null = null

// Function to initialize database connection at runtime
export function initializeDatabase() {
  // Skip database initialization during build time
  if (process.env.NODE_ENV === 'production' && !process.env.RUNTIME_PHASE) {
    return null
  }
  
  if (!pool && process.env.DATABASE_URL) {
    try {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 10000,
      })
    } catch (error) {
      console.warn('Database initialization failed:', error)
      return null
    }
  }
  return pool
}

// Redis connection - only create if REDIS_URL is available or in development
let redis: Redis | null = null

// Function to initialize Redis connection at runtime
export function initializeRedis() {
  // Skip Redis initialization during build time
  if (process.env.NODE_ENV === 'production' && !process.env.RUNTIME_PHASE) {
    return null
  }
  
  if (!redis && (process.env.REDIS_URL || process.env.NODE_ENV === 'development')) {
    try {
      redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
        retryDelayOnFailover: 100,
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