import { getProducts } from "@/app/actions"
import { ProductCard } from "@/components/features/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ShopPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const resolvedSearchParams = await searchParams
    const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined
    const products = await getProducts(category)

    const categories = [
        "Freshwater Fish",
        "Seawater Fish",
        "Prawns",
        "Crabs"
    ]

    return (
        <div className="container-custom py-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-river-blue">
                        {category ? `${category}` : "All Products"}
                    </h1>
                    <p className="text-gray-500">
                        {products.length} items available
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                    <Link href="/shop">
                        <Button variant={!category ? "primary" : "outline"} size="sm">All</Button>
                    </Link>
                    {categories.map(cat => (
                        <Link key={cat} href={`/shop?category=${encodeURIComponent(cat)}`}>
                            <Button
                                variant={category === cat ? "primary" : "outline"}
                                size="sm"
                            >
                                {cat}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <h3 className="text-xl font-medium text-gray-500">No products found in this category.</h3>
                        <Link href="/shop" className="mt-4 inline-block text-river-blue hover:underline">View all products</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
