import { Redis } from '@upstash/redis'

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Read-only Redis client if needed
const redisReadOnly = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_READ_ONLY_TOKEN!,
})

export { redis, redisReadOnly }

// Cache helper functions using Upstash Redis
export async function upstashGetCache(key: string) {
  try {
    const cached = await redis.get(key)
    return cached
  } catch (error) {
    console.error('Upstash cache get error:', error)
    return null
  }
}

export async function upstashSetCache(key: string, value: any, ttl: number = 3600) {
  try {
    await redis.setex(key, ttl, JSON.stringify(value))
  } catch (error) {
    console.error('Upstash cache set error:', error)
  }
}

export async function upstashDeleteCache(key: string) {
  try {
    await redis.del(key)
  } catch (error) {
    console.error('Upstash cache delete error:', error)
  }
}

// Session storage helpers
export async function setSession(sessionId: string, data: any, ttl: number = 86400) {
  await upstashSetCache(`session:${sessionId}`, data, ttl)
}

export async function getSession(sessionId: string) {
  return await upstashGetCache(`session:${sessionId}`)
}

export async function deleteSession(sessionId: string) {
  await upstashDeleteCache(`session:${sessionId}`)
}

// Product cache helpers
export async function setCachedProducts(products: any[], ttl: number = 3600) {
  await upstashSetCache('products:all', products, ttl)
}

export async function getCachedProducts() {
  return await upstashGetCache('products:all')
}

export async function setCachedProduct(productId: string, product: any, ttl: number = 3600) {
  await upstashSetCache(`product:${productId}`, product, ttl)
}

export async function getCachedProduct(productId: string) {
  return await upstashGetCache(`product:${productId}`)
}
