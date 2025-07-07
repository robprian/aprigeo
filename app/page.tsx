import Banner from "./components/storefront/Banner"
import SidebarBanner from "./components/storefront/SidebarBanner"
import Categories from "./components/storefront/Categories"
import Recommendations from "./components/storefront/Recommendations"
import FeaturedProduct from "./components/storefront/FeaturedProduct"
import BestSelling from "./components/storefront/BestSelling"
import PromoBanners from "./components/storefront/PromoBanners"
import EssentialProducts from "./components/storefront/EssentialProducts"
import Blog from "./components/storefront/Blog"
import Newsletter from "./components/storefront/Newsletter"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <Banner position="hero" size="large" className="mb-8" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Categories />
            <Recommendations />
            <FeaturedProduct />
            <BestSelling />
            
            {/* Medium Banner */}
            <div className="my-8">
              <Banner position="banner" size="medium" />
            </div>
            
            <EssentialProducts />
            <Blog />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <SidebarBanner position="sidebar" />
              <PromoBanners />
            </div>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </div>
  )
}
