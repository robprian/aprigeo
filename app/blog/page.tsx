"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock, ArrowRight, Search, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image?: string
  author: string
  published_at: string
  is_published: boolean
  tags?: string[]
  reading_time?: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Sample blog posts since we don't have a blog API yet
  const samplePosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of GPS Technology in Professional Surveying",
      slug: "future-gps-technology-professional-surveying",
      excerpt: "Explore the latest advancements in GPS technology and how they're revolutionizing the surveying industry with unprecedented accuracy and efficiency.",
      content: "",
      featured_image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
      author: "John Smith",
      published_at: "2024-01-15T10:00:00Z",
      is_published: true,
      tags: ["GPS", "Technology", "Surveying"],
      reading_time: 8
    },
    {
      id: 2,
      title: "Total Station vs. Theodolite: A Comprehensive Comparison",
      slug: "total-station-vs-theodolite-comprehensive-comparison",
      excerpt: "Understanding the key differences between total stations and theodolites to help you choose the right instrument for your surveying projects.",
      content: "",
      featured_image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800",
      author: "Sarah Johnson",
      published_at: "2024-01-12T14:30:00Z",
      is_published: true,
      tags: ["Total Station", "Theodolite", "Equipment"],
      reading_time: 6
    },
    {
      id: 3,
      title: "Best Practices for GNSS Data Collection in Urban Environments",
      slug: "best-practices-gnss-data-collection-urban-environments",
      excerpt: "Learn proven techniques for collecting accurate GNSS data in challenging urban environments with high-rise buildings and interference.",
      content: "",
      featured_image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
      author: "Mike Rodriguez",
      published_at: "2024-01-10T09:15:00Z",
      is_published: true,
      tags: ["GNSS", "Data Collection", "Urban"],
      reading_time: 10
    },
    {
      id: 4,
      title: "Maintenance Tips for Long-lasting Survey Equipment",
      slug: "maintenance-tips-long-lasting-survey-equipment",
      excerpt: "Essential maintenance practices to extend the life of your surveying instruments and ensure consistent performance in the field.",
      content: "",
      featured_image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800",
      author: "Lisa Chen",
      published_at: "2024-01-08T16:45:00Z",
      is_published: true,
      tags: ["Maintenance", "Equipment", "Tips"],
      reading_time: 5
    },
    {
      id: 5,
      title: "Introduction to Laser Scanning Technology",
      slug: "introduction-laser-scanning-technology",
      excerpt: "Discover how 3D laser scanning is transforming surveying and mapping applications with its speed and precision.",
      content: "",
      featured_image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
      author: "David Wilson",
      published_at: "2024-01-05T11:20:00Z",
      is_published: true,
      tags: ["Laser Scanning", "3D Technology", "Innovation"],
      reading_time: 7
    },
    {
      id: 6,
      title: "Understanding RTK vs PPK: Which is Right for You?",
      slug: "understanding-rtk-vs-ppk-which-right-for-you",
      excerpt: "Compare Real-Time Kinematic (RTK) and Post-Processed Kinematic (PPK) techniques to determine the best approach for your surveying needs.",
      content: "",
      featured_image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      author: "Emma Davis",
      published_at: "2024-01-03T13:10:00Z",
      is_published: true,
      tags: ["RTK", "PPK", "GNSS"],
      reading_time: 9
    }
  ]

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      setLoading(true)
      try {
        // In a real application, this would be an API call
        // const response = await fetch('/api/blog')
        // const data = await response.json()
        // setPosts(data.data || [])
        
        // For now, use sample data
        setTimeout(() => {
          setPosts(samplePosts)
          setFilteredPosts(samplePosts)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    let filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags?.includes(selectedTag)
      )
    }

    setFilteredPosts(filtered)
  }, [searchTerm, posts, selectedTag])

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-gray-300 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>
                  <div className="h-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Surveying & GPS Blog
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Expert insights, industry trends, and practical guides for surveying professionals
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tags Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Topic</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All Topics
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all available articles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.featured_image || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.published_at)}
                        </div>
                      </div>
                      {post.reading_time && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.reading_time} min read
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Industry Insights
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest surveying technology updates, 
            expert tips, and industry news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Explore More Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/categories" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Product Categories</h4>
              <p className="text-gray-600 text-sm">Explore our comprehensive range of surveying equipment</p>
            </Link>
            <Link href="/brands" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Top Brands</h4>
              <p className="text-gray-600 text-sm">Discover leading manufacturers in surveying technology</p>
            </Link>
            <Link href="/contact" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Expert Consultation</h4>
              <p className="text-gray-600 text-sm">Get personalized advice from our surveying specialists</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
