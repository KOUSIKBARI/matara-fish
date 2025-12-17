import { prisma } from "@/lib/db"
import { Badge } from "@/components/ui/badge" // Need to create Badge or use standard span
import { OrderStatusUpdate } from "@/components/admin/order-status-update"

async function getOrders() {
    return await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { items: true }
    })
}

export default async function AdminOrdersPage() {
    const orders = await getOrders()

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Manage Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status & Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                        {order.id.slice(0, 8)}...
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.customerName}</div>
                                        <div className="text-xs text-gray-500">{order.phone}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[150px]">{order.address}, {order.pincode}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <ul className="list-disc list-inside text-xs text-gray-600">
                                            {order.items.map((item: any) => (
                                                <li key={item.id}>{item.productName} x{item.quantity}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4 font-medium">₹{order.totalAmount}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {order.createdAt.toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <OrderStatusUpdate orderId={order.id} currentStatus={order.status} />
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No orders found.
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
