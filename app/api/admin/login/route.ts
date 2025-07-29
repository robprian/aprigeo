import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Simple authentication (in production, use proper password hashing)
    if (username === 'admin' && password === 'admin123') {
      // Create a simple auth token
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      const response = NextResponse.json({
        success: true,
        message: 'Login successful'
      })

      // Set cookie with token
      response.cookies.set('admin_auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 // 24 hours
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logout successful'
  })

  // Clear auth cookie
  response.cookies.delete('admin_auth')
  
  return response
}
