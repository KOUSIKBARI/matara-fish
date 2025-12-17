import Link from "next/link"
import { Package, ShoppingCart, LayoutDashboard, Settings, LogOut } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-river-blue text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold font-bengali">মা তারা ফিশ</h1>
                    <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
                        <Package className="h-5 w-5" />
                        Products
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-100 transition-colors text-sm font-medium">
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
