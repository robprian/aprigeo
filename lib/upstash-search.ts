import { NextRequest, NextResponse } from 'next/server'

// Upstash Vector/Search configuration
const UPSTASH_SEARCH_URL = process.env.UPSTASH_SEARCH_REST_URL
const UPSTASH_SEARCH_TOKEN = process.env.UPSTASH_SEARCH_REST_TOKEN

// Search interface for Upstash Vector Search
interface SearchDocument {
  id: string
  data: any
  metadata?: Record<string, any>
}

interface SearchResult {
  id: string
  score: number
  data?: any
  metadata?: Record<string, any>
}

// Function to index a document
export async function indexDocument(document: SearchDocument) {
  if (!UPSTASH_SEARCH_URL || !UPSTASH_SEARCH_TOKEN) {
    throw new Error('Upstash Search credentials not configured')
  }

  try {
    const response = await fetch(`${UPSTASH_SEARCH_URL}/upsert`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UPSTASH_SEARCH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vectors: [
          {
            id: document.id,
            data: document.data,
            metadata: document.metadata || {},
          }
        ]
      }),
    })

    if (!response.ok) {
      throw new Error(`Upstash Search indexing failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error indexing document:', error)
    throw error
  }
}

// Function to search documents
export async function searchDocuments(query: string, topK: number = 10): Promise<SearchResult[]> {
  if (!UPSTASH_SEARCH_URL || !UPSTASH_SEARCH_TOKEN) {
    throw new Error('Upstash Search credentials not configured')
  }

  try {
    const response = await fetch(`${UPSTASH_SEARCH_URL}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UPSTASH_SEARCH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: query,
        topK,
        includeMetadata: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`Upstash Search query failed: ${response.statusText}`)
    }

    const result = await response.json()
    return result.matches || []
  } catch (error) {
    console.error('Error searching documents:', error)
    throw error
  }
}

// Function to delete a document
export async function deleteDocument(documentId: string) {
  if (!UPSTASH_SEARCH_URL || !UPSTASH_SEARCH_TOKEN) {
    throw new Error('Upstash Search credentials not configured')
  }

  try {
    const response = await fetch(`${UPSTASH_SEARCH_URL}/delete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UPSTASH_SEARCH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: [documentId]
      }),
    })

    if (!response.ok) {
      throw new Error(`Upstash Search deletion failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

// API route for product search using Upstash Vector
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const topK = parseInt(searchParams.get('topK') || '10')

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    const results = await searchDocuments(query, topK)
    
    return NextResponse.json({
      results,
      total: results.length,
      query,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// API route for indexing products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, data, metadata } = body

    if (!id || !data) {
      return NextResponse.json(
        { error: 'ID and data are required' },
        { status: 400 }
      )
    }

    const result = await indexDocument({ id, data, metadata })
    
    return NextResponse.json({
      message: 'Document indexed successfully',
      result,
    })
  } catch (error) {
    console.error('Index API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
