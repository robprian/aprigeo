import Link from "next/link"

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">Shipping Policy</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Policy</h1>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Shipping Methods</h2>
            <p className="text-gray-600 mb-4">
              We offer various shipping options to meet your needs, including standard, expedited, and overnight
              delivery.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Processing Time</h2>
            <p className="text-gray-600 mb-4">
              Orders are typically processed within 1-2 business days. You will receive a tracking number once your
              order has shipped.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Shipping Costs</h2>
            <p className="text-gray-600 mb-4">
              Shipping costs are calculated based on the weight, size, and destination of your order. Free shipping is
              available on orders over $100.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
            <p className="text-gray-600 mb-4">
              We ship to most countries worldwide. International shipping times and costs vary by destination.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
