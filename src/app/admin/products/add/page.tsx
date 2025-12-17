"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { createProduct } from "@/app/actions"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddProductPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const result = await createProduct(data)
        if (result.success) {
            router.push("/admin/products")
        } else {
            alert("Failed to create product")
        }
        setLoading(false)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/products" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
            </Link>

            <h1 className="text-2xl font-bold text-gray-800 mb-8">Add New Fish Item</h1>

            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input name="name" label="Product Name (English)" placeholder="e.g. Rohu Fish (Large)" required />
                        <Input name="bengaliName" label="Product Name (Bengali)" placeholder="e.g. রুই মাছ" />

                        <div className="grid grid-cols-2 gap-6">
                            <Input name="price" label="Price (₹)" type="number" step="0.01" required />
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Unit</label>
                                <select name="unit" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="kg">kg</option>
                                    <option value="pc">pc</option>
                                    <option value="gm">gm</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Category</label>
                            <select name="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="Freshwater Fish">Freshwater Fish</option>
                                <option value="Seawater Fish">Seawater Fish</option>
                                <option value="Prawns">Prawns</option>
                                <option value="Crabs">Crabs</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                className="w-full min-h-[100px] rounded-md border border-input p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Optional description about freshness, size, etc."
                            />
                        </div>

                        <Button className="w-full" disabled={loading}>
                            {loading ? "Creating..." : "Create Product"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
