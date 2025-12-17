"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function CartPage() {
    const [mounted, setMounted] = useState(false)
    const { items, removeItem, updateQuantity, getCartTotal } = useCart()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="container-custom py-20 text-center">
                <h1 className="text-3xl font-bold text-river-blue mb-4">Your Cart</h1>
                <p>Loading...</p>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="container-custom py-20 text-center">
                <h1 className="text-3xl font-bold text-river-blue mb-6">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any fresh fish yet.</p>
                <Link href="/shop">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold text-river-blue mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.productId} className="flex flex-col sm:flex-row items-center p-4 gap-4">
                            {/* Placeholder Image Small */}
                            <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                                <span className="text-2xl">🐟</span>
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-bold text-lg text-river-blue">{item.name}</h3>
                                <p className="text-sm text-gray-500">₹{item.price} / {item.unit}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>

                            <div className="text-right min-w-[80px]">
                                <p className="font-bold">₹{item.price * item.quantity}</p>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={() => removeItem(item.productId)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </Card>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-24">
                        <h2 className="text-xl font-bold border-b border-gray-100 pb-4 mb-4">Order Summary</h2>

                        <div className="space-y-2 mb-6 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₹{getCartTotal()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Charges</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-lg font-bold border-t border-gray-100 pt-4 mb-6">
                            <span>Total</span>
                            <span>₹{getCartTotal()}</span>
                        </div>

                        <Link href="/checkout">
                            <Button className="w-full h-12 text-base">
                                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>

                        <p className="text-xs text-gray-400 text-center mt-4">
                            *Availability depends on delivery pincode (721649, 721645)
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}
