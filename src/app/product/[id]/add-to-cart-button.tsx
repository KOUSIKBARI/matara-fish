"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/components/ui/button"

export function AddToCartButton({ product }: { product: any }) {
    const addItem = useCart(state => state.addItem)
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
        <Button
            size="lg"
            className={cn("h-14 px-8 text-lg w-full md:w-auto", isAdded ? "bg-green-600 hover:bg-green-700" : "")}
            onClick={handleAddToCart}
            disabled={!product.available}
        >
            {isAdded ? (
                <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                </>
            )}
        </Button>
    )
}
