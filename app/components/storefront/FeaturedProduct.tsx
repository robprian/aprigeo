import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function FeaturedProduct() {
  return (
    <section className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="Trimble R12i GNSS Receiver"
            width={500}
            height={400}
            className="rounded-lg"
          />
        </div>

        <div>
          <div className="text-sm text-gray-500 uppercase mb-2">TRIMBLE • GNSS RECEIVERS • PROFESSIONAL GRADE</div>
          <h2 className="text-3xl font-bold mb-4">Trimble R12i GNSS Receiver</h2>

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-green-600">$15,999.00</span>
              <span className="ml-3 text-xl text-gray-400 line-through">$17,999.00</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Multi-constellation GNSS support</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Tilt compensation technology</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>ProPoint GNSS technology for improved performance</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex border rounded overflow-hidden">
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
              <input type="text" value="1" className="w-12 text-center border-none" readOnly />
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
            </div>

            <Button className="bg-green-500 hover:bg-green-600">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
