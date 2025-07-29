"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, CheckCircle, User } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      subtitle: "Mon-Fri 8AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@aprigeo.com", "support@aprigeo.com"],
      subtitle: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Survey Street", "GeoTech City, GC 12345"],
      subtitle: "United States"
    }
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'rental', label: 'Equipment Rental' },
    { value: 'repair', label: 'Service & Repair' },
    { value: 'training', label: 'Training & Support' }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="w-full">
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Our Experts
            </h1>
            <p className="text-xl opacity-90">
              Get professional advice from our surveying equipment specialists. 
              We're here to help you find the perfect solution for your project.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 font-medium">{detail}</p>
                ))}
                <p className="text-sm text-gray-500 mt-2">{info.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name" 
                        required 
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address" 
                        required 
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input 
                        id="company" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Enter your company name" 
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input 
                        id="phone" 
                        name="phone"
                        type="tel" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number" 
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select 
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {inquiryTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your inquiry" 
                        required 
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your inquiry, including specific equipment needs, project requirements, or questions you may have..."
                      required 
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Office Hours */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    All times in Eastern Standard Time (EST)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Need Immediate Help?</h3>
                <div className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="tel:+15551234567">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Sales: (555) 123-4567
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="tel:+15551234568">
                      <Phone className="w-4 h-4 mr-2" />
                      Tech Support: (555) 123-4568
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="mailto:info@aprigeo.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Find quick answers to common questions about our products and services.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/faq">
                    View FAQ
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-12">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="h-64 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Our Location</h3>
                  <p className="text-gray-600">123 Survey Street, GeoTech City, GC 12345</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
