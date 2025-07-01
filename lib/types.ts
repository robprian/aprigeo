// Product Types
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  short_description?: string
  sku: string
  price: number
  compare_price?: number
  cost_price?: number
  category_id: number
  brand_id?: number
  is_active: boolean
  is_featured: boolean
  in_stock: boolean
  stock_quantity: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  images: string[]
  tags: string[]
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
  
  // Relations
  category?: Category
  brand?: Brand
  attributes?: ProductAttribute[]
  rating?: number
  reviews?: number
  badge?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: number
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  
  // Relations
  products_count?: number
  children?: Category[]
}

export interface Brand {
  id: number
  name: string
  slug: string
  description?: string
  logo_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
  
  // Relations
  products_count?: number
}

export interface ProductAttribute {
  id: number
  product_id: number
  name: string
  value: string
}

// User Types
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  phone?: string
  role: 'admin' | 'customer' | 'manager'
  email_verified_at?: string
  is_active: boolean
  created_at: string
  updated_at: string
  
  // Relations
  profile?: CustomerProfile
}

export interface CustomerProfile {
  id: number
  user_id: number
  customer_group_id?: number
  company_name?: string
  tax_id?: string
  date_of_birth?: string
  gender?: 'male' | 'female' | 'other'
  total_orders: number
  total_spent: number
  last_order_date?: string
  
  // Relations
  customer_group?: CustomerGroup
}

export interface CustomerGroup {
  id: number
  name: string
  description?: string
  discount_percentage: number
  minimum_order_amount: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Order Types
export interface Order {
  id: number
  user_id: number
  order_number: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'completed'
  total_amount: number
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  currency: string
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method?: string
  shipping_method?: string
  notes?: string
  created_at: string
  updated_at: string
  
  // Relations
  user?: User
  items?: OrderItem[]
  billing_address?: Address
  shipping_address?: Address
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
  total: number
  
  // Relations
  product?: Product
}

export interface Address {
  id: number
  user_id: number
  type: 'billing' | 'shipping'
  first_name: string
  last_name: string
  company?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone?: string
  is_default: boolean
}

// Blog Types
export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  author_id: number
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  created_at: string
  updated_at: string
  
  // Relations
  author?: User
}

// Dashboard Stats Types
export interface DashboardStats {
  total_sales: {
    value: number
    change: number
    trend: 'up' | 'down'
  }
  total_orders: {
    value: number
    change: number
    trend: 'up' | 'down'
  }
  visitors: {
    value: number
    change: number
    trend: 'up' | 'down'
  }
  total_products_sold: {
    value: number
    change: number
    trend: 'up' | 'down'
  }
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Cart Types
export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  inStock?: boolean
}

// Wishlist Types
export interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category?: string
  badge?: string
  rating?: number
  reviews?: number
  inStock?: boolean
}