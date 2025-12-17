import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
    return (
        <div className="container-custom min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-in zoom-in duration-500">
                <CheckCircle className="h-12 w-12" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-river-blue mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
                Thank you for ordering with Ma Tara Fish Center. Our team will verify your order and contact you shortly for confirmation.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 w-full max-w-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Order ID</p>
                <p className="text-xl font-mono font-bold text-gray-800">{params.id}</p>
            </div>

            <div className="flex gap-4">
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
                <Link href={`/track/${params.id}`}>
                    <Button>Track Order</Button>
                </Link>
            </div>
        </div>
    )
}
