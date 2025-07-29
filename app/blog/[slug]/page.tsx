"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/lib/types"
import { notFound } from "next/navigation"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPage({ params }: BlogPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>("")

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getSlug()
  }, [params])

  useEffect(() => {
    if (!slug) return
    
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/slug/${slug}`)
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
            return
          }
          throw new Error('Failed to fetch blog post')
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching blog post:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-300 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author ? `${post.author.first_name} ${post.author.last_name}` : 'Admin'}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.published_at || post.created_at)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                5 min read
              </div>
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8">
              <Image
                src={post.featured_image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed prose prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">GPS Technology</Badge>
                <Badge variant="secondary">Surveying</Badge>
                <Badge variant="secondary">Professional Tools</Badge>
              </div>
              
              <Link 
                href="/blog" 
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Read More Articles →
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}