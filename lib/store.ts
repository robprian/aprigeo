import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  status: "Active" | "Inactive"
  seo_optimized: boolean
  image: string
  description?: string
  brand?: string
  meta_title?: string
  meta_description?: string
  meta_tags?: string[]
}

interface Category {
  id: number
  name: string
  slug: string
  parent: string | null
  products: number
  status: "Active" | "Inactive"
  seo_optimized: boolean
  image: string
  description?: string
  meta_title?: string
  meta_description?: string
  meta_tags?: string[]
}

interface Brand {
  id: number
  name: string
  slug: string
  country: string
  products: number
  status: "Active" | "Inactive"
  seo_optimized: boolean
  logo: string
  website: string
  description?: string
  meta_title?: string
  meta_description?: string
  meta_tags?: string[]
}

interface Banner {
  id: number
  title: string
  subtitle?: string
  mainText: string
  highlight: string
  discount?: string
  discountText?: string
  buttonText: string
  buttonLink: string
  background: string
  image: string
  isActive: boolean
  position: "hero" | "promo"
  order: number
}

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  date: string
  category: string
  author: string
  readTime: string
  tags: string[]
  status: "Published" | "Draft"
  meta_title?: string
  meta_description?: string
  meta_tags?: string[]
}

interface StoreState {
  products: Product[]
  categories: Category[]
  brands: Brand[]
  banners: Banner[]
  blogPosts: BlogPost[]

  // Product actions
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  deleteProduct: (id: number) => void

  // Category actions
  addCategory: (category: Omit<Category, "id">) => void
  updateCategory: (id: number, updates: Partial<Category>) => void
  deleteCategory: (id: number) => void

  // Brand actions
  addBrand: (brand: Omit<Brand, "id">) => void
  updateBrand: (id: number, updates: Partial<Brand>) => void
  deleteBrand: (id: number) => void

  // Banner actions
  addBanner: (banner: Omit<Banner, "id">) => void
  updateBanner: (id: number, updates: Partial<Banner>) => void
  deleteBanner: (id: number) => void
  toggleBanner: (id: number) => void

  // Blog actions
  addBlogPost: (post: Omit<BlogPost, "id">) => void
  updateBlogPost: (id: number, updates: Partial<BlogPost>) => void
  deleteBlogPost: (id: number) => void

  // SEO generation
  generateSEO: (
    type: "product" | "category" | "brand" | "blog",
    content: string,
  ) => Promise<{
    meta_title: string
    meta_description: string
    meta_tags: string[]
  }>
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Trimble R12i GNSS Receiver",
    category: "GPS",
    price: 239988000,
    stock: 12,
    status: "Active",
    seo_optimized: true,
    image: "/placeholder.svg?height=60&width=60",
    description: "High-precision GNSS receiver for professional surveying applications",
    brand: "Trimble",
  },
  {
    id: 2,
    name: "Leica TS16 Total Station",
    category: "Survey",
    price: 434982000,
    stock: 8,
    status: "Active",
    seo_optimized: false,
    image: "/placeholder.svg?height=60&width=60",
    description: "Advanced total station with precise measurement capabilities",
    brand: "Leica",
  },
  {
    id: 3,
    name: "Topcon GT-1200 Robotic",
    category: "Survey",
    price: 494970000,
    stock: 5,
    status: "Active",
    seo_optimized: true,
    image: "/placeholder.svg?height=60&width=60",
    description: "Robotic total station for automated surveying",
    brand: "Topcon",
  },
  {
    id: 4,
    name: "Iridium 9575 Satellite Phone",
    category: "Satellite",
    price: 19498800,
    stock: 25,
    status: "Active",
    seo_optimized: false,
    image: "/placeholder.svg?height=60&width=60",
    description: "Reliable satellite communication device for remote areas",
    brand: "Iridium",
  },
]

const initialCategories: Category[] = [
  {
    id: 1,
    name: "GPS Equipment",
    slug: "gps-equipment",
    parent: null,
    products: 45,
    status: "Active",
    seo_optimized: true,
    image: "/placeholder.svg?height=60&width=60",
    description: "Professional GPS and GNSS equipment for surveying",
  },
  {
    id: 2,
    name: "Survey Equipment",
    slug: "survey-equipment",
    parent: null,
    products: 32,
    status: "Active",
    seo_optimized: false,
    image: "/placeholder.svg?height=60&width=60",
    description: "Comprehensive surveying tools and instruments",
  },
  {
    id: 3,
    name: "GNSS Receivers",
    slug: "gnss-receivers",
    parent: "GPS Equipment",
    products: 28,
    status: "Active",
    seo_optimized: true,
    image: "/placeholder.svg?height=60&width=60",
    description: "High-precision GNSS receivers for professional use",
  },
  {
    id: 4,
    name: "Total Stations",
    slug: "total-stations",
    parent: "Survey Equipment",
    products: 18,
    status: "Active",
    seo_optimized: false,
    image: "/placeholder.svg?height=60&width=60",
    description: "Advanced total stations for precise measurements",
  },
]

const initialBrands: Brand[] = [
  {
    id: 1,
    name: "Trimble",
    slug: "trimble",
    country: "USA",
    products: 28,
    status: "Active",
    seo_optimized: true,
    logo: "/placeholder.svg?height=60&width=60",
    website: "https://trimble.com",
    description: "Leading provider of GPS and surveying technology",
  },
  {
    id: 2,
    name: "Leica Geosystems",
    slug: "leica-geosystems",
    country: "Switzerland",
    products: 22,
    status: "Active",
    seo_optimized: false,
    logo: "/placeholder.svg?height=60&width=60",
    website: "https://leica-geosystems.com",
    description: "Premium surveying and measurement solutions",
  },
  {
    id: 3,
    name: "Topcon",
    slug: "topcon",
    country: "Japan",
    products: 18,
    status: "Active",
    seo_optimized: true,
    logo: "/placeholder.svg?height=60&width=60",
    website: "https://topcon.com",
    description: "Innovative positioning and measurement technology",
  },
]

const initialBanners: Banner[] = [
  {
    id: 1,
    title: "PRECISION AND QUALITY",
    mainText: "CV. Aprinia",
    highlight: "Geosat Solusindo",
    discount: "30",
    discountText: "Save up to",
    buttonText: "Shop now",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-gray-50 to-gray-100",
    image: "/placeholder.svg?height=300&width=300&text=GPS+Equipment",
    isActive: true,
    position: "hero",
    order: 1,
  },
  {
    id: 2,
    title: "PROFESSIONAL SOLUTIONS",
    mainText: "Survey",
    highlight: "Equipment",
    discount: "25",
    discountText: "Up to",
    buttonText: "Explore",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-green-50 to-blue-50",
    image: "/placeholder.svg?height=300&width=300&text=Survey+Tools",
    isActive: true,
    position: "hero",
    order: 2,
  },
  {
    id: 3,
    title: "RELIABLE COMMUNICATION",
    mainText: "Satellite",
    highlight: "Technology",
    discount: "15",
    discountText: "Special",
    buttonText: "View Products",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-orange-50 to-yellow-50",
    image: "/placeholder.svg?height=300&width=300&text=Satellite+Phones",
    isActive: false,
    position: "hero",
    order: 3,
  },
  {
    id: 4,
    title: "SAVE UP TO",
    subtitle: "Professional GPS",
    mainText: "25%",
    highlight: "",
    buttonText: "SHOP NOW",
    buttonLink: "/gps",
    background: "bg-yellow-50",
    image: "/placeholder.svg?height=200&width=400&text=GPS+Sale",
    isActive: true,
    position: "promo",
    order: 1,
  },
  {
    id: 5,
    title: "PREMIUM QUALITY",
    subtitle: "Survey Equipment",
    mainText: "Discover",
    highlight: "",
    buttonText: "SHOP NOW",
    buttonLink: "/shop",
    background: "bg-gray-100",
    image: "/placeholder.svg?height=200&width=400&text=Survey+Equipment",
    isActive: true,
    position: "promo",
    order: 2,
  },
]

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Evolution of GPS Technology in Surveying",
    slug: "evolution-gps-technology-surveying",
    excerpt: "Discover how GPS technology has transformed the surveying industry over the past decades.",
    content: "GPS technology has revolutionized surveying...",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 15, 2024",
    category: "Technology",
    author: "John Smith",
    readTime: "5 min read",
    tags: ["GPS", "Technology", "Surveying", "Innovation"],
    status: "Published",
  },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      categories: initialCategories,
      brands: initialBrands,
      banners: initialBanners,
      blogPosts: initialBlogPosts,

      // Product actions
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: Date.now() }],
        })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // Category actions
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, { ...category, id: Date.now() }],
        })),

      updateCategory: (id, updates) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      // Brand actions
      addBrand: (brand) =>
        set((state) => ({
          brands: [...state.brands, { ...brand, id: Date.now() }],
        })),

      updateBrand: (id, updates) =>
        set((state) => ({
          brands: state.brands.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),

      deleteBrand: (id) =>
        set((state) => ({
          brands: state.brands.filter((b) => b.id !== id),
        })),

      // Banner actions
      addBanner: (banner) =>
        set((state) => ({
          banners: [...state.banners, { ...banner, id: Date.now() }],
        })),

      updateBanner: (id, updates) =>
        set((state) => ({
          banners: state.banners.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),

      deleteBanner: (id) =>
        set((state) => ({
          banners: state.banners.filter((b) => b.id !== id),
        })),

      toggleBanner: (id) =>
        set((state) => ({
          banners: state.banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)),
        })),

      // Blog actions
      addBlogPost: (post) =>
        set((state) => ({
          blogPosts: [...state.blogPosts, { ...post, id: Date.now() }],
        })),

      updateBlogPost: (id, updates) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deleteBlogPost: (id) =>
        set((state) => ({
          blogPosts: state.blogPosts.filter((p) => p.id !== id),
        })),

      // SEO generation
      generateSEO: async (type, content) => {
        // Simulate AI SEO generation
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const companyName = "CV. Aprinia Geosat Solusindo"
        const keywords = ["GPS", "Survey Equipment", "Total Station", "GNSS", "Satellite Phone", "Surveying Tools"]

        return {
          meta_title: `${content.slice(0, 50)}... | ${companyName}`,
          meta_description: `Professional ${type} from ${companyName}. ${content.slice(0, 120)}... High-quality surveying equipment and GPS solutions.`,
          meta_tags: [...keywords.slice(0, 3), type, "Indonesia", "Professional"],
        }
      },
    }),
    {
      name: "aprinia-store",
    },
  ),
)
