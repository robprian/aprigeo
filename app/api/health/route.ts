import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Handle build-time static generation - skip database check during build
    if (process.env.NODE_ENV === 'production' && !process.env.RUNTIME_PHASE) {
      return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'build_time',
          application: 'running'
        }
      })
    }

    // Handle missing database URL
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'not_configured',
          application: 'running'
        }
      })
    }

    // Only check database connection at runtime
    try {
      await query('SELECT 1')
      return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'connected',
          application: 'running'
        }
      })
    } catch (dbError) {
      console.warn('Database connection failed, but app is running:', dbError)
      return NextResponse.json({
        status: 'partial',
        timestamp: new Date().toISOString(),
        services: {
          database: 'disconnected',
          application: 'running'
        }
      })
    }
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      },
      { status: 503 }
    )
  }
}