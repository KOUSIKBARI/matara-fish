import { Hero } from "@/components/features/hero"
import { Categories } from "@/components/features/categories"
import { ProductCard } from "@/components/features/product-card"
import { getProducts } from "@/app/actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default async function Home() {
  // Fetch featured products (limit 4 for now)
  const products = await getProducts()
  const featuredProducts = products.slice(0, 4)

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Categories />

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-river-blue mb-2">Today&apos;s Fresh Catch</h2>
              <p className="text-gray-500">Handpicked premium quality fish</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                Loading fresh catch...
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/shop">
              <Button size="lg" className="h-12 px-8">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust/Story Section */}
      <section className="py-20 bg-river-blue text-white relative overflow-hidden">
        <div className="container-custom relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-bengali">বিশ্বাসের সাথে মাছ কিনুন</h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-mustard-gold">22 Years of Trust & Quality</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ma Tara Fish Center is not just a shop, it&apos;s a legacy in Haldia. Started two decades ago with a small stall, we now serve hundreds of families daily. We source directly from the ghats at 3 AM to ensure that what goes on your plate is as fresh as it gets.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-mustard-gold">❄️</span>
                <span>Chemical-free Scaling & Cleaning</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-mustard-gold">🚚</span>
                <span>Home Delivery in Haldia (Selected Pincodes)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-mustard-gold">⚖️</span>
                <span>Honest Weighing, Right Price</span>
              </li>
            </ul>
            <Link href="/about">
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">Read Our Story</Button>
            </Link>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
            {/* Placeholder for Owner/shop image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-gray-500">
              <span className="text-center p-4">
                [Image: Owner cutting fish or clean shop view] <br />
                (Will generate later)
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
