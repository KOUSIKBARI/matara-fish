"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TrackOrderPage() {
    const router = useRouter()
    const [orderId, setOrderId] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (orderId.trim()) {
            router.push(`/track/${orderId.trim()}`)
        }
    }

    return (
        <div className="container-custom py-20 min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-river-blue mb-4">Track Your Order</h1>
                <p className="text-gray-600 mb-8">
                    Enter your Order ID (sent to your email/phone) to check the live status.
                </p>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        placeholder="Enter Order ID (e.g. ord_123...)"
                        className="h-12 text-lg"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                    <Button className="h-12 w-12 p-0" type="submit">
                        <Search className="h-5 w-5" />
                    </Button>
                </form>

                <div className="mt-12 p-6 bg-blue-50 rounded-xl text-left">
                    <h3 className="font-semibold text-river-blue mb-2">Order Stages:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-gray-400 rounded-full"></span> Order Received</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-gray-400 rounded-full"></span> Cleaning & Cutting</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-gray-400 rounded-full"></span> Out for Delivery</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Delivered</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
