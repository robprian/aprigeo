"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar, User, Wand2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { motion } from "framer-motion"
import PageTransition from "@/components/ui/page-transition"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BlogPage() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, generateSEO } = useStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [viewingPost, setViewingPost] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "/placeholder.svg?height=200&width=300",
    category: "",
    author: "Admin",
    readTime: "5 min read",
    tags: [] as string[],
    status: "Draft" as "Published" | "Draft",
    meta_title: "",
    meta_description: "",
    meta_tags: [] as string[],
  })

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleGenerateSEO = async () => {
    setIsGeneratingSEO(true)
    try {
      const seoData = await generateSEO("blog", `${formData.title} ${formData.excerpt}`)
      setFormData((prev) => ({
        ...prev,
        meta_title: seoData.meta_title,
        meta_description: seoData.meta_description,
        meta_tags: seoData.meta_tags,
      }))
    } catch (error) {
      console.error("Failed to generate SEO:", error)
    } finally {
      setIsGeneratingSEO(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "/placeholder.svg?height=200&width=300",
      category: "",
      author: "Admin",
      readTime: "5 min read",
      tags: [],
      status: "Draft",
      meta_title: "",
      meta_description: "",
      meta_tags: [],
    })
  }

  const handleAddPost = () => {
    const newPost = {
      ...formData,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      slug: formData.slug || generateSlug(formData.title),
    }
    addBlogPost(newPost)
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditPost = () => {
    if (editingPost) {
      updateBlogPost(editingPost.id, {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
      })
      setIsEditDialogOpen(false)
      setEditingPost(null)
      resetForm()
    }
  }

  const openEditDialog = (post: any) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      category: post.category,
      author: post.author,
      readTime: post.readTime,
      tags: post.tags || [],
      status: post.status,
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      meta_tags: post.meta_tags || [],
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (post: any) => {
    setViewingPost(post)
    setIsViewDialogOpen(true)
  }

  const handleDeletePost = (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlogPost(id)
    }
  }

  const FormContent = () => (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="seo">SEO Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value
              setFormData({
                ...formData,
                title,
                slug: generateSlug(title),
              })
            }}
            className="col-span-3"
            placeholder="Blog post title"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="slug" className="text-right">
            Slug *
          </Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="col-span-3"
            placeholder="blog-post-url"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Guides">Guides</SelectItem>
              <SelectItem value="News">News</SelectItem>
              <SelectItem value="Reviews">Reviews</SelectItem>
              <SelectItem value="Tips">Tips & Tricks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="excerpt" className="text-right pt-2">
            Excerpt *
          </Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="col-span-3"
            rows={2}
            placeholder="Brief description of the blog post"
          />
        </div>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="content" className="text-right pt-2">
            Content *
          </Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="col-span-3"
            rows={8}
            placeholder="Full blog post content (HTML supported)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right col-span-2">
              Author
            </Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="col-span-2"
              placeholder="Author name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="readTime" className="text-right col-span-2">
              Read Time
            </Label>
            <Input
              id="readTime"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="col-span-2"
              placeholder="5 min read"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="tags" className="text-right pt-2">
            Tags
          </Label>
          <Input
            id="tags"
            value={formData.tags.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              })
            }
            className="col-span-3"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value: "Published" | "Draft") => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>

      <TabsContent value="seo" className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">SEO Optimization</h4>
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateSEO}
            disabled={isGeneratingSEO || !formData.title || !formData.excerpt}
            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
          >
            {isGeneratingSEO ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
            {isGeneratingSEO ? "Generating..." : "Magic SEO"}
          </Button>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="meta_title" className="text-right">
            Meta Title
          </Label>
          <Input
            id="meta_title"
            value={formData.meta_title}
            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            className="col-span-3"
            placeholder="SEO meta title"
            maxLength={60}
          />
        </div>
        <p className="text-xs text-gray-500 col-start-2 col-span-3">{formData.meta_title.length}/60 characters</p>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="meta_description" className="text-right pt-2">
            Meta Description
          </Label>
          <Textarea
            id="meta_description"
            value={formData.meta_description}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            className="col-span-3"
            rows={3}
            placeholder="SEO meta description"
            maxLength={160}
          />
        </div>
        <p className="text-xs text-gray-500 col-start-2 col-span-3">
          {formData.meta_description.length}/160 characters
        </p>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="seo_tags" className="text-right pt-2">
            Meta Tags
          </Label>
          <Input
            id="seo_tags"
            value={formData.meta_tags.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                meta_tags: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              })
            }
            className="col-span-3"
            placeholder="seo-tag1, seo-tag2, seo-tag3"
          />
        </div>
      </TabsContent>
    </Tabs>
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600">Create and manage blog posts for your website</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>Write a new blog post for your website.</DialogDescription>
              </DialogHeader>
              <FormContent />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPost}
                  disabled={!formData.title || !formData.excerpt || !formData.content || !formData.category}
                >
                  Create Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl">Blog Posts ({filteredPosts.length})</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.excerpt}</p>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                            <span>•</span>
                            <span>{post.readTime}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>

                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{post.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={post.status === "Published" ? "default" : "secondary"}>{post.status}</Badge>
                          <div className="flex gap-1">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm" onClick={() => openViewDialog(post)}>
                                <Eye className="w-3 h-3" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm" onClick={() => openEditDialog(post)}>
                                <Edit className="w-3 h-3" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm
                  ? "No posts found matching your search."
                  : "No blog posts created yet. Create your first post to get started."}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
              <DialogDescription>Update blog post content and settings.</DialogDescription>
            </DialogHeader>
            <FormContent />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditPost}>Update Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Blog Post Preview</DialogTitle>
            </DialogHeader>
            {viewingPost && (
              <div className="space-y-4">
                <img
                  src={viewingPost.image || "/placeholder.svg"}
                  alt={viewingPost.title}
                  className="w-full h-48 rounded-lg object-cover"
                />

                <div>
                  <h2 className="text-xl font-bold mb-2">{viewingPost.title}</h2>
                  <p className="text-gray-600 mb-4">{viewingPost.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{viewingPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{viewingPost.author}</span>
                    </div>
                    <span>•</span>
                    <span>{viewingPost.readTime}</span>
                    <span>•</span>
                    <Badge variant="outline">{viewingPost.category}</Badge>
                    <Badge variant={viewingPost.status === "Published" ? "default" : "secondary"}>
                      {viewingPost.status}
                    </Badge>
                  </div>

                  {viewingPost.tags && viewingPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {viewingPost.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: viewingPost.content }} />
                  </div>

                  {viewingPost.meta_title && (
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium mb-2">SEO Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Meta Title:</span> {viewingPost.meta_title}
                        </div>
                        {viewingPost.meta_description && (
                          <div>
                            <span className="font-medium">Meta Description:</span> {viewingPost.meta_description}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  )
}
