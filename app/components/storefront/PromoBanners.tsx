import Image from "next/image"
import Link from "next/link"

export default function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Banner 1 */}
        <div className="relative overflow-hidden rounded-lg bg-yellow-50">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Professional GPS"
            width={400}
            height={200}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <div className="mb-2">
              <span className="text-sm text-gray-600">SAVE UP TO</span>
            </div>
            <h3 className="text-2xl font-bold text-red-500 mb-1">25%</h3>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Professional GPS</h4>
              <p className="text-sm text-gray-600">High-precision equipment</p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-green-600 hover:underline">
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Premium Survey Equipment"
            width={400}
            height={200}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <div className="mb-2">
              <span className="text-sm text-gray-600">PREMIUM QUALITY</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Discover</h3>
            <h3 className="text-xl font-bold mb-3">Survey Equipment</h3>
            <div className="text-2xl font-bold text-green-600 mb-2">$19,999</div>
            <Link href="/shop" className="text-sm font-medium text-green-600 hover:underline">
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Banner 3 */}
        <div className="relative overflow-hidden rounded-lg bg-green-50">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Precision Tools"
            width={400}
            height={200}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <h3 className="text-xl font-bold mb-1">Precision Tools</h3>
            <h3 className="text-xl font-bold mb-3">and Equipment</h3>
            <div className="text-2xl font-bold text-red-500 mb-2">100% ACCURATE</div>
            <Link href="/shop" className="text-sm font-medium text-green-600 hover:underline">
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
