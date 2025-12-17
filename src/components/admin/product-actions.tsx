"use client"

import { Button } from "@/components/ui/button"
import { Trash2, ToggleLeft, ToggleRight, RefreshCcw } from "lucide-react"
import { deleteProduct, toggleProductAvailability } from "@/app/actions"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function ProductActions({ product }: { product: any }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return
        setLoading(true)
        await deleteProduct(product.id)
        setLoading(false)
    }

    const handleToggle = async () => {
        setLoading(true)
        await toggleProductAvailability(product.id, product.available)
        setLoading(false)
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                disabled={loading}
                className={product.available ? "text-green-600 hover:text-green-700" : "text-gray-400 hover:text-gray-600"}
            >
                {product.available ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
            </Button>

            <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={loading}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    )
}
