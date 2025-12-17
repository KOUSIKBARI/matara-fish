import { getProductById, getProducts } from "@/app/actions"
import { ProductCard } from "@/components/features/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react"

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params
    const product = await getProductById(resolvedParams.id)

    // Fetch related products (simple implementation: same category)
    const allProducts = await getProducts()
    const relatedProducts = allProducts
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4)

    if (!product) {
        return (
            <div className="container-custom py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link href="/shop"><Button>Back to Shop</Button></Link>
            </div>
        )
    }

    // Client Component Wrapper for Add to Cart would be ideal here if we want "Add to Cart" button on this page too.
    // For now, let's reuse ProductCard logic or just making a specific client component for 'AddToCartButton'.
    // We will re-import ProductCard just for visuals in related, but for the main action we need a button.
    // Let's create a Client Component button for this page.

    return (
        <div className="container-custom py-12">
            <Link href="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-river-blue mb-8">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300">
                    <span className="text-8xl">🐟</span>
                </div>

                {/* Details */}
                <div>
                    <div className="mb-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-river-blue text-xs font-bold uppercase tracking-wide">
                            {product.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-river-blue mb-2">{product.name}</h1>
                    {product.bengaliName && (
                        <p className="text-xl text-gray-500 font-bengali mb-6">{product.bengaliName}</p>
                    )}

                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-lg text-gray-500">/ per {product.unit}</span>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description || "Freshly sourced high-quality fish. Carefully cleaned and cut according to your preference."}
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Check className="h-5 w-5 text-green-600" />
                            <span>Chemical Free & Formalin Free</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Truck className="h-5 w-5 text-river-blue" />
                            <span>Home Delivery available in Haldia (721649, 721645)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <ShieldCheck className="h-5 w-5 text-mustard-gold" />
                            <span>Cleaned & Cut by Experts</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="border-t border-gray-200 pt-12">
                    <h2 className="text-2xl font-bold text-river-blue mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

// Inline Client Component for Button
import { AddToCartButton } from './add-to-cart-button'
