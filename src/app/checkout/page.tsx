"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createOrder, validatePincode } from "@/app/actions"
import { Loader2 } from "lucide-react"
import { PaymentButton } from "@/components/features/payment-gateway"
import { toast } from "sonner"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getCartTotal, clearCart } = useCart()
    const [mounted, setMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD')

    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        address: "",
        pincode: "",
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="p-20 text-center">Loading checkout...</div>

    if (items.length === 0) {
        if (typeof window !== 'undefined') router.push("/cart")
        return null
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleOnlinePaymentSuccess = async () => {
        await placeOrderResult({ ...formData }, 'PAID')
    }

    const placeOrderResult = async (data: any, paymentStatus: 'PENDING' | 'PAID' = 'PENDING') => {
        setIsLoading(true)
        const result = await createOrder({
            customerName: data.customerName,
            phone: data.phone,
            address: data.address,
            pincode: data.pincode,
            type: 'RETAIL',
            items: items.map(i => ({
                productId: i.productId,
                productName: i.name,
                quantity: i.quantity,
                price: i.price
            })),
            totalAmount: getCartTotal(),
            // Logic to save payment status would go here if schema supported it directly
            // For now status='RECEIVED' encompasses pending.
        })

        if (result.success) {
            clearCart()
            toast.success("Order Placed Successfully!")
            router.push(`/order/success/${result.orderId}`)
        } else {
            setError(result.error || "Something went wrong. Please try again.")
            toast.error("Order Failed")
        }

        setIsLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // 1. Validate Pincode
        const isValidPin = await validatePincode(formData.pincode)
        if (!isValidPin) {
            setError("Sorry, delivery is not available for this pincode. We only serve 721649 and 721645.")
            setIsLoading(false)
            return
        }

        if (paymentMethod === 'ONLINE') {
            // Validation passed, waiting for user to click pay button
            setIsLoading(false)
            return
        }

        // 2. Create Order (COD)
        await placeOrderResult(formData, 'PENDING')
    }

    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold text-river-blue mb-8">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Full Name"
                                    name="customerName"
                                    placeholder="Enter your name"
                                    required
                                    value={formData.customerName}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Phone Number"
                                    name="phone"
                                    placeholder="10 digit mobile number"
                                    required
                                    pattern="[0-9]{10}"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Delivery Address"
                                    name="address"
                                    placeholder="House No, Street, Landmark"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                <div className="space-y-2">
                                    <Input
                                        label="Pincode"
                                        name="pincode"
                                        placeholder="eg. 721649"
                                        required
                                        maxLength={6}
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        error={error}
                                    />
                                    <p className="text-xs text-gray-500">Available: 721649, 721645</p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-100 mt-4">
                                    <h3 className="font-semibold text-gray-700">Payment Method</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            type="button"
                                            variant={paymentMethod === 'COD' ? 'default' : 'outline'}
                                            className={paymentMethod === 'COD' ? "bg-river-blue" : ""}
                                            onClick={() => setPaymentMethod('COD')}
                                        >
                                            Cash on Delivery
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={paymentMethod === 'ONLINE' ? 'default' : 'outline'}
                                            className={paymentMethod === 'ONLINE' ? "bg-river-blue" : ""}
                                            onClick={() => setPaymentMethod('ONLINE')}
                                        >
                                            Pay Online
                                        </Button>
                                    </div>

                                    {paymentMethod === 'ONLINE' ? (
                                        <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800 animate-in fade-in slide-in-from-top-2">
                                            <p className="mb-4">Click below to pay securely.</p>
                                            {/* Logic check: Ensure form is filled before allowing payment? 
                                        Ideally yes. But PaymentButton is isolated. 
                                        We should act as if form is submitted. 
                                    */}
                                            {formData.customerName && formData.phone && formData.pincode ? (
                                                <PaymentButton amount={getCartTotal()} onComplete={handleOnlinePaymentSuccess} />
                                            ) : (
                                                <p className="text-red-500 text-xs">Please fill delivery details first.</p>
                                            )}

                                        </div>
                                    ) : (
                                        <div className="pt-2">
                                            <Button className="w-full h-12 text-lg" disabled={isLoading}>
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Processing Order...
                                                    </>
                                                ) : "Place Order (COD)"}
                                            </Button>
                                            <p className="text-xs text-center text-gray-400 mt-2">
                                                Pay via Cash or UPI when the delivery arrives.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Preview */}
                <div>
                    <Card className="bg-gray-50 border-none shadow-inner">
                        <CardHeader>
                            <CardTitle>Your Order</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map(item => (
                                <div key={item.productId} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity} {item.unit}</span>
                                    <span className="font-medium">₹{item.price * item.quantity}</span>
                                </div>
                            ))}

                            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                                <span>Total to Pay</span>
                                <span>₹{getCartTotal()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
