import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Award, Clock, MapPin, Star, Globe, Phone, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "10,000+", label: "Satisfied Customers" },
    { icon: Award, value: "25+", label: "Years of Experience" },
    { icon: Globe, value: "50+", label: "Countries Served" },
    { icon: CheckCircle, value: "99.8%", label: "Customer Satisfaction" }
  ]

  const team = [
    {
      name: "John Meridian",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      bio: "Professional surveyor with 30+ years experience in geodetic instruments and GPS technology."
    },
    {
      name: "Sarah Chen",
      role: "Head of Sales",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=300",
      bio: "GPS technology specialist helping customers find the perfect equipment for their projects."
    },
    {
      name: "Mike Rodriguez", 
      role: "Technical Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      bio: "Expert in GNSS systems and precision measurement instruments with extensive field experience."
    },
    {
      name: "Lisa Johnson",
      role: "Customer Success Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      bio: "Dedicated to ensuring our customers get maximum value from their surveying equipment."
    }
  ]

  const values = [
    {
      title: "Quality First",
      description: "We partner only with the most trusted manufacturers to ensure you get reliable, accurate equipment.",
      icon: Award
    },
    {
      title: "Expert Support",
      description: "Our team of surveying professionals provides technical guidance and support whenever you need it.",
      icon: Users
    },
    {
      title: "Innovation",
      description: "We stay at the forefront of surveying technology to bring you the latest advancements.",
      icon: Star
    },
    {
      title: "Reliability",
      description: "Count on us for consistent service, timely delivery, and dependable equipment performance.",
      icon: CheckCircle
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About ApriGeo
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Your trusted partner for professional GPS, survey equipment, and geodetic instruments. 
              Serving surveying professionals worldwide with precision tools and expert support since 1998.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1998, ApriGeo began as a small equipment rental shop for local surveyors. Our founder, John
              Meridian, a professional surveyor himself, recognized the need for reliable, high-quality equipment backed by expert
              knowledge and support.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we've grown from that small rental shop to become one of the leading providers of
              professional GPS and survey equipment worldwide. Despite our growth, we've maintained our commitment
              to personalized service and technical expertise.
            </p>
            <p className="text-gray-600 mb-6">
              Today, ApriGeo serves thousands of professionals across various industries, from construction and
              civil engineering to agriculture and environmental sciences. Our mission remains the same: to provide the
              best tools and support for professionals who measure our world.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800"
              alt="Professional surveying equipment in action"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Why Choose ApriGeo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Brands</h3>
              <p className="text-gray-600">We partner with industry leaders like Trimble, Leica, and Topcon</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Our technical team provides guidance from selection to field application</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping and comprehensive warranty support worldwide</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our team of surveying experts help you find the perfect equipment for your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">
                Browse Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t">
            <div className="text-center">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <h4 className="font-semibold mb-1">Visit Our Store</h4>
              <p className="text-sm text-gray-600">123 Survey Street<br />GeoTech City, GC 12345</p>
            </div>
            <div className="text-center">
              <Phone className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <h4 className="font-semibold mb-1">Call Us</h4>
              <p className="text-sm text-gray-600">+1 (555) 123-4567<br />Mon-Fri 8AM-6PM</p>
            </div>
            <div className="text-center">
              <Mail className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <h4 className="font-semibold mb-1">Email Us</h4>
              <p className="text-sm text-gray-600">info@aprigeo.com<br />support@aprigeo.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
