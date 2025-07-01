import { MeiliSearch } from "meilisearch"

// Initialize the Meilisearch client with environment variables
const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || "http://localhost:7700",
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || "",
})

// Define the index name
const PRODUCTS_INDEX = "products"

// Mock data for development when Meilisearch is not available
const mockProducts = [
  {
    id: 1,
    name: "Trimble R12i GNSS Receiver",
    price: 15999,
    image: "/placeholder.svg?height=50&width=50",
    category: "GPS Receivers",
    brand: "Trimble",
  },
  {
    id: 2,
    name: "Leica TS16 Total Station",
    price: 28999,
    image: "/placeholder.svg?height=50&width=50",
    category: "Total Stations",
    brand: "Leica",
  },
  {
    id: 3,
    name: "Topcon GT-1200 Robotic",
    price: 32999,
    image: "/placeholder.svg?height=50&width=50",
    category: "Survey Equipment",
    brand: "Topcon",
  },
  {
    id: 4,
    name: "Spectra Precision Laser Level",
    price: 899,
    image: "/placeholder.svg?height=50&width=50",
    category: "Laser Tools",
    brand: "Spectra",
  },
]

// Function to search products
export async function searchProducts(query: string, options = {}) {
  try {
    // Try to use Meilisearch
    const results = await client.index(PRODUCTS_INDEX).search(query, {
      limit: 10,
      ...options,
    })

    return results
  } catch (error) {
    console.warn("Meilisearch error, falling back to mock data:", error)

    // Fallback to mock data if Meilisearch is not available
    const filteredProducts = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()),
    )

    return {
      hits: filteredProducts,
      processingTimeMs: 1,
      query,
    }
  }
}

// Function to get product by ID
export async function getProductById(id: number) {
  try {
    // Try to use Meilisearch
    const product = await client.index(PRODUCTS_INDEX).getDocument(id.toString())
    return product
  } catch (error) {
    console.warn("Meilisearch error, falling back to mock data:", error)

    // Fallback to mock data if Meilisearch is not available
    return mockProducts.find((product) => product.id === id) || null
  }
}

export default client
