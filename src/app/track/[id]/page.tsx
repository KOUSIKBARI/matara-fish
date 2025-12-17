import { getOrder } from "@/app/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Circle, Clock, Package, Truck, UserCheck } from "lucide-react"

interface TrackingPageProps {
    params: Promise<{ id: string }>
}

const STEPS = [
    { id: 'RECEIVED', label: 'Order Received', icon: Clock },
    { id: 'CLEANING', label: 'Cleaning & Cutting', icon: UserCheck },
    { id: 'GRADING', label: 'Quality Check', icon: CheckCircle },
    { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
    { id: 'DELIVERED', label: 'Delivered', icon: Package },
]

export default async function OrderStatusPage({ params }: TrackingPageProps) {
    const resolvedParams = await params
    const order = await getOrder(resolvedParams.id)

    if (!order) {
        return (
            <div className="container-custom py-20 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Order Not Found</h1>
                <p className="mb-6 text-gray-600">We couldn&apos;t find an order with ID: {resolvedParams.id}</p>
                <Link href="/track"><Button>Try Another ID</Button></Link>
            </div>
        )
    }

    // Determine current step index
    const currentStepIndex = STEPS.findIndex(s => s.id === order.status)
    // If status is not in generic list (e.g. CANCELLED), handle separately
    // For now, assuming happy path or matching status.

    // NOTE: Simple index logic. If status is 'CLEANING', index is 1. 0 is done, 1 is active, 2+ are pending.

    return (
        <div className="container-custom py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-river-blue">Order Status</h1>
                <span className="text-sm font-mono text-gray-500">ID: {order.id.slice(0, 8)}...</span>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="relative">
                    {/* Connector Line */}
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200 md:w-full md:h-0.5 md:left-0 md:top-6 md:bottom-auto"></div>

                    <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                        {STEPS.map((step, index) => {
                            const isCompleted = index < currentStepIndex || order.status === 'DELIVERED' // If delivered, all previous are done effectively
                            const isActive = step.id === order.status || (order.status === 'DELIVERED' && step.id === 'DELIVERED')
                            const Icon = step.icon

                            return (
                                <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-2 relative z-10 bg-white md:bg-transparent p-2 md:p-0">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                                    ${isActive || isCompleted ? 'bg-river-blue border-river-blue text-white' : 'bg-white border-gray-300 text-gray-300'}
                                `}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="md:text-center">
                                        <p className={`font-semibold ${isActive ? 'text-river-blue' : 'text-gray-500'}`}>{step.label}</p>
                                        {isActive && <p className="text-xs text-mustard-hover font-medium animate-pulse">In Progress</p>}
                                        {isCompleted && <p className="text-xs text-green-600 font-medium">Completed</p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Order Details</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><span className="font-semibold">Customer:</span> {order.customerName}</p>
                        <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                        <p><span className="font-semibold">Address:</span> {order.address}, {order.pincode}</p>
                        <p><span className="font-semibold">Total Amount:</span> ₹{order.totalAmount}</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Items</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {order.items.map((item: any) => (
                            <li key={item.id} className="flex justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                                <span>{item.productName} (x{item.quantity})</span>
                                <span>₹{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link href="/shop">
                    <Button variant="outline">Back to Shop</Button>
                </Link>
            </div>
        </div>
    )
}
