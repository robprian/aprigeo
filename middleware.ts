import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for auth token in cookies
    const authToken = request.cookies.get('admin_auth')?.value

    if (!authToken) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Verify token (simple check - in production use JWT verification)
    try {
      const decoded = Buffer.from(authToken, 'base64').toString('ascii')
      const [username, timestamp] = decoded.split(':')
      
      // Check if token is not expired (24 hours)
      const tokenTime = parseInt(timestamp)
      const now = Date.now()
      const isExpired = (now - tokenTime) > (24 * 60 * 60 * 1000)

      if (isExpired || username !== 'admin') {
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
      }
    } catch (error) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
