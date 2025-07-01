import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, Clock, User, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock blog data - in a real app, this would come from a CMS or database
const getBlogPost = (id: string) => {
  const posts = [
    {
      id: 1,
      title: "The Evolution of GPS Technology in Surveying",
      excerpt: "Discover how GPS technology has transformed the surveying industry over the past decades.",
      content: `
        <p>Global Positioning System (GPS) technology has revolutionized the surveying industry, transforming how professionals collect, process, and analyze spatial data. From its military origins to becoming an indispensable tool for civilian applications, GPS has fundamentally changed the landscape of surveying and mapping.</p>

        <h2>The Early Days of GPS in Surveying</h2>
        <p>When GPS was first made available for civilian use in the 1980s, surveying was still heavily dependent on traditional methods such as triangulation, traversing, and astronomical observations. These methods, while accurate, were time-consuming and required extensive manual calculations.</p>

        <p>The introduction of GPS brought unprecedented accuracy and efficiency to surveying operations. Early GPS receivers were large, expensive, and required long observation times to achieve centimeter-level accuracy. However, they represented a paradigm shift that would eventually make surveying more accessible and precise.</p>

        <h2>Technological Advancements</h2>
        <p>Over the decades, GPS technology has undergone significant improvements:</p>
        <ul>
          <li><strong>Real-Time Kinematic (RTK) GPS:</strong> Enabled real-time positioning with centimeter accuracy</li>
          <li><strong>Network RTK:</strong> Provided wider coverage and improved reliability</li>
          <li><strong>Multi-constellation GNSS:</strong> Integration of GPS, GLONASS, Galileo, and BeiDou systems</li>
          <li><strong>Miniaturization:</strong> Smaller, more portable receivers with longer battery life</li>
        </ul>

        <h2>Impact on Modern Surveying</h2>
        <p>Today's GPS technology has transformed surveying in numerous ways:</p>
        <p>Surveyors can now achieve millimeter-level accuracy in real-time, dramatically reducing project timelines. The integration of GPS with other technologies like laser scanning and photogrammetry has created powerful hybrid systems that can capture comprehensive spatial data efficiently.</p>

        <h2>Future Prospects</h2>
        <p>As we look to the future, GPS technology continues to evolve. Emerging trends include:</p>
        <ul>
          <li>Integration with artificial intelligence and machine learning</li>
          <li>Enhanced signal processing for challenging environments</li>
          <li>Improved accuracy through advanced correction services</li>
          <li>Integration with autonomous systems and robotics</li>
        </ul>

        <p>The evolution of GPS technology in surveying represents one of the most significant technological advances in the field. As we continue to push the boundaries of what's possible, GPS remains at the forefront of innovation, enabling surveyors to work more efficiently and accurately than ever before.</p>
      `,
      image: "/placeholder.svg?height=400&width=800",
      date: "May 15, 2024",
      category: "Technology",
      author: "John Smith",
      readTime: "5 min read",
      tags: ["GPS", "Technology", "Surveying", "Innovation"],
    },
    // Add more blog posts here...
  ]

  return posts.find((post) => post.id === Number.parseInt(id))
}

const relatedPosts = [
  {
    id: 2,
    title: "Choosing the Right Survey Equipment for Your Project",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 10, 2024",
    category: "Guides",
  },
  {
    id: 3,
    title: "Satellite Communication in Remote Areas",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 5, 2024",
    category: "Communication",
  },
  {
    id: 4,
    title: "The Benefits of Laser Technology in Modern Surveying",
    image: "/placeholder.svg?height=200&width=300",
    date: "April 28, 2024",
    category: "Technology",
  },
]

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/blog" className="text-green-600 hover:text-green-700">
            Return to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-green-600">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/blog" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </Link>

          {/* Article header */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-64 md:h-96">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-green-600 mb-4">{post.category}</Badge>
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white text-sm">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article content */}
            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Related posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-600">{relatedPost.category}</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-green-600 line-clamp-2 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600">{relatedPost.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
