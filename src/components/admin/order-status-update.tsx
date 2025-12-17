"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateOrderStatus } from "@/app/actions"
import { useState } from "react"
import { toast } from "sonner" // Assuming we might add toast later, but for now console

const STATUSES = [
    { value: 'RECEIVED', label: 'Received' },
    { value: 'CLEANING', label: 'Cleaning' },
    { value: 'GRADING', label: 'Grading' },
    { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELLED', label: 'Cancelled' },
]

export function OrderStatusUpdate({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [loading, setLoading] = useState(false)

    const handleValueChange = async (value: string) => {
        setLoading(true)
        const result = await updateOrderStatus(orderId, value)
        if (!result.success) {
            alert("Failed to update status")
        }
        setLoading(false)
    }

    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full 
        ${currentStatus === 'DELIVERED' ? 'bg-green-500' :
                    currentStatus === 'CANCELLED' ? 'bg-red-500' : 'bg-blue-500'}`}
            />
            <select
                className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-river-blue outline-none"
                value={currentStatus}
                onChange={(e) => handleValueChange(e.target.value)}
                disabled={loading}
            >
                {STATUSES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                ))}
            </select>
        </div>
    )
}
