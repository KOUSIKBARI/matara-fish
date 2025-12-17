"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import { cn } from "@/components/ui/button"

interface Product {
    id: string
    name: string
    bengaliName: string | null
    price: number
    unit: string
    category: string
    available: boolean
}

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCart((state) => state.addItem)
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
        })
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-shadow border-gray-200">
            <div className="aspect-[4/3] bg-gray-100 relative max-h-48 overflow-hidden">
                {/* Placeholder Image */}
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <span className="text-4xl">🐟</span>
                </div>
                {!product.available && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">Out of Stock</span>
                    </div>
                )}
            </div>

            <CardContent className="p-4">
                <div className="mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-mustard-hover">{product.category}</span>
                </div>
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-lg text-river-blue group-hover:text-blue-700 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    {product.bengaliName && (
                        <p className="font-bengali text-sm text-gray-500">{product.bengaliName}</p>
                    )}
                </Link>
                <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-xl font-bold">₹{product.price}</span>
                    <span className="text-sm text-gray-500">/ {product.unit}</span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    className={cn("w-full gap-2", isAdded ? "bg-green-600 hover:bg-green-700 text-white" : "")}
                    size="sm"
                    disabled={!product.available}
                    onClick={handleAddToCart}
                >
                    {isAdded ? (
                        <>
                            <Check className="h-4 w-4" />
                            Added
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
