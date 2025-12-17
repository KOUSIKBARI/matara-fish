import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/db"
import { Package, ShoppingCart, IndianRupee, Clock } from "lucide-react"

async function getStats() {
    const totalOrders = await prisma.order.count()
    const pendingOrders = await prisma.order.count({ where: { status: 'RECEIVED' } })
    const totalInternal = await prisma.product.count()

    // Calculate total revenue (simple sum of all orders for now)
    const orders = await prisma.order.findMany({ select: { totalAmount: true } })
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

    return { totalOrders, pendingOrders, totalInternal, totalRevenue }
}

export default async function AdminDashboardPage() {
    const stats = await getStats()

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon={IndianRupee}
                    color="text-green-600"
                    bg="bg-green-100"
                />
                <StatsCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon={Clock}
                    color="text-orange-600"
                    bg="bg-orange-100"
                />
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={ShoppingCart}
                    color="text-blue-600"
                    bg="bg-blue-100"
                />
                <StatsCard
                    title="Total Products"
                    value={stats.totalInternal}
                    icon={Package}
                    color="text-purple-600"
                    bg="bg-purple-100"
                />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                <p className="text-gray-500 text-sm">No recent activity logs available yet.</p>
            </div>
        </div>
    )
}

function StatsCard({ title, value, icon: Icon, color, bg }: any) {
    return (
        <Card>
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </CardContent>
        </Card>
    )
}
