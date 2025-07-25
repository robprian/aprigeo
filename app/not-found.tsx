import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Halaman Tidak Ditemukan</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dipindahkan atau dihapus.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              Kembali ke Beranda
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/shop">
              Lihat Produk GPS
            </Link>
          </Button>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Atau Anda dapat mencari produk GPS tools yang Anda butuhkan:</p>
          <div className="mt-2">
            <Link href="/categories" className="text-blue-600 hover:underline">
              Jelajahi Kategori
            </Link>
            {' • '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
