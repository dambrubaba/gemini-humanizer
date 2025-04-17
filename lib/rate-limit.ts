import type { NextRequest } from "next/server"

// In-memory store for rate limiting
// In production, you would use Redis or another external store
type RateLimitStore = {
  [ip: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Configuration
const RATE_LIMIT_MAX = 10 // Maximum requests per window
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds

export async function rateLimit(req: NextRequest): Promise<{
  success: boolean
  limit: number
  remaining: number
  reset: Date
}> {
  // Get IP address from request
  const ip = req.ip || "anonymous"

  // Get current timestamp
  const now = Date.now()

  // Initialize or get existing data for this IP
  if (!store[ip] || store[ip].resetTime < now) {
    store[ip] = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
  }

  // Increment request count
  store[ip].count += 1

  // Calculate remaining requests
  const remaining = Math.max(0, RATE_LIMIT_MAX - store[ip].count)

  // Check if rate limit is exceeded
  const success = store[ip].count <= RATE_LIMIT_MAX

  // Clean up old entries periodically
  // This is a simple cleanup - in production use a more robust solution
  if (Math.random() < 0.001) {
    Object.keys(store).forEach((key) => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })
  }

  return {
    success,
    limit: RATE_LIMIT_MAX,
    remaining,
    reset: new Date(store[ip].resetTime),
  }
}
