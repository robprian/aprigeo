import Hero from "./components/storefront/Hero"
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
      <Hero />
      <Categories />
      <Recommendations />
      <FeaturedProduct />
      <BestSelling />
      <PromoBanners />
      <EssentialProducts />
      <Blog />
      <Newsletter />
    </div>
  )
}
