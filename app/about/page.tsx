import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Award, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">About Us</span>
      </div>

      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About GeoTech Store</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Your trusted partner for professional GPS, survey equipment, and geodetic instruments for over 25 years.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 1998, GeoTech Store began as a small equipment rental shop for local surveyors. Our founder, John
            Meridian, a surveyor himself, recognized the need for reliable, high-quality equipment backed by expert
            knowledge and support.
          </p>
          <p className="text-gray-600 mb-4">
            Over the years, we've grown from that small rental shop to become one of the leading providers of
            professional GPS and survey equipment in North America. Despite our growth, we've maintained our commitment
            to personalized service and technical expertise.
          </p>
          <p className="text-gray-600">
            Today, GeoTech Store serves thousands of professionals across various industries, from construction and
            civil engineering to agriculture and environmental sciences. Our mission remains the same: to provide the
            best tools and support for professionals who measure our world.
          </p>
        </div>
        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=800&text=GeoTech+Store+History"
            alt="GeoTech Store History"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
            <div className="text-gray-600">Years in Business</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
            <div className="text-gray-600">Customers Served</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Expert Staff</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">5,000+</div>
            <div className="text-gray-600">Products Available</div>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Precision</h3>
              <p className="text-gray-600">
                We understand that in surveying and mapping, precision is everything. We're committed to providing
                equipment that delivers the accuracy professionals need.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Service</h3>
              <p className="text-gray-600">
                Our team of experts is passionate about helping customers find the right solutions for their specific
                needs, and providing ongoing support.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the products we offer to the service we provide and
                the knowledge we share.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "John Meridian",
              title: "Founder & CEO",
              image: "/placeholder.svg?height=300&width=300&text=John+Meridian",
            },
            {
              name: "Sarah Chen",
              title: "Chief Technology Officer",
              image: "/placeholder.svg?height=300&width=300&text=Sarah+Chen",
            },
            {
              name: "Michael Rodriguez",
              title: "Head of Customer Success",
              image: "/placeholder.svg?height=300&width=300&text=Michael+Rodriguez",
            },
            {
              name: "Emily Johnson",
              title: "Director of Operations",
              image: "/placeholder.svg?height=300&width=300&text=Emily+Johnson",
            },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-8">
          {[
            {
              year: "1998",
              title: "Company Founded",
              description:
                "GeoTech Store was founded as a small equipment rental shop for local surveyors in San Francisco.",
            },
            {
              year: "2005",
              title: "Expanded Product Line",
              description:
                "Expanded from rentals to sales, becoming an authorized dealer for major GPS and survey equipment brands.",
            },
            {
              year: "2010",
              title: "National Expansion",
              description:
                "Opened additional locations across the United States to better serve our growing customer base.",
            },
            {
              year: "2015",
              title: "Online Store Launch",
              description:
                "Launched our comprehensive online store to provide nationwide access to our products and expertise.",
            },
            {
              year: "2020",
              title: "Technical Support Center",
              description:
                "Established our dedicated technical support center to provide enhanced customer service and support.",
            },
            {
              year: "Today",
              title: "Industry Leader",
              description:
                "Recognized as an industry leader in providing high-quality GPS and survey equipment with unmatched expertise.",
            },
          ].map((event, index) => (
            <div key={index} className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                {index < 5 && <div className="h-full w-0.5 bg-green-200 my-2"></div>}
              </div>
              <Card className="flex-1">
                <CardContent className="p-6">
                  <div className="text-green-600 font-bold mb-1">{event.year}</div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              city: "San Francisco",
              address: "123 Survey Street, San Francisco, CA 94107",
              phone: "+1 (415) 555-1234",
            },
            {
              city: "Chicago",
              address: "456 Mapping Avenue, Chicago, IL 60607",
              phone: "+1 (312) 555-5678",
            },
            {
              city: "New York",
              address: "789 Geodetic Blvd, New York, NY 10001",
              phone: "+1 (212) 555-9012",
            },
          ].map((location, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <MapPin className="w-5 h-5 text-green-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-lg">{location.city}</h3>
                    <p className="text-gray-600">{location.address}</p>
                    <p className="text-gray-600">{location.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-green-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Work with Us?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Whether you're looking for equipment, have technical questions, or want to learn more about our services, our
          team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <Button className="bg-green-600 hover:bg-green-700">Contact Us</Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
