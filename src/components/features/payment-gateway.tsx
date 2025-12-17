"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2, CheckCircle, CreditCard } from "lucide-react"

// This is a dummy component for "Payment Gateway" simulation
// In a real app, this would integrate Razorpay/Stripe script.

export function PaymentButton({ amount, onComplete }: { amount: number, onComplete: () => void }) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handlePayment = () => {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
            setTimeout(() => {
                onComplete()
            }, 1000)
        }, 2000)
    }

    if (success) {
        return (
            <Button className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" /> Payment Successful
            </Button>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Pay ₹{amount} Online
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Secure Payment</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center py-6 space-y-4">
                    <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Merchant</span>
                            <span className="font-semibold">Ma Tara Fish Center</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-bold text-lg">₹{amount}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handlePayment} disabled={loading}>
                            <span className="text-2xl">⚡</span>
                            UPI
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handlePayment} disabled={loading}>
                            <CreditCard className="h-6 w-6" />
                            Card
                        </Button>
                    </div>

                    {loading && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
                            <Loader2 className="h-4 w-4 animate-spin" /> Processing Payment...
                        </div>
                    )}

                    <p className="text-xs text-center text-gray-400 mt-4">
                        This is a simulated payment gateway for demonstration.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
