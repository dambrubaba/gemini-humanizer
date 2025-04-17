import { NextResponse, type NextRequest } from "next/server"
import { rateLimit } from "@/lib/rate-limit"

// Define which paths this middleware will run on
export const config = {
  matcher: ["/api/:path*"],
}

export async function middleware(request: NextRequest) {
  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const rateLimitResult = await rateLimit(request)

    // If rate limit is exceeded, return 429 Too Many Requests
    if (!rateLimitResult.success) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Rate limit exceeded",
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toISOString(),
          },
        },
      )
    }

    // Add rate limit headers to successful responses
    const response = NextResponse.next()
    response.headers.set("X-RateLimit-Limit", rateLimitResult.limit.toString())
    response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString())
    response.headers.set("X-RateLimit-Reset", rateLimitResult.reset.toISOString())

    return response
  }

  // For non-API routes, continue without rate limiting
  return NextResponse.next()
}
