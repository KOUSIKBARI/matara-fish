import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { ProductActions } from "@/components/admin/product-actions"

async function getAllProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export default async function AdminProductsPage() {
    const products = await getAllProducts()

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
                <Link href="/admin/products/add">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Add New Fish
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{product.name}</div>
                                        {product.bengaliName && <div className="text-xs text-gray-500 font-bengali">{product.bengaliName}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">₹{product.price} / {product.unit}</td>
                                    <td className="px-6 py-4">
                                        {product.available ? (
                                            <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">In Stock</span>
                                        ) : (
                                            <span className="text-red-500 text-xs font-bold bg-red-100 px-2 py-1 rounded">Out of Stock</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <ProductActions product={product} />
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No products found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
