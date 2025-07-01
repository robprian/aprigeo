import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, Award, Users } from "lucide-react"

const productCategories = [
  {
    title: "GPS & GNSS Systems",
    description: "High-precision positioning solutions for surveying and mapping",
    image: "/placeholder.svg?height=300&width=400",
    products: ["RTK GPS", "Base Stations", "Rovers", "Antennas"],
    href: "/category/gps-receivers",
    color: "bg-blue-500",
  },
  {
    title: "Total Stations",
    description: "Advanced electronic theodolites with distance measurement",
    image: "/placeholder.svg?height=300&width=400",
    products: ["Robotic Total Stations", "Manual Total Stations", "Reflectorless", "Prisms"],
    href: "/category/total-stations",
    color: "bg-green-500",
  },
  {
    title: "Laser Technology",
    description: "Precision laser instruments for construction and surveying",
    image: "/placeholder.svg?height=300&width=400",
    products: ["Laser Levels", "Laser Scanners", "Pipe Lasers", "Machine Control"],
    href: "/category/laser-levels",
    color: "bg-red-500",
  },
  {
    title: "Measuring Instruments",
    description: "Traditional and digital measuring tools for field work",
    image: "/placeholder.svg?height=300&width=400",
    products: ["Digital Theodolites", "Levels", "Measuring Tapes", "Calipers"],
    href: "/category/measuring-tools",
    color: "bg-purple-500",
  },
  {
    title: "Drone Solutions",
    description: "UAV systems for aerial surveying and mapping",
    image: "/placeholder.svg?height=300&width=400",
    products: ["Survey Drones", "Mapping Software", "Cameras", "Ground Control"],
    href: "/category/drones",
    color: "bg-orange-500",
  },
  {
    title: "Communication",
    description: "Reliable communication systems for remote locations",
    image: "/placeholder.svg?height=300&width=400",
    products: ["Satellite Phones", "Two-Way Radios", "GPS Trackers", "Emergency Beacons"],
    href: "/category/satellite-phones",
    color: "bg-teal-500",
  },
]

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Cutting-Edge Technology",
    description: "Latest innovations in surveying and GPS technology",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Reliable & Durable",
    description: "Built to withstand harsh field conditions",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Industry Leading",
    description: "Trusted by professionals worldwide",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Expert Support",
    description: "Technical support from surveying professionals",
  },
]

export default function ElementsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Survey Equipment Elements</h1>
            <p className="text-xl mb-8 text-gray-300">
              Discover our comprehensive range of surveying instruments, GPS systems, and precision tools designed for
              professionals who demand accuracy and reliability.
            </p>
            <Button size="lg" className="bg-green-500 hover:bg-green-600">
              Explore All Categories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Equipment?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our surveying equipment combines precision, durability, and innovation to meet the demanding requirements
              of modern surveying professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Equipment Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our specialized categories of surveying and GPS equipment, each designed for specific applications
              and requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 left-4 ${category.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {category.products.length} Products
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                    {category.title}
                  </CardTitle>
                  <p className="text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.products.map((product, productIndex) => (
                      <Badge key={productIndex} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                  <Link href={category.href}>
                    <Button className="w-full group-hover:bg-green-600 transition-colors">
                      View Category
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Advanced Technology Integration</h2>
              <p className="text-gray-300 mb-6">
                Our equipment incorporates the latest technological advances including AI-powered processing, cloud
                connectivity, and real-time data synchronization to enhance your surveying workflow.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time RTK corrections</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Cloud-based data management</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Mobile app integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Automated quality control</span>
                </li>
              </ul>
              <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                Learn More About Our Technology
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Technology Integration"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Equipment?</h2>
          <p className="text-xl mb-8 text-green-100">
            Contact our experts to find the perfect surveying solution for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-500">
              Request Quote
            </Button>
            <Button size="lg" className="bg-white text-green-500 hover:bg-gray-100">
              Contact Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
