import { getOrder } from "@/app/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Printer } from "lucide-react"

export default async function InvoicePage({ params }: { params: { id: string } }) {
    const order = await getOrder(params.id)

    if (!order) return <div>Order not found</div>

    return (
        <div className="bg-white min-h-screen text-black p-8 md:p-12 print:p-0">
            <div className="max-w-3xl mx-auto border border-gray-200 p-8 print:border-0 print:shadow-none shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 border-b border-gray-200 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-bengali text-river-blue print:text-black">মা তারা ফিশ সেন্টার</h1>
                        <p className="text-sm text-gray-500 mt-1">Ma Tara Fish Center</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <p>Durgachak Market, Haldia</p>
                            <p>West Bengal - 721602</p>
                            <p>Phone: +91 98765 43210</p>
                            <p>Email: contact@matarafish.com</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400">Invoice</h2>
                        <div className="mt-4 text-sm">
                            <p className="font-bold">Invoice #</p>
                            <p className="font-mono">{order.id.slice(0, 8).toUpperCase()}</p>
                            <p className="font-bold mt-2">Date</p>
                            <p>{order.createdAt.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Bill To */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Bill To</h3>
                    <p className="font-bold text-lg">{order.customerName}</p>
                    <p>{order.address}</p>
                    <p>{order.pincode}</p>
                    <p>Phone: {order.phone}</p>
                </div>

                {/* Items */}
                <table className="w-full mb-8">
                    <thead className="bg-gray-50 border-y border-gray-200">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="py-3 px-4">Item Description</th>
                            <th className="py-3 px-4 text-center">Quantity</th>
                            <th className="py-3 px-4 text-right">Unit Price</th>
                            <th className="py-3 px-4 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {order.items.map((item: any) => (
                            <tr key={item.id}>
                                <td className="py-3 px-4">{item.productName}</td>
                                <td className="py-3 px-4 text-center">{item.quantity}</td>
                                <td className="py-3 px-4 text-right">₹{item.price}</td>
                                <td className="py-3 px-4 text-right font-medium">₹{item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="border-t border-gray-200">
                        <tr>
                            <td colSpan={3} className="py-4 px-4 text-right font-bold">Total</td>
                            <td className="py-4 px-4 text-right font-bold text-lg">₹{order.totalAmount}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Footer */}
                <div className="text-center text-xs text-gray-400 border-t border-gray-100 pt-8">
                    <p>Thank you for your business!</p>
                    <p className="mt-1">For any queries, please verify your fish at the time of delivery.</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-8 flex justify-center gap-4 print:hidden">
                <Button onClick={() => window.print()} className="gap-2">
                    <Printer className="h-4 w-4" /> Print Invoice
                </Button>
                <Link href={`/track/${order.id}`}>
                    <Button variant="outline">Back to Tracking</Button>
                </Link>
            </div>
        </div>
    )
}
