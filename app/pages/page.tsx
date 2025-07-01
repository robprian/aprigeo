import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail, MapPin, Clock, Users, Award, Headphones } from "lucide-react"

const pages = [
  {
    title: "About Us",
    description: "Learn about our company history, mission, and commitment to surveying excellence",
    href: "/pages/about",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team for support, quotes, or general inquiries",
    href: "/pages/contact",
    icon: <Phone className="w-6 h-6" />,
  },
  {
    title: "Services",
    description: "Discover our comprehensive range of surveying services and solutions",
    href: "/pages/services",
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: "Support Center",
    description: "Access technical support, manuals, and troubleshooting resources",
    href: "/pages/support",
    icon: <Headphones className="w-6 h-6" />,
  },
  {
    title: "Training",
    description: "Professional training programs for surveying equipment and software",
    href: "/pages/training",
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: "Careers",
    description: "Join our team of surveying professionals and technical experts",
    href: "/pages/careers",
    icon: <Users className="w-6 h-6" />,
  },
]

export default function PagesIndex() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Company Information & Services</h1>
            <p className="text-xl mb-8 text-blue-100">
              Everything you need to know about GeoTech Store - your trusted partner in surveying solutions
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-sm text-gray-600">(+01) 123-456-789</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-sm text-gray-600">info@geotechstore.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri: 8AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Pages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find detailed information about our company, services, and support resources
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      {page.icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-green-600 transition-colors">{page.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{page.description}</p>
                </CardHeader>
                <CardContent>
                  <Link href={page.href}>
                    <Button className="w-full group-hover:bg-green-600 transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About GeoTech Store</h2>
              <p className="text-gray-600 mb-6">
                For over 25 years, GeoTech Store has been the leading provider of professional surveying equipment and
                GPS solutions. We serve surveyors, engineers, construction professionals, and mapping specialists
                worldwide with cutting-edge technology and exceptional service.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </div>
              </div>
              <Link href="/pages/about">
                <Button className="bg-green-500 hover:bg-green-600">
                  Read Our Full Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="GeoTech Store Team"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beyond equipment sales, we provide comprehensive services to support your surveying projects
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Equipment Sales</h3>
              <p className="text-sm text-gray-600">New and certified pre-owned surveying equipment</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Technical Support</h3>
              <p className="text-sm text-gray-600">Expert technical support and troubleshooting</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Training</h3>
              <p className="text-sm text-gray-600">Professional training and certification programs</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Field Services</h3>
              <p className="text-sm text-gray-600">On-site installation and calibration services</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
