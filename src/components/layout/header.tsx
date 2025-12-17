import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, Phone } from 'lucide-react'
import { CartButtonClient } from './cart-button-client'

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-river-blue/95 backdrop-blur supports-[backdrop-filter]:bg-river-blue/80 text-white">
            <div className="container-custom flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex flex-col">
                        <span className="text-xl font-bold font-bengali leading-none tracking-tight">মা তারা ফিশ সেন্টার</span>
                        <span className="text-xs font-light text-gray-300 tracking-wider">MA TARA FISH CENTER</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-mustard-gold transition-colors">Home</Link>
                    <Link href="/shop" className="text-sm font-medium hover:text-mustard-gold transition-colors">Shop Fish</Link>
                    <Link href="/bulk-order" className="text-sm font-medium hover:text-mustard-gold transition-colors">Bulk Order</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-mustard-gold transition-colors">Our Story</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-sm text-mustard-gold">
                        <Phone className="h-4 w-4" />
                        <span>+91 98765 43210</span>
                    </div>

                    <CartButtonClient />

                    <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-white/10">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
