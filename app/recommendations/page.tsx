import ProductRecommendations from "@/app/components/recommendations/ProductRecommendations"

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Recommendations</h1>
        <p className="text-gray-600">Discover products tailored just for you</p>
      </div>
      <ProductRecommendations
        userBehavior={{
          viewedProducts: ["1", "2", "3"],
          purchaseHistory: ["4", "5"],
          searchHistory: ["GPS", "Total Station", "Drone"],
          categories: ["GPS Receivers", "Total Stations", "Drones"],
        }}
      />
    </div>
  )
}
