import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Award, Globe, Users } from "lucide-react"

const vendors = [
  {
    id: 1,
    name: "Trimble",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Leading provider of advanced positioning solutions for surveying, construction, and agriculture",
    specialties: ["GPS/GNSS", "Total Stations", "Software", "Machine Control"],
    founded: "1978",
    headquarters: "Sunnyvale, CA, USA",
    rating: 4.9,
    products: 45,
    featured: true,
    website: "https://trimble.com",
  },
  {
    id: 2,
    name: "Leica Geosystems",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Swiss precision instruments for surveying, engineering, and construction professionals",
    specialties: ["Total Stations", "Laser Scanners", "GNSS", "Software"],
    founded: "1819",
    headquarters: "Heerbrugg, Switzerland",
    rating: 4.8,
    products: 38,
    featured: true,
    website: "https://leica-geosystems.com",
  },
  {
    id: 3,
    name: "Topcon",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Japanese technology company specializing in optical and positioning equipment",
    specialties: ["Positioning", "Eye Care", "Smart Infrastructure"],
    founded: "1932",
    headquarters: "Tokyo, Japan",
    rating: 4.7,
    products: 32,
    featured: true,
    website: "https://topcon.com",
  },
  {
    id: 4,
    name: "Sokkia",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Precision measurement and surveying instruments for construction and surveying",
    specialties: ["Total Stations", "GNSS", "Levels", "Theodolites"],
    founded: "1920",
    headquarters: "Kanagawa, Japan",
    rating: 4.6,
    products: 28,
    featured: false,
    website: "https://sokkia.com",
  },
  {
    id: 5,
    name: "Spectra Precision",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Innovative positioning solutions for construction and surveying professionals",
    specialties: ["Laser Levels", "GNSS", "Machine Control", "Software"],
    founded: "1997",
    headquarters: "Westminster, CO, USA",
    rating: 4.5,
    products: 24,
    featured: false,
    website: "https://spectraprecision.com",
  },
  {
    id: 6,
    name: "Garmin",
    logo: "/placeholder.svg?height=80&width=120",
    description: "GPS technology and wearables for outdoor, fitness, marine, and automotive markets",
    specialties: ["Handheld GPS", "Marine GPS", "Aviation", "Outdoor"],
    founded: "1989",
    headquarters: "Olathe, KS, USA",
    rating: 4.4,
    products: 18,
    featured: false,
    website: "https://garmin.com",
  },
  {
    id: 7,
    name: "Pentax",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Optical instruments and surveying equipment with Japanese precision",
    specialties: ["Total Stations", "Theodolites", "Levels", "Accessories"],
    founded: "1919",
    headquarters: "Tokyo, Japan",
    rating: 4.3,
    products: 15,
    featured: false,
    website: "https://pentax.com",
  },
  {
    id: 8,
    name: "South Surveying",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Professional surveying instruments with innovative technology and competitive pricing",
    specialties: ["Total Stations", "GNSS RTK", "Theodolites", "Levels"],
    founded: "1989",
    headquarters: "Guangzhou, China",
    rating: 4.2,
    products: 22,
    featured: false,
    website: "https://southsurveying.com",
  },
]

const stats = [
  { label: "Partner Brands", value: "25+" },
  { label: "Countries Covered", value: "50+" },
  { label: "Years Partnership", value: "15+" },
  { label: "Products Available", value: "500+" },
]

export default function VendorsPage() {
  const featuredVendors = vendors.filter((vendor) => vendor.featured)
  const otherVendors = vendors.filter((vendor) => !vendor.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Trusted Vendor Partners</h1>
            <p className="text-xl mb-8 text-blue-100">
              We partner with the world's leading manufacturers to bring you the highest quality surveying equipment and
              GPS solutions
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our premium partnerships with industry-leading manufacturers ensure you get the best equipment and support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gold text-white">Featured</Badge>
                </div>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gray-50 rounded-lg">
                    <Image
                      src={vendor.logo || "/placeholder.svg"}
                      alt={vendor.name}
                      width={120}
                      height={80}
                      className="mx-auto"
                    />
                  </div>
                  <CardTitle className="text-xl group-hover:text-green-600 transition-colors">{vendor.name}</CardTitle>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                    <span className="text-sm text-gray-500">({vendor.products} products)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{vendor.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-sm">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {vendor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Founded:</span> {vendor.founded}
                    </div>
                    <div>
                      <span className="font-medium">HQ:</span> {vendor.headquarters}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      View Products
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Globe className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Vendors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All Vendor Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our complete network of trusted manufacturers and suppliers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherVendors.map((vendor) => (
              <Card key={vendor.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 p-3 bg-white rounded-lg border">
                    <Image
                      src={vendor.logo || "/placeholder.svg"}
                      alt={vendor.name}
                      width={100}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                  <CardTitle className="text-lg group-hover:text-green-600 transition-colors">{vendor.name}</CardTitle>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{vendor.rating}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">{vendor.description}</p>
                  <div className="text-xs text-gray-500 mb-3">{vendor.products} products available</div>
                  <Button className="w-full" size="sm" variant="outline">
                    View Products
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Our Partnerships Matter</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our strong relationships with manufacturers ensure you get the best products, prices, and support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Authorized Dealer</h3>
              <p className="text-gray-600 text-sm">Official authorized dealer status with full warranty support</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Pricing</h3>
              <p className="text-gray-600 text-sm">Competitive pricing through direct manufacturer relationships</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Direct access to manufacturer technical support and training</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Network</h3>
              <p className="text-gray-600 text-sm">Worldwide service network and parts availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with the Best?</h2>
          <p className="text-xl mb-8 text-green-100">
            Contact us to learn more about our vendor partnerships and find the perfect equipment for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-500">
              Request Catalog
            </Button>
            <Button size="lg" className="bg-white text-green-500 hover:bg-gray-100">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
