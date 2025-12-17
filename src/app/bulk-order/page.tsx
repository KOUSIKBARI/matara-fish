"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { createOrder } from "@/app/actions"
import { Loader2, Calendar, Users, Utensils } from "lucide-react"

export default function BulkOrderPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        address: "",
        pincode: "",
        occasion: "",
        deliveryDate: "",
        fishRequirement: "", // We will store this in 'items' or separate note. For simplicity, we'll append to occasion or make a loose item.
        // But schema expects items. Let's handle this in submit.
    })

    // We need to clarify how bulk order stores "Fish Type". 
    // The schema is strict about items needing productId? No, productId is optional. 
    // We can create a dummy item or just use the occasion field for text description if heavily customized.
    // Actually, standardizing is better. Let's add a Text Area for "Requirements".

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // For bulk orders, we might not validate pincode strictly or allows slightly wider range? 
        // The requirement says "Local delivery limited to selected pin codes". So we enforce it.

        // Construct a "Custom Item" for the order
        const customItem = {
            productName: `Bulk Request: ${formData.fishRequirement}`,
            quantity: 1, // logical unit
            price: 0 // Price TBD
        }

        const result = await createOrder({
            customerName: formData.customerName,
            phone: formData.phone,
            address: formData.address,
            pincode: formData.pincode,
            type: 'BULK',
            occasion: formData.occasion,
            deliveryDate: formData.deliveryDate,
            items: [customItem],
            totalAmount: 0 // TBD
        })

        if (result.success) {
            setIsSuccess(true)
        } else {
            setError(result.error || "Failed to submit request.")
        }

        setIsLoading(false)
    }

    if (isSuccess) {
        return (
            <div className="container-custom py-24 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold text-river-blue mb-4">Request Received!</h1>
                <p className="text-gray-600 max-w-lg mx-auto mb-8">
                    We have received your bulk order inquiry for <strong>{formData.occasion}</strong>.
                    <br />Our team will call you at <strong>{formData.phone}</strong> within 24 hours to discuss prices and availability.
                </p>
                <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
            </div>
        )
    }

    return (
        <div className="bg-river-blue/5 min-h-screen py-12">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-river-blue mb-4">Plan Your Big Occasion</h1>
                        <p className="text-xl text-gray-600">
                            Hosting a Wedding, Anniprasan, or Corporate Event? <br />
                            Get the freshest fish at wholesale prices.
                        </p>
                    </div>

                    <Card className="shadow-xl border-t-4 border-t-mustard-gold">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Your Name"
                                        name="customerName"
                                        required
                                        value={formData.customerName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Phone Number"
                                        name="phone"
                                        required
                                        type="tel"
                                        pattern="[0-9]{10}"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Delivery Address"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    <div className="space-y-1">
                                        <Input
                                            label="Pincode"
                                            name="pincode"
                                            required
                                            maxLength={6}
                                            value={formData.pincode}
                                            onChange={handleChange}
                                        />
                                        <p className="text-xs text-gray-500">Serviceable: 721649, 721645</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Occasion Type"
                                        name="occasion"
                                        placeholder="e.g. Wedding, Rice Ceremony"
                                        required
                                        value={formData.occasion}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Date of Requirement"
                                        name="deliveryDate"
                                        type="date"
                                        required
                                        value={formData.deliveryDate}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Fish Requirements</label>
                                    <textarea
                                        className="w-full min-h-[100px] rounded-md border border-gray-300 p-3 text-sm focus:border-river-blue focus:ring-1 focus:ring-river-blue outline-none"
                                        name="fishRequirement"
                                        placeholder="Describe what you need. E.g., 50kg Rohu (2kg+ size), 10kg Prawns..."
                                        required
                                        value={formData.fishRequirement}
                                        onChange={handleChange}
                                    />
                                </div>

                                {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

                                <Button className="w-full h-14 text-lg bg-river-blue hover:bg-river-blue-light" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting Request...
                                        </>
                                    ) : "Submit Bulk Enquiry"}
                                </Button>
                                <p className="text-xs text-center text-gray-400">
                                    *Prices will be confirmed over phone based on market rates on the delivery date.
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 text-river-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-gray-900">For Large Gatherings</h3>
                            <p className="text-sm text-gray-500 mt-2">Perfect for 50+ guests. We handle large volumes with ease.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-mustard-gold/20 text-mustard-hover rounded-full flex items-center justify-center mx-auto mb-4">
                                <Utensils className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-gray-900">Custom Cuts</h3>
                            <p className="text-sm text-gray-500 mt-2">Fry cut, Curry cut, or Whole - just let us know exactly how you want it.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-gray-900">Timely Delivery</h3>
                            <p className="text-sm text-gray-500 mt-2">Morning freshness guaranteed. Delivered right on time for cooking.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
